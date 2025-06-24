// src/components/LogoutButton.jsx
"use client";
import React from "react";
import { useRouter } from "next/navigation";

export default function LogoutButton() {
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("userId");
    // Optionnel : tu peux aussi vider tout le localStorage si tu veux vraiment reset tout :
    // localStorage.clear();
    router.push("/login"); // Redirige vers la page de connexion
  };

  return (
    <button type="button" onClick={handleLogout}>
      Se déconnecter
    </button>
  );
}
