import { useEffect, useState } from "react";
import { fetchGames, searchGames } from "../api/rawg";
// import GameCard from "../components/GameCard";
import GameCard, { GameCardSkeleton } from "../components/GameCard";

function Games({ searchTerm }) {
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);

    const fetchData = searchTerm
      ? searchGames(searchTerm)
      : fetchGames();

    fetchData
      .then((data) => {
        setGames(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [searchTerm]);

  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <section>
      <h2>🎮 All Games</h2>
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
      </section>
    </div>
  );
}

export default Games;
