import { useState } from "react";
import Map from "./components/Map";
import { fetchWeatherByCoords } from "./services/weatherService";
import "./App.css";

function App() {
  const [weather, setWeather] = useState(null);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [darkMode, setDarkMode] = useState(false);
  const [loading, setLoading] = useState(false);
  const [cardPosition, setCardPosition] = useState({ x: 20, y: 100 });

  // ✅ FIXED: receive x, y properly
  const handleMapClick = async (lat, lng, x, y) => {
    setSelectedLocation({ lat, lng });

    // ✅ FIX: use x, y safely
    setCardPosition({
      x: Math.max(20, x - 120),
      y: Math.max(80, y - 180)
    });

    setLoading(true);

    try {
      const data = await fetchWeatherByCoords(lat, lng);
      setWeather(data);
    } catch (err) {
      console.error(err);
    }

    setLoading(false);
  };

  return (
    <div className={darkMode ? "app dark" : "app"}>
      <div className="header">
        <h1>Weather Map 🌍</h1>

        <label className="switch">
          <input
            type="checkbox"
            checked={darkMode}
            onChange={() => setDarkMode(!darkMode)}
          />
          <span className="slider"></span>
        </label>
      </div>

      <Map
        onLocationSelect={handleMapClick}
        selectedLocation={selectedLocation}
      />

      {loading && <div className="loading">Loading...</div>}

      {weather && (
        <div
          className="glass-card"
          style={{
            position: "absolute", // ✅ IMPORTANT
            top: cardPosition.y,
            left: cardPosition.x,
            zIndex: 1000
          }}
        >
          <button
            className="close-btn"
            onClick={() => setWeather(null)}
          >
            ✖
          </button>

          <h2>{weather.name}</h2>
          <p>{weather.main.temp} °C</p>
          <p>{weather.weather[0].description}</p>
        </div>
      )}
    </div>
  );
}

export default App;