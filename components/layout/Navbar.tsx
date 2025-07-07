"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
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
  User,
  LogOut,
  Settings,
  Heart,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useAuthCheck } from "@/hooks/useAuth";
import { toast } from "sonner";

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const { user, isAuthenticated, logout, refreshAuth } = useAuthCheck();

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

  // Gérer la déconnexion
  const handleLogout = async () => {
    try {
      // Fermer le menu mobile
      closeMobileMenu();
      
      // Déconnexion
      logout();
      
      // Forcer la mise à jour de l'authentification
      refreshAuth();
      
      // Notification de succès
      toast.success("Vous êtes bien déconnecté");
      
      // Redirection vers la page d'accueil après un court délai
      setTimeout(() => {
        router.push("/");
      }, 1000);
      
    } catch (error) {
      console.error("Erreur lors de la déconnexion:", error);
      toast.error("Erreur lors de la déconnexion");
    }
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
    { href: "/events/create", label: "Créer", icon: Plus },
    {
      href: isAuthenticated ? "/profile" : "/connect",
      label: "Compte",
      icon: isAuthenticated ? User : Users,
    },
  ];

  const isActive = (href: string) => {
    if (href === "/") {
      return pathname === "/";
    }
    return pathname.startsWith(href);
  };

  // Obtenir les initiales de l'utilisateur
  const getUserInitials = () => {
    if (!user?.nom) return "U";
    return user.nom
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
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

              {/* Menu profil utilisateur connecté */}
              {isAuthenticated ? (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="ghost"
                      className={`p-2 rounded-full transition-all duration-200 ${
                        scrolled ? "hover:bg-muted/50" : "hover:bg-white/10"
                      }`}
                    >
                      <Avatar className="h-8 w-8 border-2 border-white shadow-sm">
                        <AvatarImage src="" alt={user?.nom || "Utilisateur"} />
                        <AvatarFallback className="bg-primary text-white font-semibold">
                          {getUserInitials()}
                        </AvatarFallback>
                      </Avatar>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-56">
                    <DropdownMenuLabel>
                      <div className="flex flex-col space-y-1">
                        <p className="text-sm font-medium leading-none">
                          {user?.nom}
                        </p>
                        <p className="text-xs leading-none text-muted-foreground">
                          {user?.email}
                        </p>
                      </div>
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem asChild>
                      <Link href="/profile" className="cursor-pointer">
                        <User className="mr-2 h-4 w-4" />
                        Mon profil
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href="/events/create" className="cursor-pointer">
                        <Plus className="mr-2 h-4 w-4" />
                        Créer un événement
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href="/favorites" className="cursor-pointer">
                        <Heart className="mr-2 h-4 w-4" />
                        Mes favoris
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href="/settings" className="cursor-pointer">
                        <Settings className="mr-2 h-4 w-4" />
                        Paramètres
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                      onClick={handleLogout}
                      className="cursor-pointer text-red-600 focus:text-red-600"
                    >
                      <LogOut className="mr-2 h-4 w-4" />
                      Se déconnecter
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                // Boutons de connexion/inscription pour utilisateurs non connectés
                <>
                  <Button
                    variant="ghost"
                    className={`font-medium px-6 py-2 rounded-lg transition-all duration-200 ${
                      scrolled
                        ? "bg-primary hover:bg-primary/90 text-primary-foreground"
                        : "bg-white text-primary hover:bg-gray-100"
                    }`}
                    asChild
                  >
                    <Link href="/connect">Se connecter</Link>
                  </Button>
                </>
              )}
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
            {/* Profil utilisateur connecté */}
            {isAuthenticated && (
              <div className="mb-6 p-4 bg-muted/50 rounded-xl">
                <div className="flex items-center space-x-3">
                  <Avatar className="h-12 w-12 border-2 border-white shadow-sm">
                    <AvatarImage src="" alt={user?.nom || "Utilisateur"} />
                    <AvatarFallback className="bg-primary text-white font-semibold">
                      {getUserInitials()}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <p className="font-semibold text-foreground">{user?.nom}</p>
                    <p className="text-sm text-muted-foreground">
                      {user?.email}
                    </p>
                  </div>
                </div>
              </div>
            )}

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

              {/* Liens supplémentaires pour utilisateurs connectés */}
              {isAuthenticated && (
                <>
                  <Link
                    href="/profile"
                    className="flex items-center space-x-4 px-4 py-4 rounded-xl transition-all duration-200 group text-foreground hover:bg-muted/50"
                    onClick={closeMobileMenu}
                  >
                    <div className="p-2 rounded-lg bg-primary/10 group-hover:bg-primary/20">
                      <User className="h-5 w-5 text-primary" />
                    </div>
                    <span className="text-lg font-medium">Mon profil</span>
                  </Link>
                  <Link
                    href="/events/create"
                    className="flex items-center space-x-4 px-4 py-4 rounded-xl transition-all duration-200 group text-foreground hover:bg-muted/50"
                    onClick={closeMobileMenu}
                  >
                    <div className="p-2 rounded-lg bg-primary/10 group-hover:bg-primary/20">
                      <Plus className="h-5 w-5 text-primary" />
                    </div>
                    <span className="text-lg font-medium">
                      Créer un événement
                    </span>
                  </Link>
                  <Link
                    href="/favorites"
                    className="flex items-center space-x-4 px-4 py-4 rounded-xl transition-all duration-200 group text-foreground hover:bg-muted/50"
                    onClick={closeMobileMenu}
                  >
                    <div className="p-2 rounded-lg bg-primary/10 group-hover:bg-primary/20">
                      <Heart className="h-5 w-5 text-primary" />
                    </div>
                    <span className="text-lg font-medium">Mes favoris</span>
                  </Link>
                </>
              )}
            </div>

            {/* Actions utilisateur */}
            <div className="mt-auto border-t border-border pt-6 space-y-3">
              {isAuthenticated ? (
                <Button
                  variant="outline"
                  className="w-full border-2 font-semibold py-3 rounded-xl text-red-600 border-red-200 hover:bg-red-50"
                  onClick={handleLogout}
                >
                  <LogOut className="h-5 w-5 mr-2" />
                  Se déconnecter
                </Button>
              ) : (
                <>
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
                </>
              )}
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
                      {link.href === "/events/create" && (
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
