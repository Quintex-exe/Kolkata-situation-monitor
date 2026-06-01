
/* KSM V3 Command Center JS Patch */

window.activeFilters = new Set(["metro","aq","temp"]);

function toggleTheme(){
  document.body.classList.toggle("light-mode");
}

function toggleFilter(id){
  const el=document.getElementById("f-"+id);
  if(el) el.classList.toggle("active");

  if(activeFilters.has(id)) activeFilters.delete(id);
  else activeFilters.add(id);

  const groups={
    temp:window.weatherMarkers||[],
    aq:window.aqMarkers||[],
    metro:window.metroMarkers||[]
  };

  if(groups[id] && window.mapInst){
    groups[id].forEach(m=>{
      if(activeFilters.has(id)){
        if(!mapInst.hasLayer(m)) m.addTo(mapInst);
      }else{
        if(mapInst.hasLayer(m)) mapInst.removeLayer(m);
      }
    });
  }
}

function switchView(v){
  const mapWrap=document.getElementById("map-wrap");
  const feedView=document.getElementById("feed-view");

  document.getElementById("btn-map")?.classList.remove("active");
  document.getElementById("btn-feed")?.classList.remove("active");

  if(v==="feed"){
    mapWrap.style.display="none";
    feedView.style.display="block";
    document.getElementById("btn-feed")?.classList.add("active");
  }else{
    mapWrap.style.display="block";
    feedView.style.display="none";
    document.getElementById("btn-map")?.classList.add("active");
  }
}

document.addEventListener("click",(e)=>{

  if(e.target.closest(".show-more")){
    switchView("feed");
  }

  if(e.target.closest(".metro-line") && window.mapInst){
    mapInst.setView([22.5726,88.3639],14,{animate:true});
  }

  const region=e.target.closest(".region-btn");
  if(region && window.mapInst){
    const regions={
      "CENTRAL":[22.5726,88.3639],
      "NORTH":[22.62,88.39],
      "SOUTH":[22.50,88.35],
      "EAST":[22.58,88.43],
      "WEST":[22.57,88.29],
      "HOWRAH":[22.5958,88.2636],
      "SALT LAKE":[22.5867,88.4170],
      "NEW TOWN":[22.5750,88.4790]
    };

    const name=region.textContent.trim();
    if(regions[name]){
      mapInst.flyTo(regions[name],13,{duration:1.5});
    }
  }
});

// ===============================
// REALTIME CONFIG
// ===============================

const REFRESH_INTERVAL = 60 * 1000;     // 1 min
const NEWS_INTERVAL = 5 * 60 * 1000;    // 5 min
const SUMMARY_INTERVAL = 15 * 60 * 1000;

// ===============================
// API HELPERS
// ===============================

async function api(endpoint){

  const res = await fetch(endpoint,{
    cache:"no-store"
  });

  if(!res.ok){
    throw new Error(`${endpoint} failed`);
  }

  return await res.json();
}

// ===============================
// REALTIME DATA FETCHERS
// ===============================

async function fetchWeatherLive(){
  return api("/api/weather");
}

async function fetchAQLive(){
  return api("/api/aq");
}

async function fetchNewsLive(){
  return api("/api/news");
}

async function fetchIntelLive(){
  return api("/api/intel");
}

async function fetchSummaryLive(){
  return api("/api/summary");
}

async function fetchSystemLive(){
  return api("/api/system");
}

// ===============================
// THREAT LEVEL
// ===============================

function calculateThreat(aq, incidents){

  let score = 0;

  if(aq?.current?.us_aqi > 150){
    score += 4;
  }
  else if(aq?.current?.us_aqi > 100){
    score += 2;
  }

  score += Math.min(incidents.length,5);

  if(score >= 8) return "CRITICAL";
  if(score >= 5) return "HIGH";
  if(score >= 3) return "MEDIUM";

  return "LOW";
}

// ===============================
// REFRESH EVERYTHING
// ===============================

async function refreshAll(){

  try{

    document.getElementById("conn-status").textContent =
      "SYNCING";

    const [
      weather,
      aq,
      intel
    ] = await Promise.all([
      fetchWeatherLive(),
      fetchAQLive(),
      fetchIntelLive()
    ]);

    lastWeatherData = weather;
    lastAQData = aq;

    if(window.renderWeather){
      renderWeather(weather,aq);
    }

    if(window.addWeatherMarkers){
      addWeatherMarkers(weather);
    }

    if(window.addAQMarkers){
      addAQMarkers(aq);
    }

    if(window.fetchIncidents){

      const incidents =
        await fetchIncidents(aq,weather);

      lastIncidents = incidents;

      if(window.renderIncidents){
        renderIncidents(incidents);
      }

      if(window.addIncidentMapMarkers){
        addIncidentMapMarkers();
      }
    }

    const threat =
      calculateThreat(
        aq,
        lastIncidents
      );

    const threatEl =
      document.getElementById("threat-level");

    if(threatEl){
      threatEl.textContent = threat;
    }

    document.getElementById("conn-status")
      .textContent = "ONLINE";

    document.getElementById("updated")
      .textContent =
      "Updated " +
      new Date().toLocaleTimeString();

  }
  catch(err){

    console.error(err);

    document.getElementById("conn-status")
      .textContent =
      "OFFLINE";
  }
}

// ===============================
// NEWS REFRESH
// ===============================

async function refreshNews(){

  try{

    const news =
      await fetchNewsLive();

    if(window.renderNews){
      renderNews(news);
    }

  }catch(err){

    console.error(err);
  }
}

// ===============================
// AI SUMMARY
// ===============================

async function refreshSummary(){

  try{

    const summary =
      await fetchSummaryLive();

    const el =
      document.getElementById(
        "ai-summary"
      );

    if(el){
      el.innerHTML =
        summary.summary;
    }

  }catch(err){

    console.error(err);
  }
}

// ===============================
// SYSTEM STATUS
// ===============================

async function refreshSystem(){

  try{

    const sys =
      await fetchSystemLive();

    const conn =
      document.getElementById(
        "conn-status"
      );

    if(conn){
      conn.textContent =
        sys.status || "ONLINE";
    }

  }catch(err){

    console.error(err);
  }
}

// ===============================
// LIVE CLOCK
// ===============================

setInterval(()=>{

  const clock =
    document.getElementById(
      "clock"
    );

  if(clock){

    clock.textContent =
      new Date()
      .toLocaleTimeString(
        "en-IN",
        {
          hour12:false
        }
      );
  }

},1000);

// ===============================
// AUTO REFRESH
// ===============================

refreshAll();
refreshNews();
refreshSummary();

setInterval(
  refreshAll,
  REFRESH_INTERVAL
);

setInterval(
  refreshNews,
  NEWS_INTERVAL
);

setInterval(
  refreshSummary,
  SUMMARY_INTERVAL
);

setInterval(
  refreshSystem,
  30000
);

console.log(
  "KSM REALTIME ENGINE ONLINE"
);
