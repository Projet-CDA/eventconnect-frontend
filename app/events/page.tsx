'use client';

import { useState, useEffect } from 'react';
import { mockEvents, mockSupabase } from '@/lib/mock-data';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { LoadingSpinner } from '@/components/ui/loading-spinner';
import { 
  Calendar, 
  Clock, 
  MapPin, 
  Users, 
  Search,
  Filter,
  Star,
  Heart,
  Share2
} from 'lucide-react';
import Link from 'next/link';
import { toast } from 'sonner';

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

export default function EventsListPage() {
  const { user } = useAuth();
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredEvents, setFilteredEvents] = useState<Event[]>([]);
  const [userParticipations, setUserParticipations] = useState<string[]>([]);

  useEffect(() => {
    fetchEvents();
  }, []);

  useEffect(() => {
    if (searchTerm) {
      const filtered = events.filter(event =>
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
      console.error('Erreur:', error);
      toast.error('Une erreur est survenue');
      setLoading(false);
    }
  };

  const joinEvent = async (eventId: string) => {
    if (!user) {
      toast.error('Vous devez être connecté pour participer à un événement');
      return;
    }

    try {
      // Simulation de l'inscription
      if (userParticipations.includes(eventId)) {
        toast.error('Vous participez déjà à cet événement');
        return;
      }

      setUserParticipations(prev => [...prev, eventId]);
      toast.success('Inscription réussie !');
      
      // Mettre à jour les événements pour refléter la participation
      setEvents(prevEvents => 
        prevEvents.map(event => 
          event.id === eventId 
            ? {
                ...event,
                event_participants: [
                  ...event.event_participants,
                  { user_id: user.id }
                ]
              }
            : event
        )
      );
    } catch (error) {
      console.error('Erreur:', error);
      toast.error('Une erreur est survenue');
    }
  };

  const isUserParticipating = (event: Event) => {
    return user && (
      event.event_participants.some(p => p.user_id === user.id) ||
      userParticipations.includes(event.id)
    );
  };

  const getParticipantCount = (event: Event) => {
    const baseCount = event.event_participants.length;
    const additionalCount = userParticipations.includes(event.id) && 
      !event.event_participants.some(p => p.user_id === user?.id) ? 1 : 0;
    return baseCount + additionalCount;
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('fr-FR', {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  };

  const formatTime = (dateString: string) => {
    return new Date(dateString).toLocaleTimeString('fr-FR', {
      hour: '2-digit',
      minute: '2-digit'
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
        
        {user && (
          <Button asChild className="mt-4 md:mt-0">
            <Link href="/evenements/nouveau">
              Créer un événement
            </Link>
          </Button>
        )}
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
              ? 'Essayez de modifier votre recherche'
              : 'Il n\'y a pas d\'événements programmés pour le moment'
            }
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredEvents.map((event) => (
            <Card key={event.id} className="overflow-hidden hover:shadow-lg transition-all duration-300 group">
              <div className="aspect-video relative overflow-hidden bg-gradient-to-br from-violet-100 to-blue-100">
                {event.image_url ? (
                  <img 
                    src={event.image_url} 
                    alt={event.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <Calendar className="h-12 w-12 text-violet-400" />
                  </div>
                )}
                
                {/* Actions flottantes */}
                <div className="absolute top-4 right-4 flex space-x-2">
                  <Button size="icon" variant="secondary" className="h-8 w-8 bg-white/90 hover:bg-white">
                    <Heart className="h-4 w-4" />
                  </Button>
                  <Button size="icon" variant="secondary" className="h-8 w-8 bg-white/90 hover:bg-white">
                    <Share2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              
              <CardHeader className="pb-4">
                <div className="flex items-start justify-between">
                  <CardTitle className="text-lg line-clamp-2 group-hover:text-violet-600 transition-colors">
                    <Link href={`/events/${event.id}`}>
                      {event.title}
                    </Link>
                  </CardTitle>
                  <Badge variant="outline" className="ml-2">
                    Gratuit
                  </Badge>
                </div>
              </CardHeader>
              
              <CardContent className="pt-0">
                <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                  {event.description}
                </p>
                
                <div className="space-y-2 text-sm text-gray-500 mb-4">
                  <div className="flex items-center">
                    <Calendar className="h-4 w-4 mr-2 text-violet-500" />
                    {formatDate(event.start_date)}
                  </div>
                  <div className="flex items-center">
                    <Clock className="h-4 w-4 mr-2 text-violet-500" />
                    {formatTime(event.start_date)}
                  </div>
                  <div className="flex items-center">
                    <MapPin className="h-4 w-4 mr-2 text-violet-500" />
                    {event.location}
                  </div>
                  <div className="flex items-center">
                    <Users className="h-4 w-4 mr-2 text-violet-500" />
                    {getParticipantCount(event)}
                    {event.max_participants && `/${event.max_participants}`} participants
                  </div>
                </div>

                {/* Organisateur */}
                <div className="flex items-center mb-4 text-sm text-gray-600">
                  <div className="w-8 h-8 bg-violet-100 rounded-full flex items-center justify-center mr-2">
                    <span className="text-violet-600 font-semibold text-xs">
                      {event.user_profiles.first_name[0]}{event.user_profiles.last_name[0]}
                    </span>
                  </div>
                  <span>
                    Organisé par {event.user_profiles.first_name} {event.user_profiles.last_name}
                  </span>
                </div>

                {/* Actions */}
                <div className="flex space-x-2">
                  {isUserParticipating(event) ? (
                    <Badge variant="secondary" className="flex-1 justify-center bg-green-100 text-green-700">
                      <Star className="h-3 w-3 mr-1" />
                      Inscrit
                    </Badge>
                  ) : (
                    <Button 
                      onClick={() => joinEvent(event.id)}
                      size="sm" 
                      className="flex-1"
                      disabled={!user}
                    >
                      {user ? 'Participer' : 'Connectez-vous'}
                    </Button>
                  )}
                  <Button variant="outline" size="sm" asChild>
                    <Link href={`/events/${event.id}`}>
                      Détails
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Message d'information pour la démo */}
      <div className="mt-12 p-6 bg-blue-50 border border-blue-200 rounded-lg">
        <div className="flex items-start space-x-3">
          <div className="flex-shrink-0">
            <Calendar className="h-6 w-6 text-blue-600" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-blue-900 mb-2">
              Mode Démonstration
            </h3>
            <p className="text-blue-800 mb-3">
              Vous utilisez actuellement EventConnect en mode démonstration avec des données fictives.
            </p>
            <div className="text-sm text-blue-700">
              <p><strong>Comptes de test disponibles :</strong></p>
              <ul className="mt-1 space-y-1">
                <li>• Email: demo@eventconnect.fr - Mot de passe: demo123</li>
                <li>• Email: admin@eventconnect.fr - Mot de passe: admin123</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}