export async function loginUser(data) {
  const response = await fetch("http://localhost:3000/api/utilisateurs/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return response.json();
}
