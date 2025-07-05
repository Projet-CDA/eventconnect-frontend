"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { useAuthCheck } from "@/hooks/useAuth";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import CreateEventModal from "@/components/CreateEventModal";
import EventForm from "@/components/EventForm";
import {
  Calendar,
  Clock,
  MapPin,
  Users,
  Search,
  Filter,
  Star,
  Heart,
  Share2,
  Grid,
  List,
  Plus,
  SlidersHorizontal,
  X,
  ArrowRight,
  MapIcon,
  CalendarDays,
  User,
  ArrowLeft,
  Euro,
  Loader2,
} from "lucide-react";
import { toast } from "sonner";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Textarea } from "@/components/ui/textarea";
import { FILTER_CATEGORIES, EVENT_CATEGORIES } from "@/lib/constants";
import { Event } from "@/lib/types";
import {
  getAllEvents,
  getEventById,
  updateEvent,
} from "@/lib/services/eventService";

// Types pour les différentes vues
type ViewMode = "list" | "detail" | "create" | "edit";

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

export default function EventsPage() {
  const params = useParams();
  const router = useRouter();
  const searchParams = useSearchParams();
  const { isAuthenticated, isLoading: authLoading } = useAuthCheck();

  // États pour la vue liste
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredEvents, setFilteredEvents] = useState<Event[]>([]);
  const [userParticipations, setUserParticipations] = useState<string[]>([]);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sortBy, setSortBy] = useState("date");
  const [showFilters, setShowFilters] = useState(false);
  const [favoriteEvents, setFavoriteEvents] = useState<string[]>([]);

  // États pour la vue détail
  const [event, setEvent] = useState<EventDetails | null>(null);
  const [isRegistered, setIsRegistered] = useState(false);
  const [registrationLoading, setRegistrationLoading] = useState(false);
  const [participantsCount, setParticipantsCount] = useState(0);
  const [showConfetti, setShowConfetti] = useState(false);
  const [counterAnimation, setCounterAnimation] = useState("");
  const [buttonAnimation, setButtonAnimation] = useState("");
  const [isSyncing, setIsSyncing] = useState(false);

  // États pour la vue édition
  const [formData, setFormData] = useState({
    nom: "",
    description: "",
    categorie: "",
    lieu: "",
    date: "",
    heure: "",
    nombre_max_participants: 0,
    prix: 0,
    image_url: "",
  });
  const [errors, setErrors] = useState<any>({});

  // Déterminer la vue actuelle
  const getCurrentView = (): ViewMode => {
    if (params.id && searchParams.get("action") === "edit") return "edit";
    if (params.id) return "detail";
    if (searchParams.get("action") === "create") return "create";
    return "list";
  };

  const currentView = getCurrentView();

  useEffect(() => {
    switch (currentView) {
      case "list":
        fetchEvents();
        break;
      case "detail":
        if (params.id) {
          fetchEventDetails();
          if (isAuthenticated) {
            checkUserRegistration();
          }
        }
        break;
      case "edit":
        if (params.id) {
          fetchEventForEdit();
        }
        break;
    }
  }, [currentView, params.id, isAuthenticated]);

  // ===== FONCTIONS POUR LA VUE LISTE =====
  const mapBackendEvent = (e: any): Event => ({
    id: e.id?.toString() ?? "",
    title: e.nom ?? "",
    description: e.description ?? "",
    start_date: e.date_et_heure ?? "",
    end_date: e.date_et_heure ?? "",
    location: e.lieu ?? "",
    max_participants: e.nombre_max_participants ?? null,
    image_url: e.image_url ?? null,
    status: e.statut ?? "",
    created_at: e.date_creation ?? "",
    category: e.categorie ?? "",
    price: e.prix !== undefined ? `${e.prix}€` : "Gratuit",
    user_profiles: {
      first_name: "",
      last_name: "",
      avatar_url: null,
    },
    event_participants: [],
  });

  const fetchEvents = async () => {
    try {
      setLoading(true);
      const data = await getAllEvents();
      if (Array.isArray(data)) {
        setEvents(data.map(mapBackendEvent));
      } else {
        setEvents([]);
      }
      setLoading(false);
    } catch (error) {
      console.error("Erreur:", error);
      toast.error("Une erreur est survenue");
      setLoading(false);
    }
  };

  useEffect(() => {
    let filtered = events;

    if (searchTerm) {
      filtered = filtered.filter(
        (event) =>
          event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          event.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
          event.location.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (selectedCategory !== "all") {
      filtered = filtered.filter(
        (event) =>
          event.category.toLowerCase() === selectedCategory.toLowerCase()
      );
    }

    switch (sortBy) {
      case "date":
        filtered.sort(
          (a, b) =>
            new Date(a.start_date).getTime() - new Date(b.start_date).getTime()
        );
        break;
      case "title":
        filtered.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case "location":
        filtered.sort((a, b) => a.location.localeCompare(b.location));
        break;
      case "participants":
        filtered.sort(
          (a, b) => (b.max_participants || 0) - (a.max_participants || 0)
        );
        break;
    }

    setFilteredEvents(filtered);
  }, [searchTerm, events, selectedCategory, sortBy]);

  const joinEvent = async (eventId: string) => {
    try {
      if (userParticipations.includes(eventId)) {
        toast.error("Vous participez déjà à cet événement");
        return;
      }

      setUserParticipations((prev) => [...prev, eventId]);
      toast.success("Inscription réussie !");

      setEvents((prevEvents) =>
        prevEvents.map((event) =>
          event.id === eventId
            ? {
                ...event,
                event_participants: [
                  ...event.event_participants,
                  { user_id: "mock-user-id" },
                ],
              }
            : event
        )
      );
    } catch (error) {
      console.error("Erreur:", error);
      toast.error("Une erreur est survenue");
    }
  };

  const toggleFavorite = (eventId: string) => {
    setFavoriteEvents((prev) =>
      prev.includes(eventId)
        ? prev.filter((id) => id !== eventId)
        : [...prev, eventId]
    );
    toast.success(
      favoriteEvents.includes(eventId)
        ? "Retiré des favoris"
        : "Ajouté aux favoris"
    );
  };

  const shareEvent = async (event: Event) => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: event.title,
          text: event.description,
          url: `${window.location.origin}/events/${event.id}`,
        });
      } catch (error) {
        console.error("Erreur partage:", error);
      }
    } else {
      // Fallback: copier le lien
      navigator.clipboard.writeText(
        `${window.location.origin}/events/${event.id}`
      );
      toast.success("Lien copié dans le presse-papiers");
    }
  };

  const isUserParticipating = (event: Event) => {
    return userParticipations.includes(event.id);
  };

  const getParticipantCount = (event: Event) => {
    return event.event_participants.length;
  };

  const formatDate = (dateString: string) => {
    return format(new Date(dateString), "dd MMM yyyy", { locale: fr });
  };

  const formatTime = (dateString: string) => {
    return format(new Date(dateString), "HH:mm", { locale: fr });
  };

  // ===== FONCTIONS POUR LA VUE DÉTAIL =====
  const fetchEventDetails = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        `http://localhost:3000/api/evenements/${params.id}`
      );

      if (!response.ok) {
        throw new Error("Événement non trouvé");
      }

      const data = await response.json();
      setEvent(data);
      await getParticipantsCount();
    } catch (error) {
      console.error("Erreur:", error);
      toast.error("Impossible de charger l'événement");
    } finally {
      setLoading(false);
    }
  };

  const checkUserRegistration = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;

      const response = await fetch("http://localhost:3000/api/inscriptions", {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

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
        `http://localhost:3000/api/inscriptions/count/${params.id}`
      );
      if (response.ok) {
        const data = await response.json();
        const actualCount = data.count;
        setParticipantsCount(actualCount);
        console.log(`✅ Participants synchronized: ${actualCount}`);
      } else {
        setParticipantsCount(0);
      }
    } catch (error) {
      console.error("Erreur comptage participants:", error);
      console.log("⚠️ Keeping optimistic count due to network error");
    } finally {
      if (showSyncIndicator) {
        setTimeout(() => setIsSyncing(false), 500);
      }
    }
  };

  const handleRegistration = async () => {
    if (!isAuthenticated) {
      toast.error("Vous devez être connecté pour vous inscrire");
      return;
    }

    if (isRegistered) {
      toast.error("Vous êtes déjà inscrit à cet événement");
      return;
    }

    setRegistrationLoading(true);
    try {
      const token = localStorage.getItem("token");
      const response = await fetch("http://localhost:3000/api/inscriptions", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          evenement_id: parseInt(params.id as string),
        }),
      });

      if (response.ok) {
        setIsRegistered(true);
        setParticipantsCount((prev) => prev + 1);
        toast.success("Inscription réussie !");
        triggerConfetti();
        playNotificationSound("success");
        animateCounter(true);
        animateButton("success");

        // Synchroniser avec le serveur après un délai
        setTimeout(() => getParticipantsCount(false), 1000);
      } else {
        const errorData = await response.json();
        toast.error(errorData.message || "Erreur lors de l'inscription");
        animateButton("error");
        playNotificationSound("error");
      }
    } catch (error) {
      console.error("Erreur inscription:", error);
      toast.error("Erreur lors de l'inscription");
      animateButton("error");
      playNotificationSound("error");
    } finally {
      setRegistrationLoading(false);
    }
  };

  const triggerConfetti = () => {
    setShowConfetti(true);
    setTimeout(() => setShowConfetti(false), 3000);
  };

  const playNotificationSound = (type: "success" | "error") => {
    try {
      const audioContext = new (window.AudioContext ||
        (window as any).webkitAudioContext)();
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();

      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);

      if (type === "success") {
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
      console.log("Audio not supported");
    }
  };

  const animateCounter = (increase: boolean) => {
    if (increase) {
      setCounterAnimation("animate-counter-update animate-celebration");
    } else {
      setCounterAnimation("animate-pulse");
    }
    setTimeout(() => setCounterAnimation(""), 1500);
  };

  const animateButton = (type: "success" | "error") => {
    if (type === "success") {
      setButtonAnimation("animate-registration-success animate-glow");
    } else {
      setButtonAnimation("animate-shake");
    }
    setTimeout(() => setButtonAnimation(""), 2000);
  };

  const handleShare = async () => {
    if (navigator.share && event) {
      try {
        await navigator.share({
          title: event.nom,
          text: event.description,
          url: window.location.href,
        });
      } catch (error) {
        console.error("Erreur partage:", error);
      }
    } else {
      navigator.clipboard.writeText(window.location.href);
      toast.success("Lien copié dans le presse-papiers");
    }
  };

  // ===== FONCTIONS POUR LA VUE ÉDITION =====
  const fetchEventForEdit = async () => {
    try {
      setLoading(true);
      const event = await getEventById(params.id as string);
      let date = "";
      let heure = "";
      if (event.date_et_heure) {
        date = event.date_et_heure.substring(0, 10);
        heure = event.date_et_heure.substring(11, 16);
      } else {
        date = event.date_et_heure ? event.date_et_heure.substring(0, 10) : "";
        heure = event.date_et_heure ? event.date_et_heure.substring(11, 16) : "";
      }
      setFormData({
        nom: event.nom || "",
        description: event.description || "",
        categorie: event.categorie || "",
        lieu: event.lieu || "",
        date,
        heure,
        nombre_max_participants: event.nombre_max_participants || 0,
        prix: event.prix || 0,
        image_url: event.image_url || "",
      });
    } catch (err) {
      toast.error("Erreur lors du chargement de l'événement");
      router.push("/events");
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (field: string, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleEditSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const eventData = {
        ...formData,
        date_et_heure: `${formData.date}T${formData.heure}:00Z`,
        image_url: formData.image_url || null,
      };
      await updateEvent(params.id as string, eventData);
      toast.success("Événement modifié avec succès !");
      router.push(`/events/${params.id}`);
    } catch (err) {
      toast.error("Erreur lors de la modification de l'événement");
    } finally {
      setLoading(false);
    }
  };

  // ===== FONCTIONS POUR LA VUE CRÉATION =====
  const handleCreateSuccess = () => {
    router.push("/events");
  };

  const handleCreateCancel = () => {
    router.push("/events");
  };

  // ===== RENDU CONDITIONNEL =====
  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Chargement...</p>
        </div>
      </div>
    );
  }

  // VUE CRÉATION
  if (currentView === "create") {
    if (!isAuthenticated) {
      router.push("/registration");
      return null;
    }

    return (
      <div className="min-h-screen bg-background">
        <div className="bg-gradient-to-r from-primary/10 via-primary/5 to-primary/10 border-b border-border/50">
          <div className="px-4 sm:px-6 lg:px-8 py-6">
            <div className="max-w-4xl mx-auto">
              <div className="flex items-center gap-4 mb-6">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => router.back()}
                  className="flex items-center gap-2"
                >
                  <ArrowLeft className="h-4 w-4" />
                  Retour
                </Button>
              </div>
              <div className="text-center">
                <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
                  Créer un nouvel événement
                </h1>
                <p className="text-muted-foreground">
                  Partagez votre événement avec la communauté
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="px-4 sm:px-6 lg:px-8 py-8">
          <div className="max-w-4xl mx-auto">
            <Card className="shadow-lg border-0">
              <CardHeader>
                <CardTitle className="text-xl">
                  Informations de l&apos;événement
                </CardTitle>
              </CardHeader>
              <CardContent>
                <EventForm
                  onSuccess={handleCreateSuccess}
                  onCancel={handleCreateCancel}
                  submitButtonText="Créer l'événement"
                  cancelButtonText="Annuler"
                  showCancelButton={true}
                />
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    );
  }

  // VUE ÉDITION
  if (currentView === "edit") {
    if (loading) {
      return <div className="p-8 text-center">Chargement...</div>;
    }

    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-100 via-blue-100 to-white">
        <Card className="w-full max-w-2xl bg-white/90 shadow-2xl">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-indigo-700 mb-2">
              Modifier votre événement
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleEditSubmit} className="space-y-6">
              <div>
                <label className="block font-semibold mb-1">Titre</label>
                <Input
                  value={formData.nom}
                  onChange={(e) => handleInputChange("nom", e.target.value)}
                  required
                />
              </div>
              <div>
                <label className="block font-semibold mb-1">Description</label>
                <Textarea
                  value={formData.description}
                  onChange={(e) =>
                    handleInputChange("description", e.target.value)
                  }
                  required
                />
              </div>
              <div>
                <label className="block font-semibold mb-1">Catégorie</label>
                <Select
                  value={formData.categorie}
                  onValueChange={(v) => handleInputChange("categorie", v)}
                  required
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Choisissez une catégorie" />
                  </SelectTrigger>
                  <SelectContent>
                    {EVENT_CATEGORIES.map((cat) => (
                      <SelectItem key={cat} value={cat}>
                        {cat}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="block font-semibold mb-1">Lieu</label>
                <Input
                  value={formData.lieu}
                  onChange={(e) => handleInputChange("lieu", e.target.value)}
                  required
                />
              </div>
              <div className="flex gap-4">
                <div className="flex-1">
                  <label className="block font-semibold mb-1">Date</label>
                  <Input
                    type="date"
                    value={formData.date}
                    onChange={(e) => handleInputChange("date", e.target.value)}
                    required
                  />
                </div>
                <div className="flex-1">
                  <label className="block font-semibold mb-1">Heure</label>
                  <Input
                    type="time"
                    value={formData.heure}
                    onChange={(e) => handleInputChange("heure", e.target.value)}
                    required
                  />
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex-1">
                  <label className="block font-semibold mb-1">
                    Capacité max
                  </label>
                  <Input
                    type="number"
                    value={formData.nombre_max_participants}
                    onChange={(e) =>
                      handleInputChange(
                        "nombre_max_participants",
                        Number(e.target.value)
                      )
                    }
                    min={1}
                    required
                  />
                </div>
                <div className="flex-1">
                  <label className="block font-semibold mb-1">Prix (€)</label>
                  <Input
                    type="number"
                    value={formData.prix}
                    onChange={(e) =>
                      handleInputChange("prix", Number(e.target.value))
                    }
                    min={0}
                    step={0.01}
                    required
                  />
                </div>
              </div>
              <div className="flex gap-4 pt-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => router.push(`/events/${params.id}`)}
                  className="flex-1"
                >
                  Annuler
                </Button>
                <Button type="submit" className="flex-1" disabled={loading}>
                  {loading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Modification...
                    </>
                  ) : (
                    "Modifier l'événement"
                  )}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    );
  }

  // VUE DÉTAIL
  if (currentView === "detail") {
    if (loading) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-background">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-muted-foreground">
              Chargement de l&apos;événement...
            </p>
          </div>
        </div>
      );
    }

    if (!event) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-background">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-foreground mb-4">
              Événement non trouvé
            </h1>
            <Button onClick={() => router.push("/events")}>
              Retour aux événements
            </Button>
          </div>
        </div>
      );
    }

    return (
      <div className="min-h-screen bg-background">
        {/* Header */}
        <div className="bg-gradient-to-r from-primary/10 via-primary/5 to-primary/10 border-b border-border/50">
          <div className="px-4 sm:px-6 lg:px-8 py-6">
            <div className="max-w-4xl mx-auto">
              <div className="flex items-center justify-between mb-6">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => router.back()}
                  className="flex items-center gap-2"
                >
                  <ArrowLeft className="h-4 w-4" />
                  Retour
                </Button>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleShare}
                    className="flex items-center gap-2"
                  >
                    <Share2 className="h-4 w-4" />
                    Partager
                  </Button>
                  {isAuthenticated && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() =>
                        router.push(`/events/${params.id}?action=edit`)
                      }
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

        {/* Contenu */}
        <div className="px-4 sm:px-6 lg:px-8 py-8">
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Informations principales */}
              <div className="lg:col-span-2">
                <Card className="shadow-lg border-0">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle className="text-3xl font-bold text-foreground mb-2">
                          {event.nom}
                        </CardTitle>
                        <div className="flex items-center gap-4 text-muted-foreground">
                          <Badge variant="secondary">{event.categorie}</Badge>
                          <span className="flex items-center gap-1">
                            <Calendar className="h-4 w-4" />
                            {format(
                              new Date(event.date_et_heure),
                              "dd MMMM yyyy",
                              { locale: fr }
                            )}
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock className="h-4 w-4" />
                            {format(new Date(event.date_et_heure), "HH:mm", {
                              locale: fr,
                            })}
                          </span>
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div>
                      <h3 className="font-semibold text-lg mb-2">
                        Description
                      </h3>
                      <p className="text-muted-foreground leading-relaxed">
                        {event.description}
                      </p>
                    </div>

                    <Separator />

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="flex items-center gap-3">
                        <MapPin className="h-5 w-5 text-primary" />
                        <div>
                          <p className="font-medium">Lieu</p>
                          <p className="text-muted-foreground">{event.lieu}</p>
                        </div>
                      </div>

                      <div className="flex items-center gap-3">
                        <Users className="h-5 w-5 text-primary" />
                        <div>
                          <p className="font-medium">Participants</p>
                          <div className="flex items-center gap-2">
                            <span
                              className={`text-lg font-bold ${counterAnimation}`}
                            >
                              {participantsCount}
                            </span>
                            {isSyncing && (
                              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary"></div>
                            )}
                            {event.nombre_max_participants && (
                              <span className="text-muted-foreground">
                                / {event.nombre_max_participants}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-3">
                        <Euro className="h-5 w-5 text-primary" />
                        <div>
                          <p className="font-medium">Prix</p>
                          <p className="text-muted-foreground">
                            {event.prix > 0 ? `${event.prix}€` : "Gratuit"}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-3">
                        <User className="h-5 w-5 text-primary" />
                        <div>
                          <p className="font-medium">Statut</p>
                          <Badge
                            variant={
                              event.statut === "actif" ? "default" : "secondary"
                            }
                          >
                            {event.statut}
                          </Badge>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Sidebar */}
              <div className="lg:col-span-1">
                <Card className="shadow-lg border-0 sticky top-8">
                  <CardHeader>
                    <CardTitle className="text-xl">Participer</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {isRegistered ? (
                      <div className="text-center p-4 bg-green-50 border border-green-200 rounded-lg">
                        <div className="text-green-600 font-semibold mb-2">
                          ✓ Vous êtes inscrit
                        </div>
                        <p className="text-sm text-green-600">
                          Vous recevrez une confirmation par email
                        </p>
                      </div>
                    ) : (
                      <Button
                        onClick={handleRegistration}
                        disabled={registrationLoading}
                        className={`w-full ${buttonAnimation}`}
                        size="lg"
                      >
                        {registrationLoading ? (
                          <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Inscription en cours...
                          </>
                        ) : (
                          "S'inscrire à l'événement"
                        )}
                      </Button>
                    )}

                    {!isAuthenticated && (
                      <div className="text-center p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                        <p className="text-sm text-yellow-700">
                          Connectez-vous pour vous inscrire
                        </p>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => router.push("/registration")}
                          className="mt-2"
                        >
                          Se connecter
                        </Button>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>

        {/* Confetti */}
        {showConfetti && (
          <div className="fixed inset-0 pointer-events-none z-50">
            {/* Animation confetti simple */}
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
              <div className="text-6xl animate-bounce">🎉</div>
            </div>
          </div>
        )}
      </div>
    );
  }

  // VUE LISTE (par défaut)
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary/10 via-primary/5 to-primary/10 border-b border-border/50">
        <div className="px-4 sm:px-6 lg:px-8 py-6">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
                  Découvrez les événements
                </h1>
                <p className="text-muted-foreground">
                  Trouvez et participez à des événements passionnants
                </p>
              </div>
              {isAuthenticated && (
                <Button
                  onClick={() => router.push("/events?action=create")}
                  className="flex items-center gap-2"
                  size="lg"
                >
                  <Plus className="h-4 w-4" />
                  Créer un événement
                </Button>
              )}
            </div>

            {/* Barre de recherche et filtres */}
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Rechercher un événement..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <div className="flex gap-2">
                <Sheet>
                  <SheetTrigger asChild>
                    <Button
                      variant="outline"
                      className="flex items-center gap-2"
                    >
                      <SlidersHorizontal className="h-4 w-4" />
                      Filtres
                    </Button>
                  </SheetTrigger>
                  <SheetContent>
                    <SheetHeader>
                      <SheetTitle>Filtres et tri</SheetTitle>
                    </SheetHeader>
                    <div className="space-y-6 mt-6">
                      <div>
                        <label className="text-sm font-medium mb-2 block">
                          Catégorie
                        </label>
                        <Select
                          value={selectedCategory}
                          onValueChange={setSelectedCategory}
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="all">
                              Toutes les catégories
                            </SelectItem>
                            {FILTER_CATEGORIES.map((category) => (
                              <SelectItem key={category.value} value={category.value}>  
                                {category.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <label className="text-sm font-medium mb-2 block">
                          Trier par
                        </label>
                        <Select value={sortBy} onValueChange={setSortBy}>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="date">Date</SelectItem>
                            <SelectItem value="title">Titre</SelectItem>
                            <SelectItem value="location">Lieu</SelectItem>
                            <SelectItem value="participants">
                              Participants
                            </SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </SheetContent>
                </Sheet>
                <Button
                  variant="outline"
                  onClick={() =>
                    setViewMode(viewMode === "grid" ? "list" : "grid")
                  }
                  className="flex items-center gap-2"
                >
                  {viewMode === "grid" ? (
                    <List className="h-4 w-4" />
                  ) : (
                    <Grid className="h-4 w-4" />
                  )}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Liste des événements */}
      <div className="px-4 sm:px-6 lg:px-8 py-8">
        <div className="max-w-7xl mx-auto">
          {loading ? (
            <div className="flex items-center justify-center py-12">
              <LoadingSpinner />
            </div>
          ) : filteredEvents.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">🎉</div>
              <h3 className="text-xl font-semibold mb-2">
                Aucun événement trouvé
              </h3>
              <p className="text-muted-foreground mb-4">
                {searchTerm || selectedCategory !== "all"
                  ? "Essayez de modifier vos critères de recherche"
                  : "Soyez le premier à créer un événement !"}
              </p>
              {isAuthenticated && (
                <Button
                  onClick={() => router.push("/events?action=create")}
                  className="flex items-center gap-2"
                >
                  <Plus className="h-4 w-4" />
                  Créer un événement
                </Button>
              )}
            </div>
          ) : (
            <div
              className={
                viewMode === "grid"
                  ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                  : "space-y-4"
              }
            >
              {filteredEvents.map((event) => (
                <Card
                  key={event.id}
                  className="group hover:shadow-lg transition-all duration-200 cursor-pointer border-0 shadow-md"
                  onClick={() => router.push(`/events/${event.id}`)}
                >
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <CardTitle className="text-lg font-semibold line-clamp-2 group-hover:text-primary transition-colors">
                          {event.title}
                        </CardTitle>
                        <div className="flex items-center gap-2 mt-2">
                          <Badge variant="secondary" className="text-xs">
                            {event.category}
                          </Badge>
                          <span className="text-xs text-muted-foreground">
                            {event.price}
                          </span>
                        </div>
                      </div>
                      <div className="flex gap-1">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleFavorite(event.id);
                          }}
                          className="h-8 w-8 p-0"
                        >
                          <Heart
                            className={`h-4 w-4 ${
                              favoriteEvents.includes(event.id)
                                ? "fill-red-500 text-red-500"
                                : "text-muted-foreground"
                            }`}
                          />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={(e) => {
                            e.stopPropagation();
                            shareEvent(event);
                          }}
                          className="h-8 w-8 p-0"
                        >
                          <Share2 className="h-4 w-4 text-muted-foreground" />
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <p className="text-sm text-muted-foreground line-clamp-2 mb-4">
                      {event.description}
                    </p>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-sm">
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                        <span>{formatDate(event.start_date)}</span>
                        <span className="text-muted-foreground">•</span>
                        <Clock className="h-4 w-4 text-muted-foreground" />
                        <span>{formatTime(event.start_date)}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <MapPin className="h-4 w-4 text-muted-foreground" />
                        <span className="line-clamp-1">{event.location}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <Users className="h-4 w-4 text-muted-foreground" />
                        <span>
                          {getParticipantCount(event)}
                          {event.max_participants &&
                            ` / ${event.max_participants}`}{" "}
                          participants
                        </span>
                      </div>
                    </div>
                    <div className="mt-4 pt-4 border-t">
                      {isUserParticipating(event) ? (
                        <Badge
                          variant="default"
                          className="w-full justify-center"
                        >
                          ✓ Inscrit
                        </Badge>
                      ) : (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={(e) => {
                            e.stopPropagation();
                            joinEvent(event.id);
                          }}
                          className="w-full"
                        >
                          S&apos;inscrire
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
