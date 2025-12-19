🎮 Game Price Tracker — (React + Node + RAWG + CheapShark)

A modern gaming discovery and price-comparison web app where users can:

✔ Browse trending, top-rated, newly released, and upcoming PC games
✔ View real game details — trailer, screenshots, release date, genres, platforms
✔ Check live PC prices from Steam / Epic / verified stores
✔ Search with instant results
✔ Infinite scroll browsing experience
✔ Clean Steam-style UI + Dark mode feel

Built as a learning + real-world portfolio project.

🏗️ Architecture Overview
game-price-tracker/
│
├── client/ (React App)
│   ├── src/
│   │   ├── api/
│   │   │   ├── rawg.js           # RAWG API functions
│   │   │   └── prices.js         # Backend price API consumer
│   │   ├── components/
│   │   │   ├── GameCard.jsx
│   │   │   ├── Navbar.jsx
│   │   │   ├── Skeletons.jsx
│   │   ├── pages/
│   │   │   ├── Home.jsx
│   │   │   ├── Games.jsx
│   │   │   ├── GameDetails.jsx
│   │   │   ├── UpcomingGames.jsx
│   │   ├── styles/
│   │   │   └── global.css
│   │   ├── App.jsx
│   │   └── main.jsx
│   │
│   └── vite.config.js
│
├── server/ (Node Backend)
│   ├── index.js
│   ├── routes/
│   │   └── prices.js             # CheapShark price aggregation
│   ├── services/
│   │   └── cheapshark.js
│   ├── utils/
│   │   └── cache.js               # (optional) rate-limit + caching
│   └── package.json
│
├── README.md
└── package.json

🌍 Tech Stack
Frontend

⚛️ React + Vite

🎨 CSS (Steam-style UI)

♻️ Infinite Scroll (Intersection Observer)

🔍 Debounced Search UX

📱 Fully Responsive

Backend

🟢 Node.js + Express

💰 CheapShark API integration (price lookup)

🧠 Smart lookup fallback

🔐 Backend API safe layer

🚀 MongoDB Ready (Price history / wishlist coming soon)

External APIs

🎮 RAWG API — Game Data + Trailers + Screenshots

💸 CheapShark API — Real Prices + Store deals

✨ Core Features
🏠 Homepage

Trending PC Games

Top Rated PC Games

New Releases (Last Year / Month — Steam + Epic only)

Upcoming Games Section

Clean dark-themed layout

🎮 Games Page

Infinite scroll browsing

Steam-like experience

Instant search

Disable infinite scroll while searching

Click card → Game Details

📝 Game Details Page

Includes:

🎥 Trailer (auto scroll to top)

🖼️ Screenshots + Lightbox + Keyboard controls

🕹️ Platforms

🏷️ Genres

📅 Release Date + COMING SOON badge

💵 Price comparison (via backend)

✔️ Steam / Epic / PC Stores

❌ Hide price if unreleased

Also includes:

Back button that clears search

🔮 Upcoming Page

Only unreleased games

Steam / Epic filtered

Infinite scroll

Details supported

🔌 Environment Variables
Client .env
VITE_RAWG_API_KEY=your_key_here

🚀 Running Locally
Install frontend
cd client
npm install
npm run dev

Install backend
cd server
npm install
npm start


Backend runs default:

http://localhost:5000


Frontend runs default:

http://localhost:5173

🧠 Smart UX Decisions Implemented

Auto disable infinite scroll during search

Clear search when opening Game Details

Avoid duplicate games across sections

Show only PC stores

Only show games with REAL prices

Skip console-exclusive titles

RAWG rate-limit friendly logic

Caching ready (optional)

🔥 Future Enhancements (Planned)

User wishlist system (MongoDB)

Price history graph

Email price drop alerts

Steam / Epic logos on cards

Store filters

Region-based pricing

Deploy to Vercel + Railway

💡 Learning Goals Achieved

React real-world app architecture

API integration best practices

Backend proxy architecture

Search + Infinite scroll combo logic

UI/UX decisions like real game stores

Error handling & fallback strategies

📸 Screenshots
🏠 Home Page
Modern Steam-style layout with Trending, Top Rated, New Releases and Upcoming sections.
<img width="1909" height="868" alt="home" src="https://github.com/user-attachments/assets/177ba18d-aaa3-481b-ac5f-975dd478ee0f" />

🎮 Games Page (Infinite Scroll + Search)
Browse thousands of games with infinite scroll. Search instantly filters results and disables infinite scrolling.
<img width="1025" height="727" alt="games" src="https://github.com/user-attachments/assets/c6907d77-d799-41d4-968b-83bf679e14bd" />


🔍 Search Experience
Clean and responsive search. When navigating to Game Details and back, the search resets automatically.
<img width="1023" height="754" alt="search" src="https://github.com/user-attachments/assets/a35d21cc-4165-40b9-9b89-878b503797c7" />

📝 Game Details Page
Full game details including:
Platforms, genres, release info
<img width="1025" height="762" alt="details1" src="https://github.com/user-attachments/assets/1bb3766d-40e9-4576-9a1d-8d1226e9a44d" />

Trailer (auto scroll to top)
<img width="<img width="1019" height="747" alt="trailer" src="https://github.com/user-attachments/assets/d8f080ed-4256-4bfb-aca3-9c568808d952" />

Screenshots + lightbox viewer
Real-time PC prices
<img width="613" height="333" alt="details2" src="https://github.com/user-attachments/assets/b2f8003d-bb55-4a72-a65d-0403d85b3d0f" />

🖼️ Screenshot Lightbox + Keyboard Navigation
Click screenshots to open full screen viewer with:
ESC to close
← → to navigate
Overlay blur + smooth animation
<img width="1027" height="738" alt="lightbox" src="https://github.com/user-attachments/assets/611efd0e-1d7c-4013-80cb-fda9d74ef03f" />

🔮 Upcoming Games
Only unreleased games with future release dates. Works with infinite scroll, Steam/Epic availability and details page.
<img width="1022" height="757" alt="upcoming" src="https://github.com/user-attachments/assets/65008a9a-ff27-4b29-b9b9-a23097449bf2" />

💸 Real PC Price Comparison
Live prices fetched from backend CheapShark proxy API. Shows:
Best deals
Normal price
Store logos
Discount %
Steam / Epic store links
<img width="954" height="354" alt="steamepic" src="https://github.com/user-attachments/assets/c36019f1-9cab-45b6-8adb-b98193cff5e3" />

📱 Fully Responsive

Optimized for desktop, tablet, and mobile views.

🧑‍💻 Author

Built as a personal learning + portfolio project
Passionate about games & full-stack development 🎮💻