
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

async function refreshAll(){
  if(typeof fetchWeather!=="function" || typeof fetchAQ!=="function") return;

  document.getElementById("conn-status").textContent="UPDATING";

  try{
    const [weather,aq]=await Promise.all([fetchWeather(),fetchAQ()]);

    if(window.renderWeather) renderWeather(weather,aq);
    if(window.addWeatherMarkers) addWeatherMarkers(weather);
    if(window.fetchIncidents && window.renderIncidents){
      const incidents=await fetchIncidents(aq,weather);
      renderIncidents(incidents);
    }

    document.getElementById("conn-status").textContent="CONNECTED";
    document.getElementById("updated").textContent="Updated just now";
  }catch(err){
    console.error(err);
    document.getElementById("conn-status").textContent="ERROR";
  }
}

console.log("KSM V3 Command Center JS Loaded");
