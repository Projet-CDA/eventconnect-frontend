"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav className="bg-white border-b border-gray-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-2">
              <span className="text-2xl font-bold text-blue-600">
                EventConnect
              </span>
            </Link>
          </div>

          {/* Navigation principale - Desktop */}
          <div className="hidden md:flex items-center space-x-8">
            <Link
              href="/"
              className="text-gray-700 hover:text-blue-600 font-medium transition-colors"
            >
              Accueil
            </Link>
            <Link
              href="/events"
              className="text-gray-700 hover:text-blue-600 font-medium transition-colors"
            >
              Événements
            </Link>
            <Link
              href="/comment-ca-marche"
              className="text-gray-700 hover:text-blue-600 font-medium transition-colors"
            >
              Comment ça marche
            </Link>
            <Link
              href="/a-features"
              className="text-gray-700 hover:text-blue-600 font-medium transition-colors"
            >
              À propos
            </Link>
          </div>

          {/* Actions utilisateur - Desktop */}
          <div className="hidden md:flex items-center space-x-4">
            <Button
              variant="ghost"
              className="text-gray-700 hover:text-blue-600 font-medium"
              asChild
            >
              <Link href="/connect">Se connecter</Link>
            </Button>
            <Button
              className="bg-gray-900 hover:bg-gray-800 text-white font-medium px-6"
              asChild
            >
              <Link href="/registration">S&apos;inscrire</Link>
            </Button>
          </div>

          {/* Menu mobile toggle */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="icon"
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

        {/* Menu mobile */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-gray-100">
            <div className="px-2 pt-2 pb-3 space-y-1">
              <Link
                href="/"
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50"
                onClick={() => setMobileMenuOpen(false)}
              >
                Accueil
              </Link>
              <Link
                href="/events"
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50"
                onClick={() => setMobileMenuOpen(false)}
              >
                Événements
              </Link>
              <Link
                href="/comment-ca-marche"
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50"
                onClick={() => setMobileMenuOpen(false)}
              >
                Comment ça marche
              </Link>
              <Link
                href="/a-features"
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50"
                onClick={() => setMobileMenuOpen(false)}
              >
                À propos
              </Link>

              <div className="border-t border-gray-200 pt-4 pb-3 space-y-1">
                <Link
                  href="/connect"
                  className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Se connecter
                </Link>
                <Link
                  href="/registration"
                  className="block px-3 py-2 rounded-md text-base font-medium bg-gray-900 text-white hover:bg-gray-800"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  S&apos;inscrire
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
