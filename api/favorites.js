const API_URL =
  process.env.NEXT_PUBLIC_API_URL ||
  "https://eventconnectes-backend.pphilibert-web.eu/api";

export async function getFavorites() {
  const token = localStorage.getItem("token");
  const res = await fetch(`${API_URL}/favoris`, {
    headers: { Authorization: `Bearer ${token}` },
    credentials: "include",
  });
  if (!res.ok) throw new Error("Erreur lors du chargement des favoris");
  return res.json();
}

export async function addFavorite(evenement_id) {
  const token = localStorage.getItem("token");
  const res = await fetch(`${API_URL}/favoris`, {
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
  const res = await fetch(`${API_URL}/favoris/${favori_id}`, {
    method: "DELETE",
    headers: { Authorization: `Bearer ${token}` },
    credentials: "include",
  });
  if (!res.ok) throw new Error("Erreur lors de la suppression du favori");
}
