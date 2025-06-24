import React from "react";

const testimonials = [
 {
  name: "Marie Dubois",
  role: "Coordinatrice d’événements, TechMeet",
  text: "EventConnect a révolutionné notre façon d’organiser des événements. L’interface est intuitive et les fonctionnalités de collaboration sont excellentes.",
 },
 {
  name: "Jean-Michel Martin",
  role: "Directeur marketing, EventPro",
  text: "Ça a complètement changé notre approche de l’organisation d’événements. Nous avons augmenté notre participation de 40% en moins de trois mois.",
 },
 {
  name: "Sophie Lefort",
  role: "Responsable communication, InnovCooking",
  text: "La simplicité de la plateforme et la qualité du support client sont impressionnantes. Je recommande EventConnect à tous nos clients.",
 },
];

export default function TestimonialsSection() {
 return (
  <section className="py-12 bg-gray-50">
   <div className="max-w-5xl mx-auto px-4 text-center">
    <h2 className="text-xl font-bold mb-2">Ce qu’en disent nos utilisateurs</h2>
    <p className="text-gray-500 mb-8">
     Découvrez comment EventConnect transforme l’organisation d’événements
    </p>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
     {testimonials.map((t, idx) => (
      <div key={idx} className="bg-white rounded-lg shadow p-6 text-left">
       <div className="text-3xl text-blue-400 mb-2">“</div>
       <p className="text-gray-700 mb-4">{t.text}</p>
       <div className="text-sm font-semibold">{t.name}</div>
       <div className="text-xs text-gray-500">{t.role}</div>
      </div>
     ))}
    </div>
   </div>
  </section>
 );
} 