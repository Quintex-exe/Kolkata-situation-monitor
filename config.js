// config.js
// Central configuration for KSM

window.KSM_CONFIG = {

  // Leave empty for same-origin deployment
  // Example:
  // API_BASE: "https://your-backend.vercel.app"
  API_BASE: "",

  REFRESH: {
    WEATHER: 60000,      // 1 minute
    AQI: 60000,          // 1 minute
    NEWS: 300000,        // 5 minutes
    INCIDENTS: 300000,   // 5 minutes
    SYSTEM: 30000        // 30 seconds
  },

  ENDPOINTS: {
    WEATHER: "/api/weather",
    AQI: "/api/aq",
    NEWS: "/api/news",
    INCIDENTS: "/api/incidents",
    SYSTEM: "/api/system",
    SUMMARY: "/api/summary",
    INTEL: "/api/intel"
  },

  MAP: {
    CENTER: {
      lat: 22.5726,
      lon: 88.3639
    },
    DEFAULT_ZOOM: 12,
    INCIDENT_ZOOM: 15
  },

  REGIONS: {
    CENTRAL: [22.5726, 88.3639],
    NORTH: [22.6200, 88.3900],
    SOUTH: [22.5000, 88.3500],
    EAST: [22.5800, 88.4300],
    WEST: [22.5700, 88.2900],
    HOWRAH: [22.5958, 88.2636],
    "SALT LAKE": [22.5867, 88.4170],
    "NEW TOWN": [22.5750, 88.4790]
  },

  THREAT_LEVELS: {
    LOW: {
      min: 0,
      max: 2
    },
    MEDIUM: {
      min: 3,
      max: 4
    },
    HIGH: {
      min: 5,
      max: 7
    },
    CRITICAL: {
      min: 8,
      max: 999
    }
  }

};
