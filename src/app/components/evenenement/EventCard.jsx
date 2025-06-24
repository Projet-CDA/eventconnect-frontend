import React from "react";

export default function EventCard({ event }) {
 return (
  <div className="bg-white rounded-lg shadow p-3 flex flex-col">
   <img
    src={event.image}
    alt={event.title}
    className="w-full h-40 object-cover rounded mb-3"
   />
   <span className="text-xs text-blue-600 mb-1">{event.category}</span>
   <h3 className="font-semibold">{event.title}</h3>
   <p className="text-sm text-gray-600 mb-2">{event.desc}</p>
   <div className="mt-auto text-xs text-gray-500 space-y-1">
    <div>
     {event.date} • {event.time}
    </div>
    <div>{event.place}</div>
    <div>{event.participants}</div>
   </div>
  </div>
 );
} 