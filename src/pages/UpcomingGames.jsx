import { useEffect, useState, useRef  } from "react";
import GameCard, { GameCardSkeleton } from "../components/GameCard";

const API_KEY = import.meta.env.VITE_RAWG_API_KEY;

const today = new Date().toISOString().split("T")[0];

function UpcomingGames() {
  const [games, setGames] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [hasMore, setHasMore] = useState(true);

  const loaderRef = useRef(null);
  useEffect(() => {
    async function fetchUpcoming() {
      try {
        const today = new Date().toISOString().split("T")[0];

        const res = await fetch(
          `https://api.rawg.io/api/games?key=${API_KEY}&dates=${today},2035-12-31&ordering=-added&page_size=20`
        );
        
        const data = await res.json();
        setGames(data.results || []);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    fetchUpcoming();
  }, []);

  useEffect(() => {
  let active = true;

  async function loadUpcoming() {
    if (!hasMore) return;

    setLoading(true);

    const res = await fetch(
      `https://api.rawg.io/api/games?key=${API_KEY}&dates=${today},2035-12-31&ordering=-added&page=${page}&page_size=30`
    );

    const data = await res.json();

    if (!active) return;

    setGames(prev => [...prev, ...data.results]);
    setHasMore(Boolean(data.next));
    setLoading(false);
  }

  loadUpcoming();
  return () => (active = false);
}, [page]);

  useEffect(() => {
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
}, [loading, hasMore]);
  
//   if (loading) return 
//   {loading && (
//         <div className="game-grid">
//           {Array.from({ length: 12 }).map((_, i) => (
//             <GameCardSkeleton key={i} />
//           ))}
//         </div>
//         )} <p style={{ textAlign: "center" }}>Loading upcoming games...</p>;

  return (
    <div style={{ padding: "32px" }}>
      <h2>🎮 Upcoming Games</h2>
      {/* <p style={{ opacity: 0.7 }}>
        Games releasing soon with trailers, screenshots & details.
      </p> */}

      {loading && (
        <div className="game-grid">
          {Array.from({ length: 12 }).map((_, i) => (
            <GameCardSkeleton key={i} />
          ))}
        </div>
        )}  

      <div className="game-grid">
        {games.map((game) => (
          <GameCard key={game.id} game={game} />
        ))}
      </div>

      {loading && (
        <p style={{ textAlign: "center" }}>Loading...</p>
        )}

        {!hasMore && (
        <p style={{ textAlign: "center", opacity: .6 }}>
            No more upcoming games
        </p>
        )}

        <div ref={loaderRef}></div>
    </div>
  );
}

export default UpcomingGames;
