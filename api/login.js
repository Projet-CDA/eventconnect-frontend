const API_URL =
  process.env.NEXT_PUBLIC_API_URL ||
  "https://eventconnectes-backend.pphilibert-web.eu/api";

export async function loginUser(data) {
  const response = await fetch(`${API_URL}/utilisateurs/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return response.json();
}
