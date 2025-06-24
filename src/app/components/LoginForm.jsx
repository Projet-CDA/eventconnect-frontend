// src/components/LoginForm.jsx
"use client";
import React, { useState } from "react";
import { loginUser } from "../api/login";
import { useRouter } from "next/navigation";
import LogoutButton from "./LogoutButton";

export default function LoginForm() {
  const [form, setForm] = useState({ email: "", mot_de_passe: "" });
  const [message, setMessage] = useState("");
  const router = useRouter();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await loginUser(form);
    setMessage(res.message || "Connexion réussie !");
    if (res.token) {
      // Stocker le token dans le localStorage
      localStorage.setItem("token", res.token);
      // Optionnel : tu peux aussi stocker des infos user
      // localStorage.setItem("user", JSON.stringify(res.utilisateur));
      setTimeout(() => router.push("/"), 1000); // Redirige après 1 seconde
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{ maxWidth: 400, margin: "2rem auto" }}
    >
      <h2>Connexion</h2>
      <input
        type="email"
        name="email"
        placeholder="Email"
        value={form.email}
        onChange={handleChange}
        required
      />
      <br />
      <input
        type="password"
        name="mot_de_passe"
        placeholder="Mot de passe"
        value={form.mot_de_passe}
        onChange={handleChange}
        required
      />
      <br />
      <button type="submit">Se connecter</button>

      <LogoutButton />
      {message && <div style={{ marginTop: "1rem" }}>{message}</div>}
    </form>
  );
}
