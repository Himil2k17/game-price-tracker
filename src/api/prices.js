export async function fetchGamePriceFromBackend(gameName) {
  if (!gameName) return null;

  const response = await fetch(
    `http://localhost:5000/api/prices?title=${encodeURIComponent(gameName)}`
  );

  if (!response.ok) {
    throw new Error("Failed to fetch price");
  }

  return await response.json();
}
