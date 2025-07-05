import { EventCategory } from "./constants";

// Types pour les formulaires d'événements
export interface EventFormData {
  nom: string;
  description: string;
  categorie: string;
  lieu: string;
  date: Date | undefined;
  heure: string;
  nombre_max_participants: number | undefined;
  prix: number | undefined;
  image_url: string;
}

export interface EventFormErrors {
  nom?: string;
  description?: string;
  categorie?: string;
  lieu?: string;
  date?: string;
  heure?: string;
}

// Type pour les événements
export interface Event {
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

// Type pour les événements du backend
export interface BackendEvent {
  id: number;
  nom: string;
  description: string;
  categorie: EventCategory;
  lieu: string;
  date_et_heure: string;
  nombre_max_participants: number | null;
  prix: number | null;
  image_url: string | null;
  statut: string;
  date_creation: string;
}

// Type pour les données d'événement à envoyer au backend
export interface EventCreateData {
  nom: string;
  description: string;
  categorie: string;
  lieu: string;
  date_et_heure: string;
  nombre_max_participants: number | null;
  prix: number | null;
  image_url: string | null;
}
