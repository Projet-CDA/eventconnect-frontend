import React from "react";

export default function FooterSection() {
 return (
  <footer className="bg-white border-t py-8 mt-8">
   <div className="max-w-5xl mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8 text-sm">
    <div>
     <div className="font-bold text-blue-600 mb-2">EventConnect</div>
     <p className="text-gray-500 mb-2">
      EventConnect est la plateforme qui simplifie l'organisation et la participation à des événements collaboratifs.
     </p>
     <div className="flex gap-2 text-gray-400 text-lg">
      <span>🌐</span>
      <span>🐦</span>
      <span>📸</span>
     </div>
    </div>
    <div>
     <div className="font-semibold mb-2">Explorer</div>
     <ul className="space-y-1">
      <li><a href="#" className="hover:underline">Tous les événements</a></li>
      <li><a href="#" className="hover:underline">Catégories</a></li>
      <li><a href="#" className="hover:underline">Comment ça marche</a></li>
      <li><a href="#" className="hover:underline">Tarifs</a></li>
     </ul>
    </div>
    <div>
     <div className="font-semibold mb-2">Ressources</div>
     <ul className="space-y-1">
      <li><a href="#" className="hover:underline">Centre d'aide</a></li>
      <li><a href="#" className="hover:underline">Conseils d'organisation</a></li>
      <li><a href="#" className="hover:underline">Blog</a></li>
      <li><a href="#" className="hover:underline">API Developers</a></li>
     </ul>
    </div>
    <div>
     <div className="font-semibold mb-2">Société</div>
     <ul className="space-y-1">
      <li><a href="#" className="hover:underline">À propos</a></li>
      <li><a href="#" className="hover:underline">Carrières</a></li>
      <li><a href="#" className="hover:underline">Confidentialité</a></li>
      <li><a href="#" className="hover:underline">Conditions d'utilisation</a></li>
     </ul>
    </div>
   </div>
   <div className="text-center text-xs text-gray-400 mt-8">
    © 2024 EventConnect. Tous droits réservés.
   </div>
  </footer>
 );
} 