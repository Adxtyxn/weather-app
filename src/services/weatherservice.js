const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;
const WEATHER_URL = "https://api.openweathermap.org/data/2.5/weather";
const GEO_URL = "https://api.openweathermap.org/geo/1.0/direct";

/* 🚨 Safety check */
if (!API_KEY) {
  throw new Error("API key is missing. Check your .env file");
}

/* 🌆 Fetch weather by city name */
export const fetchWeather = async (city) => {
  try {
    const res = await fetch(
      `${WEATHER_URL}?q=${city}&appid=${API_KEY}&units=metric`
    );

    if (!res.ok) {
      throw new Error("City not found");
    }

    return await res.json();
  } catch (error) {
    console.error("fetchWeather error:", error);
    throw error;
  }
};

/* 📍 Fetch weather using coordinates */
export const fetchWeatherByCoords = async (lat, lon) => {
  try {
    const res = await fetch(
      `${WEATHER_URL}?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
    );

    if (!res.ok) {
      throw new Error("Failed to fetch weather for location");
    }

    return await res.json();
  } catch (error) {
    console.error("fetchWeatherByCoords error:", error);
    throw error;
  }
};

/* 🔍 Convert city → coordinates (for search feature) */
export const fetchCoordsByCity = async (city) => {
  try {
    const res = await fetch(
      `${GEO_URL}?q=${city}&limit=1&appid=${API_KEY}`
    );

    if (!res.ok) {
      throw new Error("Failed to fetch location");
    }

    const data = await res.json();

    if (!data.length) {
      throw new Error("Location not found");
    }

    return data[0]; // { name, lat, lon, country }
  } catch (error) {
    console.error("fetchCoordsByCity error:", error);
    throw error;
  }
};