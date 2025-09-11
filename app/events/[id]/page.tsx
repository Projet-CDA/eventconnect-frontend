"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { addFavorite, removeFavorite, getFavorites } from "@/api/favorites";
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
  image_url?: string; 
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
  const [showConfetti, setShowConfetti] = useState(false);
  const [counterAnimation, setCounterAnimation] = useState("");
  const [buttonAnimation, setButtonAnimation] = useState("");
  const [isSyncing, setIsSyncing] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);

  // Animation pour le compteur de participants
  const animateCounter = (increase: boolean) => {
    if (increase) {
      setCounterAnimation("animate-counter-update animate-celebration");
    } else {
      setCounterAnimation("animate-pulse");
    }
    setTimeout(() => setCounterAnimation(""), 1500);
  };

  // Animation pour le bouton d'inscription
  const animateButton = (type: "success" | "error") => {
    if (type === "success") {
      setButtonAnimation("animate-registration-success animate-glow");
    } else {
      setButtonAnimation("animate-shake");
    }
    setTimeout(() => setButtonAnimation(""), 2000);
  };

  // Effet confetti pour les inscriptions
  const triggerConfetti = () => {
    setShowConfetti(true);
    setTimeout(() => setShowConfetti(false), 3000);
  };

  // Son de notification (Web Audio API)
  const playNotificationSound = (type: "success" | "error") => {
    try {
      const audioContext = new (window.AudioContext ||
        (window as any).webkitAudioContext)();
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();

      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);

      if (type === "success") {
        // Son de succès (do-mi-sol)
        oscillator.frequency.setValueAtTime(523.25, audioContext.currentTime);
        oscillator.frequency.setValueAtTime(
          659.25,
          audioContext.currentTime + 0.1
        );
        oscillator.frequency.setValueAtTime(
          783.99,
          audioContext.currentTime + 0.2
        );
      } else {
        // Son d'erreur (fréquence descendante)
        oscillator.frequency.setValueAtTime(400, audioContext.currentTime);
        oscillator.frequency.exponentialRampToValueAtTime(
          200,
          audioContext.currentTime + 0.3
        );
      }

      gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(
        0.01,
        audioContext.currentTime + 0.3
      );

      oscillator.start(audioContext.currentTime);
      oscillator.stop(audioContext.currentTime + 0.3);
    } catch (error) {
      // Silently fail if audio context is not supported
      console.log("Audio not supported");
    }
  };

  useEffect(() => {
    if (params.id) {
      fetchEventDetails();
      if (isAuthenticated) {
        checkUserRegistration();
      }
    }
  }, [params.id, isAuthenticated]);

  const fetchEventDetails = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        `https://eventconnectes-backend.pphilibert-web.eu/api/evenements/${params.id}`
      );

      if (!response.ok) {
        throw new Error("Événement non trouvé");
      }

      const data = await response.json();
      setEvent(data);

      // TODO: Récupérer le nombre de participants depuis l'API inscriptions
      // Compter les inscriptions pour cet événement
      await getParticipantsCount();
    } catch (error) {
      console.error("Erreur:", error);
      toast.error("Impossible de charger l'événement");
    } finally {
      setLoading(false);
    }
  };

   // Charger si l’événement est déjà en favori
  useEffect(() => {
    if (isAuthenticated && params.id) {
      getFavorites().then((favs) => {
        const found = favs.some(
          (f: any) => f.evenement_id?.toString() === params.id.toString()
        );
        setIsFavorite(found);
      });
    }
  }, [isAuthenticated, params.id]);

  const toggleFavorite = async () => {
    if (!isAuthenticated) {
      toast.error("Vous devez être connecté pour ajouter aux favoris");
      return;
    }

    try {
      if (isFavorite) {
        // retirer
        const favs = await getFavorites();
        const currentFav = favs.find(
          (f: any) => f.evenement_id?.toString() === params.id.toString()
        );
        if (currentFav) {
          await removeFavorite(currentFav.id);
          setIsFavorite(false);
          toast.success("Retiré des favoris");
        }
      } else {
        // ajouter
        await addFavorite(params.id as string);
        setIsFavorite(true);
        toast.success("Ajouté aux favoris");
      }
    } catch (e) {
      toast.error("Erreur lors de la mise à jour du favori");
    }
  };

  const checkUserRegistration = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;

      const response = await fetch(
        "https://eventconnectes-backend.pphilibert-web.eu/api/inscriptions",
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.ok) {
        const inscriptions = await response.json();
        const isAlreadyRegistered = inscriptions.some(
          (inscription: any) =>
            inscription.evenement_id === parseInt(params.id as string)
        );
        setIsRegistered(isAlreadyRegistered);
      }
    } catch (error) {
      console.error("Erreur vérification inscription:", error);
    }
  };

  const getParticipantsCount = async (showSyncIndicator = true) => {
    try {
      if (showSyncIndicator) {
        setIsSyncing(true);
      }

      const response = await fetch(
        `https://eventconnectes-backend.pphilibert-web.eu/api/inscriptions/count/${params.id}`
      );
      if (response.ok) {
        const data = await response.json();
        const actualCount = data.count;

        // Mettre à jour avec le vrai compteur de la BDD
        setParticipantsCount(actualCount);

        // Log pour debug si il y a un écart avec la mise à jour optimiste
        console.log(`✅ Participants synchronized: ${actualCount}`);
      } else {
        setParticipantsCount(0);
      }
    } catch (error) {
      console.error("Erreur comptage participants:", error);
      // En cas d'erreur, on garde le compteur optimiste plutôt que de le remettre à 0
      console.log("⚠️ Keeping optimistic count due to network error");
    } finally {
      if (showSyncIndicator) {
        setTimeout(() => setIsSyncing(false), 500); // Délai pour voir l'indicateur
      }
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
      const token = localStorage.getItem("token");
      if (!token) {
        toast.error("Token non trouvé, veuillez vous reconnecter");
        router.push("/connect");
        return;
      }

      if (isRegistered) {
        // Désinscription : trouver l'inscription et la supprimer
        const inscriptionsResponse = await fetch(
          "https://eventconnectes-backend.pphilibert-web.eu/api/inscriptions",
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );

        if (inscriptionsResponse.ok) {
          const inscriptions = await inscriptionsResponse.json();
          const currentInscription = inscriptions.find(
            (inscription: any) =>
              inscription.evenement_id === parseInt(params.id as string)
          );

          if (currentInscription) {
            const deleteResponse = await fetch(
              `https://eventconnectes-backend.pphilibert-web.eu/api/inscriptions/${currentInscription.id}`,
              {
                method: "DELETE",
                headers: {
                  Authorization: `Bearer ${token}`,
                  "Content-Type": "application/json",
                },
              }
            );

            if (deleteResponse.ok) {
              // Mise à jour immédiate des états
              setIsRegistered(false);

              // Mise à jour optimiste du compteur (instantanée)
              setParticipantsCount((prev) => Math.max(0, prev - 1));

              // Rafraîchir les données en parallèle (pour synchroniser avec la BDD)
              getParticipantsCount(false); // Sans await et sans indicateur visible

              // Animations de désinscription
              animateCounter(false);
              animateButton("success");
              playNotificationSound("success");

              toast.success("👋 Désinscription réussie !", {
                description: "Vous ne participez plus à cet événement",
                duration: 3000,
              });
            } else {
              throw new Error("Erreur lors de la désinscription");
            }
          }
        }
      } else {
        // Vérification des places disponibles avant inscription
        if (
          event?.nombre_max_participants &&
          participantsCount >= event.nombre_max_participants
        ) {
          throw new Error("Événement complet ! Plus de places disponibles.");
        }

        // Inscription : créer une nouvelle inscription
        const response = await fetch(
          "https://eventconnectes-backend.pphilibert-web.eu/api/inscriptions",
          {
            method: "POST",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              evenement_id: parseInt(params.id as string),
              statut: "confirmee",
              message: null,
            }),
          }
        );

        if (response.ok) {
          const data = await response.json();

          // Vérifier si un paiement est requis
          if (data.paiement) {
            // Événement payant - paiement requis
            toast.warning(`💳 Paiement requis : ${data.paiement.montant}€`, {
              description: "Votre inscription est en attente du paiement",
              duration: 5000,
            });

            // TODO: Implémenter l'interface de paiement (Stripe, PayPal, etc.)
            // Pour l'instant, on simule un paiement réussi après 1 seconde (réduit de 3s à 1s)
            setTimeout(async () => {
              try {
                // Mise à jour immédiate des états
                setIsRegistered(true);

                // Mise à jour optimiste du compteur (instantanée)
                setParticipantsCount((prev) => prev + 1);

                // Rafraîchir les données en arrière-plan (pour synchroniser avec la BDD)
                getParticipantsCount(false); // Sans await et sans indicateur visible

                // Animations de succès pour paiement
                triggerConfetti();
                animateCounter(true);
                animateButton("success");
                playNotificationSound("success");

                toast.success(
                  "✅ Paiement accepté ! Inscription confirmée 🎉",
                  {
                    description: "Votre place est maintenant réservée",
                    duration: 4000,
                  }
                );

                // Arrêter le loading après les animations
                setRegistrationLoading(false);
              } catch (error) {
                console.error("Erreur post-paiement:", error);
                setRegistrationLoading(false);
              }
            }, 1000); // Réduit à 1 seconde

            // Ne pas exécuter setRegistrationLoading(false) dans finally pour les paiements
            return;
          } else {
            // Événement gratuit - inscription immédiate
            setIsRegistered(true);

            // Mise à jour optimiste du compteur (instantanée)
            setParticipantsCount((prev) => prev + 1);

            // Rafraîchir les données en arrière-plan (pour synchroniser avec la BDD)
            getParticipantsCount(false); // Sans await et sans indicateur visible

            // Animations de célébration pour événement gratuit
            triggerConfetti();
            animateCounter(true);
            animateButton("success");
            playNotificationSound("success");

            toast.success("🎉 Inscription gratuite réussie !", {
              description: "Votre place est confirmée ! À bientôt 😊",
              duration: 4000,
            });
          }
        } else {
          const errorData = await response.json();
          throw new Error(errorData.message || "Erreur lors de l'inscription");
        }
      }
    } catch (error: any) {
      console.error("Erreur inscription:", error);
      animateButton("error");
      playNotificationSound("error");
      toast.error(error.message || "Erreur lors de l'inscription");
    } finally {
      // Seulement pour les événements gratuits et les erreurs
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

  const isEventFull =
    event?.nombre_max_participants &&
    participantsCount >= event.nombre_max_participants;
  const eventImage = event?.image_url ||
    "https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=1740&auto=format&fit=crop";

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
              L'événement que vous recherchez n'existe pas ou n'est plus
              disponible.
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
    <div className="min-h-screen bg-background relative">
      {/* Effet confetti */}
      {showConfetti && (
        <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
          {[...Array(50)].map((_, i) => (
            <div
              key={i}
              className={`absolute w-3 h-3 animate-confetti`}
              style={{
                left: `${Math.random() * 100}%`,
                top: `-20px`,
                backgroundColor: [
                  "#ff6b6b",
                  "#4ecdc4",
                  "#45b7d1",
                  "#96ceb4",
                  "#ffeaa7",
                  "#dda0dd",
                  "#ff8a80",
                  "#81c784",
                ][Math.floor(Math.random() * 8)],
                animationDelay: `${Math.random() * 1}s`,
                borderRadius: Math.random() > 0.5 ? "50%" : "0%",
              }}
            />
          ))}

          {/* Étoiles scintillantes */}
          {[...Array(20)].map((_, i) => (
            <div
              key={`star-${i}`}
              className="absolute text-yellow-400 animate-pulse"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                fontSize: `${Math.random() * 20 + 10}px`,
                animationDelay: `${Math.random() * 2}s`,
              }}
            >
              ⭐
            </div>
          ))}
        </div>
      )}

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
              onClick={toggleFavorite}
            >
              <Heart
                className={`h-4 w-4 ${
                  isFavorite ? "fill-red-500 text-red-500" : "text-gray-700"
                }`}
              />
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
                      <p
                        className={`text-muted-foreground transition-all duration-300 ${counterAnimation}`}
                      >
                        <span className="font-semibold text-primary">
                          {participantsCount}
                        </span>{" "}
                        participant(s) inscrit(s)
                        {event.nombre_max_participants &&
                          ` / ${event.nombre_max_participants}`}
                        {isSyncing && (
                          <span className="ml-2 text-xs animate-pulse">🔄</span>
                        )}
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
                  {isRegistered
                    ? "Vous êtes inscrit"
                    : "S'inscrire à l'événement"}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Prix en évidence */}
                <div className="text-center p-4 bg-muted/50 rounded-lg border">
                  {event.prix > 0 ? (
                    <div>
                      <p className="text-2xl font-bold text-foreground">
                        {event.prix}€
                      </p>
                      <p className="text-sm text-muted-foreground">
                        par participant
                      </p>
                    </div>
                  ) : (
                    <div>
                      <p className="text-2xl font-bold text-green-600">
                        GRATUIT
                      </p>
                      <p className="text-sm text-muted-foreground">
                        inscription libre
                      </p>
                    </div>
                  )}
                </div>

                <div className="text-sm text-muted-foreground">
                  {isEventFull ? (
                    <p className="text-red-500 font-medium animate-pulse">
                      🚫 Événement complet ({event.nombre_max_participants}{" "}
                      places)
                    </p>
                  ) : (
                    <p
                      className={`transition-all duration-300 ${counterAnimation}`}
                    >
                      <span className="font-semibold text-primary">
                        {participantsCount}
                      </span>{" "}
                      participant(s) inscrit(s)
                      {event.nombre_max_participants &&
                        ` sur ${event.nombre_max_participants} places`}
                      {isSyncing && (
                        <span className="ml-2 text-xs animate-pulse">🔄</span>
                      )}
                    </p>
                  )}
                </div>

                <Button
                  className={`w-full transition-all duration-300 ${buttonAnimation} ${
                    isRegistered
                      ? "bg-green-600 hover:bg-green-700 border-green-600"
                      : ""
                  }`}
                  onClick={handleRegistration}
                  disabled={
                    (!isRegistered && isEventFull) || registrationLoading
                  }
                  variant={isRegistered ? "outline" : "default"}
                >
                  {registrationLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Chargement...
                    </>
                  ) : isRegistered ? (
                    <>
                      <span className="mr-2">✅</span>
                      Se désinscrire
                    </>
                  ) : isEventFull ? (
                    <>
                      <span className="mr-2">🚫</span>
                      Complet
                    </>
                  ) : (
                    <>
                      <span className="mr-2">🎯</span>
                      S'inscrire
                    </>
                  )}
                </Button>

                {event.prix > 0 && (
                  <p className="text-xs text-muted-foreground text-center">
                    💳 Paiement sécurisé requis
                  </p>
                )}
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
                  <Badge
                    variant={event.statut === "actif" ? "default" : "secondary"}
                  >
                    {event.statut}
                  </Badge>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">
                    Date de création:
                  </span>
                  <span className="font-medium">
                    {format(new Date(event.date_creation), "dd/MM/yyyy", {
                      locale: fr,
                    })}
                  </span>
                </div>
                {event.nombre_max_participants && (
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">
                      Places disponibles:
                    </span>
                    <span className="font-medium">
                      {Math.max(
                        0,
                        event.nombre_max_participants - participantsCount
                      )}{" "}
                      / {event.nombre_max_participants}
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
