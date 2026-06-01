require("dotenv").config();

const express = require("express");
const cors = require("cors");
const Parser = require("rss-parser");

const app = express();
const parser = new Parser();

app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3000;

const LAT = Number(
  process.env.KOLKATA_LAT || 22.5726
);

const LON = Number(
  process.env.KOLKATA_LON || 88.3639
);

let newsCache = [];
let incidentsCache = [];
let lastUpdated = null;

// ==========================================
// RSS SOURCES
// ==========================================

const RSS_FEEDS = [

  "https://news.google.com/rss/search?q=Kolkata",

  "https://news.google.com/rss/search?q=West+Bengal",

  "https://feeds.bbci.co.uk/news/world/rss.xml",

  "https://indianexpress.com/section/cities/kolkata/feed/",

  "https://www.thehindu.com/news/national/feeder/default.rss"

];

// ==========================================
// NEWS AGGREGATOR
// ==========================================

async function updateNews() {

  const articles = [];

  for (const url of RSS_FEEDS) {

    try {

      const feed =
        await parser.parseURL(url);

      feed.items
        .slice(0, 10)
        .forEach(item => {

          articles.push({

            title:
              item.title || "Untitled",

            source:
              feed.title || "RSS",

            link:
              item.link || "",

            pubDate:
              item.pubDate ||
              new Date().toISOString()

          });

        });

    } catch (err) {

      console.error(
        "[RSS ERROR]",
        url,
        err.message
      );

    }
  }

  const unique = [

    ...new Map(

      articles.map(
        item => [
          item.title,
          item
        ]
      )

    ).values()

  ];

  newsCache = unique

    .sort(

      (a, b) =>

        new Date(
          b.pubDate
        ) -

        new Date(
          a.pubDate
        )

    )

    .slice(0, 50);

  lastUpdated =
    Date.now();

  console.log(
    `[NEWS] ${newsCache.length} articles loaded`
  );
}

// ==========================================
// INCIDENT GENERATOR
// ==========================================

function buildIncidents() {

  incidentsCache =

    newsCache
      .slice(0, 15)

      .map(item => ({

        title:
          item.title,

        location:
          "Kolkata",

        severity:

          /fire|explosion|death|accident|crash/i
            .test(item.title)

            ? "high"

            :

            /traffic|rain|flood|storm/i
              .test(item.title)

              ? "medium"

              : "low",

        lat:

          LAT +

          (
            (
              Math.random() - 0.5
            ) * 0.08
          ),

        lon:

          LON +

          (
            (
              Math.random() - 0.5
            ) * 0.08
          )

      }));

  console.log(
    `[INCIDENTS] ${incidentsCache.length} generated`
  );
}

// ==========================================
// ROOT
// ==========================================

app.get("/", (req, res) => {

  res.json({

    name:
      "KSM API",

    status:
      "ONLINE",

    version:
      "1.0.0",

    endpoints: [

      "/api/weather",
      "/api/aq",
      "/api/news",
      "/api/incidents",
      "/api/system"

    ]

  });

});

// ==========================================
// WEATHER
// ==========================================

app.get(
  "/api/weather",
  async (req, res) => {

    try {

      const response =
        await fetch(

          `https://api.open-meteo.com/v1/forecast?latitude=${LAT}&longitude=${LON}&current=temperature_2m,weather_code,wind_speed_10m`

        );

      const data =
        await response.json();

      res.json(data);

    } catch (err) {

      console.error(
        err
      );

      res.status(500).json({

        error:
          "weather unavailable"

      });

    }
  }
);

// ==========================================
// AIR QUALITY
// ==========================================

app.get(
  "/api/aq",
  async (req, res) => {

    try {

      const response =
        await fetch(

          `https://air-quality-api.open-meteo.com/v1/air-quality?latitude=${LAT}&longitude=${LON}&current=us_aqi,pm2_5,pm10`

        );

      const data =
        await response.json();

      res.json(data);

    } catch (err) {

      console.error(
        err
      );

      res.status(500).json({

        error:
          "aq unavailable"

      });

    }
  }
);

// ==========================================
// NEWS
// ==========================================

app.get(
  "/api/news",
  (req, res) => {

    res.json(
      newsCache
    );

  }
);

// ==========================================
// INCIDENTS
// ==========================================

app.get(
  "/api/incidents",
  (req, res) => {

    res.json(
      incidentsCache
    );

  }
);

// ==========================================
// SYSTEM STATUS
// ==========================================

app.get(
  "/api/system",
  (req, res) => {

    res.json({

      status:
        "ONLINE",

      news:
        newsCache.length,

      incidents:
        incidentsCache.length,

      updated:
        lastUpdated,

      serverTime:
        Date.now()

    });

  }
);

// ==========================================
// AUTO REFRESH
// ==========================================

async function refreshFeeds() {

  try {

    await updateNews();

    buildIncidents();

  } catch (err) {

    console.error(
      "[REFRESH ERROR]",
      err
    );

  }
}

// ==========================================
// STARTUP
// ==========================================

(async () => {

  try {

    await refreshFeeds();

  } catch (err) {

    console.error(
      "[STARTUP ERROR]",
      err
    );

  }

  setInterval(
    refreshFeeds,
    5 * 60 * 1000
  );

  app.listen(
    PORT,
    () => {

      console.log(
        `KSM API running on port ${PORT}`
      );

      console.log(
        `http://localhost:${PORT}`
      );

    }
  );

})();
