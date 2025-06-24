import React from "react";
import EventCard from "./EventCard";

const events = [
 {
  title: "Tech Meetup Paris",
  category: "Tech",
  desc: "Rencontrez des professionnels du secteur tech et découvrez les dernières innovations.",
  date: "12 juin 2023",
  time: "18:30 - 21:00",
  place: "La Station F, Paris",
  participants: "120 participants / 150",
  image: "/globe.svg",
 },
 {
  title: "Festival de musique électronique",
  category: "Musique",
  desc: "Une soirée immersive avec les meilleurs DJs de la scène électro.",
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
 {
  title: "Conférence sur le développement durable",
  category: "Environnement",
  desc: "Expériences innovantes et réflexions autour de notre planète.",
  date: "23 juin 2023",
  time: "09:00 - 18:00",
  place: "Centre de conférences, Nantes",
  participants: "85 participants / 100",
  image: "/file.svg",
 },
 {
  title: "Exposition d'art contemporain",
  category: "Art",
  desc: "Découvrez les œuvres de nouveaux artistes émergents dans la région.",
  date: "30 juin 2023",
  time: "10:00 - 19:00",
  place: "Galerie moderne, Bordeaux",
  participants: "45 participants / 150",
  image: "/globe.svg",
 },
 {
  title: "Atelier de photographie",
  category: "Art",
  desc: "Améliorez vos compétences en photographie avec l'aide de professionnels.",
  date: "15 juillet 2023",
  time: "14:00 - 18:00",
  place: "Studio Photo, Marseille",
  participants: "25 participants / 35",
  image: "/vercel.svg",
 },
 {
  title: "Dégustation de vins français",
  category: "Gastronomie",
  desc: "Une soirée de dégustation des meilleurs vins des régions françaises.",
  date: "30 juin 2023",
  time: "19:00 - 22:00",
  place: "Cave à vins, Reims",
  participants: "29 participants / 50",
  image: "/window.svg",
 },
 {
  title: "Marathon de Paris",
  category: "Sport",
  desc: "Participez au Marathon à travers les rues de Paris.",
  date: "19 juillet 2023",
  time: "08:00 - 15:00",
  place: "Départ: Champs-Élysées, Paris",
  participants: "350 participants / 1000",
  image: "/file.svg",
 },
 {
  title: "Séminaire sur l'intelligence artificielle",
  category: "Tech",
  desc: "Découvrez les dernières avancées et IA et leurs applications concrètes.",
  date: "12 août 2023",
  time: "09:00 - 17:00",
  place: "Université de Lyon, Lyon",
  participants: "78 participants / 150",
  image: "/globe.svg",
 },
];

export default function EventsListSection() {
 return (
  <section className="py-12 bg-white">
   <div className="max-w-6xl mx-auto px-4">
    <h1 className="text-2xl font-bold mb-2">Découvrez tous les événements</h1>
    <p className="text-gray-500 mb-6">
     Parcourez et rejoignez des événements passionnants près de chez vous
    </p>
    <div className="flex flex-col md:flex-row gap-3 mb-6">
     <input
      type="text"
      placeholder="Rechercher un événement..."
      className="flex-1 border border-gray-300 rounded px-3 py-2"
     />
     <button className="border border-gray-300 rounded px-4 py-2">Filtres</button>
     <button className="border border-gray-300 rounded px-4 py-2">Créer un événement</button>
    </div>
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
     {events.map((event, idx) => (
      <EventCard key={idx} event={event} />
     ))}
    </div>
   </div>
  </section>
 );
} 