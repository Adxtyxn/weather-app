import { useState } from "react";
import Map from "./components/Map";
import { fetchWeatherByCoords } from "./services/weatherService";
import "./App.css"; // ✅ IMPORTANT

function App() {
  const [weather, setWeather] = useState(null);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [darkMode, setDarkMode] = useState(false);
  const [loading, setLoading] = useState(false);
  const [cardPosition, setCardPosition] = useState({ x: 20, y: 100 });

  const handleMapClick = async (lat, lng, event) => {
  setSelectedLocation({ lat, lng });

  // 👉 get screen position
  setCardPosition({
    x: event.clientX,
    y: event.clientY
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

        {/* ✅ Toggle switch (not button) */}
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

      {/* ✅ Popup-style card */}
      {weather && (
        <div className="weather-card"
         style={{
      top: cardPosition.y,
      left: cardPosition.x
    }}>
  <h2>{weather.name}</h2>

  <div className="temp">
    {Math.round(weather.main.temp)}°C
  </div>

  <div className="info">
    <p>{weather.weather[0].description}</p>
    <p>Humidity: {weather.main.humidity}%</p>
    <p>Wind: {weather.wind.speed} m/s</p>
    <img
  src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
  alt="weather icon"
/>
  </div>
</div>
      )}
    </div>
  );
}

export default App;