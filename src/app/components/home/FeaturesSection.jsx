import React from "react";

const features = [
 {
  icon: "📝",
  title: "Créez des événements",
  desc: "Créez et personnalisez vos événements en quelques clics. Ajoutez des descriptions, des images, des dates et plus encore.",
 },
 {
  icon: "🤝",
  title: "Collaborez en équipe",
  desc: "Invitez des co-organisateurs pour gérer vos événements ensemble. Partagez les responsabilités et collaborez efficacement.",
 },
 {
  icon: "💬",
  title: "Communiquez facilement",
  desc: "Encouragez les échanges grâce au système de messagerie intégré. Envoyez des notifications et gardez tout le monde informé.",
 },
];

export default function FeaturesSection() {
 return (
  <section className="py-12 bg-gray-50">
   <div className="max-w-5xl mx-auto px-4 text-center">
    <h2 className="text-xl font-bold mb-2">
     Tout ce dont vous avez besoin pour organiser des événements mémorables
    </h2>
    <p className="text-gray-500 mb-8">
     Simplifiez votre organisation d’événements avec des outils puissants et intuitifs.
    </p>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
     {features.map((f, idx) => (
      <div key={idx} className="bg-white rounded-lg shadow p-6 flex flex-col items-center">
       <div className="text-3xl mb-3">{f.icon}</div>
       <h3 className="font-semibold mb-2">{f.title}</h3>
       <p className="text-gray-600 text-sm">{f.desc}</p>
      </div>
     ))}
    </div>
   </div>
  </section>
 );
} 