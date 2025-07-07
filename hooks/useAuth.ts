"use client";

import { useState, useEffect, createContext, useContext } from "react";

interface User {
  id: number;
  nom: string;
  email: string;
  role?: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (token: string, userData: User) => void;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const useAuthCheck = () => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    checkAuthStatus();

    // Écouteur pour les changements de localStorage (entre onglets)
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === "user" || e.key === "token") {
        checkAuthStatus();
      }
    };

    // Écouteur pour les changements d'authentification personnalisés
    const handleAuthChange = () => {
      checkAuthStatus();
    };

    // Ajouter les écouteurs
    window.addEventListener("storage", handleStorageChange);
    window.addEventListener("authChange", handleAuthChange);

    // Nettoyer les écouteurs au démontage
    return () => {
      window.removeEventListener("storage", handleStorageChange);
      window.removeEventListener("authChange", handleAuthChange);
    };
  }, []);

  const checkAuthStatus = () => {
    try {
      const token = localStorage.getItem("token");
      const userData = localStorage.getItem("user");

      if (token && userData) {
        setUser(JSON.parse(userData));
      } else {
        setUser(null);
      }
    } catch (error) {
      console.error("Error checking auth status:", error);
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  };

  const login = (token: string, userData: User) => {
    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(userData));
    setUser(userData);
    
    // Déclencher un événement personnalisé pour notifier les autres composants
    window.dispatchEvent(new Event("authChange"));
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    
    // Déclencher un événement personnalisé pour notifier les autres composants
    window.dispatchEvent(new Event("authChange"));
  };

  return {
    user,
    isAuthenticated: !!user,
    login,
    logout,
    isLoading,
    refreshAuth: checkAuthStatus, // Fonction pour forcer une mise à jour
  };
};

// Fonction utilitaire pour déclencher une mise à jour d'authentification depuis n'importe où
export const triggerAuthRefresh = () => {
  window.dispatchEvent(new Event("authChange"));
};
