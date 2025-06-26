"use client";

import { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
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
  user_profiles: {
    first_name: string;
    last_name: string;
    avatar_url: string | null;
  };
  event_participants: Array<{ user_id: string }>;
}

// Données mockées pour les événements
const mockEvents: Event[] = [
  {
    id: "1",
    title: "Meetup Développement Web",
    description:
      "Rencontre entre développeurs pour échanger sur les dernières technologies web.",
    start_date: "2024-02-15T18:00:00Z",
    end_date: "2024-02-15T21:00:00Z",
    location: "Paris, France",
    max_participants: 50,
    image_url: null,
    status: "active",
    created_at: "2024-01-15T10:00:00Z",
    user_profiles: {
      first_name: "Jean",
      last_name: "Dupont",
      avatar_url: null,
    },
    event_participants: [],
  },
  {
    id: "2",
    title: "Conférence IA & Machine Learning",
    description:
      "Découvrez les avancées en intelligence artificielle et apprentissage automatique.",
    start_date: "2024-02-20T14:00:00Z",
    end_date: "2024-02-20T18:00:00Z",
    location: "Lyon, France",
    max_participants: 100,
    image_url: null,
    status: "active",
    created_at: "2024-01-10T09:00:00Z",
    user_profiles: {
      first_name: "Marie",
      last_name: "Martin",
      avatar_url: null,
    },
    event_participants: [],
  },
  {
    id: "3",
    title: "Atelier Design UX/UI",
    description:
      "Apprenez les principes du design d'interface utilisateur moderne.",
    start_date: "2024-02-25T10:00:00Z",
    end_date: "2024-02-25T17:00:00Z",
    location: "Marseille, France",
    max_participants: 25,
    image_url: null,
    status: "active",
    created_at: "2024-01-20T14:00:00Z",
    user_profiles: {
      first_name: "Sophie",
      last_name: "Bernard",
      avatar_url: null,
    },
    event_participants: [],
  },
];

export default function EventsListPage() {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredEvents, setFilteredEvents] = useState<Event[]>([]);
  const [userParticipations, setUserParticipations] = useState<string[]>([]);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [selectedCategory, setSelectedCategory] = useState("all");

  useEffect(() => {
    fetchEvents();
  }, []);

  useEffect(() => {
    if (searchTerm) {
      const filtered = events.filter(
        (event) =>
          event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          event.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
          event.location.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredEvents(filtered);
    } else {
      setFilteredEvents(events);
    }
  }, [searchTerm, events]);

  const fetchEvents = async () => {
    try {
      // Utilisation des données mockées
      setEvents(mockEvents);
      setLoading(false);
    } catch (error) {
      console.error("Erreur:", error);
      toast.error("Une erreur est survenue");
      setLoading(false);
    }
  };

  const joinEvent = async (eventId: string) => {
    try {
      // Simulation de l'inscription
      if (userParticipations.includes(eventId)) {
        toast.error("Vous participez déjà à cet événement");
        return;
      }

      setUserParticipations((prev) => [...prev, eventId]);
      toast.success("Inscription réussie !");

      // Mettre à jour les événements pour refléter la participation
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
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  const formatTime = (dateString: string) => {
    return new Date(dateString).toLocaleTimeString("fr-FR", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const categories = [
    { value: "all", label: "Toutes les catégories" },
    { value: "technologie", label: "Technologie" },
    { value: "developpement", label: "Développement" },
    { value: "design", label: "Design" },
    { value: "business", label: "Business" },
    { value: "art", label: "Art & Culture" },
    { value: "sport", label: "Sport" },
    { value: "musique", label: "Musique" },
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-white mb-4">
              Découvrez des événements
            </h1>
            <p className="text-xl text-blue-100 max-w-2xl mx-auto">
              Trouvez et rejoignez des événements passionnants dans votre région
            </p>
          </div>
        </div>
      </div>

      {/* Filtres et recherche */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <Input
                placeholder="Rechercher un événement..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-gray-50 dark:bg-gray-700 border-gray-200 dark:border-gray-600"
              />
            </div>

            <Select
              value={selectedCategory}
              onValueChange={setSelectedCategory}
            >
              <SelectTrigger className="bg-gray-50 dark:bg-gray-700 border-gray-200 dark:border-gray-600">
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

            <Select>
              <SelectTrigger className="bg-gray-50 dark:bg-gray-700 border-gray-200 dark:border-gray-600">
                <SelectValue placeholder="Localisation" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="paris">Paris</SelectItem>
                <SelectItem value="lyon">Lyon</SelectItem>
                <SelectItem value="marseille">Marseille</SelectItem>
                <SelectItem value="bordeaux">Bordeaux</SelectItem>
              </SelectContent>
            </Select>

            <div className="flex gap-2">
              <Button
                variant={viewMode === "grid" ? "default" : "outline"}
                size="icon"
                onClick={() => setViewMode("grid")}
                className="bg-blue-600 hover:bg-blue-700 dark:bg-blue-600 dark:hover:bg-blue-700"
              >
                <Grid className="h-4 w-4" />
              </Button>
              <Button
                variant={viewMode === "list" ? "default" : "outline"}
                size="icon"
                onClick={() => setViewMode("list")}
                className="bg-blue-600 hover:bg-blue-700 dark:bg-blue-600 dark:hover:bg-blue-700"
              >
                <List className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Liste des événements */}
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
              className="hover:shadow-xl transition-all duration-300 bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700"
            >
              <div className="relative h-48 bg-gradient-to-br from-blue-400 to-purple-500 rounded-t-lg overflow-hidden">
                <div className="absolute inset-0 bg-black/20"></div>
                <Badge className="absolute top-4 left-4 bg-white/90 text-gray-800 dark:bg-gray-800/90 dark:text-white">
                  {event.title}
                </Badge>
              </div>

              <CardHeader>
                <CardTitle className="text-xl font-bold text-gray-900 dark:text-white">
                  {event.title}
                </CardTitle>
                <CardDescription className="text-gray-600 dark:text-gray-300">
                  {event.description}
                </CardDescription>
              </CardHeader>

              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center space-x-2 text-gray-600 dark:text-gray-300">
                    <MapPin className="h-4 w-4" />
                    <span>{event.location}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-gray-600 dark:text-gray-300">
                    <Calendar className="h-4 w-4" />
                    <span>
                      {formatDate(event.start_date)} à{" "}
                      {formatTime(event.start_date)}
                    </span>
                  </div>
                  <div className="flex items-center space-x-2 text-gray-600 dark:text-gray-300">
                    <Users className="h-4 w-4" />
                    <span>{getParticipantCount(event)} participants</span>
                  </div>
                </div>

                <Button
                  onClick={() => joinEvent(event.id)}
                  disabled={isUserParticipating(event)}
                  variant={isUserParticipating(event) ? "outline" : "default"}
                  size="sm"
                >
                  {isUserParticipating(event) ? "Inscrit" : "Participer"}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
