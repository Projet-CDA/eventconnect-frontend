"use client";

import { useState, useEffect } from "react";
import { useAuthCheck } from "@/hooks/useAuth";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
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
} from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";
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

interface Event {
  id: string;
  title: string;
  description: string;
  start_date: string;
  end_date: string;
  location: string;
  max_participants: number | null;
  image_url: string | null;
  status: string;
  created_at: string;
  category: string;
  price: string;
  user_profiles: {
    first_name: string;
    last_name: string;
    avatar_url: string | null;
  };
  event_participants: Array<{ user_id: string }>;
}

// Données mockées pour les événements
// const mockEvents: Event[] = [ ... ]; // <-- On commente ou supprime cette partie

const categories = [
  { value: "all", label: "Toutes les catégories", color: "bg-gray-500" },
  { value: "tech", label: "Tech", color: "bg-blue-500" },
  { value: "design", label: "Design", color: "bg-purple-500" },
  { value: "musique", label: "Musique", color: "bg-pink-500" },
  { value: "sport", label: "Sport", color: "bg-red-500" },
  { value: "cuisine", label: "Cuisine", color: "bg-green-500" },
];

export default function EventsListPage() {
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
  const { isAuthenticated, isLoading: authLoading } = useAuthCheck();

  useEffect(() => {
    fetchEvents();
  }, []);

  // Nouvelle fonction pour mapper les données backend vers le format frontend
  const mapBackendEvent = (e: any): Event => ({
    id: e.id?.toString() ?? "",
    title: e.nom ?? "",
    description: e.description ?? "",
    start_date: e.date_et_heure ?? "",
    end_date: e.date_et_heure ?? "",
    location: e.lieu ?? "",
    max_participants: e.nombre_max_participants ?? null,
    image_url: e.image_url ?? null, // champ optionnel, à adapter si besoin
    status: e.statut ?? "",
    created_at: e.date_creation ?? "",
    category: e.categorie ?? "",
    price: e.prix !== undefined ? `${e.prix}€` : "Gratuit",
    user_profiles: {
      first_name: "", // à compléter si tu ajoutes le créateur dans la requête
      last_name: "",
      avatar_url: null,
    },
    event_participants: [], // à compléter si tu ajoutes les participants
  });

  const fetchEvents = async () => {
    try {
      setLoading(true);
      const response = await fetch("http://localhost:3000/api/evenements");
      const data = await response.json();
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

    // Filtre par recherche
    if (searchTerm) {
      filtered = filtered.filter(
        (event) =>
          event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          event.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
          event.location.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filtre par catégorie
    if (selectedCategory !== "all") {
      filtered = filtered.filter(
        (event) =>
          event.category.toLowerCase() === selectedCategory.toLowerCase()
      );
    }

    // Tri
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
        console.log("Erreur lors du partage:", error);
      }
    } else {
      // Fallback pour les navigateurs qui ne supportent pas Web Share API
      await navigator.clipboard.writeText(
        `${window.location.origin}/events/${event.id}`
      );
      toast.success("Lien copié dans le presse-papiers !");
    }
  };

  const isUserParticipating = (event: Event) => {
    return (
      userParticipations.includes(event.id) ||
      event.event_participants.some((p) => p.user_id === "mock-user-id")
    );
  };

  const getParticipantCount = (event: Event) => {
    const baseCount = event.event_participants.length;
    const additionalCount =
      userParticipations.includes(event.id) &&
      !event.event_participants.some((p) => p.user_id === "mock-user-id")
        ? 1
        : 0;
    return baseCount + additionalCount;
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("fr-FR", {
      weekday: "short",
      day: "numeric",
      month: "short",
    });
  };

  const formatTime = (dateString: string) => {
    return new Date(dateString).toLocaleTimeString("fr-FR", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <LoadingSpinner className="mx-auto mb-4" />
          <p className="text-muted-foreground">Chargement des événements...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header mobile */}
      <div className="bg-gradient-to-r from-primary/10 via-primary/5 to-primary/10 border-b border-border/50">
        <div className="px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-6">
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-2">
                Découvrez les événements
              </h1>
              <p className="text-sm sm:text-base text-muted-foreground">
                {filteredEvents.length} événement
                {filteredEvents.length > 1 ? "s" : ""} disponible
                {filteredEvents.length > 1 ? "s" : ""}
              </p>
            </div>

            {/* Barre de recherche mobile */}
            <div className="relative mb-4">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Rechercher un événement..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 h-12 text-base bg-white/90 border-2 focus:border-primary"
              />
            </div>

            {/* Filtres et actions mobiles */}
            <div className="flex flex-wrap gap-2 sm:gap-3">
              {/* Filtres */}
              <Sheet open={showFilters} onOpenChange={setShowFilters}>
                <SheetTrigger asChild>
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex-1 sm:flex-none"
                  >
                    <SlidersHorizontal className="h-4 w-4 mr-2" />
                    Filtres
                    {selectedCategory !== "all" && (
                      <Badge
                        variant="secondary"
                        className="ml-2 h-4 w-4 p-0 text-xs"
                      >
                        1
                      </Badge>
                    )}
                  </Button>
                </SheetTrigger>
                <SheetContent side="bottom" className="h-[80vh]">
                  <SheetHeader>
                    <SheetTitle>Filtres et tri</SheetTitle>
                  </SheetHeader>
                  <div className="mt-6 space-y-6">
                    {/* Catégories */}
                    <div>
                      <h3 className="font-semibold mb-3">Catégorie</h3>
                      <div className="grid grid-cols-2 gap-2">
                        {categories.map((category) => (
                          <Button
                            key={category.value}
                            variant={
                              selectedCategory === category.value
                                ? "default"
                                : "outline"
                            }
                            size="sm"
                            onClick={() => setSelectedCategory(category.value)}
                            className="justify-start"
                          >
                            <div
                              className={`w-3 h-3 rounded-full ${category.color} mr-2`}
                            />
                            {category.label}
                          </Button>
                        ))}
                      </div>
                    </div>

                    {/* Tri */}
                    <div>
                      <h3 className="font-semibold mb-3">Trier par</h3>
                      <Select value={sortBy} onValueChange={setSortBy}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="date">Date</SelectItem>
                          <SelectItem value="title">Nom</SelectItem>
                          <SelectItem value="location">Lieu</SelectItem>
                          <SelectItem value="participants">
                            Participants
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    {/* Reset */}
                    <Button
                      variant="outline"
                      onClick={() => {
                        setSelectedCategory("all");
                        setSortBy("date");
                        setSearchTerm("");
                      }}
                      className="w-full"
                    >
                      Réinitialiser les filtres
                    </Button>
                  </div>
                </SheetContent>
              </Sheet>

              {/* Vue grille/liste */}
              <div className="hidden sm:flex border rounded-lg">
                <Button
                  variant={viewMode === "grid" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setViewMode("grid")}
                  className="rounded-r-none"
                >
                  <Grid className="h-4 w-4" />
                </Button>
                <Button
                  variant={viewMode === "list" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setViewMode("list")}
                  className="rounded-l-none border-l"
                >
                  <List className="h-4 w-4" />
                </Button>
              </div>

              {/* Bouton créer événement */}
              <Button asChild className="hidden sm:flex">
                <Link href={isAuthenticated ? "/events/create" : "/registration"}>
                  <Plus className="h-4 w-4 mr-2" />
                  {isAuthenticated ? "Créer un événement" : "Se connecter pour créer"}
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Liste des événements */}
      <div className="px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        <div className="max-w-7xl mx-auto">
          {filteredEvents.length === 0 ? (
            <div className="text-center py-12">
              <div className="bg-muted/30 rounded-full p-6 w-20 h-20 mx-auto mb-4">
                <Calendar className="h-8 w-8 text-muted-foreground mx-auto" />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">
                Aucun événement trouvé
              </h3>
              <p className="text-muted-foreground mb-4">
                Essayez de modifier vos critères de recherche
              </p>
              <Button
                onClick={() => {
                  setSearchTerm("");
                  setSelectedCategory("all");
                }}
              >
                Effacer les filtres
              </Button>
            </div>
          ) : (
            <div
              className={`grid gap-4 sm:gap-6 ${
                viewMode === "grid"
                  ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
                  : "grid-cols-1"
              }`}
            >
              {filteredEvents.map((event) => (
                <Card
                  key={event.id}
                  className="overflow-hidden hover:shadow-lg transition-all duration-300 border-0 shadow-md"
                >
                  <div className="relative">
                    <div
                      className="aspect-[16/10] bg-gradient-to-br from-primary/20 to-primary/40 bg-cover bg-center"
                      style={{ backgroundImage: `url(${event.image_url})` }}
                    >
                      <div className="absolute inset-0 bg-black/20" />
                      <div className="absolute top-3 left-3 right-3 flex justify-between items-start">
                        <Badge className="bg-white/90 text-gray-800 text-xs font-medium">
                          {event.category}
                        </Badge>
                        <div className="flex gap-2">
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 bg-white/80 hover:bg-white text-gray-700"
                            onClick={() => toggleFavorite(event.id)}
                          >
                            <Heart
                              className={`h-4 w-4 ${
                                favoriteEvents.includes(event.id)
                                  ? "fill-red-500 text-red-500"
                                  : ""
                              }`}
                            />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 bg-white/80 hover:bg-white text-gray-700"
                            onClick={() => shareEvent(event)}
                          >
                            <Share2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                      <div className="absolute bottom-3 left-3 right-3">
                        <div className="flex justify-between items-end">
                          <div className="text-white">
                            <div className="text-sm font-medium">
                              {formatDate(event.start_date)}
                            </div>
                            <div className="text-xs opacity-90">
                              {formatTime(event.start_date)}
                            </div>
                          </div>
                          <Badge
                            variant="secondary"
                            className="bg-green-100 text-green-800 text-xs font-medium"
                          >
                            {event.price}
                          </Badge>
                        </div>
                      </div>
                    </div>
                  </div>

                  <CardContent className="p-4">
                    <h3 className="text-base sm:text-lg font-semibold text-foreground mb-2 line-clamp-2">
                      {event.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-muted-foreground mb-3 line-clamp-2">
                      {event.description}
                    </p>

                    <div className="space-y-2 mb-4">
                      <div className="flex items-center text-xs sm:text-sm text-muted-foreground">
                        <MapPin className="h-3 w-3 sm:h-4 sm:w-4 mr-2 text-primary" />
                        {event.location}
                      </div>
                      <div className="flex items-center text-xs sm:text-sm text-muted-foreground">
                        <Users className="h-3 w-3 sm:h-4 sm:w-4 mr-2 text-primary" />
                        {getParticipantCount(event)}/{event.max_participants}{" "}
                        participants
                      </div>
                      <div className="flex items-center text-xs sm:text-sm text-muted-foreground">
                        <User className="h-3 w-3 sm:h-4 sm:w-4 mr-2 text-primary" />
                        Par {event.user_profiles.first_name}{" "}
                        {event.user_profiles.last_name}
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <Button
                        className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground text-sm font-medium"
                        asChild
                      >
                        <Link
                          href={`/events/${event.id}`}
                          className="flex items-center justify-center gap-2"
                        >
                          Voir les détails
                          <ArrowRight className="h-3 w-3" />
                        </Link>
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="px-3"
                        onClick={() => joinEvent(event.id)}
                        disabled={isUserParticipating(event)}
                      >
                        {isUserParticipating(event) ? "✓" : "+"}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Bouton flottant pour créer un événement - Mobile */}
      <div className="sm:hidden fixed bottom-6 right-4 z-40">
        <Button
          size="lg"
          className="h-14 w-14 rounded-full shadow-lg bg-primary hover:bg-primary/90 text-primary-foreground"
          asChild
          title={isAuthenticated ? "Créer un événement" : "Se connecter pour créer"}
        >
          <Link href={isAuthenticated ? "/events/create" : "/registration"}>
            <Plus className="h-6 w-6" />
          </Link>
        </Button>
      </div>
    </div>
  );
}
