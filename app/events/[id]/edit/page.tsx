"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { getEventById, updateEvent } from "@/api/events";
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
import { toast } from "sonner";



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

export default function EditEventPage() {
  const router = useRouter();
  const params = useParams();
  const eventId = params?.id;
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    nom: "",
    description: "",
    categorie: "",
    lieu: "",
    date: "",
    heure: "",
    nombre_max_participants: 0,
    prix: 0,
    image_url: "",
  });
  const [errors, setErrors] = useState<any>({});

  useEffect(() => {
    if (!eventId) return;
    const fetchEvent = async () => {
      try {
        const event = await getEventById(eventId);
        let date = "";
        let heure = "";
        if (event.date_et_heure) {
          date = event.date_et_heure.substring(0, 10);
          heure = event.date_et_heure.substring(11, 16);
        } else {
          date = event.date ? event.date.substring(0, 10) : "";
          heure = event.heure || "";
        }
        setFormData({
          nom: event.nom || "",
          description: event.description || "",
          categorie: event.categorie || "",
          lieu: event.lieu || "",
          date,
          heure,
          nombre_max_participants: event.nombre_max_participants || 0,
          prix: event.prix || 0,
          image_url: event.image_url || "",
        });
      } catch (err) {
        toast.error("Erreur lors du chargement de l'événement");
        router.push("/admin");
      } finally {
        setLoading(false);
      }
    };
    fetchEvent();
  }, [eventId, router]);

  const handleInputChange = (field: string, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const eventData = {
        ...formData,
        date_et_heure: `${formData.date}T${formData.heure}:00Z`,
        image_url: formData.image_url || null,
      };
      await updateEvent(eventId, eventData);
      toast.success("Événement modifié avec succès !");
      router.push("/admin");
    } catch (err) {
      toast.error("Erreur lors de la modification de l'événement");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="p-8 text-center">Chargement...</div>;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-100 via-blue-100 to-white">
      <Card className="w-full max-w-2xl bg-white/90 shadow-2xl">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-indigo-700 mb-2">
            Modifier votre événement
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block font-semibold mb-1">Titre</label>
              <Input
                value={formData.nom}
                onChange={(e) => handleInputChange("nom", e.target.value)}
                required
              />
            </div>
            <div>
              <label className="block font-semibold mb-1">Description</label>
              <Textarea
                value={formData.description}
                onChange={(e) =>
                  handleInputChange("description", e.target.value)
                }
                required
              />
            </div>
            <div>
              <label className="block font-semibold mb-1">Catégorie</label>
              <Select
                value={formData.categorie}
                onValueChange={(v) => handleInputChange("categorie", v)}
                required
              >
                <SelectTrigger>
                  <SelectValue placeholder="Choisissez une catégorie" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((cat) => (
                    <SelectItem key={cat} value={cat}>
                      {cat}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="block font-semibold mb-1">Lieu</label>
              <Input
                value={formData.lieu}
                onChange={(e) => handleInputChange("lieu", e.target.value)}
                required
              />
            </div>
            <div className="flex gap-4">
              <div className="flex-1">
                <label className="block font-semibold mb-1">Date</label>
                <Input
                  type="date"
                  value={formData.date}
                  onChange={(e) => handleInputChange("date", e.target.value)}
                  required
                />
              </div>
              <div className="flex-1">
                <label className="block font-semibold mb-1">Heure</label>
                <Input
                  type="time"
                  value={formData.heure}
                  onChange={(e) => handleInputChange("heure", e.target.value)}
                  required
                />
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex-1">
                <label className="block font-semibold mb-1">Capacité max</label>
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
                  required
                />
              </div>
              <div className="flex-1">
                <label className="block font-semibold mb-1">Prix (€)</label>
                <Input
                  type="number"
                  value={formData.prix}
                  onChange={(e) =>
                    handleInputChange("prix", Number(e.target.value))
                  }
                  min={0}
                  step={0.01}
                  required
                />
              </div>
            </div>
            <div>
              <label className="block font-semibold mb-1">Image (URL)</label>
              <Input
                type="url"
                value={formData.image_url || ""}
                onChange={(e) => handleInputChange("image_url", e.target.value)}
                placeholder="https://..."
              />
            </div>
            <div className="flex justify-end gap-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => router.push("/admin")}
              >
                Annuler
              </Button>
              <Button
                type="submit"
                className="bg-indigo-600 hover:bg-indigo-700 text-white"
              >
                Enregistrer les modifications
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
