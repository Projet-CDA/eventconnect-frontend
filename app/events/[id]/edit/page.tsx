"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { useAuthCheck } from "@/hooks/useAuth";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import {
  ArrowLeft,
  Save,
  Loader2,
  Calendar,
  Clock,
  MapPin,
  Users,
  Euro,
  Tag,
  Eye,
  EyeOff,
  AlertCircle,
  CheckCircle,
  Trash2,
} from "lucide-react";
import { toast } from "sonner";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { EVENT_CATEGORIES } from "@/lib/constants";
import { getEventById, updateEvent } from "@/lib/services/eventService";

interface EventFormData {
  nom: string;
  description: string;
  categorie: string;
  lieu: string;
  date: string;
  heure: string;
  nombre_max_participants: number;
  prix: number;
  visibilite: string;
  image_url: string;
  contact_email: string;
  contact_phone: string;
  website: string;
  tags: string[];
}

export default function EditEventPage() {
  const params = useParams();
  const router = useRouter();
  const { isAuthenticated, isLoading: authLoading } = useAuthCheck();

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState<EventFormData>({
    nom: "",
    description: "",
    categorie: "",
    lieu: "",
    date: "",
    heure: "",
    nombre_max_participants: 0,
    prix: 0,
    visibilite: "public",
    image_url: "",
    contact_email: "",
    contact_phone: "",
    website: "",
    tags: [],
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [newTag, setNewTag] = useState("");

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/registration");
      return;
    }

    if (params.id) {
      fetchEventForEdit();
    }
  }, [params.id, isAuthenticated]);

  const fetchEventForEdit = async () => {
    try {
      setLoading(true);
      const event = await getEventById(params.id as string);

      // Séparer la date et l'heure
      const eventDate = new Date(event.date_et_heure);
      const dateStr = format(eventDate, "yyyy-MM-dd");
      const timeStr = format(eventDate, "HH:mm");

      setFormData({
        nom: event.nom || "",
        description: event.description || "",
        categorie: event.categorie || "",
        lieu: event.lieu || "",
        date: dateStr,
        heure: timeStr,
        nombre_max_participants: event.nombre_max_participants || 0,
        prix: event.prix || 0,
        visibilite: event.visibilite || "public",
        image_url: event.image_url || "",
        contact_email: event.contact_email || "",
        contact_phone: event.contact_phone || "",
        website: event.website || "",
        tags: event.tags || [],
      });

      setLoading(false);
    } catch (error) {
      console.error("Erreur lors du chargement de l'événement:", error);
      toast.error("Impossible de charger l'événement");
      setLoading(false);
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.nom.trim()) {
      newErrors.nom = "Le titre est requis";
    }

    if (!formData.description.trim()) {
      newErrors.description = "La description est requise";
    }

    if (!formData.categorie) {
      newErrors.categorie = "La catégorie est requise";
    }

    if (!formData.lieu.trim()) {
      newErrors.lieu = "Le lieu est requis";
    }

    if (!formData.date) {
      newErrors.date = "La date est requise";
    }

    if (!formData.heure) {
      newErrors.heure = "L'heure est requise";
    }

    if (formData.nombre_max_participants < 1) {
      newErrors.nombre_max_participants =
        "Le nombre de participants doit être supérieur à 0";
    }

    if (formData.prix < 0) {
      newErrors.prix = "Le prix ne peut pas être négatif";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (field: string, value: any) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));

    // Effacer l'erreur pour ce champ
    if (errors[field]) {
      setErrors((prev) => ({
        ...prev,
        [field]: "",
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      toast.error("Veuillez corriger les erreurs dans le formulaire");
      return;
    }

    try {
      setSaving(true);

      // Combiner la date et l'heure
      const dateTime = new Date(`${formData.date}T${formData.heure}`);

      const updatedEvent = {
        ...formData,
        date_et_heure: dateTime.toISOString(),
      };

      await updateEvent(params.id as string, updatedEvent);

      toast.success("Événement modifié avec succès !");
      router.push(`/events/${params.id}`);
    } catch (error) {
      console.error("Erreur lors de la modification:", error);
      toast.error("Erreur lors de la modification de l'événement");
    } finally {
      setSaving(false);
    }
  };

  const addTag = () => {
    if (newTag.trim() && !formData.tags.includes(newTag.trim())) {
      setFormData((prev) => ({
        ...prev,
        tags: [...prev.tags, newTag.trim()],
      }));
      setNewTag("");
    }
  };

  const removeTag = (tagToRemove: string) => {
    setFormData((prev) => ({
      ...prev,
      tags: prev.tags.filter((tag) => tag !== tagToRemove),
    }));
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addTag();
    }
  };

  if (authLoading || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-purple-50">
        <div className="text-center">
          <LoadingSpinner />
          <p className="mt-4 text-muted-foreground">Chargement...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary/10 via-primary/5 to-primary/10 border-b border-border/50">
        <div className="px-4 sm:px-6 lg:px-8 py-6">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center justify-between mb-6">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => router.back()}
                className="flex items-center gap-2"
              >
                <ArrowLeft className="h-4 w-4" />
                Retour
              </Button>
              <div className="flex items-center gap-2">
                <Badge variant="outline" className="text-sm">
                  Modification
                </Badge>
              </div>
            </div>
            <div className="text-center">
              <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
                Modifier l'événement
              </h1>
              <p className="text-muted-foreground">
                Mettez à jour les informations de votre événement
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Formulaire */}
      <div className="px-4 sm:px-6 lg:px-8 py-8">
        <div className="max-w-4xl mx-auto">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Informations principales */}
            <Card className="shadow-lg border-0">
              <CardHeader>
                <CardTitle className="text-xl flex items-center gap-2">
                  <Calendar className="h-5 w-5 text-primary" />
                  Informations principales
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block font-semibold mb-2">
                      Titre de l'événement *
                    </label>
                    <Input
                      value={formData.nom}
                      onChange={(e) => handleInputChange("nom", e.target.value)}
                      placeholder="Ex: Conférence sur l'IA"
                      className={errors.nom ? "border-red-500" : ""}
                    />
                    {errors.nom && (
                      <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                        <AlertCircle className="h-3 w-3" />
                        {errors.nom}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block font-semibold mb-2">
                      Catégorie *
                    </label>
                    <Select
                      value={formData.categorie}
                      onValueChange={(value) =>
                        handleInputChange("categorie", value)
                      }
                    >
                      <SelectTrigger
                        className={errors.categorie ? "border-red-500" : ""}
                      >
                        <SelectValue placeholder="Choisissez une catégorie" />
                      </SelectTrigger>
                      <SelectContent>
                        {EVENT_CATEGORIES.map((cat) => (
                          <SelectItem key={cat} value={cat}>
                            {cat}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {errors.categorie && (
                      <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                        <AlertCircle className="h-3 w-3" />
                        {errors.categorie}
                      </p>
                    )}
                  </div>
                </div>

                <div>
                  <label className="block font-semibold mb-2">
                    Description *
                  </label>
                  <Textarea
                    value={formData.description}
                    onChange={(e) =>
                      handleInputChange("description", e.target.value)
                    }
                    placeholder="Décrivez votre événement en détail..."
                    rows={4}
                    className={errors.description ? "border-red-500" : ""}
                  />
                  {errors.description && (
                    <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                      <AlertCircle className="h-3 w-3" />
                      {errors.description}
                    </p>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block font-semibold mb-2">Lieu *</label>
                    <Input
                      value={formData.lieu}
                      onChange={(e) =>
                        handleInputChange("lieu", e.target.value)
                      }
                      placeholder="Ex: Salle de conférence, Paris"
                      className={errors.lieu ? "border-red-500" : ""}
                    />
                    {errors.lieu && (
                      <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                        <AlertCircle className="h-3 w-3" />
                        {errors.lieu}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block font-semibold mb-2">
                      Visibilité
                    </label>
                    <Select
                      value={formData.visibilite}
                      onValueChange={(value) =>
                        handleInputChange("visibilite", value)
                      }
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="public">Public</SelectItem>
                        <SelectItem value="prive">Privé</SelectItem>
                        <SelectItem value="invitation">
                          Sur invitation
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Date et heure */}
            <Card className="shadow-lg border-0">
              <CardHeader>
                <CardTitle className="text-xl flex items-center gap-2">
                  <Clock className="h-5 w-5 text-primary" />
                  Date et heure
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block font-semibold mb-2">Date *</label>
                    <Input
                      type="date"
                      value={formData.date}
                      onChange={(e) =>
                        handleInputChange("date", e.target.value)
                      }
                      className={errors.date ? "border-red-500" : ""}
                    />
                    {errors.date && (
                      <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                        <AlertCircle className="h-3 w-3" />
                        {errors.date}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block font-semibold mb-2">Heure *</label>
                    <Input
                      type="time"
                      value={formData.heure}
                      onChange={(e) =>
                        handleInputChange("heure", e.target.value)
                      }
                      className={errors.heure ? "border-red-500" : ""}
                    />
                    {errors.heure && (
                      <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                        <AlertCircle className="h-3 w-3" />
                        {errors.heure}
                      </p>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Capacité et prix */}
            <Card className="shadow-lg border-0">
              <CardHeader>
                <CardTitle className="text-xl flex items-center gap-2">
                  <Users className="h-5 w-5 text-primary" />
                  Capacité et prix
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block font-semibold mb-2">
                      Nombre maximum de participants *
                    </label>
                    <Input
                      type="number"
                      value={formData.nombre_max_participants}
                      onChange={(e) =>
                        handleInputChange(
                          "nombre_max_participants",
                          Number(e.target.value)
                        )
                      }
                      min={1}
                      placeholder="Ex: 50"
                      className={
                        errors.nombre_max_participants ? "border-red-500" : ""
                      }
                    />
                    {errors.nombre_max_participants && (
                      <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                        <AlertCircle className="h-3 w-3" />
                        {errors.nombre_max_participants}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block font-semibold mb-2">
                      Prix (€) *
                    </label>
                    <Input
                      type="number"
                      value={formData.prix}
                      onChange={(e) =>
                        handleInputChange("prix", Number(e.target.value))
                      }
                      min={0}
                      step={0.01}
                      placeholder="Ex: 25.00"
                      className={errors.prix ? "border-red-500" : ""}
                    />
                    {errors.prix && (
                      <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                        <AlertCircle className="h-3 w-3" />
                        {errors.prix}
                      </p>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Informations supplémentaires */}
            <Card className="shadow-lg border-0">
              <CardHeader>
                <CardTitle className="text-xl flex items-center gap-2">
                  <Tag className="h-5 w-5 text-primary" />
                  Informations supplémentaires
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <label className="block font-semibold mb-2">
                    URL de l'image
                  </label>
                  <Input
                    value={formData.image_url}
                    onChange={(e) =>
                      handleInputChange("image_url", e.target.value)
                    }
                    placeholder="https://example.com/image.jpg"
                    type="url"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block font-semibold mb-2">
                      Email de contact
                    </label>
                    <Input
                      value={formData.contact_email}
                      onChange={(e) =>
                        handleInputChange("contact_email", e.target.value)
                      }
                      placeholder="contact@example.com"
                      type="email"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold mb-2">
                      Téléphone de contact
                    </label>
                    <Input
                      value={formData.contact_phone}
                      onChange={(e) =>
                        handleInputChange("contact_phone", e.target.value)
                      }
                      placeholder="+33 1 23 45 67 89"
                      type="tel"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-semibold mb-2">Site web</label>
                  <Input
                    value={formData.website}
                    onChange={(e) =>
                      handleInputChange("website", e.target.value)
                    }
                    placeholder="https://example.com"
                    type="url"
                  />
                </div>

                <div>
                  <label className="block font-semibold mb-2">Tags</label>
                  <div className="space-y-3">
                    <div className="flex gap-2">
                      <Input
                        value={newTag}
                        onChange={(e) => setNewTag(e.target.value)}
                        onKeyPress={handleKeyPress}
                        placeholder="Ajouter un tag..."
                      />
                      <Button
                        type="button"
                        variant="outline"
                        onClick={addTag}
                        disabled={!newTag.trim()}
                      >
                        Ajouter
                      </Button>
                    </div>
                    {formData.tags.length > 0 && (
                      <div className="flex flex-wrap gap-2">
                        {formData.tags.map((tag, index) => (
                          <Badge
                            key={index}
                            variant="secondary"
                            className="flex items-center gap-1"
                          >
                            {tag}
                            <button
                              type="button"
                              onClick={() => removeTag(tag)}
                              className="ml-1 hover:text-red-500"
                            >
                              <Trash2 className="h-3 w-3" />
                            </button>
                          </Badge>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Actions */}
            <div className="flex gap-4 pt-6">
              <Button
                type="button"
                variant="outline"
                onClick={() => router.push(`/events/${params.id}`)}
                className="flex-1"
              >
                Annuler
              </Button>
              <Button type="submit" disabled={saving} className="flex-1">
                {saving ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Modification en cours...
                  </>
                ) : (
                  <>
                    <Save className="mr-2 h-4 w-4" />
                    Sauvegarder les modifications
                  </>
                )}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
