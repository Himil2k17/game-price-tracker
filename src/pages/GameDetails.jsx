import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { fetchGamePriceFromBackend } from "../api/prices";

const API_KEY = import.meta.env.VITE_RAWG_API_KEY;

/* ===============================
   Skeleton Loader
================================ */
function GameDetailsSkeleton() {
  return (
    <div className="game-details">
      <div className="skeleton" style={{ height: 32, width: "60%" }} />
      <div className="skeleton" style={{ height: 400, margin: "20px 0" }} />
      <div className="skeleton" style={{ height: 14, width: "40%" }} />
      <div
        className="skeleton"
        style={{ height: 14, width: "70%", marginTop: 10 }}
      />
      <div style={{ marginTop: 30 }}>
        <div className="skeleton" style={{ height: 20, width: "30%" }} />
        <div
          className="skeleton"
          style={{ height: 120, marginTop: 10 }}
        />
      </div>
    </div>
  );
}

function GameDetails() {
  const { slug } = useParams();
  const navigate = useNavigate();

  const [game, setGame] = useState(null);
  const [screenshots, setScreenshots] = useState([]);
  const [trailer, setTrailer] = useState(null);

  const [price, setPrice] = useState(null);
  const [loading, setLoading] = useState(true);
  const [priceLoading, setPriceLoading] = useState(true);

  const [activeIndex, setActiveIndex] = useState(null);

  const visibleScreenshots = screenshots.slice(0, 6);

  /* ===============================
     Back Button
  ================================ */
  const handleBack = () => {
    window.history.length > 1 ? navigate(-1) : navigate("/games");
  };

  /* ===============================
     RAWG Game Data
  ================================ */
  useEffect(() => {
    let isMounted = true;

    async function fetchGameData() {
      try {
        setLoading(true);

        const [gameRes, shotsRes, movieRes] = await Promise.all([
          fetch(`https://api.rawg.io/api/games/${slug}?key=${API_KEY}`),
          fetch(
            `https://api.rawg.io/api/games/${slug}/screenshots?key=${API_KEY}`
          ),
          fetch(
            `https://api.rawg.io/api/games/${slug}/movies?key=${API_KEY}`
          ),
        ]);

        const gameData = await gameRes.json();
        if (!gameData || gameData.detail) {
          if (isMounted) setGame(null);
          return;
        }

        const shotsData = await shotsRes.json();
        const movieData = await movieRes.json();

        if (!isMounted) return;

        setGame(gameData);
        setScreenshots(shotsData.results || []);
        setTrailer(movieData.results?.[0] || null);
      } catch (error) {
        console.error("RAWG error:", error);
      } finally {
        if (isMounted) setLoading(false);
      }
    }

    fetchGameData();
    return () => {
      isMounted = false;
    };
  }, [slug]);

  /* ===============================
     Backend Price Fetch
  ================================ */
  useEffect(() => {
    let isMounted = true;

    async function fetchPrice() {
      try {
        setPriceLoading(true);
        const data = await fetchGamePriceFromBackend(game.name);
        if (isMounted) setPrice(data);
      } catch (error) {
        console.error("Price fetch error:", error);
        if (isMounted) setPrice(null);
      } finally {
        if (isMounted) setPriceLoading(false);
      }
    }

    if (game?.name) fetchPrice();
    return () => {
      isMounted = false;
    };
  }, [game]);

  /* ===============================
     Lightbox + Keyboard Navigation
  ================================ */
  useEffect(() => {
    if (activeIndex === null) return;

    const handleKeyDown = (e) => {
      if (e.key === "Escape") setActiveIndex(null);
      if (e.key === "ArrowRight") {
        setActiveIndex((i) =>
          Math.min(i + 1, visibleScreenshots.length - 1)
        );
      }
      if (e.key === "ArrowLeft") {
        setActiveIndex((i) => Math.max(i - 1, 0));
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "auto";
    };
  }, [activeIndex, visibleScreenshots.length]);

  /* ===============================
     Render Guards
  ================================ */
  if (loading) return <GameDetailsSkeleton />;
  if (!game) return <p>Game not found</p>;

  /* ===============================
     Render
  ================================ */
  return (
    <div className="game-details">
      <button className="back-button" onClick={handleBack}>
        Back
      </button>

      <h2>{game.name}</h2>

      {trailer && (
        <video
          src={trailer.data.max}
          className="game-video"
          autoPlay
          muted
          loop
          playsInline
          controls
        />
      )}

      <img
        src={game.background_image}
        alt={game.name}
        className="details-cover"
      />

      <p>
        <strong>Genres:</strong>{" "}
        {game.genres.map((g) => g.name).join(", ")}
      </p>

      <p>
        <strong>Platforms:</strong>{" "}
        {game.platforms.map((p) => p.platform.name).join(", ")}
      </p>

      <p>
        <strong>Release Date:</strong> {game.released}
      </p>

      <div dangerouslySetInnerHTML={{ __html: game.description }} />

      {/* Screenshots */}
      <h3>Screenshots</h3>
      <div className="screenshot-grid">
        {visibleScreenshots.map((shot, index) => (
          <img
            key={shot.id}
            src={shot.image}
            alt="Screenshot"
            className="screenshot-thumb"
            onClick={() => setActiveIndex(index)}
          />
        ))}
      </div>

      {activeIndex !== null && (
        <div className="lightbox" onClick={() => setActiveIndex(null)}>
          <button
            className="lightbox-arrow left"
            onClick={(e) => {
              e.stopPropagation();
              setActiveIndex((i) => Math.max(i - 1, 0));
            }}
          >
            ‹
          </button>

          <img
            src={visibleScreenshots[activeIndex].image}
            alt="Screenshot full"
            onClick={(e) => e.stopPropagation()}
          />

          <button
            className="lightbox-arrow right"
            onClick={(e) => {
              e.stopPropagation();
              setActiveIndex((i) =>
                Math.min(i + 1, visibleScreenshots.length - 1)
              );
            }}
          >
            ›
          </button>
        </div>
      )}

      {/* Prices */}
      <h3>Available Prices (PC)</h3>
      <p className="platform-note">
        Prices shown for PC (Steam & supported stores)
      </p>

      {priceLoading && <p>Loading prices...</p>}

      {!priceLoading && !price && (
        <p>Price information unavailable.</p>
      )}

      {!priceLoading && price && (
        <div className="deals">
          {price.deals.slice(0, 6).map((deal) => (
            <div key={deal.dealID} className="deal-card">
              <div className="store-info">
                {deal.store && (
                  <>
                    <img
                      src={`https://www.cheapshark.com${deal.store.images.logo}`}
                      alt={deal.store.storeName}
                      className="store-logo"
                    />
                    <span>{deal.store.storeName}</span>
                  </>
                )}
              </div>

              <p className="price">
                ${deal.price}
                <span className="discount">
                  {" "}
                  (-{deal.savings}%)
                </span>
              </p>

              <p className="retail">
                Normal: ${deal.retailPrice}
              </p>

              <a
                href={deal.link}
                target="_blank"
                rel="noreferrer"
                className="view"
              >
                View Deal
              </a>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default GameDetails;
