// api-client.js

const API = {

  async getWeather() {
    const res = await fetch(
      KSM_CONFIG.API_BASE +
      KSM_CONFIG.ENDPOINTS.WEATHER
    );

    return await res.json();
  },

  async getAQ() {
    const res = await fetch(
      KSM_CONFIG.API_BASE +
      KSM_CONFIG.ENDPOINTS.AQI
    );

    return await res.json();
  },

  async getNews() {
    const res = await fetch(
      KSM_CONFIG.API_BASE +
      KSM_CONFIG.ENDPOINTS.NEWS
    );

    return await res.json();
  },

  async getIncidents() {
    const res = await fetch(
      KSM_CONFIG.API_BASE +
      KSM_CONFIG.ENDPOINTS.INCIDENTS
    );

    return await res.json();
  },

  async getSystem() {
    const res = await fetch(
      KSM_CONFIG.API_BASE +
      KSM_CONFIG.ENDPOINTS.SYSTEM
    );

    return await res.json();
  },

  async getIntel() {
    const res = await fetch(
      KSM_CONFIG.API_BASE +
      KSM_CONFIG.ENDPOINTS.INTEL
    );

    return await res.json();
  },

  async getSummary() {
    const res = await fetch(
      KSM_CONFIG.API_BASE +
      KSM_CONFIG.ENDPOINTS.SUMMARY
    );

    return await res.json();
  }

};
