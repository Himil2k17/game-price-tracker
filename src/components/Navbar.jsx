import { NavLink } from "react-router-dom";
import SearchBar from "./SearchBar";
import { useEffect } from "react";

function Navbar({ searchTerm, setSearchTerm }) {
  useEffect(() => {
    const clear = () => setSearchTerm("");
    window.addEventListener("clear-search", clear);
    return () => window.removeEventListener("clear-search", clear);
  }, []);
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
          onClick={() => setSearchTerm("")}
        >
          Home
        </NavLink>

        <NavLink
          to="/games"
          className={({ isActive }) =>
            isActive ? "nav-link active" : "nav-link"
          }
          onClick={() => setSearchTerm("")}
        >
          Games
        </NavLink>

        <NavLink 
          to="/upcoming" 
          className="nav-link"
          onClick={() => setSearchTerm("")}
          >
          Upcoming
        </NavLink>
      </div>
    </nav>
  );
}

export default Navbar;
