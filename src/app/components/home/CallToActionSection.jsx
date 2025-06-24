import React from "react";

export default function CallToActionSection() {
 return (
  <section className="py-12">
   <div className="max-w-3xl mx-auto px-4 bg-blue-50 rounded-lg text-center py-10">
    <h2 className="text-xl font-bold mb-2">Prêt à organiser votre prochain événement ?</h2>
    <p className="text-gray-600 mb-6">
     Rejoignez des milliers d’organisateurs et participants qui utilisent EventConnect pour créer des expériences inoubliables.
    </p>
    <div className="flex justify-center gap-3">
     <button className="bg-black text-white px-5 py-2 rounded">Créer un compte</button>
     <button className="border border-gray-300 px-5 py-2 rounded">Découvrir les événements</button>
    </div>
   </div>
  </section>
 );
} 