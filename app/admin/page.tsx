"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminPanel() {
  const router = useRouter();
  const [user, setUser] = useState<{ nom?: string } | null>(null);

  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (!userData) {
      router.replace("/");
      return;
    }
    try {
      const userObj = JSON.parse(userData);
      if (userObj.role !== "admin") {
        router.replace("/");
      } else {
        setUser(userObj);
      }
    } catch {
      router.replace("/");
    }
  }, [router]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-100 via-blue-100 to-white">
      <div className="bg-white/80 p-10 rounded-2xl shadow-2xl text-center">
        <h1 className="text-3xl font-bold text-indigo-700 mb-4">Admin Panel</h1>
        <p className="text-lg text-gray-700 mb-2">
          {user?.nom
            ? `Bienvenue, ${user.nom} !`
            : "Bienvenue sur le panneau d'administration !"}
        </p>
        <div className="mt-4 p-4 bg-indigo-50 rounded-xl text-indigo-800 font-semibold">
          ✅ Vous êtes connecté en tant qu'
          <span className="uppercase">ADMIN</span>
        </div>
      </div>
    </div>
  );
}
