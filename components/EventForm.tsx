"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuthCheck } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
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
import {
  CalendarIcon,
  Clock,
  MapPin,
  Users,
  Euro,
  ImageIcon,
  Loader2,
} from "lucide-react";
import { toast } from "sonner";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { cn } from "@/lib/utils";
import { EVENT_CATEGORIES } from "@/lib/constants";
import { EventFormData, EventFormErrors, EventCreateData } from "@/lib/types";
import { createEvent } from "@/lib/services/eventService";

interface EventFormProps {
  onSuccess?: () => void;
  onCancel?: () => void;
  submitButtonText?: string;
  cancelButtonText?: string;
  showCancelButton?: boolean;
  className?: string;
}

export default function EventForm({
  onSuccess,
  onCancel,
  submitButtonText = "Créer l'événement",
  cancelButtonText = "Annuler",
  showCancelButton = true,
  className,
}: EventFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const { isAuthenticated, isLoading: authLoading } = useAuthCheck();
  const [formData, setFormData] = useState<EventFormData>({
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
  const [errors, setErrors] = useState<EventFormErrors>({});

  const validateField = (field: keyof EventFormData, value: any) => {
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

  const handleInputChange = (field: keyof EventFormData, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    validateField(field, value);
  };

  const validateForm = () => {
    const requiredFields: (keyof EventFormData)[] = [
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

  const resetForm = () => {
    setFormData({
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
    setErrors({});
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      toast.error("Veuillez corriger les erreurs du formulaire");
      return;
    }

    if (!isAuthenticated) {
      toast.error("Vous devez être connecté pour créer un événement");
      router.push("/registration");
      return;
    }

    setLoading(true);

    try {
      // Combiner la date et l'heure
      const dateTime =
        formData.date && formData.heure ? new Date(formData.date) : null;

      if (dateTime && formData.heure) {
        const [hours, minutes] = formData.heure.split(":");
        dateTime.setHours(parseInt(hours), parseInt(minutes), 0, 0);
      }

      const eventData: EventCreateData = {
        nom: formData.nom.trim(),
        description: formData.description.trim(),
        categorie: formData.categorie,
        lieu: formData.lieu.trim(),
        date_et_heure: dateTime?.toISOString() || "",
        nombre_max_participants: formData.nombre_max_participants || null,
        prix: formData.prix || null,
        image_url: formData.image_url.trim() || null,
      };

      const newEvent = await createEvent(eventData);
      toast.success("Événement créé avec succès !");

      // Réinitialiser le formulaire
      resetForm();

      // Appeler le callback de succès si fourni
      if (onSuccess) {
        onSuccess();
      }
    } catch (error) {
      console.error("Erreur lors de la création:", error);
      toast.error(
        error instanceof Error ? error.message : "Erreur lors de la création"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className={cn("space-y-6", className)}>
      {/* Titre */}
      <div className="space-y-2">
        <label htmlFor="nom" className="text-sm font-medium">
          Titre de l'événement *
        </label>
        <Input
          id="nom"
          value={formData.nom}
          onChange={(e) => handleInputChange("nom", e.target.value)}
          placeholder="Ex: Conférence sur l'IA"
          className={cn(errors.nom && "border-red-500")}
        />
        {errors.nom && <p className="text-sm text-red-500">{errors.nom}</p>}
      </div>

      {/* Description */}
      <div className="space-y-2">
        <label htmlFor="description" className="text-sm font-medium">
          Description *
        </label>
        <Textarea
          id="description"
          value={formData.description}
          onChange={(e) => handleInputChange("description", e.target.value)}
          placeholder="Décrivez votre événement..."
          rows={4}
          className={cn(errors.description && "border-red-500")}
        />
        {errors.description && (
          <p className="text-sm text-red-500">{errors.description}</p>
        )}
      </div>

      {/* Catégorie et Lieu */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <label htmlFor="categorie" className="text-sm font-medium">
            Catégorie *
          </label>
          <Select
            value={formData.categorie}
            onValueChange={(value) => handleInputChange("categorie", value)}
          >
            <SelectTrigger className={cn(errors.categorie && "border-red-500")}>
              <SelectValue placeholder="Sélectionner une catégorie" />
            </SelectTrigger>
            <SelectContent>
              {EVENT_CATEGORIES.map((category) => (
                <SelectItem key={category} value={category}>
                  {category}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {errors.categorie && (
            <p className="text-sm text-red-500">{errors.categorie}</p>
          )}
        </div>

        <div className="space-y-2">
          <label htmlFor="lieu" className="text-sm font-medium">
            Lieu *
          </label>
          <div className="relative">
            <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              id="lieu"
              value={formData.lieu}
              onChange={(e) => handleInputChange("lieu", e.target.value)}
              placeholder="Adresse ou lieu"
              className={cn("pl-10", errors.lieu && "border-red-500")}
            />
          </div>
          {errors.lieu && <p className="text-sm text-red-500">{errors.lieu}</p>}
        </div>
      </div>

      {/* Date et Heure */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="text-sm font-medium">Date *</label>
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
            <PopoverContent className="w-auto p-0">
              <Calendar
                mode="single"
                selected={formData.date}
                onSelect={(date) => handleInputChange("date", date)}
                initialFocus
                disabled={(date) => date < new Date()}
              />
            </PopoverContent>
          </Popover>
          {errors.date && <p className="text-sm text-red-500">{errors.date}</p>}
        </div>

        <div className="space-y-2">
          <label htmlFor="heure" className="text-sm font-medium">
            Heure *
          </label>
          <div className="relative">
            <Clock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              id="heure"
              type="time"
              value={formData.heure}
              onChange={(e) => handleInputChange("heure", e.target.value)}
              className={cn("pl-10", errors.heure && "border-red-500")}
            />
          </div>
          {errors.heure && (
            <p className="text-sm text-red-500">{errors.heure}</p>
          )}
        </div>
      </div>

      {/* Participants max et Prix */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <label htmlFor="participants" className="text-sm font-medium">
            Nombre max de participants
          </label>
          <div className="relative">
            <Users className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              id="participants"
              type="number"
              min="1"
              value={formData.nombre_max_participants || ""}
              onChange={(e) =>
                handleInputChange(
                  "nombre_max_participants",
                  e.target.value ? parseInt(e.target.value) : undefined
                )
              }
              placeholder="Illimité"
              className="pl-10"
            />
          </div>
        </div>

        <div className="space-y-2">
          <label htmlFor="prix" className="text-sm font-medium">
            Prix (€)
          </label>
          <div className="relative">
            <Euro className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              id="prix"
              type="number"
              min="0"
              step="0.01"
              value={formData.prix || ""}
              onChange={(e) =>
                handleInputChange(
                  "prix",
                  e.target.value ? parseFloat(e.target.value) : undefined
                )
              }
              placeholder="Gratuit"
              className="pl-10"
            />
          </div>
        </div>
      </div>

      {/* URL de l'image */}
      <div className="space-y-2">
        <label htmlFor="image_url" className="text-sm font-medium">
          URL de l'image
        </label>
        <div className="relative">
          <ImageIcon className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            id="image_url"
            type="url"
            value={formData.image_url}
            onChange={(e) => handleInputChange("image_url", e.target.value)}
            placeholder="https://exemple.com/image.jpg"
            className="pl-10"
          />
        </div>
      </div>

      {/* Boutons */}
      <div className="flex justify-end gap-3 pt-4">
        {showCancelButton && (
          <Button
            type="button"
            variant="outline"
            onClick={onCancel}
            disabled={loading}
          >
            {cancelButtonText}
          </Button>
        )}
        <Button type="submit" disabled={loading}>
          {loading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Création...
            </>
          ) : (
            submitButtonText
          )}
        </Button>
      </div>
    </form>
  );
}
