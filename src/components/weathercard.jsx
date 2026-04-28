const WeatherCard = ({ weather, position, onClose }) => {
  if (!weather) return null;

  return (
    <div
      className="glass-card"
      style={{
        top: position?.y || 100,
        left: position?.x || 20
      }}
    >
      {/* ❌ Close button */}
      <button className="close-btn" onClick={onClose}>
        ✖
      </button>

      {/* 📍 City */}
      <h2>{weather.name}</h2>

      {/* 🌡️ Temperature */}
      <div className="temp">
        {Math.round(weather.main.temp)}°C
      </div>

      {/* 🌤️ Description */}
      <p>{weather.weather[0].description}</p>

      {/* 📊 Extra info */}
      <div className="info">
        <p>Humidity: {weather.main.humidity}%</p>
        <p>Wind: {weather.wind.speed} m/s</p>
      </div>

      {/* 🌦️ Icon */}
      <img
        src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
        alt="weather"
      />
    </div>
  );
};

export default WeatherCard;