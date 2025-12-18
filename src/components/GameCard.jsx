import { Link } from "react-router-dom";

function GameCard({ game }) {
  return (
    <Link to={`/games/${game.slug}`} className="game-card-link">
      <div className="game-card">
        <img
          src={game.background_image}
          alt={game.name}
          className="game-card-image"
        />

        <div className="game-card-content">
          <span className="game-type">Base Game</span>
          <h3 className="game-title">{game.name}</h3>
        </div>
      </div>
    </Link>
  );
}

export function GameCardSkeleton() {
  return (
    <div className="game-card">
      <div className="skeleton game-card-image" />
      <div className="game-card-content">
        <div className="skeleton" style={{ height: 12, width: "60%" }} />
        <div
          className="skeleton"
          style={{ height: 16, width: "80%", marginTop: 10 }}
        />
      </div>
    </div>
  );
}

export default GameCard;
