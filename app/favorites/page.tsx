"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuthCheck } from "@/hooks/useAuth";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import {
  Heart,
  Calendar,
  Clock,
  MapPin,
  Users,
  Star,
  Grid,
  List,
  Search,
  Filter,
  ArrowLeft,
  Share2,
  ExternalLink,
  Trash2,
} from "lucide-react";
import { toast } from "sonner";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface FavoriteEvent {
  id: string;
  title: string;
  description: string;
  start_date: string;
  location: string;
  category: string;
  price: string;
  image_url?: string;
  max_participants?: number;
  current_participants: number;
  organizer: string;
  dateAdded: string;
}

export default function FavoritesPage() {
  const router = useRouter();
  const { isAuthenticated, isLoading } = useAuthCheck();
  const [favorites, setFavorites] = useState<FavoriteEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredFavorites, setFilteredFavorites] = useState<FavoriteEvent[]>([]);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [sortBy, setSortBy] = useState("dateAdded");
  const [selectedCategory, setSelectedCategory] = useState("all");

  const categories = [
    { value: "all", label: "Toutes les catégories" },
    { value: "tech", label: "Tech" },
    { value: "design", label: "Design" },
    { value: "musique", label: "Musique" },
    { value: "sport", label: "Sport" },
    { value: "cuisine", label: "Cuisine" },
  ];

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push("/connect");
      return;
    }

    if (isAuthenticated) {
      fetchFavorites();
    }
  }, [isAuthenticated, isLoading, router]);

  useEffect(() => {
    let filtered = favorites;

    // Filtre par recherche
    if (searchTerm) {
      filtered = filtered.filter(
        (event) =>
          event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          event.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
          event.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
          event.organizer.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filtre par catégorie
    if (selectedCategory !== "all") {
      filtered = filtered.filter(
        (event) => event.category.toLowerCase() === selectedCategory.toLowerCase()
      );
    }

    // Tri
    switch (sortBy) {
      case "dateAdded":
        filtered.sort((a, b) => new Date(b.dateAdded).getTime() - new Date(a.dateAdded).getTime());
        break;
      case "eventDate":
        filtered.sort((a, b) => new Date(a.start_date).getTime() - new Date(b.start_date).getTime());
        break;
      case "title":
        filtered.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case "location":
        filtered.sort((a, b) => a.location.localeCompare(b.location));
        break;
    }

    setFilteredFavorites(filtered);
  }, [searchTerm, favorites, selectedCategory, sortBy]);

  const fetchFavorites = async () => {
  try {
    setLoading(true);
    const token = localStorage.getItem("token");
    const userData = localStorage.getItem("user");
    const user = userData ? JSON.parse(userData) : null;

    if (!user?.id) {
      throw new Error("Utilisateur non connecté");
    }

    // Récupérer les favoris (juste les IDs)
    const response = await fetch(
      `https://eventconnectes-backend.pphilibert-web.eu/api/favoris/utilisateur/${user.id}`,
      {
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      throw new Error("Erreur lors de la récupération des favoris");
    }

    const favoritesData = await response.json();

    // Aller chercher chaque événement lié
    const mappedFavorites: FavoriteEvent[] = await Promise.all(
      favoritesData.map(async (fav: any) => {
        const eventRes = await fetch(
          `https://eventconnectes-backend.pphilibert-web.eu/api/evenements/${fav.evenement_id}`
        );
          const eventData = await eventRes.json();
  
          return {
            id: eventData.id?.toString() || "",
            title: eventData.nom || "",
            description: eventData.description || "",
            start_date: eventData.date_et_heure || "",
            location: eventData.lieu || "",
            category: eventData.categorie || "",
            price: eventData.prix ? `${eventData.prix}€` : "Gratuit",
            max_participants: eventData.nombre_max_participants || 0,
            current_participants: 0,
            organizer: eventData.createur?.nom || "Organisateur",
            dateAdded: fav.date_ajout || "",
            image_url: eventData.image_url || "",
          };
        })
      );
  
      setFavorites(mappedFavorites);
    } catch (error) {
      console.error("Erreur lors de la récupération des favoris:", error);
      toast.error("Erreur lors du chargement des favoris");
      setFavorites([]);
    } finally {
      setLoading(false);
    }
  };

  const removeFavorite = async (eventId: string) => {
    try {
      const token = localStorage.getItem("token");
      const userData = localStorage.getItem("user");
      const user = userData ? JSON.parse(userData) : null;

      if (!user?.id) {
        throw new Error("Utilisateur non connecté");
      }

      // Supprimer le favori via l'API
      const response = await fetch(
        `https://eventconnectes-backend.pphilibert-web.eu/api/favoris`,
        {
          method: "DELETE",
          headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            utilisateur_id: user.id,
            evenement_id: parseInt(eventId),
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Erreur lors de la suppression du favori");
      }
      
      setFavorites(favorites.filter(fav => fav.id !== eventId));
      toast.success("Événement retiré des favoris");
    } catch (error) {
      console.error("Erreur lors de la suppression:", error);
      toast.error("Erreur lors de la suppression");
    }
  };

  const shareEvent = async (event: FavoriteEvent) => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: event.title,
          text: event.description,
          url: `/events/${event.id}`,
        });
      } catch (error) {
        console.log("Partage annulé");
      }
    } else {
      await navigator.clipboard.writeText(`${window.location.origin}/events/${event.id}`);
      toast.success("Lien copié dans le presse-papiers !");
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("fr-FR", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const formatTime = (dateString: string) => {
    return new Date(dateString).toLocaleTimeString("fr-FR", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getCategoryColor = (category: string) => {
    const colors: { [key: string]: string } = {
      tech: "bg-blue-500",
      design: "bg-purple-500",
      musique: "bg-pink-500",
      sport: "bg-red-500",
      cuisine: "bg-green-500",
    };
    return colors[category] || "bg-gray-500";
  };

  if (isLoading || loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-primary/10 flex items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-primary/10">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-grid-pattern opacity-5" />

      <div className="container mx-auto px-4 py-8 relative">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => router.back()}
            className="hover:bg-white/20"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div className="flex-1">
            <h1 className="text-3xl font-bold text-foreground flex items-center gap-3">
              <Heart className="h-8 w-8 text-primary" />
              Mes Favoris
            </h1>
            <p className="text-muted-foreground">
              {favorites.length} événement{favorites.length > 1 ? "s" : ""} dans vos favoris
            </p>
          </div>
        </div>

        {/* Filtres et recherche */}
        <Card className="border-0 shadow-xl bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm mb-8">
          <CardContent className="p-6">
            <div className="flex flex-col lg:flex-row gap-4">
              {/* Recherche */}
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground h-4 w-4" />
                  <Input
                    placeholder="Rechercher dans vos favoris..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>

              {/* Filtres */}
              <div className="flex gap-3">
                <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                  <SelectTrigger className="w-[200px]">
                    <SelectValue placeholder="Catégorie" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem key={category.value} value={category.value}>
                        {category.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-[200px]">
                    <SelectValue placeholder="Trier par" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="dateAdded">Date d'ajout</SelectItem>
                    <SelectItem value="eventDate">Date d'événement</SelectItem>
                    <SelectItem value="title">Titre</SelectItem>
                    <SelectItem value="location">Lieu</SelectItem>
                  </SelectContent>
                </Select>

                {/* Toggle de vue */}
                <div className="flex border rounded-lg p-1 bg-muted/20">
                  <Button
                    variant={viewMode === "grid" ? "default" : "ghost"}
                    size="sm"
                    onClick={() => setViewMode("grid")}
                  >
                    <Grid className="h-4 w-4" />
                  </Button>
                  <Button
                    variant={viewMode === "list" ? "default" : "ghost"}
                    size="sm"
                    onClick={() => setViewMode("list")}
                  >
                    <List className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Liste des favoris */}
        {filteredFavorites.length === 0 ? (
          <Card className="border-0 shadow-xl bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm">
            <CardContent className="p-12 text-center">
              <Heart className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-foreground mb-2">
                {searchTerm || selectedCategory !== "all" 
                  ? "Aucun favori trouvé" 
                  : "Aucun événement en favori"}
              </h3>
              <p className="text-muted-foreground mb-6">
                {searchTerm || selectedCategory !== "all"
                  ? "Essayez de modifier vos filtres de recherche."
                  : "Commencez à ajouter des événements à vos favoris pour les retrouver ici."}
              </p>
              <Button asChild>
                <Link href="/events">
                  <Search className="h-4 w-4 mr-2" />
                  Découvrir des événements
                </Link>
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className={
            viewMode === "grid" 
              ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
              : "space-y-4"
          }>
            {filteredFavorites.map((event) => (
              <Card
                key={event.id}
                className={`border-0 shadow-xl bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm hover:shadow-2xl transition-all duration-300 group ${
                  viewMode === "list" ? "flex" : ""
                }`}
              >
                <CardContent className={`p-6 ${viewMode === "list" ? "flex items-center gap-6 w-full" : ""}`}>
                  {viewMode === "list" && (
                    <div className="flex-shrink-0">
                      <div className={`w-16 h-16 rounded-lg ${getCategoryColor(event.category)} flex items-center justify-center`}>
                        <Calendar className="h-8 w-8 text-white" />
                      </div>
                    </div>
                  )}

                  <div className={viewMode === "list" ? "flex-1" : ""}>
                    {/* En-tête */}
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <Badge className={`${getCategoryColor(event.category)} text-white border-0`}>
                            {event.category}
                          </Badge>
                          <Badge variant="outline" className="text-xs">
                            {event.price}
                          </Badge>
                        </div>
                        <h3 className="font-semibold text-foreground text-lg group-hover:text-primary transition-colors">
                          {event.title}
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          Par {event.organizer}
                        </p>
                      </div>

                      {/* Actions */}
                      <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => shareEvent(event)}
                          className="h-8 w-8"
                        >
                          <Share2 className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => removeFavorite(event.id)}
                          className="h-8 w-8 text-red-500 hover:text-red-600"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>

                    {/* Description */}
                    <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                      {event.description}
                    </p>

                    {/* Détails */}
                    <div className="space-y-2 mb-4">
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Calendar className="h-4 w-4" />
                        <span>{formatDate(event.start_date)} à {formatTime(event.start_date)}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <MapPin className="h-4 w-4" />
                        <span>{event.location}</span>
                      </div>
                      {event.max_participants && (
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Users className="h-4 w-4" />
                          <span>
                            {event.current_participants}/{event.max_participants} participants
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Actions principales */}
                    <div className="flex gap-2">
                      <Button asChild className="flex-1" size="sm">
                        <Link href={`/events/${event.id}`}>
                          <ExternalLink className="h-4 w-4 mr-2" />
                          Voir l'événement
                        </Link>
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
} 
