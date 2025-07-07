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
import { Progress } from "@/components/ui/progress";
import {
  UserPlus,
  Mail,
  Lock,
  User,
  Eye,
  EyeOff,
  ArrowRight,
  Calendar,
  Smartphone,
  CheckCircle2,
  AlertCircle,
  Loader2,
  Shield,
  Gift,
  Zap,
} from "lucide-react";
import { toast } from "sonner";

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

interface FormErrors {
  firstName?: string;
  lastName?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
}

export default function RegistrationPage() {
  const router = useRouter();
  const { login } = useAuthCheck();
  const [formData, setFormData] = useState<FormData>({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [acceptMarketing, setAcceptMarketing] = useState(true);
  const [step, setStep] = useState(1);

  const validateField = (field: keyof FormData, value: string) => {
    const newErrors = { ...errors };

    switch (field) {
      case "firstName":
        if (!value.trim()) {
          newErrors.firstName = "Le prénom est requis";
        } else if (value.trim().length < 2) {
          newErrors.firstName = "Le prénom doit contenir au moins 2 caractères";
        } else {
          delete newErrors.firstName;
        }
        break;

      case "lastName":
        if (!value.trim()) {
          newErrors.lastName = "Le nom est requis";
        } else if (value.trim().length < 2) {
          newErrors.lastName = "Le nom doit contenir au moins 2 caractères";
        } else {
          delete newErrors.lastName;
        }
        break;

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
        } else if (value.length < 8) {
          newErrors.password =
            "Le mot de passe doit contenir au moins 8 caractères";
        } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(value)) {
          newErrors.password =
            "Le mot de passe doit contenir au moins une majuscule, une minuscule et un chiffre";
        } else {
          delete newErrors.password;
        }
        break;

      case "confirmPassword":
        if (!value) {
          newErrors.confirmPassword = "Confirmez votre mot de passe";
        } else if (value !== formData.password) {
          newErrors.confirmPassword = "Les mots de passe ne correspondent pas";
        } else {
          delete newErrors.confirmPassword;
        }
        break;
    }

    setErrors(newErrors);
  };

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    validateField(field, value);
  };

  const getPasswordStrength = (password: string) => {
    let strength = 0;
    if (password.length >= 8) strength += 25;
    if (/[a-z]/.test(password)) strength += 25;
    if (/[A-Z]/.test(password)) strength += 25;
    if (/\d/.test(password)) strength += 25;
    return strength;
  };

  const getPasswordStrengthLabel = (strength: number) => {
    if (strength < 25) return "Très faible";
    if (strength < 50) return "Faible";
    if (strength < 75) return "Moyen";
    return "Fort";
  };

  const getPasswordStrengthColor = (strength: number) => {
    if (strength < 25) return "bg-red-500";
    if (strength < 50) return "bg-orange-500";
    if (strength < 75) return "bg-yellow-500";
    return "bg-green-500";
  };

  const canProceedToStep2 = () => {
    return (
      formData.firstName &&
      formData.lastName &&
      formData.email &&
      !errors.firstName &&
      !errors.lastName &&
      !errors.email
    );
  };

  const validateForm = () => {
    const requiredFields: (keyof FormData)[] = [
      "firstName",
      "lastName",
      "email",
      "password",
      "confirmPassword",
    ];

    requiredFields.forEach((field) => {
      validateField(field, formData[field]);
    });

    return Object.keys(errors).length === 0 && acceptTerms;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      toast.error("Veuillez corriger les erreurs du formulaire");
      return;
    }

    if (!acceptTerms) {
      toast.error("Vous devez accepter les conditions d'utilisation");
      return;
    }

    setLoading(true);

    try {
      // Inscription via l'API backend
      const registerResponse = await fetch(
        "https://eventconnectes-backend.pphilibert-web.eu/api/utilisateurs/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            nom: `${formData.firstName} ${formData.lastName}`,
            email: formData.email,
            mot_de_passe: formData.password,
          }),
        }
      );

      const registerData = await registerResponse.json();

      if (!registerResponse.ok) {
        throw new Error(registerData.message || "Erreur lors de l'inscription");
      }

      toast.success("Inscription réussie ! Connexion automatique...");

      // Connexion automatique après inscription
      const loginResponse = await fetch(
        "https://eventconnectes-backend.pphilibert-web.eu/api/utilisateurs/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: formData.email,
            mot_de_passe: formData.password,
          }),
        }
      );

      const loginData = await loginResponse.json();

      if (!loginResponse.ok) {
        throw new Error("Inscription réussie mais erreur de connexion");
      }

      // Sauvegarder le token et les données utilisateur
      login(loginData.token, {
        id: loginData.utilisateur.id,
        nom: loginData.utilisateur.nom,
        email: loginData.utilisateur.email,
      });

      toast.success("Bienvenue sur EventConnect ! 🎉");

      // Redirection vers la page des événements
      router.push("/events");
      // router.push('/dashboard');
    } catch (error: any) {
      console.error("Erreur lors de l'inscription:", error);
      toast.error(
        error.message || "Erreur lors de l'inscription. Veuillez réessayer."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleSocialLogin = (provider: string) => {
    toast.info(`Inscription avec ${provider} bientôt disponible`);
  };

  const progressValue = step === 1 ? 50 : 100;
  const passwordStrength = getPasswordStrength(formData.password);

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
            Créer votre compte
          </h1>
          <p className="text-muted-foreground">
            Rejoignez des milliers d'organisateurs d'événements
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

        {/* Progress */}
        <div className="mb-6">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-foreground">
              Étape {step} sur 2
            </span>
            <span className="text-sm text-muted-foreground">
              {progressValue}%
            </span>
          </div>
          <Progress value={progressValue} className="h-2" />
        </div>

        {/* Formulaire d'inscription */}
        <Card className="border-0 shadow-xl bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm">
          <CardContent className="p-6 sm:p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              {step === 1 ? (
                <>
                  {/* Étape 1: Informations personnelles */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-foreground mb-4">
                      Informations personnelles
                    </h3>

                    {/* Prénom */}
                    <div className="space-y-2">
                      <label className="block text-sm font-medium text-foreground">
                        Prénom *
                      </label>
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground h-5 w-5" />
                        <Input
                          type="text"
                          required
                          autoFocus
                          autoComplete="given-name"
                          placeholder="Votre prénom"
                          value={formData.firstName}
                          onChange={(e) =>
                            handleInputChange("firstName", e.target.value)
                          }
                          className={`pl-10 h-12 text-base ${
                            errors.firstName
                              ? "border-red-500 focus:border-red-500"
                              : "border-border focus:border-primary"
                          }`}
                        />
                        {errors.firstName && (
                          <div className="flex items-center gap-2 mt-1 text-red-600 text-sm">
                            <AlertCircle className="h-4 w-4" />
                            {errors.firstName}
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Nom */}
                    <div className="space-y-2">
                      <label className="block text-sm font-medium text-foreground">
                        Nom *
                      </label>
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground h-5 w-5" />
                        <Input
                          type="text"
                          required
                          autoComplete="family-name"
                          placeholder="Votre nom"
                          value={formData.lastName}
                          onChange={(e) =>
                            handleInputChange("lastName", e.target.value)
                          }
                          className={`pl-10 h-12 text-base ${
                            errors.lastName
                              ? "border-red-500 focus:border-red-500"
                              : "border-border focus:border-primary"
                          }`}
                        />
                        {errors.lastName && (
                          <div className="flex items-center gap-2 mt-1 text-red-600 text-sm">
                            <AlertCircle className="h-4 w-4" />
                            {errors.lastName}
                          </div>
                        )}
                      </div>
                    </div>

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
                          autoComplete="email"
                          placeholder="votre@email.com"
                          value={formData.email}
                          onChange={(e) =>
                            handleInputChange("email", e.target.value)
                          }
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
                  </div>

                  <Button
                    type="button"
                    disabled={!canProceedToStep2()}
                    onClick={() => setStep(2)}
                    className="w-full h-12 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold text-base"
                  >
                    Continuer
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </Button>
                </>
              ) : (
                <>
                  {/* Étape 2: Sécurité */}
                  <div className="space-y-4">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-semibold text-foreground">
                        Sécurité
                      </h3>
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => setStep(1)}
                        className="text-muted-foreground hover:text-foreground"
                      >
                        ← Retour
                      </Button>
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
                          autoComplete="new-password"
                          placeholder="Créer un mot de passe"
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
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          className="absolute right-2 top-1/2 -translate-y-1/2 h-8 w-8"
                          onClick={() => setShowPassword(!showPassword)}
                        >
                          {showPassword ? (
                            <EyeOff className="h-4 w-4 text-muted-foreground" />
                          ) : (
                            <Eye className="h-4 w-4 text-muted-foreground" />
                          )}
                        </Button>
                      </div>

                      {/* Force du mot de passe */}
                      {formData.password && (
                        <div className="space-y-2">
                          <div className="flex justify-between items-center">
                            <span className="text-sm text-muted-foreground">
                              Force du mot de passe
                            </span>
                            <span
                              className={`text-sm font-medium ${
                                passwordStrength < 50
                                  ? "text-red-600"
                                  : passwordStrength < 75
                                  ? "text-yellow-600"
                                  : "text-green-600"
                              }`}
                            >
                              {getPasswordStrengthLabel(passwordStrength)}
                            </span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div
                              className={`h-2 rounded-full transition-all duration-300 ${getPasswordStrengthColor(
                                passwordStrength
                              )}`}
                              style={{ width: `${passwordStrength}%` }}
                            />
                          </div>
                        </div>
                      )}

                      {errors.password && (
                        <div className="flex items-center gap-2 mt-1 text-red-600 text-sm">
                          <AlertCircle className="h-4 w-4" />
                          {errors.password}
                        </div>
                      )}
                    </div>

                    {/* Confirmation mot de passe */}
                    <div className="space-y-2">
                      <label className="block text-sm font-medium text-foreground">
                        Confirmer le mot de passe *
                      </label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground h-5 w-5" />
                        <Input
                          type={showConfirmPassword ? "text" : "password"}
                          required
                          autoComplete="new-password"
                          placeholder="Confirmer votre mot de passe"
                          value={formData.confirmPassword}
                          onChange={(e) =>
                            handleInputChange("confirmPassword", e.target.value)
                          }
                          className={`pl-10 pr-10 h-12 text-base ${
                            errors.confirmPassword
                              ? "border-red-500 focus:border-red-500"
                              : "border-border focus:border-primary"
                          }`}
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          className="absolute right-2 top-1/2 -translate-y-1/2 h-8 w-8"
                          onClick={() =>
                            setShowConfirmPassword(!showConfirmPassword)
                          }
                        >
                          {showConfirmPassword ? (
                            <EyeOff className="h-4 w-4 text-muted-foreground" />
                          ) : (
                            <Eye className="h-4 w-4 text-muted-foreground" />
                          )}
                        </Button>
                        {errors.confirmPassword && (
                          <div className="flex items-center gap-2 mt-1 text-red-600 text-sm">
                            <AlertCircle className="h-4 w-4" />
                            {errors.confirmPassword}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Conditions */}
                  <div className="space-y-4">
                    <div className="flex items-start space-x-3">
                      <Checkbox
                        id="terms"
                        checked={acceptTerms}
                        onCheckedChange={(checked) =>
                          setAcceptTerms(checked as boolean)
                        }
                        className="mt-1"
                      />
                      <label
                        htmlFor="terms"
                        className="text-sm text-muted-foreground cursor-pointer leading-relaxed"
                      >
                        J'accepte les{" "}
                        <Link
                          href="/terms"
                          className="text-primary hover:underline font-medium"
                        >
                          conditions d'utilisation
                        </Link>{" "}
                        et la{" "}
                        <Link
                          href="/privacy"
                          className="text-primary hover:underline font-medium"
                        >
                          politique de confidentialité
                        </Link>
                      </label>
                    </div>

                    <div className="flex items-start space-x-3">
                      <Checkbox
                        id="marketing"
                        checked={acceptMarketing}
                        onCheckedChange={(checked) =>
                          setAcceptMarketing(checked as boolean)
                        }
                        className="mt-1"
                      />
                      <label
                        htmlFor="marketing"
                        className="text-sm text-muted-foreground cursor-pointer"
                      >
                        Je souhaite recevoir des informations sur les nouveautés
                        et événements
                      </label>
                    </div>
                  </div>

                  {/* Bouton d'inscription */}
                  <Button
                    type="submit"
                    disabled={loading || !acceptTerms}
                    className="w-full h-12 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold text-base shadow-lg hover:shadow-xl transition-all duration-200"
                  >
                    {loading ? (
                      <>
                        <Loader2 className="h-5 w-5 mr-2 animate-spin" />
                        Création du compte...
                      </>
                    ) : (
                      <>
                        <UserPlus className="h-5 w-5 mr-2" />
                        Créer mon compte
                        <ArrowRight className="h-4 w-4 ml-2" />
                      </>
                    )}
                  </Button>
                </>
              )}
            </form>

            {step === 1 && (
              <>
                {/* Séparateur */}
                <div className="my-6">
                  <Separator className="my-4" />
                  <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                      <Separator />
                    </div>
                    <div className="relative flex justify-center text-xs uppercase">
                      <span className="bg-background px-2 text-muted-foreground">
                        Ou s'inscrire avec
                      </span>
                    </div>
                  </div>
                </div>

                {/* Inscription sociale */}
                <div className="space-y-3">
                  <Button
                    type="button"
                    variant="outline"
                    className="w-full h-12 font-medium text-base"
                    onClick={() => handleSocialLogin("Google")}
                  >
                    <svg className="h-5 w-5 mr-3" viewBox="0 0 24 24">
                      <path
                        fill="#4285F4"
                        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                      />
                      <path
                        fill="#34A853"
                        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                      />
                      <path
                        fill="#FBBC05"
                        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                      />
                      <path
                        fill="#EA4335"
                        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                      />
                    </svg>
                    Continuer avec Google
                  </Button>

                  <Button
                    type="button"
                    variant="outline"
                    className="w-full h-12 font-medium text-base bg-[#1877F2] hover:bg-[#1877F2]/90 text-white border-[#1877F2]"
                    onClick={() => handleSocialLogin("Facebook")}
                  >
                    <svg
                      className="h-5 w-5 mr-3"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                    </svg>
                    Continuer avec Facebook
                  </Button>
                </div>
              </>
            )}
          </CardContent>
        </Card>

        {/* Lien de connexion */}
        <div className="mt-6 text-center">
          <p className="text-muted-foreground">
            Déjà un compte ?{" "}
            <Link
              href="/connect"
              className="text-primary font-semibold hover:underline"
            >
              Se connecter
            </Link>
          </p>
        </div>

        {/* Fonctionnalités mobiles */}
        <div className="mt-8 text-center">
          <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground mb-2">
            <Smartphone className="h-4 w-4" />
            Rejoignez la communauté mobile
          </div>
          <div className="flex justify-center gap-4 text-xs text-muted-foreground">
            <div className="flex items-center gap-1">
              <CheckCircle2 className="h-3 w-3 text-green-500" />
              Accès gratuit
            </div>
            <div className="flex items-center gap-1">
              <CheckCircle2 className="h-3 w-3 text-green-500" />
              Support 24/7
            </div>
            <div className="flex items-center gap-1">
              <CheckCircle2 className="h-3 w-3 text-green-500" />
              Communauté active
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
