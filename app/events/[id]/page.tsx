"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { useAuthCheck } from "@/hooks/useAuth";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import {
  Calendar,
  Clock,
  MapPin,
  Users,
  Share2,
  ArrowLeft,
  Euro,
  User,
  Loader2,
  Heart,
  Star,
  Phone,
  Mail,
  Globe,
  MapIcon,
  CalendarDays,
  Clock4,
  UserCheck,
  UserX,
  AlertCircle,
  CheckCircle,
  ExternalLink,
  Copy,
  MessageCircle,
  Bookmark,
  BookmarkCheck,
} from "lucide-react";
import { toast } from "sonner";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { getEventById } from "@/lib/services/eventService";
import { createInscription } from "@/lib/services/inscriptionService";

interface EventDetails {
  id: number;
  nom: string;
  description: string;
  categorie: string;
  lieu: string;
  date_et_heure: string;
  nombre_max_participants: number | null;
  prix: number;
  visibilite: string;
  statut: string;
  createur_id: number;
  date_creation: string;
  date_modification: string;
  image_url?: string;
  contact_email?: string;
  contact_phone?: string;
  website?: string;
  tags?: string[];
}

interface Participant {
  id: number;
  nom: string;
  prenom: string;
  avatar_url?: string;
  date_inscription: string;
}

