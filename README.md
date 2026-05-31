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
