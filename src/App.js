import React, { useState } from "react";
import "./App.css";

function getWeatherBackgroundClass(weatherCode) {
  if (weatherCode === 0) return "bg-clear";
  else if ([1, 2, 3, 45, 48].includes(weatherCode)) return "bg-cloudy";
  else if (
    [51, 53, 55, 61, 63, 65, 66, 67, 80, 81, 82].includes(weatherCode)
  )
    return "bg-rain";
  else if ([71, 73, 75, 77].includes(weatherCode)) return "bg-snow";
  else if ([95, 96, 99].includes(weatherCode)) return "bg-thunderstorm";
  else return "bg-clear";
}

function App() {
  const [place, setPlace] = useState("");
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [coordinates, setCoordinates] = useState({ lat: "", lon: "" });

  const proxyUrl = "https://cors-anywhere.herokuapp.com/";

  const fetchWeatherByPlace = async () => {
    setError("");
    setWeather(null);

    if (!place.trim()) {
      setError("Please enter a place name");
      return;
    }

    setLoading(true);
    try {
      const geoRes = await fetch(
        proxyUrl +
          `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(
            place
          )}&count=1`
      );

      if (!geoRes.ok) {
        throw new Error("Failed to fetch geolocation data");
      }

      const geoData = await geoRes.json();

      if (!geoData.results || geoData.results.length === 0) {
        setError("Place not found");
        setLoading(false);
        return;
      }

      const { latitude, longitude, name, country } = geoData.results[0];
      setCoordinates({ lat: latitude, lon: longitude });

      const weatherRes = await fetch(
        proxyUrl +
          `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true`
      );

      if (!weatherRes.ok) {
        throw new Error("Failed to fetch weather data");
      }

      const weatherData = await weatherRes.json();

      if (!weatherData.current_weather) {
        setError("Weather data not available");
        setLoading(false);
        return;
      }

      setWeather({
        location: `${name}, ${country}`,
        ...weatherData.current_weather,
      });
    } catch (err) {
      setError(err.message || "Unexpected error occurred");
    }
    setLoading(false);
  };

  const fetchWeatherByLocation = () => {
    setError("");
    setWeather(null);
    setLoading(true);

    if (!navigator.geolocation) {
      setError("Geolocation is not supported by your browser.");
      setLoading(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;
        setCoordinates({ lat: latitude, lon: longitude });

        let locationName = `Lat: ${latitude.toFixed(2)}, Lon: ${longitude.toFixed(2)}`;

        try {
          const revGeoRes = await fetch(
            proxyUrl +
              `https://geocoding-api.open-meteo.com/v1/reverse?latitude=${latitude}&longitude=${longitude}&count=1`
          );

          if (revGeoRes.ok) {
            const revGeoData = await revGeoRes.json();
            if (revGeoData.results && revGeoData.results.length > 0) {
              const place = revGeoData.results[0];
              locationName = `${place.name}${
                place.admin1 ? ", " + place.admin1 : ""
              }${place.country ? ", " + place.country : ""}`;
            }
          }
        } catch (err) {
          setError("Failed to fetch location name data");
          // continue with fallback locationName
        }

        try {
          const weatherRes = await fetch(
            proxyUrl +
              `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true`
          );

          if (!weatherRes.ok) {
            throw new Error("Failed to fetch weather data");
          }

          const weatherData = await weatherRes.json();

          if (!weatherData.current_weather) {
            setError("Weather data not available");
            setLoading(false);
            return;
          }

          setWeather({
            location: locationName,
            ...weatherData.current_weather,
          });
        } catch (err) {
          setError(err.message || "Unexpected error occurred");
        }
        setLoading(false);
      },
      (err) => {
        setError("Failed to retrieve location.");
        setLoading(false);
      }
    );
  };

  return (
    <div
      className={`app-container ${
        weather ? getWeatherBackgroundClass(weather.weathercode) : ""
      }`}
    >
      <h1>Weather Now</h1>

      <div className="input-group">
        <input
          type="text"
          placeholder="Enter place name"
          value={place}
          onChange={(e) => setPlace(e.target.value)}
          disabled={loading}
        />
        <button onClick={fetchWeatherByPlace} disabled={loading}>
          {loading ? "Searching..." : "Get Weather"}
        </button>
      </div>

      <div className="input-group">
        <button onClick={fetchWeatherByLocation} disabled={loading}>
          {loading ? "Getting Location..." : "Get Weather by Current Location"}
        </button>
      </div>

      {coordinates.lat && coordinates.lon && (
        <p className="coordinates">
          Coordinates: Latitude {coordinates.lat.toFixed(4)}, Longitude{" "}
          {coordinates.lon.toFixed(4)}
        </p>
      )}

      {error && <p className="error">{error}</p>}

      {weather && (
        <div className="weather-info">
          <p>
            <strong>Location:</strong> {weather.location}
          </p>
          <p>
            <strong>Temperature:</strong> {weather.temperature}°C
          </p>
          <p>
            <strong>Wind Speed:</strong> {weather.windspeed} km/h
          </p>
          <p>
            <strong>Wind Direction:</strong> {weather.winddirection}°
          </p>
          <p>
            <strong>Weather Code:</strong> {weather.weathercode}
          </p>
          <p>
            <strong>Time:</strong> {weather.time}
          </p>
        </div>
      )}
    </div>
  );
}

export default App;
