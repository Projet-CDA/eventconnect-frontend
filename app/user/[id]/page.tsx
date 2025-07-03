// app/user/[id]/page.jsx
"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

interface User {
  id: string | number;
  nom: string;
  email: string;
}

export default function UserProfilePage() {
  const params = useParams();
  const router = useRouter();
  const userId = params.id;

  const [user, setUser] = useState<User | null>(null);

  // Get user data from localStorage based on userId
  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (userData) {
      const userObj = JSON.parse(userData);
      if (String(userObj.id) === String(userId)) {
        setUser(userObj);
      }
    }
  }, [userId]);

  // Clear user data from localStorage and redirect to connect page => Deconnexion
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("userId");
    router.push("/connect");
  };

  if (!user) return <div className="p-8">Chargement du profil...</div>;

  return (
    <div className="max-w-2xl mx-auto p-8">
      <h1 className="text-3xl mb-4">Bienvenue sur votre profil {user.nom} !</h1>
      <p className="mb-4">
        <strong>Email :</strong> {user.email}
      </p>
      <div className="flex flex-col space-y-4">
        <button className="border">Je modifie mon profil (feature)</button>
        <button
          className="bg-gray-500 hover:bg-gray-600 text-white font-semibold px-4 py-2 rounded"
          onClick={handleLogout}
        >
          Déconnexion
        </button>
      </div>
    </div>
  );
}
