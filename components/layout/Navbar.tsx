"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Menu, X, Calendar, Users, MapPin, Sun, Moon } from "lucide-react";

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  // Initialiser le mode sombre au chargement
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    const prefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;

    if (savedTheme === "dark" || (!savedTheme && prefersDark)) {
      setDarkMode(true);
      document.documentElement.classList.add("dark");
    }
  }, []);

  // Basculer le mode sombre
  const toggleDarkMode = () => {
    const newDarkMode = !darkMode;
    setDarkMode(newDarkMode);

    if (newDarkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  };

  return (
    <nav className="bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 shadow-lg sticky top-0 z-50 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo avec icône */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-3 group">
              <div className="bg-white/20 backdrop-blur-sm rounded-xl p-2 group-hover:bg-white/30 transition-all duration-300">
                <Calendar className="h-8 w-8 text-white" />
              </div>
              <div className="flex flex-col">
                <span className="text-2xl font-bold text-white tracking-tight">
                  EventConnect
                </span>
                <span className="text-xs text-blue-100 font-medium">
                  Connectez-vous aux événements
                </span>
              </div>
            </Link>
          </div>

          {/* Navigation principale - Desktop */}
          <div className="hidden lg:flex items-center space-x-1">
            <Link
              href="/"
              className="flex items-center space-x-2 px-4 py-2 rounded-lg text-white/90 hover:text-white hover:bg-white/10 transition-all duration-200 font-medium"
            >
              <span>Accueil</span>
            </Link>
            <Link
              href="/events"
              className="flex items-center space-x-2 px-4 py-2 rounded-lg text-white/90 hover:text-white hover:bg-white/10 transition-all duration-200 font-medium"
            >
              <MapPin className="h-4 w-4" />
              <span>Événements</span>
            </Link>
            <Link
              href="/comment-ca-marche"
              className="flex items-center space-x-2 px-4 py-2 rounded-lg text-white/90 hover:text-white hover:bg-white/10 transition-all duration-200 font-medium"
            >
              <span>Comment ça marche</span>
            </Link>
            <Link
              href="/a-features"
              className="flex items-center space-x-2 px-4 py-2 rounded-lg text-white/90 hover:text-white hover:bg-white/10 transition-all duration-200 font-medium"
            >
              <span>À propos</span>
            </Link>
          </div>

          {/* Actions utilisateur - Desktop */}
          <div className="hidden lg:flex items-center space-x-3">
            {/* Bouton mode sombre */}
            <Button
              variant="ghost"
              size="icon"
              className="text-white/90 hover:text-white hover:bg-white/10 transition-all duration-200"
              onClick={toggleDarkMode}
              title={
                darkMode ? "Passer au mode clair" : "Passer au mode sombre"
              }
            >
              {darkMode ? (
                <Sun className="h-5 w-5" />
              ) : (
                <Moon className="h-5 w-5" />
              )}
            </Button>

            <Button
              variant="ghost"
              className="text-white/90 hover:text-white hover:bg-white/10 font-medium px-6 py-2 rounded-lg transition-all duration-200"
              asChild
            >
              <Link href="/connect">Se connecter</Link>
            </Button>
            <Button
              className="bg-white text-blue-600 hover:bg-gray-100 dark:bg-gray-800 dark:text-white dark:hover:bg-gray-700 font-semibold px-6 py-2 rounded-lg shadow-lg hover:shadow-xl transition-all duration-200"
              asChild
            >
              <Link href="/registration">S&apos;inscrire</Link>
            </Button>
          </div>

          {/* Menu mobile toggle */}
          <div className="lg:hidden flex items-center space-x-2">
            {/* Bouton mode sombre mobile */}
            <Button
              variant="ghost"
              size="icon"
              className="text-white hover:bg-white/10"
              onClick={toggleDarkMode}
              title={
                darkMode ? "Passer au mode clair" : "Passer au mode sombre"
              }
            >
              {darkMode ? (
                <Sun className="h-5 w-5" />
              ) : (
                <Moon className="h-5 w-5" />
              )}
            </Button>

            <Button
              variant="ghost"
              size="icon"
              className="text-white hover:bg-white/10"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </Button>
          </div>
        </div>

        {/* Menu mobile avec animation */}
        <div
          className={`lg:hidden transition-all duration-300 ease-in-out ${
            mobileMenuOpen
              ? "max-h-96 opacity-100"
              : "max-h-0 opacity-0 overflow-hidden"
          }`}
        >
          <div className="px-2 pt-2 pb-6 space-y-2 bg-white/10 backdrop-blur-sm rounded-xl mt-4">
            <Link
              href="/"
              className="flex items-center space-x-3 px-4 py-3 rounded-lg text-white hover:bg-white/20 transition-all duration-200"
              onClick={() => setMobileMenuOpen(false)}
            >
              <span className="font-medium">Accueil</span>
            </Link>
            <Link
              href="/events"
              className="flex items-center space-x-3 px-4 py-3 rounded-lg text-white hover:bg-white/20 transition-all duration-200"
              onClick={() => setMobileMenuOpen(false)}
            >
              <MapPin className="h-5 w-5" />
              <span className="font-medium">Événements</span>
            </Link>
            <Link
              href="/comment-ca-marche"
              className="flex items-center space-x-3 px-4 py-3 rounded-lg text-white hover:bg-white/20 transition-all duration-200"
              onClick={() => setMobileMenuOpen(false)}
            >
              <span className="font-medium">Comment ça marche</span>
            </Link>
            <Link
              href="/a-features"
              className="flex items-center space-x-3 px-4 py-3 rounded-lg text-white hover:bg-white/20 transition-all duration-200"
              onClick={() => setMobileMenuOpen(false)}
            >
              <span className="font-medium">À propos</span>
            </Link>

            <div className="border-t border-white/20 pt-4 space-y-2">
              <Link
                href="/connect"
                className="flex items-center justify-center px-4 py-3 rounded-lg text-white hover:bg-white/20 transition-all duration-200 font-medium"
                onClick={() => setMobileMenuOpen(false)}
              >
                Se connecter
              </Link>
              <Link
                href="/registration"
                className="flex items-center justify-center px-4 py-3 rounded-lg bg-white text-blue-600 hover:bg-gray-100 dark:bg-gray-800 dark:text-white dark:hover:bg-gray-700 font-semibold transition-all duration-200"
                onClick={() => setMobileMenuOpen(false)}
              >
                S&apos;inscrire
              </Link>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
