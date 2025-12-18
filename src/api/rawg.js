const API_KEY = import.meta.env.VITE_RAWG_API_KEY;
const BASE_URL = "https://api.rawg.io/api";

export async function fetchGames() {
  const response = await fetch(
    `${BASE_URL}/games?key=${API_KEY}&page_size=36`
  );

  if (!response.ok) {
    throw new Error("Failed to fetch games");
  }

  const data = await response.json();
  return data.results;
}

export async function fetchFeaturedGames() {
  const response = await fetch(
    `${BASE_URL}/games?key=${API_KEY}&ordering=-rating&page_size=6`
  );

  if (!response.ok) {
    throw new Error("Failed to fetch featured games");
  }

  const data = await response.json();
  return data.results;
}

export async function searchGames(query) {
  if (!query) return [];

  const response = await fetch(
    `${BASE_URL}/games?key=${API_KEY}&search=${query}&page_size=36`
  );

  if (!response.ok) {
    throw new Error("Failed to search games");
  }

  const data = await response.json();
  return data.results;
}

// Trending / Popular games
export async function fetchTrendingGames() {
  const res = await fetch(
    `${BASE_URL}/games?key=${API_KEY}&ordering=-added&page_size=12`
  );
  const data = await res.json();
  return data.results;
}

// Top-rated games (all time)
export async function fetchTopRatedGames() {
  const res = await fetch(
    `${BASE_URL}/games?key=${API_KEY}&ordering=-rating&page_size=12`
  );
  const data = await res.json();
  return data.results;
}

// Game of the Year winners (curated)
export async function fetchGOTYGames() {
  const GOTY_TITLES = [
    "Elden Ring",
    "The Witcher 3",
    "Red Dead Redemption 2",
    "Alan Wake 2",
    "Grand Theft Auto V",
    "Portal 2",
  ];

  const requests = GOTY_TITLES.map(async (title) => {
    const res = await fetch(
      `${BASE_URL}/games?key=${API_KEY}&search=${encodeURIComponent(
        title
      )}&page_size=1`
    );
    const data = await res.json();
    return data.results?.[0];
  });

  const results = await Promise.all(requests);

  // Remove undefined results safely
  return results.filter(Boolean);
}

