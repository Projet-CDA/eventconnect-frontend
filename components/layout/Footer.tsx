import Link from 'next/link';
import { Calendar, Mail, Phone, MapPin } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo et description */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <Calendar className="h-8 w-8 text-violet-400" />
              <span className="text-xl font-bold">EventConnect</span>
            </div>
            <p className="text-gray-300 max-w-md">
              La plateforme collaborative pour créer, organiser et participer aux événements 
              qui vous passionnent. Connectez-vous avec votre communauté.
            </p>
          </div>

          {/* Liens rapides */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Liens rapides</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/events" className="text-gray-300 hover:text-violet-400 transition-colors">
                  Événements
                </Link>
              </li>
              <li>
                <Link href="/categories" className="text-gray-300 hover:text-violet-400 transition-colors">
                  Catégories
                </Link>
              </li>
              <li>
                <Link href="/organisateurs" className="text-gray-300 hover:text-violet-400 transition-colors">
                  Organisateurs
                </Link>
              </li>
              <li>
                <Link href="/aide" className="text-gray-300 hover:text-violet-400 transition-colors">
                  Centre d'aide
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact</h3>
            <ul className="space-y-2">
              <li className="flex items-center text-gray-300">
                <Mail className="h-4 w-4 mr-2" />
                contact@eventconnect.fr
              </li>
              <li className="flex items-center text-gray-300">
                <Phone className="h-4 w-4 mr-2" />
                +33 1 23 45 67 89
              </li>
              <li className="flex items-center text-gray-300">
                <MapPin className="h-4 w-4 mr-2" />
                Paris, France
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm">
            © 2024 EventConnect. Tous droits réservés.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <Link href="/politique-confidentialite" className="text-gray-400 hover:text-violet-400 text-sm transition-colors">
              Politique de confidentialité
            </Link>
            <Link href="/conditions-utilisation" className="text-gray-400 hover:text-violet-400 text-sm transition-colors">
              Conditions d'utilisation
            </Link>
            <Link href="/mentions-legales" className="text-gray-400 hover:text-violet-400 text-sm transition-colors">
              Mentions légales
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}