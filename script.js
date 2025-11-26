// Replace with your own OpenWeatherMap API key
const API_KEY = "8d6d86874300a82bc8aba0ee7a126662";

const locBtn = document.getElementById("loc-btn");
const searchForm = document.getElementById("search-form");
const cityInput = document.getElementById("city-input");
const statusText = document.getElementById("status");

const weatherCard = document.getElementById("weather-card");
const cityNameEl = document.getElementById("city-name");
const updatedTimeEl = document.getElementById("updated-time");
const tempEl = document.getElementById("temp");
const feelsLikeEl = document.getElementById("feels-like");
const iconEl = document.getElementById("weather-icon");
const descEl = document.getElementById("description");
const humidityEl = document.getElementById("humidity");
const windEl = document.getElementById("wind");
const pressureEl = document.getElementById("pressure");

// Helpers
function setStatus(msg, isError = false) {
  statusText.textContent = msg || "";
  statusText.style.color = isError ? "#fecaca" : "#e5e7eb";
}

function showWeatherCard(show) {
  weatherCard.classList.toggle("hidden", !show);
}

function formatTime(dt, timezoneOffsetSeconds) {
  // dt: Unix UTC seconds, timezoneOffsetSeconds: seconds from UTC
  const localMillis = (dt + timezoneOffsetSeconds) * 1000;
  const date = new Date(localMillis);
  return date.toUTCString().replace(" GMT", "");
}

// Fetch weather by coordinates
async function fetchWeatherByCoords(lat, lon) {
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`;
  return fetchWeather(url);
}

// Fetch weather by city name
async function fetchWeatherByCity(city) {
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(
    city
  )}&appid=${API_KEY}&units=metric`;
  return fetchWeather(url);
}

// Core fetch + render
async function fetchWeather(url) {
  try {
    setStatus("Loading weather data...");
    showWeatherCard(false);

    const res = await fetch(url);
    if (!res.ok) {
      if (res.status === 404) {
        throw new Error("City not found. Please check the name.");
      }
      throw new Error("Failed to fetch weather. Please try again.");
    }

    const data = await res.json();
    renderWeather(data);
    setStatus("");
  } catch (err) {
    console.error(err);
    setStatus(err.message, true);
  }
}

function renderWeather(data) {
  const {
    name,
    sys: { country },
    main: { temp, feels_like, humidity, pressure },
    wind: { speed },
    weather,
    dt,
    timezone
  } = data;

  const { description, icon } = weather[0];

  cityNameEl.textContent = `${name}, ${country}`;
  updatedTimeEl.textContent = `Updated: ${formatTime(dt, timezone)}`;

  tempEl.textContent = `${Math.round(temp)}°C`;
  feelsLikeEl.textContent = `Feels like ${Math.round(feels_like)}°C`;

  descEl.textContent = description;
  iconEl.src = `https://openweathermap.org/img/wn/${icon}@2x.png`;
  iconEl.alt = description;

  humidityEl.textContent = `${humidity}%`;
  windEl.textContent = `${speed} m/s`;
  pressureEl.textContent = `${pressure} hPa`;

  showWeatherCard(true);
}

// Event: use my location
locBtn.addEventListener("click", () => {
  if (!navigator.geolocation) {
    setStatus("Geolocation is not supported by your browser.", true);
    return;
  }

  setStatus("Getting your location...");
  navigator.geolocation.getCurrentPosition(
    (pos) => {
      const { latitude, longitude } = pos.coords;
      fetchWeatherByCoords(latitude, longitude);
    },
    (err) => {
      console.error(err);
      setStatus("Could not get your location. Please search by city.", true);
    }
  );
});

// Event: search by city
searchForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const city = cityInput.value.trim();
  if (!city) return;
  fetchWeatherByCity(city);
});
