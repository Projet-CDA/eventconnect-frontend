import Link from "next/link";
import { Calendar, Mail, Phone, MapPin, Heart } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-card border-t border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo et description */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <Calendar className="h-8 w-8 text-primary" />
              <span className="text-xl font-bold text-foreground">
                EventConnect
              </span>
            </div>
            <p className="text-muted-foreground max-w-md leading-relaxed">
              La plateforme collaborative pour créer, organiser et participer
              aux événements qui vous passionnent. Connectez-vous avec votre
              communauté.
            </p>
            <div className="flex items-center mt-4 text-sm text-muted-foreground">
              <span>Fait avec</span>
              <Heart className="h-4 w-4 mx-1 text-red-500" />
              <span>par l&apos;équipe EventConnect</span>
            </div>
          </div>

          {/* Liens rapides */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-foreground">
              Liens rapides
            </h3>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/events"
                  className="text-muted-foreground hover:text-primary transition-colors hover:underline"
                >
                  Événements
                </Link>
              </li>
              <li>
                <Link
                  href="/categories"
                  className="text-muted-foreground hover:text-primary transition-colors hover:underline"
                >
                  Catégories
                </Link>
              </li>
              <li>
                <Link
                  href="/organisateurs"
                  className="text-muted-foreground hover:text-primary transition-colors hover:underline"
                >
                  Organisateurs
                </Link>
              </li>
              <li>
                <Link
                  href="/aide"
                  className="text-muted-foreground hover:text-primary transition-colors hover:underline"
                >
                  Centre d&apos;aide
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-foreground">
              Contact
            </h3>
            <ul className="space-y-3">
              <li className="flex items-center text-muted-foreground">
                <Mail className="h-4 w-4 mr-3 text-primary" />
                <a
                  href="mailto:contact@eventconnect.fr"
                  className="hover:text-primary transition-colors"
                >
                  contact@eventconnect.fr
                </a>
              </li>
              <li className="flex items-center text-muted-foreground">
                <Phone className="h-4 w-4 mr-3 text-primary" />
                <a
                  href="tel:+33123456789"
                  className="hover:text-primary transition-colors"
                >
                  +33 1 23 45 67 89
                </a>
              </li>
              <li className="flex items-center text-muted-foreground">
                <MapPin className="h-4 w-4 mr-3 text-primary" />
                <span>Paris, France</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-muted-foreground text-sm">
            © 2024 EventConnect. Tous droits réservés.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <Link
              href="/politique-confidentialite"
              className="text-muted-foreground hover:text-primary text-sm transition-colors"
            >
              Politique de confidentialité
            </Link>
            <Link
              href="/conditions-utilisation"
              className="text-muted-foreground hover:text-primary text-sm transition-colors"
            >
              Conditions d&apos;utilisation
            </Link>
            <Link
              href="/mentions-legales"
              className="text-muted-foreground hover:text-primary text-sm transition-colors"
            >
              Mentions légales
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
