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
    </div>
  );
}

export default Home;