export default function EventDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { isAuthenticated, isLoading: authLoading, user } = useAuthCheck();

  const [event, setEvent] = useState<EventDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [isRegistered, setIsRegistered] = useState(false);
  const [registrationLoading, setRegistrationLoading] = useState(false);
  const [participantsCount, setParticipantsCount] = useState(0);
  const [participants, setParticipants] = useState<Participant[]>([]);
  const [showConfetti, setShowConfetti] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  const [showFullDescription, setShowFullDescription] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (params.id) {
      fetchEventDetails();
      checkUserRegistration();
    }
  }, [params.id, isAuthenticated]);

  const fetchEventDetails = async () => {
    try {
      setLoading(true);
      const data = await getEventById(params.id as string);
      setEvent(data);

      // Simuler le nombre de participants (à remplacer par un vrai appel API)
      setParticipantsCount(
        Math.floor(Math.random() * (data.nombre_max_participants || 50)) + 1
      );

      // Simuler la liste des participants
      const mockParticipants: Participant[] = [
        {
          id: 1,
          nom: "Dupont",
          prenom: "Marie",
          avatar_url:
            "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
          date_inscription: "2024-01-15",
        },
        {
          id: 2,
          nom: "Martin",
          prenom: "Pierre",
          avatar_url:
            "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
          date_inscription: "2024-01-14",
        },
        {
          id: 3,
          nom: "Bernard",
          prenom: "Sophie",
          date_inscription: "2024-01-13",
        },
      ];
      setParticipants(mockParticipants);

      setLoading(false);
    } catch (error) {
      console.error("Erreur lors du chargement de l'événement:", error);
      toast.error("Impossible de charger les détails de l'événement");
      setLoading(false);
    }
  };

  const checkUserRegistration = async () => {
    if (!isAuthenticated) return;

    try {
      // Simuler la vérification d'inscription
      setIsRegistered(Math.random() > 0.7);
    } catch (error) {
      console.error("Erreur lors de la vérification de l'inscription:", error);
    }
  };

  const handleRegistration = async () => {
    if (!isAuthenticated) {
      toast.error("Vous devez être connecté pour vous inscrire");
      router.push("/registration");
      return;
    }

    if (!event) return;

    try {
      setRegistrationLoading(true);

      // Appel API pour s'inscrire
      await createInscription({
        event_id: event.id,
        user_id: user?.id || 0,
        statut: "confirmé",
      });

      setIsRegistered(true);
      setParticipantsCount((prev) => prev + 1);
      setShowConfetti(true);

      toast.success(
        "Inscription réussie ! Vous recevrez une confirmation par email."
      );

      // Masquer le confetti après 3 secondes
      setTimeout(() => setShowConfetti(false), 3000);
    } catch (error) {
      console.error("Erreur lors de l'inscription:", error);
      toast.error("Erreur lors de l'inscription. Veuillez réessayer.");
    } finally {
      setRegistrationLoading(false);
    }
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: event?.nom,
          text: event?.description,
          url: window.location.href,
        });
      } catch (error) {
        console.error("Erreur lors du partage:", error);
      }
    } else {
      // Fallback pour les navigateurs qui ne supportent pas l'API Web Share
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      toast.success("Lien copié dans le presse-papiers !");
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);
    toast.success(isFavorite ? "Retiré des favoris" : "Ajouté aux favoris");
  };

  const formatDate = (dateString: string) => {
    return format(new Date(dateString), "dd MMMM yyyy", { locale: fr });
  };

  const formatTime = (dateString: string) => {
    return format(new Date(dateString), "HH:mm", { locale: fr });
  };

  const formatDateTime = (dateString: string) => {
    return format(new Date(dateString), "dd MMMM yyyy 'à' HH:mm", {
      locale: fr,
    });
  };

  const getTimeUntilEvent = (dateString: string) => {
    const now = new Date();
    const eventDate = new Date(dateString);
    const diffTime = eventDate.getTime() - now.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays < 0) return "Événement terminé";
    if (diffDays === 0) return "Aujourd'hui";
    if (diffDays === 1) return "Demain";
    return `Dans ${diffDays} jours`;
  };

  const getAvailabilityStatus = () => {
    if (!event?.nombre_max_participants) return "Illimité";
    const percentage =
      (participantsCount / event.nombre_max_participants) * 100;

    if (percentage >= 90) return "Presque complet";
    if (percentage >= 75) return "Places limitées";
    return "Places disponibles";
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-purple-50">
        <div className="text-center">
          <LoadingSpinner />
          <p className="mt-4 text-muted-foreground">
            Chargement de l'événement...
          </p>
        </div>
      </div>
    );
  }

  if (!event) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-purple-50">
        <div className="text-center">
          <div className="text-6xl mb-4">😕</div>
          <h1 className="text-2xl font-bold text-foreground mb-4">
            Événement non trouvé
          </h1>
          <p className="text-muted-foreground mb-6">
            L'événement que vous recherchez n'existe pas ou a été supprimé.
          </p>
          <Button onClick={() => router.push("/events")}>
            Retour aux événements
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Confetti Animation */}
      {showConfetti && (
        <div className="fixed inset-0 pointer-events-none z-50">
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <div className="text-8xl animate-bounce">🎉</div>
          </div>
        </div>
      )}

      {/* Header */}
      <div className="bg-gradient-to-r from-primary/10 via-primary/5 to-primary/10 border-b border-border/50">
        <div className="px-4 sm:px-6 lg:px-8 py-6">
          <div className="max-w-6xl mx-auto">
            <div className="flex items-center justify-between mb-6">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => router.back()}
                className="flex items-center gap-2 hover:bg-primary/10"
              >
                <ArrowLeft className="h-4 w-4" />
                Retour
              </Button>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={toggleFavorite}
                  className="flex items-center gap-2"
                >
                  {isFavorite ? (
                    <BookmarkCheck className="h-4 w-4 text-primary" />
                  ) : (
                    <Bookmark className="h-4 w-4" />
                  )}
                  {isFavorite ? "Favori" : "Favoris"}
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleShare}
                  className="flex items-center gap-2"
                >
                  {copied ? (
                    <CheckCircle className="h-4 w-4" />
                  ) : (
                    <Share2 className="h-4 w-4" />
                  )}
                  {copied ? "Copié" : "Partager"}
                </Button>
                {isAuthenticated && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => router.push(`/events/${params.id}/edit`)}
                    className="flex items-center gap-2"
                  >
                    Modifier
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Contenu principal */}
      <div className="px-4 sm:px-6 lg:px-8 py-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Colonne principale */}
            <div className="lg:col-span-2 space-y-6">
              {/* Image de l'événement */}
              {event.image_url && (
                <Card className="overflow-hidden shadow-lg border-0">
                  <div className="aspect-video bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center">
                    <img
                      src={event.image_url}
                      alt={event.nom}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </Card>
              )}

              {/* Informations principales */}
              <Card className="shadow-lg border-0">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-3">
                        <Badge variant="secondary" className="text-sm">
                          {event.categorie}
                        </Badge>
                        <Badge
                          variant={
                            event.statut === "actif" ? "default" : "secondary"
                          }
                          className="text-sm"
                        >
                          {event.statut}
                        </Badge>
                        <Badge variant="outline" className="text-sm">
                          {getAvailabilityStatus()}
                        </Badge>
                      </div>
                      <CardTitle className="text-3xl font-bold text-foreground mb-2">
                        {event.nom}
                      </CardTitle>
                      <p className="text-muted-foreground text-lg">
                        {getTimeUntilEvent(event.date_et_heure)}
                      </p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Description */}
                  <div>
                    <h3 className="font-semibold text-lg mb-3 flex items-center gap-2">
                      <MessageCircle className="h-5 w-5 text-primary" />
                      Description
                    </h3>
                    <div className="text-muted-foreground leading-relaxed">
                      {showFullDescription ? (
                        <p>{event.description}</p>
                      ) : (
                        <p>
                          {event.description.length > 300
                            ? `${event.description.substring(0, 300)}...`
                            : event.description}
                        </p>
                      )}
                      {event.description.length > 300 && (
                        <Button
                          variant="link"
                          onClick={() =>
                            setShowFullDescription(!showFullDescription)
                          }
                          className="p-0 h-auto text-primary"
                        >
                          {showFullDescription ? "Voir moins" : "Lire la suite"}
                        </Button>
                      )}
                    </div>
                  </div>

                  <Separator />

                  {/* Informations détaillées */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="flex items-center gap-3 p-4 bg-muted/30 rounded-lg">
                      <CalendarDays className="h-6 w-6 text-primary" />
                      <div>
                        <p className="font-medium">Date et heure</p>
                        <p className="text-muted-foreground">
                          {formatDateTime(event.date_et_heure)}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 p-4 bg-muted/30 rounded-lg">
                      <MapPin className="h-6 w-6 text-primary" />
                      <div>
                        <p className="font-medium">Lieu</p>
                        <p className="text-muted-foreground">{event.lieu}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 p-4 bg-muted/30 rounded-lg">
                      <Users className="h-6 w-6 text-primary" />
                      <div>
                        <p className="font-medium">Participants</p>
                        <div className="flex items-center gap-2">
                          <span className="text-lg font-bold text-primary">
                            {participantsCount}
                          </span>
                          {event.nombre_max_participants && (
                            <span className="text-muted-foreground">
                              / {event.nombre_max_participants}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 p-4 bg-muted/30 rounded-lg">
                      <Euro className="h-6 w-6 text-primary" />
                      <div>
                        <p className="font-medium">Prix</p>
                        <p className="text-muted-foreground">
                          {event.prix > 0 ? `${event.prix}€` : "Gratuit"}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Informations de contact */}
                  {(event.contact_email ||
                    event.contact_phone ||
                    event.website) && (
                    <>
                      <Separator />
                      <div>
                        <h3 className="font-semibold text-lg mb-3 flex items-center gap-2">
                          <User className="h-5 w-5 text-primary" />
                          Contact
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {event.contact_email && (
                            <div className="flex items-center gap-3">
                              <Mail className="h-4 w-4 text-muted-foreground" />
                              <a
                                href={`mailto:${event.contact_email}`}
                                className="text-primary hover:underline"
                              >
                                {event.contact_email}
                              </a>
                            </div>
                          )}
                          {event.contact_phone && (
                            <div className="flex items-center gap-3">
                              <Phone className="h-4 w-4 text-muted-foreground" />
                              <a
                                href={`tel:${event.contact_phone}`}
                                className="text-primary hover:underline"
                              >
                                {event.contact_phone}
                              </a>
                            </div>
                          )}
                          {event.website && (
                            <div className="flex items-center gap-3">
                              <Globe className="h-4 w-4 text-muted-foreground" />
                              <a
                                href={event.website}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-primary hover:underline flex items-center gap-1"
                              >
                                Site web
                                <ExternalLink className="h-3 w-3" />
                              </a>
                            </div>
                          )}
                        </div>
                      </div>
                    </>
                  )}

                  {/* Participants */}
                  {participants.length > 0 && (
                    <>
                      <Separator />
                      <div>
                        <h3 className="font-semibold text-lg mb-3 flex items-center gap-2">
                          <Users className="h-5 w-5 text-primary" />
                          Participants ({participants.length})
                        </h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                          {participants.map((participant) => (
                            <div
                              key={participant.id}
                              className="flex items-center gap-3 p-3 bg-muted/30 rounded-lg"
                            >
                              <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                                {participant.avatar_url ? (
                                  <img
                                    src={participant.avatar_url}
                                    alt={`${participant.prenom} ${participant.nom}`}
                                    className="w-10 h-10 rounded-full object-cover"
                                  />
                                ) : (
                                  <User className="h-5 w-5 text-primary" />
                                )}
                              </div>
                              <div>
                                <p className="font-medium text-sm">
                                  {participant.prenom} {participant.nom}
                                </p>
                                <p className="text-xs text-muted-foreground">
                                  Inscrit le{" "}
                                  {formatDate(participant.date_inscription)}
                                </p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </>
                  )}
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="sticky top-8 space-y-6">
                {/* Carte d'inscription */}
                <Card className="shadow-lg border-0">
                  <CardHeader>
                    <CardTitle className="text-xl flex items-center gap-2">
                      {isRegistered ? (
                        <UserCheck className="h-5 w-5 text-green-600" />
                      ) : (
                        <UserX className="h-5 w-5 text-primary" />
                      )}
                      {isRegistered ? "Inscrit" : "Participer"}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {isRegistered ? (
                      <div className="text-center p-4 bg-green-50 border border-green-200 rounded-lg">
                        <CheckCircle className="h-8 w-8 text-green-600 mx-auto mb-2" />
                        <div className="text-green-600 font-semibold mb-2">
                          ✓ Vous êtes inscrit
                        </div>
                        <p className="text-sm text-green-600">
                          Vous recevrez une confirmation par email
                        </p>
                      </div>
                    ) : (
                      <>
                        <Button
                          onClick={handleRegistration}
                          disabled={registrationLoading}
                          className="w-full h-12 text-lg"
                          size="lg"
                        >
                          {registrationLoading ? (
                            <>
                              <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                              Inscription en cours...
                            </>
                          ) : (
                            "S'inscrire à l'événement"
                          )}
                        </Button>

                        {event.nombre_max_participants && (
                          <div className="text-center p-3 bg-blue-50 border border-blue-200 rounded-lg">
                            <p className="text-sm text-blue-700">
                              <strong>
                                {event.nombre_max_participants -
                                  participantsCount}
                              </strong>{" "}
                              places restantes
                            </p>
                          </div>
                        )}
                      </>
                    )}

                    {!isAuthenticated && (
                      <div className="text-center p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                        <AlertCircle className="h-6 w-6 text-yellow-600 mx-auto mb-2" />
                        <p className="text-sm text-yellow-700 mb-2">
                          Connectez-vous pour vous inscrire
                        </p>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => router.push("/registration")}
                          className="w-full"
                        >
                          Se connecter
                        </Button>
                      </div>
                    )}
                  </CardContent>
                </Card>

                {/* Informations rapides */}
                <Card className="shadow-lg border-0">
                  <CardHeader>
                    <CardTitle className="text-lg">
                      Informations rapides
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">
                        Date de création
                      </span>
                      <span className="font-medium">
                        {formatDate(event.date_creation)}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">
                        Dernière modification
                      </span>
                      <span className="font-medium">
                        {formatDate(event.date_modification)}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">Visibilité</span>
                      <Badge variant="outline">{event.visibilite}</Badge>
                    </div>
                  </CardContent>
                </Card>

                {/* Actions rapides */}
                <Card className="shadow-lg border-0">
                  <CardHeader>
                    <CardTitle className="text-lg">Actions</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <Button
                      variant="outline"
                      onClick={() => router.push(`/events/${params.id}/edit`)}
                      className="w-full justify-start"
                    >
                      Modifier l'événement
                    </Button>
                    <Button
                      variant="outline"
                      onClick={handleShare}
                      className="w-full justify-start"
                    >
                      Partager l'événement
                    </Button>
                    <Button
                      variant="outline"
                      onClick={toggleFavorite}
                      className="w-full justify-start"
                    >
                      {isFavorite
                        ? "Retirer des favoris"
                        : "Ajouter aux favoris"}
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
