import React from "react";

const events = [
 {
  title: "Tech Meetup Paris",
  category: "Tech",
  desc: "Rencontrez les professionnels tech et découvrez les dernières innovations.",
  date: "12 juin 2023",
  time: "18:30 - 21:00",
  place: "La Station F, Paris",
  participants: "120 participants / 150",
  image: "/globe.svg",
 },
 {
  title: "Festival de musique électronique",
  category: "Musique",
  desc: "Dansez toute la nuit avec les meilleurs DJs du 8 au 10 juillet.",
  date: "8-10 juillet 2023",
  time: "21:00 - 6:00",
  place: "Parc de la Villette, Paris",
  participants: "400 participants / 500",
  image: "/vercel.svg",
 },
 {
  title: "Atelier cuisine italienne",
  category: "Gastronomie",
  desc: "Apprenez à préparer des plats italiens authentiques avec un chef.",
  date: "20 juin 2023",
  time: "18:00 - 21:00",
  place: "Ecole de cuisine, Lyon",
  participants: "18 participants / 20",
  image: "/window.svg",
 },
];

export default function FeaturedEvents() {
 return (
  <section className="py-12 bg-white">
   <div className="max-w-5xl mx-auto px-4">
    <div className="flex justify-between items-center mb-4">
     <h2 className="text-xl font-bold">Événements à la une</h2>
     <a href="#" className="text-blue-500 text-sm">Voir tous les événements →</a>
    </div>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
     {events.map((event, idx) => (
      <div key={idx} className="bg-gray-50 rounded-lg shadow p-4">
       <img src={event.image} alt={event.title} className="w-full h-40 object-cover rounded mb-3" />
       <span className="text-xs text-blue-600">{event.category}</span>
       <h3 className="font-semibold mt-1">{event.title}</h3>
       <p className="text-sm text-gray-600">{event.desc}</p>
       <div className="mt-2 text-xs text-gray-500">
        <div>{event.date} • {event.time}</div>
        <div>{event.place}</div>
        <div>{event.participants}</div>
       </div>
      </div>
     ))}
    </div>
   </div>
  </section>
 );
} 