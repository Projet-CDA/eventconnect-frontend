"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Menu,
  X,
  Calendar,
  Users,
  MapPin,
  Sun,
  Moon,
  Home,
  Info,
  Plus,
  Search,
  Bell,
} from "lucide-react";

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  // Gérer le scroll pour navbar transparente
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Initialiser le mode sombre
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

  // Fermer le menu mobile lors du clic sur un lien
  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  const navLinks = [
    { href: "/", label: "Accueil", icon: Home },
    { href: "/events", label: "Événements", icon: MapPin },
    { href: "/comment-ca-marche", label: "Comment ça marche", icon: Info },
    { href: "/a-features", label: "À propos", icon: Users },
  ];

  // Navigation pour bottom bar (simplifié pour mobile)
  const bottomNavLinks = [
    { href: "/", label: "Accueil", icon: Home },
    { href: "/events", label: "Événements", icon: Search },
    { href: "/registration", label: "Créer", icon: Plus },
    { href: "/connect", label: "Compte", icon: Users },
  ];

  const isActive = (href: string) => {
    if (href === "/") {
      return pathname === "/";
    }
    return pathname.startsWith(href);
  };

  return (
    <>
      {/* Navbar fixe - Desktop et tablet */}
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-white/95 dark:bg-gray-900/95 backdrop-blur-md shadow-lg border-b border-gray-200/20 dark:border-gray-700/20"
            : "bg-gradient-to-r from-primary/90 via-primary to-primary/90"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16 sm:h-20">
            {/* Logo mobile optimisé */}
            <div className="flex items-center">
              <Link
                href="/"
                className="flex items-center space-x-2 sm:space-x-3 group"
                onClick={closeMobileMenu}
              >
                <div
                  className={`p-2 rounded-xl transition-all duration-300 ${
                    scrolled
                      ? "bg-primary/10 text-primary"
                      : "bg-white/20 backdrop-blur-sm text-white group-hover:bg-white/30"
                  }`}
                >
                  <Calendar className="h-6 w-6 sm:h-8 sm:w-8" />
                </div>
                <div className="hidden sm:flex flex-col">
                  <span
                    className={`text-xl sm:text-2xl font-bold tracking-tight transition-colors ${
                      scrolled ? "text-foreground" : "text-white"
                    }`}
                  >
                    EventConnect
                  </span>
                  <span
                    className={`text-xs font-medium transition-colors ${
                      scrolled ? "text-muted-foreground" : "text-white/80"
                    }`}
                  >
                    Connectez-vous aux événements
                  </span>
                </div>
                <span
                  className={`sm:hidden text-lg font-bold tracking-tight transition-colors ${
                    scrolled ? "text-foreground" : "text-white"
                  }`}
                >
                  EventConnect
                </span>
              </Link>
            </div>

            {/* Navigation desktop - masquée sur mobile et tablet */}
            <div className="hidden lg:flex items-center space-x-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                    isActive(link.href)
                      ? scrolled
                        ? "bg-primary/10 text-primary"
                        : "bg-white/20 text-white"
                      : scrolled
                      ? "text-foreground/80 hover:text-foreground hover:bg-muted/50"
                      : "text-white/90 hover:text-white hover:bg-white/10"
                  }`}
                >
                  <link.icon className="h-4 w-4" />
                  <span>{link.label}</span>
                </Link>
              ))}
            </div>

            {/* Actions utilisateur - desktop */}
            <div className="hidden lg:flex items-center space-x-3">
              {/* Bouton mode sombre */}
              <Button
                variant="ghost"
                size="icon"
                className={`transition-all duration-200 ${
                  scrolled
                    ? "text-foreground/80 hover:text-foreground hover:bg-muted/50"
                    : "text-white/90 hover:text-white hover:bg-white/10"
                }`}
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
                className={`font-medium px-6 py-2 rounded-lg transition-all duration-200 ${
                  scrolled
                    ? "text-foreground/80 hover:text-foreground hover:bg-muted/50"
                    : "text-white/90 hover:text-white hover:bg-white/10"
                }`}
                asChild
              >
                <Link href="/connect">Se connecter</Link>
              </Button>
              <Button
                className={`font-semibold px-6 py-2 rounded-lg shadow-lg hover:shadow-xl transition-all duration-200 ${
                  scrolled
                    ? "bg-primary hover:bg-primary/90 text-primary-foreground"
                    : "bg-white text-primary hover:bg-gray-100"
                }`}
                asChild
              >
                <Link href="/registration">S'inscrire</Link>
              </Button>
            </div>

            {/* Actions mobiles - seulement pour tablet (md) */}
            <div className="lg:hidden md:flex hidden items-center space-x-2">
              {/* Notifications */}
              <Button
                variant="ghost"
                size="icon"
                className={`transition-all duration-200 ${
                  scrolled
                    ? "text-foreground/80 hover:bg-muted/50"
                    : "text-white hover:bg-white/10"
                }`}
              >
                <Bell className="h-5 w-5" />
              </Button>

              {/* Mode sombre */}
              <Button
                variant="ghost"
                size="icon"
                className={`transition-all duration-200 ${
                  scrolled
                    ? "text-foreground/80 hover:bg-muted/50"
                    : "text-white hover:bg-white/10"
                }`}
                onClick={toggleDarkMode}
              >
                {darkMode ? (
                  <Sun className="h-5 w-5" />
                ) : (
                  <Moon className="h-5 w-5" />
                )}
              </Button>

              {/* Menu hamburger pour tablet */}
              <Button
                variant="ghost"
                size="icon"
                className={`transition-all duration-200 ${
                  scrolled
                    ? "text-foreground/80 hover:bg-muted/50"
                    : "text-white hover:bg-white/10"
                }`}
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                {mobileMenuOpen ? (
                  <X className="h-6 w-6" />
                ) : (
                  <Menu className="h-6 w-6" />
                )}
              </Button>
            </div>

            {/* Actions mobiles - uniquement pour très petit écran */}
            <div className="md:hidden flex items-center space-x-2">
              <Button
                variant="ghost"
                size="icon"
                className={`transition-all duration-200 ${
                  scrolled
                    ? "text-foreground/80 hover:bg-muted/50"
                    : "text-white hover:bg-white/10"
                }`}
                onClick={toggleDarkMode}
              >
                {darkMode ? (
                  <Sun className="h-5 w-5" />
                ) : (
                  <Moon className="h-5 w-5" />
                )}
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Menu mobile full-screen - seulement pour tablet */}
      <div
        className={`lg:hidden md:block hidden fixed inset-0 z-40 transition-all duration-300 ${
          mobileMenuOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
      >
        {/* Overlay */}
        <div
          className="absolute inset-0 bg-black/50 backdrop-blur-sm"
          onClick={() => setMobileMenuOpen(false)}
        />

        {/* Menu content */}
        <div
          className={`absolute top-16 sm:top-20 left-0 right-0 bottom-0 bg-white dark:bg-gray-900 transform transition-transform duration-300 ${
            mobileMenuOpen ? "translate-y-0" : "-translate-y-full"
          }`}
        >
          <div className="p-6 h-full flex flex-col">
            {/* Navigation links */}
            <div className="space-y-2 mb-8">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`flex items-center space-x-4 px-4 py-4 rounded-xl transition-all duration-200 group ${
                    isActive(link.href)
                      ? "bg-primary/10 text-primary"
                      : "text-foreground hover:bg-muted/50"
                  }`}
                  onClick={closeMobileMenu}
                >
                  <div
                    className={`p-2 rounded-lg transition-colors ${
                      isActive(link.href)
                        ? "bg-primary/20"
                        : "bg-primary/10 group-hover:bg-primary/20"
                    }`}
                  >
                    <link.icon className="h-5 w-5 text-primary" />
                  </div>
                  <span className="text-lg font-medium">{link.label}</span>
                </Link>
              ))}
            </div>

            {/* Actions utilisateur */}
            <div className="mt-auto border-t border-border pt-6 space-y-3">
              <Button
                className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold py-3 rounded-xl"
                asChild
              >
                <Link href="/registration" onClick={closeMobileMenu}>
                  <Plus className="h-5 w-5 mr-2" />
                  Créer un compte gratuit
                </Link>
              </Button>
              <Button
                variant="outline"
                className="w-full border-2 font-semibold py-3 rounded-xl"
                asChild
              >
                <Link href="/connect" onClick={closeMobileMenu}>
                  Se connecter
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Navigation Bar - Mobile uniquement */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 animate-bottom-nav">
        <div className="bg-white/95 dark:bg-gray-900/95 backdrop-blur-md border-t border-gray-200/20 dark:border-gray-700/20 safe-area-pb">
          <div className="grid grid-cols-4 px-2">
            {bottomNavLinks.map((link, index) => {
              const active = isActive(link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`bottom-nav-item relative px-2 py-3 ${
                    active ? "active" : ""
                  }`}
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div
                    className={`relative flex flex-col items-center space-y-1 ${
                      active ? "transform scale-110" : ""
                    }`}
                  >
                    {/* Indicateur actif avec animation */}
                    {active && (
                      <div className="absolute -inset-2 bg-primary/10 rounded-xl animate-tab-indicator" />
                    )}

                    {/* Icône avec badge pour "Créer" */}
                    <div className="relative">
                      <link.icon
                        className={`bottom-nav-icon relative z-10 ${
                          active ? "text-primary" : "text-muted-foreground"
                        }`}
                      />

                      {/* Badge pour le bouton "Créer" */}
                      {link.href === "/registration" && (
                        <div className="absolute -top-1 -right-1 w-2 h-2 bg-primary rounded-full animate-pulse" />
                      )}
                    </div>

                    {/* Label */}
                    <span
                      className={`bottom-nav-label relative z-10 ${
                        active
                          ? "text-primary font-semibold"
                          : "text-muted-foreground"
                      }`}
                    >
                      {link.label}
                    </span>
                  </div>

                  {/* Zone de clic élargie */}
                  <div className="absolute inset-0 rounded-xl" />
                </Link>
              );
            })}
          </div>
        </div>
      </div>

      {/* Espaceur pour le contenu */}
      <div className="h-16 sm:h-20" />

      {/* Espaceur pour bottom navigation sur mobile */}
      <div
        className="md:hidden safe-area-pb"
        style={{ height: "calc(4rem + env(safe-area-inset-bottom))" }}
      />
    </>
  );
}
