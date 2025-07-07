"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuthCheck } from "@/hooks/useAuth";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import {
  User,
  Mail,
  Calendar,
  MapPin,
  Edit3,
  Save,
  X,
  Camera,
  Shield,
  Heart,
  Users,
  Star,
  Trophy,
  Clock,
  ArrowLeft,
} from "lucide-react";
import { toast } from "sonner";
import Link from "next/link";

interface UserProfile {
  id: number;
  nom: string;
  email: string;
  bio?: string;
  ville?: string;
  dateInscription?: string;
  avatar?: string;
  role?: string;
}

export default function ProfilePage() {
  const router = useRouter();
  const { user, isAuthenticated, isLoading } = useAuthCheck();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [editedProfile, setEditedProfile] = useState<Partial<UserProfile>>({});
  const [userStats, setUserStats] = useState({
    eventsCreated: 0,
    eventsJoined: 0,
    favorites: 0,
  });

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push("/connect");
      return;
    }

    if (isAuthenticated && user) {
      fetchUserProfile();
      fetchUserStats();
    }
  }, [isAuthenticated, isLoading, user, router]);

  const fetchUserProfile = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      
      // Récupérer les données utilisateur depuis l'API
      const response = await fetch(
        `https://eventconnectes-backend.pphilibert-web.eu/api/utilisateurs/${user?.id}`,
        {
          headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error("Erreur lors de la récupération du profil");
      }

      const userData = await response.json();
      
      const profileData: UserProfile = {
        id: userData.id,
        nom: userData.nom,
        email: userData.email,
        bio: userData.bio || "Aucune biographie renseignée.",
        ville: userData.ville || "Non renseigné",
        dateInscription: userData.date_inscription,
        avatar: userData.photo_profil || "",
        role: userData.role || "utilisateur",
      };
      
      setProfile(profileData);
      setEditedProfile(profileData);
    } catch (error) {
      console.error("Erreur lors de la récupération du profil:", error);
      toast.error("Erreur lors du chargement du profil");
    } finally {
      setLoading(false);
    }
  };

  const fetchUserStats = async () => {
    try {
      const token = localStorage.getItem("token");
      
      // Récupérer les statistiques depuis l'API
      const [eventsResponse, inscriptionsResponse, favoritesResponse] = await Promise.all([
        // Événements créés
        fetch(
          `https://eventconnectes-backend.pphilibert-web.eu/api/evenements/createur/${user?.id}`,
          {
            headers: {
              "Authorization": `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        ),
        // Inscriptions/participations
        fetch(
          `https://eventconnectes-backend.pphilibert-web.eu/api/inscriptions/utilisateur/${user?.id}`,
          {
            headers: {
              "Authorization": `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        ),
        // Favoris
        fetch(
          `https://eventconnectes-backend.pphilibert-web.eu/api/favoris/utilisateur/${user?.id}`,
          {
            headers: {
              "Authorization": `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        ),
      ]);

      const eventsData = eventsResponse.ok ? await eventsResponse.json() : [];
      const inscriptionsData = inscriptionsResponse.ok ? await inscriptionsResponse.json() : [];
      const favoritesData = favoritesResponse.ok ? await favoritesResponse.json() : [];

      setUserStats({
        eventsCreated: Array.isArray(eventsData) ? eventsData.length : 0,
        eventsJoined: Array.isArray(inscriptionsData) ? inscriptionsData.length : 0,
        favorites: Array.isArray(favoritesData) ? favoritesData.length : 0,
      });
    } catch (error) {
      console.error("Erreur lors de la récupération des statistiques:", error);
      // Fallback en cas d'erreur
      setUserStats({
        eventsCreated: 0,
        eventsJoined: 0,
        favorites: 0,
      });
    }
  };

  const handleSave = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      
      // Sauvegarder le profil via l'API
      const response = await fetch(
        `https://eventconnectes-backend.pphilibert-web.eu/api/utilisateurs/${user?.id}`,
        {
          method: "PUT",
          headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            nom: editedProfile.nom,
            bio: editedProfile.bio,
            ville: editedProfile.ville,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Erreur lors de la mise à jour du profil");
      }

      setProfile({ ...profile, ...editedProfile } as UserProfile);
      setEditing(false);
      toast.success("Profil mis à jour avec succès !");
    } catch (error) {
      console.error("Erreur lors de la sauvegarde:", error);
      toast.error("Erreur lors de la mise à jour du profil");
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setEditedProfile(profile || {});
    setEditing(false);
  };

  const getUserInitials = () => {
    if (!profile?.nom) return "U";
    return profile.nom
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("fr-FR", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  if (isLoading || loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-primary/10 flex items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-primary/10">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-grid-pattern opacity-5" />

      <div className="container mx-auto px-4 py-8 relative">
        {/* Header avec bouton retour */}
        <div className="flex items-center gap-4 mb-8">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => router.back()}
            className="hover:bg-white/20"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div>
            <h1 className="text-3xl font-bold text-foreground">Mon Profil</h1>
            <p className="text-muted-foreground">
              Gérez vos informations personnelles
            </p>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Profil principal */}
          <div className="lg:col-span-2 space-y-6">
            <Card className="border-0 shadow-xl bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2">
                    <User className="h-5 w-5 text-primary" />
                    Informations personnelles
                  </CardTitle>
                  {!editing ? (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setEditing(true)}
                      className="gap-2"
                    >
                      <Edit3 className="h-4 w-4" />
                      Modifier
                    </Button>
                  ) : (
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={handleCancel}
                        className="gap-2"
                      >
                        <X className="h-4 w-4" />
                        Annuler
                      </Button>
                      <Button
                        size="sm"
                        onClick={handleSave}
                        className="gap-2"
                        disabled={loading}
                      >
                        <Save className="h-4 w-4" />
                        Sauvegarder
                      </Button>
                    </div>
                  )}
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Avatar et nom */}
                <div className="flex items-center gap-6">
                  <div className="relative">
                    <Avatar className="h-24 w-24 border-4 border-white shadow-lg">
                      <AvatarImage src={profile?.avatar} alt={profile?.nom} />
                      <AvatarFallback className="bg-primary text-white text-lg font-semibold">
                        {getUserInitials()}
                      </AvatarFallback>
                    </Avatar>
                    {editing && (
                      <Button
                        size="icon"
                        variant="secondary"
                        className="absolute -bottom-2 -right-2 h-8 w-8 rounded-full shadow-lg"
                      >
                        <Camera className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                  <div className="flex-1">
                    {editing ? (
                      <Input
                        value={editedProfile.nom || ""}
                        onChange={(e) =>
                          setEditedProfile({ ...editedProfile, nom: e.target.value })
                        }
                        className="text-xl font-semibold"
                        placeholder="Votre nom"
                      />
                    ) : (
                      <h2 className="text-2xl font-bold text-foreground">
                        {profile?.nom}
                      </h2>
                    )}
                    <div className="flex items-center gap-2 mt-1">
                      <Badge variant="secondary" className="gap-1">
                        <Shield className="h-3 w-3" />
                        {profile?.role === "admin" ? "Administrateur" : "Utilisateur"}
                      </Badge>
                    </div>
                  </div>
                </div>

                <Separator />

                {/* Informations détaillées */}
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <label className="text-sm font-medium text-muted-foreground mb-2 block">
                        Email
                      </label>
                      <div className="flex items-center gap-2 p-3 bg-muted/50 rounded-lg">
                        <Mail className="h-4 w-4 text-muted-foreground" />
                        <span className="text-foreground">{profile?.email}</span>
                      </div>
                    </div>

                    <div>
                      <label className="text-sm font-medium text-muted-foreground mb-2 block">
                        Ville
                      </label>
                      {editing ? (
                        <Input
                          value={editedProfile.ville || ""}
                          onChange={(e) =>
                            setEditedProfile({ ...editedProfile, ville: e.target.value })
                          }
                          placeholder="Votre ville"
                          className="gap-2"
                        />
                      ) : (
                        <div className="flex items-center gap-2 p-3 bg-muted/50 rounded-lg">
                          <MapPin className="h-4 w-4 text-muted-foreground" />
                          <span className="text-foreground">
                            {profile?.ville || "Non renseigné"}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <label className="text-sm font-medium text-muted-foreground mb-2 block">
                        Membre depuis
                      </label>
                      <div className="flex items-center gap-2 p-3 bg-muted/50 rounded-lg">
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                        <span className="text-foreground">
                          {profile?.dateInscription ? formatDate(profile.dateInscription) : "Non disponible"}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Biographie */}
                <div>
                  <label className="text-sm font-medium text-muted-foreground mb-2 block">
                    Biographie
                  </label>
                  {editing ? (
                    <Textarea
                      value={editedProfile.bio || ""}
                      onChange={(e) =>
                        setEditedProfile({ ...editedProfile, bio: e.target.value })
                      }
                      placeholder="Parlez-nous de vous..."
                      className="min-h-[100px]"
                    />
                  ) : (
                    <div className="p-3 bg-muted/50 rounded-lg">
                      <p className="text-foreground">
                        {profile?.bio || "Aucune biographie renseignée."}
                      </p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar avec statistiques et actions */}
          <div className="space-y-6">
            {/* Statistiques */}
            <Card className="border-0 shadow-xl bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Trophy className="h-5 w-5 text-primary" />
                  Mes statistiques
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 gap-4">
                  <div className="text-center p-4 bg-gradient-to-r from-blue-500/10 to-blue-600/10 rounded-lg border border-blue-200/20">
                    <div className="text-2xl font-bold text-blue-600">
                      {userStats.eventsCreated}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      Événements créés
                    </div>
                  </div>
                  
                  <div className="text-center p-4 bg-gradient-to-r from-green-500/10 to-green-600/10 rounded-lg border border-green-200/20">
                    <div className="text-2xl font-bold text-green-600">
                      {userStats.eventsJoined}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      Participations
                    </div>
                  </div>
                  
                  <div className="text-center p-4 bg-gradient-to-r from-pink-500/10 to-pink-600/10 rounded-lg border border-pink-200/20">
                    <div className="text-2xl font-bold text-pink-600">
                      {userStats.favorites}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      Favoris
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Actions rapides */}
            <Card className="border-0 shadow-xl bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Star className="h-5 w-5 text-primary" />
                  Actions rapides
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button
                  asChild
                  variant="outline"
                  className="w-full justify-start gap-2"
                >
                  <Link href="/events/create">
                    <Calendar className="h-4 w-4" />
                    Créer un événement
                  </Link>
                </Button>
                
                <Button
                  asChild
                  variant="outline"
                  className="w-full justify-start gap-2"
                >
                  <Link href="/favorites">
                    <Heart className="h-4 w-4" />
                    Mes favoris
                  </Link>
                </Button>
                
                <Button
                  asChild
                  variant="outline"
                  className="w-full justify-start gap-2"
                >
                  <Link href="/events">
                    <Users className="h-4 w-4" />
                    Découvrir des événements
                  </Link>
                </Button>
                
                <Button
                  asChild
                  variant="outline"
                  className="w-full justify-start gap-2"
                >
                  <Link href="/settings">
                    <Clock className="h-4 w-4" />
                    Paramètres
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
} 