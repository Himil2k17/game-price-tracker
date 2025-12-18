import express from "express";
import cors from "cors";
import fetch from "node-fetch";

const app = express();
const PORT = 5000;

const priceCache = new Map();
const CACHE_TTL = 1000 * 60 * 60; // 1 hour

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Backend is running");
});

app.get("/api/prices", async (req, res) => {
  try {
    const { title } = req.query;
    if (!title) {
      return res.status(400).json({ error: "Missing title" });
    }

    const cleanTitle = normalizeGameName(title);

    // Cache check
    const cached = priceCache.get(cleanTitle);
    if (cached && Date.now() - cached.timestamp < CACHE_TTL) {
      return res.json(cached.data);
    }

    // 1️⃣ Search game
    const searchRes = await fetch(
      `https://www.cheapshark.com/api/1.0/games?title=${encodeURIComponent(
        cleanTitle
      )}&limit=1`
    );
    const searchData = await searchRes.json();

    if (!searchData.length) {
      return res.json(null);
    }

    const gameId = searchData[0].gameID;

    // 2️⃣ Fetch deals for that game
    const dealsRes = await fetch(
      `https://www.cheapshark.com/api/1.0/games?id=${gameId}`
    );
    const dealData = await dealsRes.json();

    // 3️⃣ Fetch stores
    const storesRes = await fetch(
      "https://www.cheapshark.com/api/1.0/stores"
    );
    const storesData = await storesRes.json();

    const storeMap = {};
    storesData.forEach((store) => {
      storeMap[store.storeID] = store;
    });

    const result = {
      title: dealData.info.title,
      steamAppID: dealData.info.steamAppID,
      deals: dealData.deals.map((deal) => ({
        dealID: deal.dealID,
        storeID: deal.storeID,
        price: deal.price,
        retailPrice: deal.retailPrice,
        savings: Math.round(deal.savings),
        link: `https://www.cheapshark.com/redirect?dealID=${deal.dealID}`,
        store: storeMap[deal.storeID],
      })),
    };

    // Cache result
    priceCache.set(cleanTitle, {
      timestamp: Date.now(),
      data: result,
    });

    res.json(result);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch prices" });
  }
});


app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

function normalizeGameName(name) {
  return name
    .replace(/\(.*?\)/g, "")
    .replace(/:/g, "")
    .replace(/-/g, " ")
    .trim();
}