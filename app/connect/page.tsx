"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuthCheck } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";
import {
  LogIn,
  Mail,
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
  AlertCircle,
  Loader2,
  Shield,
  Gift,
  Zap,
  Calendar,
} from "lucide-react";
import { toast } from "sonner";

interface FormData {
  email: string;
  password: string;
}

interface FormErrors {
  email?: string;
  password?: string;
}

export default function ConnectPage() {
  const router = useRouter();
  const { login } = useAuthCheck();
  const [formData, setFormData] = useState<FormData>({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const validateField = (field: keyof FormData, value: string) => {
    const newErrors = { ...errors };

    switch (field) {
      case "email":
        if (!value) {
          newErrors.email = "L'email est requis";
        } else if (!/\S+@\S+\.\S+/.test(value)) {
          newErrors.email = "Format d'email invalide";
        } else {
          delete newErrors.email;
        }
        break;

      case "password":
        if (!value) {
          newErrors.password = "Le mot de passe est requis";
        } else {
          delete newErrors.password;
        }
        break;
    }

    setErrors(newErrors);
  };

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    validateField(field, value);
  };

  const validateForm = () => {
    const requiredFields: (keyof FormData)[] = ["email", "password"];

    requiredFields.forEach((field) => {
      validateField(field, formData[field]);
    });

    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      toast.error("Veuillez corriger les erreurs du formulaire");
      return;
    }

    setLoading(true);

    try {
      // Connexion via le service d'authentification
      const { loginUser } = await import("@/lib/services/authService");

      const loginData = await loginUser({
        email: formData.email,
        mot_de_passe: formData.password,
      });

      // Sauvegarder le token et les données utilisateur
      login(loginData.token, {
        id: loginData.utilisateur.id,
        nom: loginData.utilisateur.nom,
        email: loginData.utilisateur.email,
      });

      toast.success("Connexion réussie ! Bienvenue ! 🎉");

      // Redirection vers la page des événements
      router.push("/events");
    } catch (error: any) {
      console.error("Erreur lors de la connexion:", error);
      toast.error(
        error.message || "Erreur lors de la connexion. Veuillez réessayer."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleSocialLogin = (provider: string) => {
    toast.info(`Connexion avec ${provider} bientôt disponible`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-primary/10 flex items-center justify-center p-4">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-grid-pattern opacity-5" />

      <div className="w-full max-w-md relative animate-fade-in">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="bg-primary/10 p-4 rounded-full w-20 h-20 mx-auto mb-4 flex items-center justify-center">
            <Calendar className="h-10 w-10 text-primary" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-foreground mb-2">
            Connexion
          </h1>
          <p className="text-muted-foreground">
            Accédez à votre compte EventConnect
          </p>
        </div>

        {/* Avantages */}
        <div className="grid grid-cols-3 gap-2 mb-6">
          <div className="text-center p-3 bg-gradient-to-br from-blue-500/10 to-blue-600/20 rounded-xl border border-blue-200/20">
            <Gift className="h-5 w-5 text-blue-600 mx-auto mb-1" />
            <span className="text-xs font-medium text-blue-900 dark:text-blue-100">
              Gratuit
            </span>
          </div>
          <div className="text-center p-3 bg-gradient-to-br from-green-500/10 to-green-600/20 rounded-xl border border-green-200/20">
            <Shield className="h-5 w-5 text-green-600 mx-auto mb-1" />
            <span className="text-xs font-medium text-green-900 dark:text-green-100">
              Sécurisé
            </span>
          </div>
          <div className="text-center p-3 bg-gradient-to-br from-purple-500/10 to-purple-600/20 rounded-xl border border-purple-200/20">
            <Zap className="h-5 w-5 text-purple-600 mx-auto mb-1" />
            <span className="text-xs font-medium text-purple-900 dark:text-purple-100">
              Rapide
            </span>
          </div>
        </div>

        {/* Formulaire de connexion */}
        <Card className="border-0 shadow-xl bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm">
          <CardContent className="p-6 sm:p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Email */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-foreground">
                  Adresse e-mail *
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground h-5 w-5" />
                  <Input
                    type="email"
                    required
                    autoFocus
                    autoComplete="email"
                    placeholder="votre@email.com"
                    value={formData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    className={`pl-10 h-12 text-base ${
                      errors.email
                        ? "border-red-500 focus:border-red-500"
                        : "border-border focus:border-primary"
                    }`}
                  />
                  {errors.email && (
                    <div className="flex items-center gap-2 mt-1 text-red-600 text-sm">
                      <AlertCircle className="h-4 w-4" />
                      {errors.email}
                    </div>
                  )}
                </div>
              </div>

              {/* Mot de passe */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-foreground">
                  Mot de passe *
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground h-5 w-5" />
                  <Input
                    type={showPassword ? "text" : "password"}
                    required
                    autoComplete="current-password"
                    placeholder="Votre mot de passe"
                    value={formData.password}
                    onChange={(e) =>
                      handleInputChange("password", e.target.value)
                    }
                    className={`pl-10 pr-10 h-12 text-base ${
                      errors.password
                        ? "border-red-500 focus:border-red-500"
                        : "border-border focus:border-primary"
                    }`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  >
                    {showPassword ? (
                      <EyeOff className="h-5 w-5" />
                    ) : (
                      <Eye className="h-5 w-5" />
                    )}
                  </button>
                  {errors.password && (
                    <div className="flex items-center gap-2 mt-1 text-red-600 text-sm">
                      <AlertCircle className="h-4 w-4" />
                      {errors.password}
                    </div>
                  )}
                </div>
              </div>

              {/* Options */}
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="remember"
                    checked={rememberMe}
                    onCheckedChange={(checked) =>
                      setRememberMe(checked as boolean)
                    }
                  />
                  <label
                    htmlFor="remember"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Se souvenir de moi
                  </label>
                </div>
                <Link
                  href="/forgot-password"
                  className="text-sm text-primary hover:underline"
                >
                  Mot de passe oublié ?
                </Link>
              </div>

              {/* Bouton de connexion */}
              <Button
                type="submit"
                disabled={loading}
                className="w-full h-12 text-base font-semibold"
              >
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Connexion en cours...
                  </>
                ) : (
                  <>
                    <LogIn className="mr-2 h-4 w-4" />
                    Se connecter
                  </>
                )}
              </Button>

              {/* Séparateur */}
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <Separator className="w-full" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-background px-2 text-muted-foreground">
                    Ou continuer avec
                  </span>
                </div>
              </div>

              {/* Connexion sociale */}
              <div className="grid grid-cols-2 gap-3">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => handleSocialLogin("Google")}
                  className="h-12"
                >
                  <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24">
                    <path
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                      fill="#4285F4"
                    />
                    <path
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                      fill="#34A853"
                    />
                    <path
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                      fill="#FBBC05"
                    />
                    <path
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                      fill="#EA4335"
                    />
                  </svg>
                  Google
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => handleSocialLogin("Facebook")}
                  className="h-12"
                >
                  <svg
                    className="mr-2 h-4 w-4"
                    fill="#1877F2"
                    viewBox="0 0 24 24"
                  >
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                  </svg>
                  Facebook
                </Button>
              </div>

              {/* Lien vers l'inscription */}
              <div className="text-center">
                <p className="text-sm text-muted-foreground">
                  Pas encore de compte ?{" "}
                  <Link
                    href="/registration"
                    className="text-primary hover:underline font-medium"
                  >
                    Créer un compte
                  </Link>
                </p>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
