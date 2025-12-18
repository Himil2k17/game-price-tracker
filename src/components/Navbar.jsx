import { NavLink } from "react-router-dom";
import SearchBar from "./SearchBar";

function Navbar({ searchTerm, setSearchTerm }) {
  return (
    <nav className="navbar">
      <h1 className="logo">Games🎮</h1>

      <SearchBar
        value={searchTerm}
        onChange={setSearchTerm}
        placeholder="Search games..."
      />

      <div className="nav-links">
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive ? "nav-link active" : "nav-link"
          }
        >
          Home
        </NavLink>

        <NavLink
          to="/games"
          className={({ isActive }) =>
            isActive ? "nav-link active" : "nav-link"
          }
        >
          Games
        </NavLink>
      </div>
    </nav>
  );
}

export default Navbar;
