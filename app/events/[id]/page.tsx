"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  ArrowLeft,
  Calendar,
  Clock,
  MapPin,
  Users,
  User,
  Euro,
  Share2,
  Heart,
  Loader2,
} from "lucide-react";
import { toast } from "sonner";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { useAuthCheck } from "@/hooks/useAuth";

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
}

export default function EventDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { isAuthenticated } = useAuthCheck();
  const [event, setEvent] = useState<EventDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [isRegistered, setIsRegistered] = useState(false);
  const [registrationLoading, setRegistrationLoading] = useState(false);
  const [participantsCount, setParticipantsCount] = useState(0);

  useEffect(() => {
    if (params.id) {
      fetchEventDetails();
    }
  }, [params.id]);

  const fetchEventDetails = async () => {
    try {
      setLoading(true);
      const response = await fetch(`http://localhost:3000/api/evenements/${params.id}`);
      
      if (!response.ok) {
        throw new Error("Événement non trouvé");
      }
      
      const data = await response.json();
      setEvent(data);
      
      // TODO: Récupérer le nombre de participants et vérifier l'inscription
      // setParticipantsCount(data.participants_count || 0);
      // setIsRegistered(data.is_registered || false);
      
    } catch (error) {
      console.error("Erreur:", error);
      toast.error("Impossible de charger l'événement");
    } finally {
      setLoading(false);
    }
  };

  const handleRegistration = async () => {
    if (!isAuthenticated) {
      toast.error("Vous devez être connecté pour vous inscrire");
      router.push("/connect");
      return;
    }

    setRegistrationLoading(true);
    try {
      // TODO: Implémenter l'inscription/désinscription
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulation
      
      if (isRegistered) {
        setIsRegistered(false);
        setParticipantsCount(prev => prev - 1);
        toast.success("Désinscription réussie");
      } else {
        setIsRegistered(true);
        setParticipantsCount(prev => prev + 1);
        toast.success("Inscription réussie !");
      }
    } catch (error) {
      toast.error("Erreur lors de l'inscription");
    } finally {
      setRegistrationLoading(false);
    }
  };

  const handleShare = async () => {
    const url = `${window.location.origin}/events/${params.id}`;
    
    if (navigator.share) {
      try {
        await navigator.share({
          title: event?.nom,
          text: event?.description,
          url: url,
        });
      } catch (error) {
        console.log("Erreur lors du partage:", error);
      }
    } else {
      await navigator.clipboard.writeText(url);
      toast.success("Lien copié dans le presse-papiers !");
    }
  };

  const formatDate = (dateString: string) => {
    return format(new Date(dateString), "EEEE dd MMMM yyyy", { locale: fr });
  };

  const formatTime = (dateString: string) => {
    return format(new Date(dateString), "HH:mm", { locale: fr });
  };

  const isEventFull = event?.nombre_max_participants && participantsCount >= event.nombre_max_participants;
  const eventImage = "https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=1740&auto=format&fit=crop";

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-1/4 mb-6"></div>
            <div className="h-64 md:h-96 bg-gray-200 rounded-xl mb-8"></div>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="md:col-span-2 space-y-4">
                <div className="h-8 bg-gray-200 rounded w-3/4"></div>
                <div className="h-4 bg-gray-200 rounded"></div>
                <div className="h-4 bg-gray-200 rounded w-5/6"></div>
              </div>
              <div className="h-64 bg-gray-200 rounded-xl"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!event) {
    return (
      <div className="min-h-screen bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center py-12">
            <h1 className="text-2xl font-bold mb-4">Événement introuvable</h1>
            <p className="text-muted-foreground mb-8">
              L'événement que vous recherchez n'existe pas ou n'est plus disponible.
            </p>
            <Button asChild>
              <Link href="/events">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Retour aux événements
              </Link>
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <div className="mb-6">
          <Button variant="ghost" asChild>
            <Link href="/events">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Retour aux événements
            </Link>
          </Button>
        </div>

        {/* Hero Image */}
        <div className="relative h-64 md:h-96 rounded-xl overflow-hidden mb-8">
          <img
            src={eventImage}
            alt={event.nom}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/20" />
          <div className="absolute top-4 left-4">
            <Badge className="bg-white/90 text-gray-800 text-sm font-medium">
              {event.categorie}
            </Badge>
          </div>
          <div className="absolute top-4 right-4 flex gap-2">
            <Button
              variant="ghost"
              size="icon"
              className="bg-white/80 hover:bg-white text-gray-700"
              onClick={handleShare}
            >
              <Share2 className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="bg-white/80 hover:bg-white text-gray-700"
            >
              <Heart className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Content Grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="md:col-span-2">
            <h1 className="text-3xl font-bold tracking-tight text-foreground mb-4">
              {event.nom}
            </h1>

            {event.description && (
              <div className="prose prose-gray max-w-none mb-8">
                <p className="text-lg text-muted-foreground leading-relaxed">
                  {event.description}
                </p>
              </div>
            )}

            {/* Event Details */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Calendar className="mr-2 h-5 w-5" />
                  Détails de l'événement
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex items-center text-sm">
                    <Calendar className="h-4 w-4 mr-3 text-primary" />
                    <div>
                      <p className="font-medium">Date</p>
                      <p className="text-muted-foreground">
                        {formatDate(event.date_et_heure)}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-center text-sm">
                    <Clock className="h-4 w-4 mr-3 text-primary" />
                    <div>
                      <p className="font-medium">Heure</p>
                      <p className="text-muted-foreground">
                        {formatTime(event.date_et_heure)}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-center text-sm">
                    <MapPin className="h-4 w-4 mr-3 text-primary" />
                    <div>
                      <p className="font-medium">Lieu</p>
                      <p className="text-muted-foreground">{event.lieu}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center text-sm">
                    <Users className="h-4 w-4 mr-3 text-primary" />
                    <div>
                      <p className="font-medium">Participants</p>
                      <p className="text-muted-foreground">
                        {participantsCount} participant(s) inscrit(s)
                        {event.nombre_max_participants && ` / ${event.nombre_max_participants}`}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-center text-sm">
                    <Euro className="h-4 w-4 mr-3 text-primary" />
                    <div>
                      <p className="font-medium">Prix</p>
                      <p className="text-muted-foreground">
                        {event.prix > 0 ? `${event.prix}€` : "Gratuit"}
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div>
            {/* Registration Card */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <User className="mr-2 h-5 w-5" />
                  {isRegistered ? "Vous êtes inscrit" : "S'inscrire à l'événement"}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-sm text-muted-foreground">
                  {isEventFull ? (
                    <p className="text-red-500 font-medium">
                      Événement complet ({event.nombre_max_participants} places)
                    </p>
                  ) : (
                    <p>
                      {participantsCount} participant(s) inscrit(s)
                      {event.nombre_max_participants && ` sur ${event.nombre_max_participants} places`}
                    </p>
                  )}
                </div>

                <Button
                  className="w-full"
                  onClick={handleRegistration}
                  disabled={(!isRegistered && isEventFull) || registrationLoading}
                  variant={isRegistered ? "outline" : "default"}
                >
                  {registrationLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Chargement...
                    </>
                  ) : isRegistered ? (
                    "Se désinscrire"
                  ) : isEventFull ? (
                    "Complet"
                  ) : (
                    "S'inscrire"
                  )}
                </Button>

                <p className="text-xs text-muted-foreground text-center">
                  {event.prix > 0 ? `Participation : ${event.prix}€` : "Inscription gratuite"}
                </p>
              </CardContent>
            </Card>

            {/* Event Info Card */}
            <Card className="mt-6">
              <CardHeader>
                <CardTitle>Informations</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Catégorie:</span>
                  <span className="font-medium">{event.categorie}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Statut:</span>
                  <Badge variant={event.statut === 'actif' ? 'default' : 'secondary'}>
                    {event.statut}
                  </Badge>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Date de création:</span>
                  <span className="font-medium">
                    {format(new Date(event.date_creation), "dd/MM/yyyy", { locale: fr })}
                  </span>
                </div>
                {event.nombre_max_participants && (
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Places disponibles:</span>
                    <span className="font-medium">
                      {Math.max(0, event.nombre_max_participants - participantsCount)} / {event.nombre_max_participants}
                    </span>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
} 