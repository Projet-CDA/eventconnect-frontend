import React from "react";

export default function Navbar() {
 return (
  <nav className="w-full bg-white border-b shadow-sm">
   <div className="max-w-7xl mx-auto px-4 flex items-center justify-between h-16">
    {/* Logo */}
    <div className="flex items-center gap-2 font-bold text-xl text-blue-600">
     <span>EventConnect</span>
    </div>
    {/* Liens de navigation */}
    <div className="hidden md:flex gap-6 text-sm font-medium">
     <a href="/" className="hover:text-blue-600">Accueil</a>
     <a href="/evenements" className="hover:text-blue-600">Événements</a>
     <a href="/comment-ca-marche" className="hover:text-blue-600">Comment ça marche</a>
     <a href="/a-propos" className="hover:text-blue-600">À propos</a>
    </div>
    {/* Actions utilisateur */}
    <div className="flex gap-2">
     <a href="/connexion" className="px-4 py-1 rounded border border-gray-300 text-sm hover:bg-gray-100">Se connecter</a>
     <a href="/inscription" className="px-4 py-1 rounded bg-black text-white text-sm hover:bg-blue-700">S'inscrire</a>
    </div>
   </div>
  </nav>
 );
} 