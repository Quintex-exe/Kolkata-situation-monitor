### Short Description

**Kolkata Situation Monitor (KSM)** is a real-time operational intelligence dashboard designed to provide live situational awareness across Kolkata. It combines weather monitoring, air quality tracking, metro network status, incident reporting, and city intelligence feeds into a single interactive command-center interface. Built with HTML, CSS, JavaScript, and Leaflet.js, KSM offers an intuitive map-based experience for monitoring urban conditions, transportation networks, environmental factors, and emerging events in real time.

---

### GitHub Repository Description

**Real-time Kolkata operations dashboard featuring live weather, AQI monitoring, metro status tracking, incident alerts, intelligence feeds, and interactive mapping powered by Leaflet.js and Open-Meteo APIs.**

---

### Detailed Project Description

Kolkata Situation Monitor (KSM) is a modern operational dashboard built to centralize critical city information into a single monitoring platform. The application visualizes live environmental data, transportation status, and operational alerts through an interactive dark-themed interface inspired by professional command-and-control systems.

The dashboard integrates weather forecasts, air quality measurements, metro network status indicators, incident monitoring, and intelligence feeds while providing an interactive map for geographic awareness. Users can switch between map and feed views, filter operational layers, monitor key city metrics, and track developing situations across Kolkata in real time.

Designed as a lightweight single-page application, KSM requires no backend infrastructure and leverages public APIs to deliver a responsive monitoring experience suitable for demonstrations, smart city projects, urban analytics, emergency management concepts, and operational intelligence systems.

**Key Highlights:**

* Real-time weather and AQI monitoring
* Interactive city map with live overlays
* Metro network status tracking
* Incident and alert management
* Operational intelligence feed
* Dark command-center UI
* Lightweight, backend-free architecture
* Mobile and desktop compatible
* Easily extendable with additional APIs and data sources

**Use Cases:**

* Smart City Dashboards
* Urban Operations Centers
* Public Transport Monitoring
* Environmental Monitoring
* Emergency Response Visualization
* GIS and Mapping Projects
* Web Development Portfolio Projects
* Civic Technology Demonstrations

**Version:** 1.0
**Platform:** Web Application
**Technology:** HTML5, CSS3, JavaScript, Leaflet.js, Open-Meteo APIs, OpenStreetMap Data.

````md
# Kolkata Situation Monitor (KSM)

A real-time operations dashboard for monitoring weather, air quality, metro status, incidents, and local intelligence across Kolkata.

## Features

### Live Weather Monitoring
- Current temperature
- Humidity
- Wind speed
- UV Index
- Feels-like temperature
- Weather condition indicators
- Automatic updates

### Air Quality Monitoring
- Live AQI tracking
- PM2.5 and PM10 monitoring
- AQI visualization
- Location-based AQI markers

### Interactive Map
- Dark-mode operational map
- Weather markers
- AQI markers
- Metro station markers
- Zoom controls
- Live layer management

### Metro Operations Panel
- Multiple Kolkata Metro lines
- Service status indicators
- Delay notifications
- Planned maintenance alerts
- Operational overview

### Incident Monitoring
- Traffic incidents
- Metro disruptions
- Weather alerts
- Air quality alerts
- Live incident feed

### Intelligence Feed
- Latest city updates
- Breaking alerts
- Operational notifications
- Situational awareness panel

### Dashboard Controls
- Refresh data manually
- Switch between Map View and Feed View
- Toggle weather markers
- Toggle AQI markers
- Toggle metro markers
- Interactive metro navigation

---

# Technology Stack

## Frontend
- HTML5
- CSS3
- Vanilla JavaScript

## Mapping
- Leaflet.js
- CartoDB Dark Tiles
- OpenStreetMap

## APIs
- Open-Meteo Weather API
- Open-Meteo Air Quality API

## Fonts
- Space Mono
- DM Sans

---

# Installation

1. Download the project files.
2. Ensure internet access is available.
3. Open:

```bash
index.html
````

or

```bash
KSM_Fixed.html
```

in any modern browser.

No build process required.

---

# File Structure

```text
project/
│
├── KSM_Fixed.html
├── README.md
└── assets/
```

---

# Controls

## Top Bar

| Button  | Function                   |
| ------- | -------------------------- |
| Refresh | Updates all data           |
| Theme   | Toggle theme (placeholder) |
| Sign In | UI placeholder             |

## Map Toolbar

| Button    | Function              |
| --------- | --------------------- |
| Map View  | Shows interactive map |
| Feed View | Shows incident feed   |

## Filters

| Filter      | Function                  |
| ----------- | ------------------------- |
| Incidents   | Incident category toggle  |
| Floods      | Flood category toggle     |
| Weather     | Weather category toggle   |
| Traffic     | Traffic category toggle   |
| Metro       | Show/Hide metro markers   |
| Air Quality | Show/Hide AQI markers     |
| Temperature | Show/Hide weather markers |

---

# Data Sources

## Weather

Open-Meteo Forecast API

```text
https://api.open-meteo.com
```

## Air Quality

Open-Meteo Air Quality API

```text
https://air-quality-api.open-meteo.com
```

---

# Current Limitations

* Metro data is simulated.
* Incident data uses fallback data when AI endpoint is unavailable.
* News feed uses fallback data when AI endpoint is unavailable.
* Theme switching is not fully implemented.
* Flood monitoring is placeholder only.
* Traffic data is simulated.

---

# Future Improvements

* Real-time traffic integration
* Kolkata Metro API integration
* RSS intelligence feeds
* Emergency services monitoring
* Flood sensor integration
* OpenRouter AI support
* Historical analytics
* Heatmaps
* Push notifications
* User authentication

---

# Browser Support

* Google Chrome
* Microsoft Edge
* Brave
* Firefox
* Opera

---

# Performance

* Lightweight single-file architecture
* No backend required
* Fast loading
* Auto-refresh support
* Mobile responsive layout

---

# License

This project is provided for educational, demonstration, and operational dashboard development purposes.

---

# Author

Kolkata Situation Monitor (KSM)

Real-Time Operations Dashboard
Version 1.0

```
```
