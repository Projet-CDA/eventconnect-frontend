"use client";

import { useState, useEffect } from "react";
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
} from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";

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

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* En-tête */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Événements à venir
          </h1>
          <p className="text-gray-600">
            Découvrez les événements qui vous intéressent
          </p>
        </div>

        <Button asChild className="mt-4 md:mt-0">
          <Link href="/events/createEvent">Créer un événement</Link>
        </Button>
      </div>

      {/* Barre de recherche */}
      <div className="mb-8">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Rechercher un événement..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <Button variant="outline">
            <Filter className="h-4 w-4 mr-2" />
            Filtres
          </Button>
        </div>
      </div>

      {/* Liste des événements */}
      {filteredEvents.length === 0 ? (
        <div className="text-center py-12">
          <Calendar className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            Aucun événement trouvé
          </h3>
          <p className="text-gray-600">
            {searchTerm
              ? "Essayez de modifier vos critères de recherche."
              : "Aucun événement n'est disponible pour le moment."}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredEvents.map((event) => (
            <Card
              key={event.id}
              className="overflow-hidden hover:shadow-lg transition-shadow"
            >
              <CardHeader className="pb-3">
                <div className="flex justify-between items-start">
                  <CardTitle className="text-lg font-semibold text-gray-900 line-clamp-2">
                    {event.title}
                  </CardTitle>
                  <div className="flex space-x-1">
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <Heart className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <Share2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <MapPin className="h-4 w-4 mr-1" />
                  {event.location}
                </div>
              </CardHeader>

              <CardContent className="pt-0">
                <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                  {event.description}
                </p>

                <div className="space-y-2 mb-4">
                  <div className="flex items-center text-sm text-gray-600">
                    <Calendar className="h-4 w-4 mr-2" />
                    {formatDate(event.start_date)}
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <Clock className="h-4 w-4 mr-2" />
                    {formatTime(event.start_date)} -{" "}
                    {formatTime(event.end_date)}
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <Users className="h-4 w-4 mr-2" />
                    {getParticipantCount(event)} participants
                    {event.max_participants &&
                      ` / ${event.max_participants} max`}
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Badge variant="secondary" className="text-xs">
                      {event.status === "active" ? "Actif" : event.status}
                    </Badge>
                  </div>

                  <Button
                    onClick={() => joinEvent(event.id)}
                    disabled={isUserParticipating(event)}
                    variant={isUserParticipating(event) ? "outline" : "default"}
                    size="sm"
                  >
                    {isUserParticipating(event) ? "Inscrit" : "Participer"}
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
