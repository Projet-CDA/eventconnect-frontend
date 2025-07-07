const API_URL = "http://localhost:3000/api/favoris";

export async function getFavorites() {
  const token = localStorage.getItem("token");
  const res = await fetch(API_URL, {
    headers: { Authorization: `Bearer ${token}` },
    credentials: "include",
  });
  if (!res.ok) throw new Error("Erreur lors du chargement des favoris");
  return res.json();
}

export async function addFavorite(evenement_id) {
  const token = localStorage.getItem("token");
  const res = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    credentials: "include",
    body: JSON.stringify({ evenement_id }),
  });
  if (!res.ok) throw new Error("Erreur lors de l'ajout du favori");
  return res.json();
}

export async function removeFavorite(favori_id) {
  const token = localStorage.getItem("token");
  const res = await fetch(`${API_URL}/${favori_id}`, {
    method: "DELETE",
    headers: { Authorization: `Bearer ${token}` },
    credentials: "include",
  });
  if (!res.ok) throw new Error("Erreur lors de la suppression du favori");
}
