import { useEffect, useState, useRef } from "react";
import { fetchGames, searchGames } from "../api/rawg";
import GameCard, { GameCardSkeleton } from "../components/GameCard";

const API_KEY = import.meta.env.VITE_RAWG_API_KEY;

function Games({ searchTerm }) {
  const [games, setGames] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [hasMore, setHasMore] = useState(true);

  const loaderRef = useRef(null);

  // ---------------------------------
  // 🔍 SEARCH MODE (no infinite scroll)
  // ---------------------------------
  useEffect(() => {
    if (!searchTerm) return;  // only run when searching

    setLoading(true);
    setHasMore(false);        // disable infinite scroll while searching
    setPage(1);               // reset page

    searchGames(searchTerm)
      .then((data) => {
        setGames(data || []);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [searchTerm]);

  // ---------------------------------
  // 📜 NORMAL MODE (infinite scroll ON)
  // ---------------------------------
  useEffect(() => {
    if (searchTerm) return; // <-- stop infinite scroll if searching

    let active = true;

    async function loadGames() {
      if (!hasMore) return;

      setLoading(true);

      const res = await fetch(
        `https://api.rawg.io/api/games?key=${API_KEY}&page=${page}&page_size=12`
      );

      const data = await res.json();
      if (!active) return;

      setGames(prev => [...prev, ...data.results]);
      setHasMore(Boolean(data.next));
      setLoading(false);
    }

    loadGames();
    return () => (active = false);
  }, [page, searchTerm, hasMore]);

  // ---------------------------------
  // 👀 Infinite Scroll Observer
  // ---------------------------------
  useEffect(() => {
    if (searchTerm) return;   // disable in search mode
    if (!loaderRef.current || loading) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && hasMore) {
          setPage(prev => prev + 1);
        }
      },
      { rootMargin: "200px" }
    );

    observer.observe(loaderRef.current);
    return () => observer.disconnect();
  }, [loading, hasMore, searchTerm]);


  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <section>
        <h2>🎮 All Games</h2>

        {/* Skeleton while loading */}
        {loading && (
          <div className="game-grid">
            {Array.from({ length: 18 }).map((_, i) => (
              <GameCardSkeleton key={i} />
            ))}
          </div>
        )}

        {/* Game Results */}
        <div className="game-grid">
          {games.map((game) => (
            <GameCard key={game.id} game={game} />
          ))}
        </div>

        {/* Infinite scroll status */}
        {!searchTerm && loading && (
          <p style={{ textAlign: "center" }}>Loading more games...</p>
        )}

        {!searchTerm && !hasMore && (
          <p style={{ textAlign: "center", opacity: 0.6 }}>
            You reached the end
          </p>
        )}

        <div ref={loaderRef}></div>
      </section>
    </div>
  );
}

export default Games;
