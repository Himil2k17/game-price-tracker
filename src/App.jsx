import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";

import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Games from "./pages/Games";
import GameDetails from "./pages/GameDetails";
import UpcomingGames from "./pages/UpcomingGames";

function App() {
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <BrowserRouter>
      <div className="app">
        <Navbar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

        <Routes>
          <Route
            path="/"
            element={<Home searchTerm={searchTerm} />}
          />
          <Route
            path="/games"
            element={<Games searchTerm={searchTerm} />}
          />
          <Route
            path="/games/:slug"
            element={<GameDetails />}
          />
          <Route
            path="/upcoming" 
            element={<UpcomingGames />} 
          />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
