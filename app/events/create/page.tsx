"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuthCheck } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Separator } from "@/components/ui/separator";
import {
  CalendarIcon,
  ArrowLeft,
  Clock,
  MapPin,
  Users,
  Euro,
  ImageIcon,
  Loader2,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";
import { toast } from "sonner";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { cn } from "@/lib/utils";

interface FormData {
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

interface FormErrors {
  nom?: string;
  description?: string;
  categorie?: string;
  lieu?: string;
  date?: string;
  heure?: string;
}

const categories = [
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
];

export default function CreateEventPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const { isAuthenticated, isLoading: authLoading, user } = useAuthCheck();
  const [formData, setFormData] = useState<FormData>({
    nom: "",
    description: "",
    categorie: "",
    lieu: "",
    date: undefined,
    heure: "",
    nombre_max_participants: undefined,
    prix: undefined,
    image_url: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});

  // Redirection si pas connecté
  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      router.push("/registration");
    }
  }, [authLoading, isAuthenticated, router]);

  const validateField = (field: keyof FormData, value: any) => {
    const newErrors = { ...errors };

    switch (field) {
      case "nom":
        if (!value?.trim()) {
          newErrors.nom = "Le titre est requis";
        } else if (value.trim().length < 3) {
          newErrors.nom = "Le titre doit contenir au moins 3 caractères";
        } else {
          delete newErrors.nom;
        }
        break;

      case "description":
        if (!value?.trim()) {
          newErrors.description = "La description est requise";
        } else if (value.trim().length < 10) {
          newErrors.description =
            "La description doit contenir au moins 10 caractères";
        } else {
          delete newErrors.description;
        }
        break;

      case "categorie":
        if (!value) {
          newErrors.categorie = "Veuillez sélectionner une catégorie";
        } else {
          delete newErrors.categorie;
        }
        break;

      case "lieu":
        if (!value?.trim()) {
          newErrors.lieu = "Le lieu est requis";
        } else if (value.trim().length < 3) {
          newErrors.lieu = "Le lieu doit contenir au moins 3 caractères";
        } else {
          delete newErrors.lieu;
        }
        break;

      case "date":
        if (!value) {
          newErrors.date = "Veuillez sélectionner une date";
        } else {
          delete newErrors.date;
        }
        break;

      case "heure":
        if (!value) {
          newErrors.heure = "Veuillez sélectionner une heure";
        } else {
          delete newErrors.heure;
        }
        break;
    }

    setErrors(newErrors);
  };

  const handleInputChange = (field: keyof FormData, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    validateField(field, value);
  };

  const validateForm = () => {
    const requiredFields: (keyof FormData)[] = [
      "nom",
      "description",
      "categorie",
      "lieu",
      "date",
      "heure",
    ];

    requiredFields.forEach((field) => {
      validateField(field, formData[field]);
    });

    return (
      Object.keys(errors).length === 0 &&
      formData.nom &&
      formData.description &&
      formData.categorie &&
      formData.lieu &&
      formData.date &&
      formData.heure
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      toast.error("Veuillez corriger les erreurs du formulaire");
      return;
    }

    setLoading(true);

    try {
      // Préparer les données pour l'API
      const eventData = {
        nom: formData.nom,
        description: formData.description,
        categorie: formData.categorie,
        lieu: formData.lieu,
        date_et_heure: `${format(formData.date!, "yyyy-MM-dd")}T${
          formData.heure
        }:00Z`,
        nombre_max_participants: formData.nombre_max_participants || null,
        prix: formData.prix || 0.0,
        image_url: formData.image_url || null,
      };

      // Récupérer le token du localStorage
      const token = localStorage.getItem("token");
      if (!token) {
        toast.error("Vous devez être connecté pour créer un événement");
        router.push("/registration");
        return;
      }

      const response = await fetch(
        "https://eventconnectes-backend.pphilibert-web.eu/api/evenements",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(eventData),
        }
      );

      if (!response.ok) {
        throw new Error("Erreur lors de la création de l'événement");
      }

      const result = await response.json();

      toast.success("Événement créé avec succès ! 🎉");

      // Redirection vers la page des événements
      router.push("/events");
    } catch (error) {
      console.error("Error creating event:", error);
      toast.error("Erreur lors de la création de l'événement");
    } finally {
      setLoading(false);
    }
  };

  // Afficher un loader pendant la vérification d'auth
  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Vérification...</p>
        </div>
      </div>
    );
  }

  // Ne pas rendre la page si pas connecté (redirection en cours)
  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-white dark:bg-gray-900 border-b">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm" asChild>
              <Link href="/events">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Retour aux événements
              </Link>
            </Button>
            <Separator orientation="vertical" className="h-6" />
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
                Créer un événement
              </h1>
              <p className="text-muted-foreground text-sm sm:text-base">
                Organisez votre prochain événement et invitez la communauté
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Form */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Card className="shadow-lg">
          <CardHeader className="pb-6">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 bg-primary/10 rounded-lg flex items-center justify-center">
                <CalendarIcon className="h-5 w-5 text-primary" />
              </div>
              <div>
                <CardTitle className="text-lg">
                  Informations de l'événement
                </CardTitle>
                <p className="text-sm text-muted-foreground">
                  Remplissez les détails de votre événement
                </p>
              </div>
            </div>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Titre */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">
                  Titre de l'événement *
                </label>
                <Input
                  placeholder="Ex: Meetup Tech Paris"
                  value={formData.nom}
                  onChange={(e) => handleInputChange("nom", e.target.value)}
                  className={cn(errors.nom && "border-red-500")}
                />
                {errors.nom && (
                  <p className="text-sm text-red-500 flex items-center gap-1">
                    <AlertCircle className="h-3 w-3" />
                    {errors.nom}
                  </p>
                )}
              </div>

              {/* Description */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">
                  Description *
                </label>
                <Textarea
                  placeholder="Décrivez votre événement, le programme, ce que les participants peuvent attendre..."
                  value={formData.description}
                  onChange={(e) =>
                    handleInputChange("description", e.target.value)
                  }
                  className={cn(
                    "min-h-[120px]",
                    errors.description && "border-red-500"
                  )}
                />
                {errors.description && (
                  <p className="text-sm text-red-500 flex items-center gap-1">
                    <AlertCircle className="h-3 w-3" />
                    {errors.description}
                  </p>
                )}
              </div>

              {/* Catégorie et Lieu */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">
                    Catégorie *
                  </label>
                  <Select
                    value={formData.categorie}
                    onValueChange={(value) =>
                      handleInputChange("categorie", value)
                    }
                  >
                    <SelectTrigger
                      className={cn(errors.categorie && "border-red-500")}
                    >
                      <SelectValue placeholder="Sélectionner une catégorie" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((category) => (
                        <SelectItem key={category} value={category}>
                          {category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {errors.categorie && (
                    <p className="text-sm text-red-500 flex items-center gap-1">
                      <AlertCircle className="h-3 w-3" />
                      {errors.categorie}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground flex items-center gap-2">
                    <MapPin className="h-4 w-4" />
                    Lieu *
                  </label>
                  <Input
                    placeholder="Ex: Station F, Paris"
                    value={formData.lieu}
                    onChange={(e) => handleInputChange("lieu", e.target.value)}
                    className={cn(errors.lieu && "border-red-500")}
                  />
                  {errors.lieu && (
                    <p className="text-sm text-red-500 flex items-center gap-1">
                      <AlertCircle className="h-3 w-3" />
                      {errors.lieu}
                    </p>
                  )}
                </div>
              </div>

              {/* Date et Heure */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">
                    Date *
                  </label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={cn(
                          "w-full justify-start text-left font-normal",
                          !formData.date && "text-muted-foreground",
                          errors.date && "border-red-500"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {formData.date ? (
                          format(formData.date, "PPP", { locale: fr })
                        ) : (
                          <span>Sélectionner une date</span>
                        )}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={formData.date}
                        onSelect={(date) => handleInputChange("date", date)}
                        disabled={(date) =>
                          date < new Date() || date < new Date("1900-01-01")
                        }
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                  {errors.date && (
                    <p className="text-sm text-red-500 flex items-center gap-1">
                      <AlertCircle className="h-3 w-3" />
                      {errors.date}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground flex items-center gap-2">
                    <Clock className="h-4 w-4" />
                    Heure *
                  </label>
                  <Input
                    type="time"
                    value={formData.heure}
                    onChange={(e) => handleInputChange("heure", e.target.value)}
                    className={cn(errors.heure && "border-red-500")}
                  />
                  {errors.heure && (
                    <p className="text-sm text-red-500 flex items-center gap-1">
                      <AlertCircle className="h-3 w-3" />
                      {errors.heure}
                    </p>
                  )}
                </div>
              </div>

              {/* Participants et Prix */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground flex items-center gap-2">
                    <Users className="h-4 w-4" />
                    Nombre maximum de participants
                  </label>
                  <Input
                    type="number"
                    placeholder="Ex: 50"
                    min="1"
                    value={formData.nombre_max_participants || ""}
                    onChange={(e) =>
                      handleInputChange(
                        "nombre_max_participants",
                        e.target.value ? parseInt(e.target.value) : undefined
                      )
                    }
                  />
                  <p className="text-xs text-muted-foreground">
                    Laissez vide pour un nombre illimité
                  </p>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground flex items-center gap-2">
                    <Euro className="h-4 w-4" />
                    Prix (€)
                  </label>
                  <Input
                    type="number"
                    placeholder="0.00"
                    min="0"
                    step="0.01"
                    value={formData.prix || ""}
                    onChange={(e) =>
                      handleInputChange(
                        "prix",
                        e.target.value ? parseFloat(e.target.value) : undefined
                      )
                    }
                  />
                  <p className="text-xs text-muted-foreground">
                    Laissez vide ou 0 pour un événement gratuit
                  </p>
                </div>
              </div>

              {/* Image URL */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground flex items-center gap-2">
                  <ImageIcon className="h-4 w-4" />
                  Image de l'événement (optionnel)
                </label>
                <Input
                  placeholder="https://exemple.com/image.jpg"
                  value={formData.image_url}
                  onChange={(e) =>
                    handleInputChange("image_url", e.target.value)
                  }
                />
                <p className="text-xs text-muted-foreground">
                  URL d'une image pour illustrer votre événement
                </p>
              </div>

              <Separator />

              {/* Boutons */}
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => router.push("/events")}
                  className="flex-1 sm:flex-none"
                  disabled={loading}
                >
                  Annuler
                </Button>
                <Button
                  type="submit"
                  className="flex-1 bg-primary hover:bg-primary/90"
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Création...
                    </>
                  ) : (
                    <>
                      <CheckCircle2 className="mr-2 h-4 w-4" />
                      Créer l'événement
                    </>
                  )}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
