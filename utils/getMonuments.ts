// lib/api/monuments.ts
export async function getMonuments() {
  // Implement your data fetching logic here
  // This should directly access your database or internal API
  // For example:
  const response = await fetch("http://localhost:3000/api/monumentsCards");
  if (!response.ok) throw new Error("Failed to fetch monuments");
  return response.json();
}
