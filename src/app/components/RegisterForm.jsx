// src/components/RegisterForm.jsx
"use client";
import React, { useState } from "react";
import { registerUser } from "../api/register";

export default function RegisterForm() {
  // Correspond aux champs attendus par le back
  const [form, setForm] = useState({ nom: "", email: "", mot_de_passe: "" });
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await registerUser(form);
    setMessage(res.message || "Inscription réussie !");
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{ maxWidth: 400, margin: "2rem auto" }}
    >
      <h2>Inscription</h2>
      <input
        type="text"
        name="nom"
        placeholder="Nom"
        value={form.nom}
        onChange={handleChange}
        required
      />
      <br />
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
      <button type="submit">S’inscrire</button>
      {message && <div style={{ marginTop: "1rem" }}>{message}</div>}
    </form>
  );
}
