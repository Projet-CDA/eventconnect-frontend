// Call api to register a user
export async function registerUser(data) {
 const response = await fetch(
   "http://localhost:3000/api/utilisateurs/register",
   {
     method: "POST",
     headers: { "Content-Type": "application/json" },
     body: JSON.stringify(data),
   }
 );
 return response.json();
}