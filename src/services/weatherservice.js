const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;
const BASE_URL = "https://api.openweathermap.org/data/2.5/weather";

export const fetchWeather = async (city) => {
  try {
    const response = await fetch(
      `${BASE_URL}?q=${city}&appid=${API_KEY}&units=metric`
    );

    if (!response.ok) {
      throw new Error("City not found");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
};

export const fetchWeatherByCoords = async (lat, lon) => {
  const response = await fetch(
    `${BASE_URL}?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
  );

  if (!response.ok) {
    throw new Error("Location error");
  }

  return await response.json();
};