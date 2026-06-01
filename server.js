require("dotenv").config();

const express = require("express");
const cors = require("cors");
const Parser = require("rss-parser");

const app = express();
const parser = new Parser();

app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3000;

let newsCache = [];
let incidentsCache = [];

async function updateNews() {
  const feeds = [
    "https://news.google.com/rss/search?q=Kolkata",
    "https://news.google.com/rss/search?q=West+Bengal",
    "https://feeds.bbci.co.uk/news/world/rss.xml"
  ];

  const articles = [];

  for (const url of feeds) {
    try {
      const feed = await parser.parseURL(url);

      feed.items.slice(0, 10).forEach(item => {
        articles.push({
          title: item.title,
          source: feed.title,
          link: item.link,
          pubDate: item.pubDate
        });
      });
    } catch (err) {
      console.error("Feed error:", url);
    }
  }

  newsCache = articles.slice(0, 50);
}

function buildIncidents() {
  incidentsCache = newsCache.slice(0, 15).map(item => ({
    title: item.title,
    location: "Kolkata",
    severity: "info",
    lat: 22.5726 + ((Math.random() - 0.5) * 0.08),
    lon: 88.3639 + ((Math.random() - 0.5) * 0.08)
  }));
}

app.get("/api/weather", async (req, res) => {
  try {
    const r = await fetch(
      "https://api.open-meteo.com/v1/forecast?latitude=22.5726&longitude=88.3639&current=temperature_2m,weather_code,wind_speed_10m"
    );
    res.json(await r.json());
  } catch (e) {
    res.status(500).json({ error: "weather unavailable" });
  }
});

app.get("/api/aq", async (req, res) => {
  try {
    const r = await fetch(
      "https://air-quality-api.open-meteo.com/v1/air-quality?latitude=22.5726&longitude=88.3639&current=us_aqi,pm2_5,pm10"
    );
    res.json(await r.json());
  } catch (e) {
    res.status(500).json({ error: "aq unavailable" });
  }
});

app.get("/api/news", (req, res) => {
  res.json(newsCache);
});

app.get("/api/incidents", (req, res) => {
  res.json(incidentsCache);
});

app.get("/api/system", (req, res) => {
  res.json({
    status: "ONLINE",
    news: newsCache.length,
    incidents: incidentsCache.length,
    updated: Date.now()
  });
});

(async () => {
  await updateNews();
  buildIncidents();

  setInterval(async () => {
    await updateNews();
    buildIncidents();
  }, 300000);

  app.listen(PORT, () => {
    console.log("KSM API running on port", PORT);
  });
})();
