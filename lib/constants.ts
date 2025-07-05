// Catégories d'événements partagées dans toute l'application
export const EVENT_CATEGORIES = [
  "Tech",
  "Musique",
  "Gastronomie",
  "Art",
  "Sport",
  "Environnement",
  "Formation",
  "Networking",
  "Culture",
  "Autre",
] as const;

export type EventCategory = (typeof EVENT_CATEGORIES)[number];

// Catégories pour les filtres (avec couleurs et labels)
export const FILTER_CATEGORIES = [
  { value: "all", label: "Toutes les catégories", color: "bg-gray-500" },
  { value: "tech", label: "Tech", color: "bg-blue-500" },
  { value: "design", label: "Design", color: "bg-purple-500" },
  { value: "musique", label: "Musique", color: "bg-pink-500" },
  { value: "sport", label: "Sport", color: "bg-red-500" },
  { value: "cuisine", label: "Cuisine", color: "bg-green-500" },
] as const;

// Catégories pour la page d'accueil (avec icônes et couleurs)
export const HERO_CATEGORIES = [
  {
    name: "Technologie",
    count: 24,
    icon: "Code",
    color: "from-blue-500 to-blue-600",
  },
  {
    name: "Art & Culture",
    count: 18,
    icon: "Palette",
    color: "from-purple-500 to-purple-600",
  },
  {
    name: "Santé & Bien-être",
    count: 15,
    icon: "Heart",
    color: "from-green-500 to-green-600",
  },
  {
    name: "Business & Entrepreneuriat",
    count: 32,
    icon: "Briefcase",
    color: "from-orange-500 to-orange-600",
  },
  {
    name: "Musique & Divertissement",
    count: 21,
    icon: "Music",
    color: "from-pink-500 to-pink-600",
  },
  {
    name: "Sports & Fitness",
    count: 19,
    icon: "Dumbbell",
    color: "from-red-500 to-red-600",
  },
] as const;
