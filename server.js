/* ==========================================
   KSM REALTIME PATCH V5
   ========================================== */

window.activeFilters =
  window.activeFilters ||
  new Set([
    "incidents",
    "metro",
    "aq",
    "temp"
  ]);

// ==========================================
// THEME
// ==========================================

function toggleTheme() {
  document.body.classList.toggle("light-mode");
}

// ==========================================
// FILTERS
// ==========================================

function toggleFilter(id) {
  const el = document.getElementById("f-" + id);

  if (el) {
    el.classList.toggle("active");
  }

  if (activeFilters.has(id)) {
    activeFilters.delete(id);
  } else {
    activeFilters.add(id);
  }

  const groups = {
    temp: window.weatherMarkers || [],
    aq: window.aqMarkers || [],
    metro: window.metroMarkers || [],
    incidents: window.incidentMapMarkers || []
  };

  if (groups[id] && window.mapInst) {
    groups[id].forEach(marker => {
      if (activeFilters.has(id)) {
        if (!mapInst.hasLayer(marker)) {
          marker.addTo(mapInst);
        }
      } else {
        if (mapInst.hasLayer(marker)) {
          mapInst.removeLayer(marker);
        }
      }
    });
  }
}

// ==========================================
// VIEW SWITCH
// ==========================================

function switchView(view) {

  const mapWrap =
    document.getElementById("map-wrap");

  const feedView =
    document.getElementById("feed-view");

  document
    .getElementById("btn-map")
    ?.classList.remove("active");

  document
    .getElementById("btn-feed")
    ?.classList.remove("active");

  if (view === "feed") {

    mapWrap.style.display = "none";
    feedView.style.display = "block";

    document
      .getElementById("btn-feed")
      ?.classList.add("active");

  } else {

    mapWrap.style.display = "block";
    feedView.style.display = "none";

    document
      .getElementById("btn-map")
      ?.classList.add("active");
  }
}

// ==========================================
// REGION ZOOM
// ==========================================

document.addEventListener("click", e => {

  const region =
    e.target.closest(".region-btn");

  if (!region || !window.mapInst) {
    return;
  }

  const REGIONS = {

    CENTRAL: [22.5726, 88.3639],
    NORTH: [22.6200, 88.3900],
    SOUTH: [22.5000, 88.3500],
    EAST: [22.5800, 88.4300],
    WEST: [22.5700, 88.2900],
    HOWRAH: [22.5958, 88.2636],
    "SALT LAKE": [22.5867, 88.4170],
    "NEW TOWN": [22.5750, 88.4790]

  };

  const name =
    region.textContent.trim();

  if (REGIONS[name]) {

    mapInst.flyTo(
      REGIONS[name],
      13,
      {
        duration: 1.5
      }
    );
  }
});

// ==========================================
// CONFIG
// ==========================================

const REFRESH_INTERVAL =
  60 * 1000;

const NEWS_INTERVAL =
  5 * 60 * 1000;

const SYSTEM_INTERVAL =
  30 * 1000;

// ==========================================
// API HELPER
// ==========================================

async function api(endpoint) {

  const res =
    await fetch(
      endpoint,
      {
        cache: "no-store"
      }
    );

  if (!res.ok) {
    throw new Error(
      endpoint + " failed"
    );
  }

  return await res.json();
}

// ==========================================
// BACKEND ENDPOINTS
// ==========================================

async function fetchWeatherLive() {
  return api("/api/weather");
}

async function fetchAQLive() {
  return api("/api/aq");
}

async function fetchNewsLive() {

  try {
    return await api("/api/news");
  } catch {
    return [];
  }
}

async function fetchSystemLive() {

  try {
    return await api("/api/system");
  } catch {
    return {
      status: "OFFLINE"
    };
  }
}

// ==========================================
// THREAT CALCULATION
// ==========================================

function calculateThreat(
  aq,
  incidents
) {

  let score = 0;

  if (
    aq?.current?.us_aqi > 150
  ) {
    score += 4;
  } else if (
    aq?.current?.us_aqi > 100
  ) {
    score += 2;
  }

  score += Math.min(
    incidents.length,
    5
  );

  if (score >= 8)
    return "CRITICAL";

  if (score >= 5)
    return "HIGH";

  if (score >= 3)
    return "MEDIUM";

  return "LOW";
}

// ==========================================
// REFRESH ALL
// ==========================================

async function refreshAll() {

  try {

    document
      .getElementById(
        "conn-status"
      )
      .textContent =
      "SYNCING";

    const [
      weather,
      aq
    ] = await Promise.all([

      fetchWeatherLive(),
      fetchAQLive()

    ]);

    window.lastWeatherData =
      weather;

    window.lastAQData =
      aq;

    if (
      window.renderWeather
    ) {
      renderWeather(
        weather,
        aq
      );
    }

    if (
      window.addWeatherMarkers
    ) {
      addWeatherMarkers(
        weather
      );
    }

    if (
      window.addAQMarkers
    ) {
      addAQMarkers(aq);
    }

    const news =
      await fetchNewsLive();

    if (
      window.renderNews
    ) {
      renderNews(news);
    }

    try {

      const incidents =
        await api(
          "/api/incidents"
        );

      window.lastIncidents =
        incidents;

      if (
        window.renderIncidents
      ) {
        renderIncidents(
          incidents
        );
      }

      if (
        window.addIncidentMapMarkers
      ) {
        addIncidentMapMarkers();
      }

      const threat =
        calculateThreat(
          aq,
          incidents
        );

      const threatEl =
        document.getElementById(
          "threat-level"
        );

      if (threatEl) {
        threatEl.textContent =
          threat;
      }

    } catch (err) {

      console.error(
        "Incident API:",
        err
      );
    }

    document
      .getElementById(
        "updated"
      )
      .textContent =
      "Updated " +
      new Date()
      .toLocaleTimeString();

    document
      .getElementById(
        "conn-status"
      )
      .textContent =
      "ONLINE";

  } catch (err) {

    console.error(err);

    document
      .getElementById(
        "conn-status"
      )
      .textContent =
      "OFFLINE";
  }
}

// ==========================================
// SYSTEM STATUS
// ==========================================

async function refreshSystem() {

  const sys =
    await fetchSystemLive();

  const conn =
    document.getElementById(
      "conn-status"
    );

  if (
    conn &&
    sys?.status
  ) {
    conn.textContent =
      sys.status;
  }
}

// ==========================================
// CLOCK
// ==========================================

setInterval(() => {

  const clock =
    document.getElementById(
      "clock"
    );

  if (clock) {

    clock.textContent =
      new Date()
      .toLocaleTimeString(
        "en-IN",
        {
          hour12: false
        }
      );
  }

}, 1000);

// ==========================================
// STARTUP
// ==========================================

refreshAll();

setInterval(
  refreshAll,
  REFRESH_INTERVAL
);

setInterval(
  refreshSystem,
  SYSTEM_INTERVAL
);

console.log(
  "KSM REALTIME ENGINE ONLINE"
);
