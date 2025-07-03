"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { Mail, Lock, Eye, EyeOff } from "lucide-react";
import { toast } from "sonner";
import { loginUser } from "../../api/login";

export default function ConnexionPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  // Pour l'affichage optionnel d'un message de déconnexion
  const [logoutMsg, setLogoutMsg] = useState("");

  interface LoginRequest {
    email: string;
    mot_de_passe: string;
  }

  interface LoginResponse {
    token?: string;
    utilisateur?: {
      id?: number;
      [key: string]: any;
    };
    message?: string;
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    try {
      const data: LoginResponse = await loginUser({
        email: email,
        mot_de_passe: password,
      } as LoginRequest);

      console.log("Login API response:", data);

      if (data.token) {
        localStorage.setItem("token", data.token);

        if (data.utilisateur && typeof data.utilisateur === "object") {
          localStorage.setItem("user", JSON.stringify(data.utilisateur));
          localStorage.setItem(
            "userId",
            data.utilisateur?.id?.toString() || ""
          );
        } else {
          // Si pas d'user ou undefined : clean localStorage pour éviter "undefined"
          localStorage.removeItem("user");
          localStorage.removeItem("userId");
        }

        toast.success("Connexion réussie !");
        window.location.href = "/";
      } else {
        // Propre : clean aussi ici
        localStorage.removeItem("user");
        localStorage.removeItem("userId");
        toast.error(data.message || "Erreur de connexion");
      }
    } catch (error) {
      localStorage.removeItem("user");
      localStorage.removeItem("userId");
      toast.error("Erreur de connexion");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 via-indigo-100 to-white">
      <div className="flex w-full max-w-4xl shadow-2xl rounded-2xl overflow-hidden bg-white/60 backdrop-blur-lg">
        {/* Illustration */}
        <div className="hidden md:flex flex-col justify-center items-center w-1/2 bg-gradient-to-br from-blue-200 to-indigo-200 p-8">
          <img
            src="https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=600&q=80"
            alt="Connexion Illustration"
            className="rounded-xl shadow-lg mb-6"
            width={320}
            height={320}
          />
          <h2 className="text-2xl font-bold text-indigo-700 mb-2">
            Bienvenue !
          </h2>
          <p className="text-indigo-900 text-center">
            Connectez-vous pour organiser, découvrir et participer à des
            événements inoubliables.
          </p>
        </div>
        {/* Formulaire */}
        <div className="w-full md:w-1/2 flex items-center justify-center p-8">
          <Card className="w-full bg-white/80 shadow-none border-0">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl font-bold text-gray-900 mb-2">
                Connexion à EventConnect
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <Label htmlFor="email">Email</Label>
                  <div className="relative mt-1">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="votre@email.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="pl-10"
                      required
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="password">Mot de passe</Label>
                  <div className="relative mt-1">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Votre mot de passe"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="pl-10 pr-10"
                      required
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="absolute right-1 top-1/2 -translate-y-1/2 h-8 w-8"
                      onClick={() => setShowPassword(!showPassword)}
                      tabIndex={-1}
                    >
                      {showPassword ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                    </Button>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <Link
                    href="/mot-de-passe-oublie"
                    className="text-sm text-indigo-600 hover:underline"
                  >
                    Mot de passe oublié ?
                  </Link>
                </div>
                <Button type="submit" className="w-full" disabled={loading}>
                  {loading ? (
                    <>
                      <LoadingSpinner size="sm" className="mr-2" />
                      Connexion en cours...
                    </>
                  ) : (
                    "Se connecter"
                  )}
                </Button>
              </form>

              <div className="mt-6 text-center">
                <p className="text-sm text-gray-600">
                  Pas encore de compte ?{" "}
                  <Link
                    href="/registration"
                    className="text-indigo-700 hover:underline font-medium"
                  >
                    S&apos;inscrire
                  </Link>
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
