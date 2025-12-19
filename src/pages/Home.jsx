import { useEffect, useState } from "react";
import {
  fetchTrendingGames,
  fetchTopRatedGames,
  fetchGOTYGames,
} from "../api/rawg";
import { searchGames } from "../api/rawg";
import GameCard, { GameCardSkeleton } from "../components/GameCard";

function Home({ searchTerm }) {
  const [trending, setTrending] = useState([]);
  const [topRated, setTopRated] = useState([]);
  const [goty, setGOTY] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchResults, setSearchResults] = useState([]);
  const [searchLoading, setSearchLoading] = useState(false);
  const [newReleases, setNewReleases] = useState([]);

  const API_KEY = import.meta.env.VITE_RAWG_API_KEY;

  useEffect(() => {
    async function loadHomeData() {
      setLoading(true);

      const [trendingData, topRatedData, gotyData] =
        await Promise.all([
          fetchTrendingGames(),
          fetchTopRatedGames(),
          fetchGOTYGames(),
        ]);

      setTrending(trendingData);
      setTopRated(topRatedData);
      setGOTY(gotyData);
      setLoading(false);
    }

    if (!searchTerm) {
      loadHomeData();
    }
  }, [searchTerm]);

  useEffect(() => {
  let isMounted = true;

  async function performSearch() {
    setSearchLoading(true);
    const results = await searchGames(searchTerm);
    if (isMounted) {
      setSearchResults(results);
      setSearchLoading(false);
    }
  }

  if (searchTerm) {
    performSearch();
  } else {
    setSearchResults([]);
  }

  return () => {
    isMounted = false;
  };
}, [searchTerm]);

  useEffect(() => {
  async function fetchNewReleases() {
    try {
      const { startDate, endDate } = getWeekRange();

      const res = await fetch(
        `https://api.rawg.io/api/games?key=${API_KEY}&dates=${startDate},${endDate}&ordering=-released&page_size=6`
      );

      const data = await res.json();
      setNewReleases(data.results || []);
    } catch (err) {
      console.error("Failed to load weekly releases", err);
    }
  }

  fetchNewReleases();
}, []);

  // if (loading && !searchTerm) return 
  // {loading && (
  //   <div className="game-grid">
  //     {Array.from({ length: 6 }).map((_, i) => (
  //       <GameCardSkeleton key={i} />
  //     ))}
  //   </div>
  // )};

  // If searching → reuse Games-style layout
  if (searchTerm) {
    return (
      <div>
        <section>
        <h2>Search Results</h2>
        {searchLoading && (
      <div className="game-grid">
        {Array.from({ length: 12 }).map((_, i) => (
          <GameCardSkeleton key={i} />
        ))}
      </div>
      )}
        <div className="game-grid">
          {searchResults
            .map((game) => (
              <GameCard key={game.id} game={game} />
            ))}
        </div>
        </section>
      </div>
    );
  }

  return (
    <div>
      <section>
        <h2>🔥 Trending Games</h2>
        {loading && (
          <div className="game-grid">
            {Array.from({ length: 6 }).map((_, i) => (
              <GameCardSkeleton key={i} />
            ))}
          </div>
        )}
        <div className="game-grid">
          {trending.map((game) => (
            <GameCard key={game.id} game={game} />
          ))}
        </div>
      </section>

      <section>
        <h2>⭐ Top Rated Games</h2>
        {loading && (
          <div className="game-grid">
            {Array.from({ length: 6 }).map((_, i) => (
              <GameCardSkeleton key={i} />
            ))}
          </div>
        )}
        <div className="game-grid">
          {topRated.map((game) => (
            <GameCard key={game.id} game={game} />
          ))}
        </div>
      </section>

      <section>
        <h2>🏆 Game of the Year Winners</h2>
          {loading && (
            <div className="game-grid">
              {Array.from({ length: 6 }).map((_, i) => (
                <GameCardSkeleton key={i} />
              ))}
            </div>
          )}
        <div className="game-grid">
          {goty.map((game) => (
            <GameCard key={game.id} game={game} />
          ))}
        </div>
      </section>

      <section >
        <h2>🔥 New Releases This Week</h2>
        {loading && (
          <div className="game-grid">
            {Array.from({ length: 6 }).map((_, i) => (
              <GameCardSkeleton key={i} />
            ))}
          </div>
        )}
        {/* <p style={{ opacity: 0.7 }}>
          The latest games released in the last 7 days
        </p> */}

        <div className="game-grid">
          {newReleases.length === 0 && (
            <p>No new games this week.</p>
          )}

          {newReleases.map((game) => (
            <GameCard key={game.id} game={game} />
          ))}
        </div>
      </section>
    </div>
  );
}

function getWeekRange() {
    const today = new Date();

    const start = new Date(today);
    start.setDate(today.getDate() - 7);   // last 7 days

    const startDate = start.toISOString().split("T")[0];
    const endDate = today.toISOString().split("T")[0];

    return { startDate, endDate };
  }
export default Home;
