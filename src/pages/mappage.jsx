import { useState } from "react";
import Map from "../components/Map";
import WeatherCard from "../components/WeatherCard";
import { fetchWeatherByCoords, fetchCoordsByCity } from "../services/weatherService";
import "../App.css";

function MapPage() {
  const [weather, setWeather] = useState(null);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [loading, setLoading] = useState(false);
  const [cardPosition, setCardPosition] = useState({ x: 20, y: 100 });
  const [search, setSearch] = useState("");

  /* 🗺️ Handle map click */
  const handleMapClick = async (lat, lng, x, y) => {
    setSelectedLocation({ lat, lng });

    // position card near click
    setCardPosition({
      x: Math.max(20, x - 110),
      y: Math.max(80, y - 170)
    });

    setLoading(true);

    try {
      const data = await fetchWeatherByCoords(lat, lng);
      setWeather(data);
    } catch (err) {
      console.error("Weather fetch error:", err);
    }

    setLoading(false);
  };

  /* 🔍 Handle search */
  const handleSearch = async () => {
    if (!search) return;

    try {
      const location = await fetchCoordsByCity(search);

      if (!location) return;

      const { lat, lon } = location;

      // simulate map click
      handleMapClick(lat, lon, 250, 200);
    } catch (err) {
      console.error("Search error:", err);
    }
  };

  return (
    <div className="app dark">
      {/* 🔍 Search Bar */}
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search location..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <button onClick={handleSearch}>Search</button>
      </div>

      {/* 🗺️ Map */}
      <Map
        onLocationSelect={handleMapClick}
        selectedLocation={selectedLocation}
      />

      {/* ⏳ Loading */}
      {loading && <div className="loading">Fetching weather...</div>}

      {/* 🌦️ Weather Card */}
      <WeatherCard
        weather={weather}
        position={cardPosition}
        onClose={() => setWeather(null)}
      />
    </div>
  );
}

export default MapPage;