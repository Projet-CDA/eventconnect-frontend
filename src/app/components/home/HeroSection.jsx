import React from "react";

export default function HeroSection() {
 return (
  <section className="py-12 bg-gradient-to-b from-white to-blue-50">
   <div className="max-w-5xl mx-auto px-4">
    <span className="text-xs text-blue-600">Rejoignez des milliers d'utilisateurs</span>
    <h1 className="mt-2 text-4xl font-bold">
     Créez et participez à des événements <br />
     <span className="text-blue-500">extraordinaires</span>
    </h1>
    <p className="mt-4 text-gray-600">
     EventConnect vous permet de créer, organiser et participer à des événements de toutes sortes, en toute simplicité.
    </p>
    <div className="mt-6 flex gap-3">
     <button className="bg-black text-white px-5 py-2 rounded">Découvrir les événements</button>
     <button className="border border-gray-300 px-5 py-2 rounded">Créer un compte</button>
    </div>
   </div>
  </section>
 );
} 