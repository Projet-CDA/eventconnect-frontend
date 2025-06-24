import React from "react";

const categories = [
 { name: "Technologie", count: 24 },
 { name: "Art & Culture", count: 18 },
 { name: "Santé & Bien-être", count: 8 },
 { name: "Business & Entrepreneuriat", count: 22 },
 { name: "Musique & Divertissement", count: 16 },
 { name: "Sports & Fitness", count: 7 },
];

export default function CategoriesSection() {
 return (
  <section className="py-12 bg-white">
   <div className="max-w-5xl mx-auto px-4 text-center">
    <h2 className="text-xl font-bold mb-2">Explorez nos catégories</h2>
    <p className="text-gray-500 mb-8">
     Des événements pour tous les goûts et tous les intérêts
    </p>
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
     {categories.map((cat, idx) => (
      <div key={idx} className="bg-gray-50 rounded-lg shadow p-6">
       <h3 className="font-semibold">{cat.name}</h3>
       <p className="text-gray-500 text-sm">{cat.count} événements</p>
      </div>
     ))}
    </div>
   </div>
  </section>
 );
} 