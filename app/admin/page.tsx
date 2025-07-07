"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getAllEvents, deleteEvent } from "@/api/events";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Calendar,
  MapPin,
  Users,
  Edit,
  Trash2,
  Plus,
  Eye,
  RefreshCw,
} from "lucide-react";

interface Event {
  id: number;
  titre: string;
  description: string;
  date: string;
  heure: string;
  lieu: string;
  prix: number;
  capacite_max: number;
  statut: string;
  createur_id: number;
  created_at: string;
  updated_at: string;
  image_url?: string;
}

export default function AdminPanel() {
  const router = useRouter();
  const [user, setUser] = useState<{ nom?: string } | null>(null);
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (!userData) {
      router.replace("/");
      return;
    }
    try {
      const userObj = JSON.parse(userData);
      if (userObj.role !== "admin") {
        router.replace("/");
      } else {
        setUser(userObj);
        fetchEvents();
      }
    } catch {
      router.replace("/");
    }
  }, [router]);

  const fetchEvents = async () => {
    try {
      setLoading(true);
      setError(null);
      const eventsData = await getAllEvents();
      setEvents(eventsData);
    } catch (err) {
      setError("Erreur lors du chargement des événements");
      console.error("Erreur fetchEvents:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteEvent = async (eventId: number) => {
    if (window.confirm("Êtes-vous sûr de vouloir supprimer cet événement ?")) {
      try {
        await deleteEvent(eventId);
        setEvents(events.filter((event) => event.id !== eventId));
      } catch (err) {
        setError("Erreur lors de la suppression de l'événement");
        console.error("Erreur handleDeleteEvent:", err);
      }
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("fr-FR", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  const formatTime = (timeString?: string) => {
    if (!timeString) return "-";
    return timeString.substring(0, 5); // Format HH:MM
  };

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      actif: { variant: "default", className: "bg-green-500" },
      annulé: { variant: "destructive", className: "bg-red-500" },
      terminé: { variant: "secondary", className: "bg-gray-500" },
      en_attente: { variant: "outline", className: "bg-yellow-500" },
    };

    const config =
      statusConfig[status as keyof typeof statusConfig] || statusConfig.actif;

    return (
      <Badge variant={config.variant as any} className={config.className}>
        {status}
      </Badge>
    );
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-100 via-blue-100 to-white">
        <div className="bg-white/80 p-10 rounded-2xl shadow-2xl text-center">
          <RefreshCw className="h-8 w-8 animate-spin mx-auto mb-4 text-indigo-600" />
          <p className="text-lg text-gray-700">Chargement des événements...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-blue-100 to-white p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-white/80 p-6 rounded-2xl shadow-2xl mb-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-indigo-700 mb-2">
                Admin Panel
              </h1>
              <p className="text-lg text-gray-700">
                {user?.nom
                  ? `Bienvenue, ${user.nom} !`
                  : "Bienvenue sur le panneau d'administration !"}
              </p>
              <div className="mt-2 p-2 bg-indigo-50 rounded-xl text-indigo-800 font-semibold inline-block">
                ✅ Connecté en tant qu'<span className="uppercase">ADMIN</span>
              </div>
            </div>
            <div className="flex gap-3">
              <Button
                onClick={fetchEvents}
                variant="outline"
                className="flex items-center gap-2"
              >
                <RefreshCw className="h-4 w-4" />
                Actualiser
              </Button>
              <Button
                onClick={() => router.push("/events/create")}
                className="bg-indigo-600 hover:bg-indigo-700 flex items-center gap-2"
              >
                <Plus className="h-4 w-4" />
                Nouvel événement
              </Button>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
          <Card className="bg-white/80 shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">
                    Total événements
                  </p>
                  <p className="text-2xl font-bold text-indigo-700">
                    {events.length}
                  </p>
                </div>
                <Calendar className="h-8 w-8 text-indigo-600" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/80 shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">
                    Événements actifs
                  </p>
                  <p className="text-2xl font-bold text-green-600">
                    {events.filter((e) => e.statut === "actif").length}
                  </p>
                </div>
                <div className="h-8 w-8 bg-green-100 rounded-full flex items-center justify-center">
                  <Calendar className="h-4 w-4 text-green-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/80 shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">
                    Événements annulés
                  </p>
                  <p className="text-2xl font-bold text-red-600">
                    {events.filter((e) => e.statut === "annulé").length}
                  </p>
                </div>
                <div className="h-8 w-8 bg-red-100 rounded-full flex items-center justify-center">
                  <Calendar className="h-4 w-4 text-red-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/80 shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">
                    En attente
                  </p>
                  <p className="text-2xl font-bold text-yellow-600">
                    {events.filter((e) => e.statut === "en_attente").length}
                  </p>
                </div>
                <div className="h-8 w-8 bg-yellow-100 rounded-full flex items-center justify-center">
                  <Calendar className="h-4 w-4 text-yellow-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Events Table */}
        <Card className="bg-white/80 shadow-2xl">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-indigo-700">
              Gestion des événements
            </CardTitle>
            {error && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
                {error}
              </div>
            )}
          </CardHeader>
          <CardContent>
            {events.length === 0 ? (
              <div className="text-center py-8">
                <Calendar className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-500 text-lg">Aucun événement trouvé</p>
                <Button
                  onClick={() => router.push("/events/create")}
                  className="mt-4 bg-indigo-600 hover:bg-indigo-700"
                >
                  Créer le premier événement
                </Button>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="font-semibold">Titre</TableHead>
                      <TableHead className="font-semibold">
                        Date & Heure
                      </TableHead>
                      <TableHead className="font-semibold">Lieu</TableHead>
                      <TableHead className="font-semibold">Prix</TableHead>
                      <TableHead className="font-semibold">Capacité</TableHead>
                      <TableHead className="font-semibold">Statut</TableHead>
                      <TableHead className="font-semibold">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {events.map((event) => (
                      <TableRow key={event.id} className="hover:bg-gray-50">
                        <TableCell>
                          <div className="flex items-center gap-3">
                            {event.image_url && (
                              <img
                                src={event.image_url}
                                alt="illustration"
                                className="w-12 h-12 object-cover rounded"
                              />
                            )}
                            <div>
                              <p className="font-semibold text-gray-900">
                                {event.titre}
                              </p>
                              <p className="text-sm text-gray-500 line-clamp-2">
                                {event.description}
                              </p>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Calendar className="h-4 w-4 text-gray-500" />
                            <div>
                              <p className="font-medium">
                                {formatDate(event.date)}
                              </p>
                              <p className="text-sm text-gray-500">
                                {formatTime(event.heure)}
                              </p>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <MapPin className="h-4 w-4 text-gray-500" />
                            <span className="text-sm">{event.lieu}</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <span className="font-medium">
                            {event.prix === 0 ? "Gratuit" : `${event.prix}€`}
                          </span>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Users className="h-4 w-4 text-gray-500" />
                            <span className="text-sm">
                              {event.capacite_max}
                            </span>
                          </div>
                        </TableCell>
                        <TableCell>{getStatusBadge(event.statut)}</TableCell>
                        <TableCell>
                          <div className="flex gap-2">
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => router.push(`/events/${event.id}`)}
                              className="flex items-center gap-1"
                            >
                              <Eye className="h-3 w-3" />
                              Voir
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() =>
                                router.push(`/events/${event.id}/edit`)
                              }
                              className="flex items-center gap-1"
                            >
                              <Edit className="h-3 w-3" />
                              Modifier
                            </Button>
                            <Button
                              size="sm"
                              variant="destructive"
                              onClick={() => handleDeleteEvent(event.id)}
                              className="flex items-center gap-1"
                            >
                              <Trash2 className="h-3 w-3" />
                              Supprimer
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
