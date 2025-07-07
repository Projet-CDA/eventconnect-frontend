const API_URL =
  process.env.NEXT_PUBLIC_API_URL ||
  "https://eventconnectes-backend.pphilibert-web.eu/api";

// Call api to register a user
export async function registerUser(data) {
  const response = await fetch(`${API_URL}/utilisateurs/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return response.json();
}
