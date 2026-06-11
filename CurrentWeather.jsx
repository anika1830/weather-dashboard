import { useEffect, useState } from "react";
import { fetchWeather } from "../services/api";
import WeatherChart from "../components/WeatherChart";

const CurrentWeather = () => {
  const [weather, setWeather] = useState(null);
  const [air, setAir] = useState(null);
  const [unit, setUnit] = useState("C");

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(async (pos) => {
      const lat = pos.coords.latitude;
      const lon = pos.coords.longitude;

      // Weather API
      const data = await fetchWeather(lat, lon);
      setWeather(data);

      // Air Quality API
      const airRes = await fetch(
        `https://air-quality-api.open-meteo.com/v1/air-quality?latitude=${lat}&longitude=${lon}&hourly=pm10,pm2_5`
      );

      {
        air && (
          <WeatherChart
            labels={air.hourly.time.slice(0, 24)}
            data={air.hourly.pm2_5.slice(0, 24)}
            label="PM2.5"
          />
        )
      }
      const airData = await airRes.json();
      setAir(airData);
    });
  }, []);

  const convertTemp = (t) =>
    unit === "C" ? t : (t * 9) / 5 + 32;

  if (!weather) return <p>Loading...</p>;

  return (
    <div>
      <h1>🌤 Weather Dashboard</h1>

      <button onClick={() => setUnit(unit === "C" ? "F" : "C")}>
        Switch to {unit === "C" ? "F" : "C"}
      </button>

      {weather && (
        <>
          <h2>
            Current Temp: {convertTemp(weather.current_weather.temperature)}°{unit}
          </h2>
           <input type="date" />
          {/* Temperature Chart */}
          <WeatherChart
            labels={weather.hourly.time.slice(0, 24)}
            data={weather.hourly.temperature_2m.slice(0, 24).map(convertTemp)}
            label="Temperature"
          />

          <WeatherChart
            labels={weather.hourly.time.slice(0, 24)}
            data={weather.hourly.relativehumidity_2m.slice(0, 24)}
            label="Humidity"
          />

          <WeatherChart
            labels={weather.hourly.time.slice(0, 24)}
            data={weather.hourly.precipitation.slice(0, 24)}
            label="Precipitation"
          />

          <WeatherChart
            labels={weather.hourly.time.slice(0, 24)}
            data={weather.hourly.visibility.slice(0, 24)}
            label="Visibility"
          />

          <WeatherChart
            labels={weather.hourly.time.slice(0, 24)}
            data={weather.hourly.windspeed_10m.slice(0, 24)}
            label="Wind Speed"
          />

          {/* Air Quality Chart */}
          {air && (
            <WeatherChart
              labels={air.hourly.time.slice(0, 24)}
              data={air.hourly.pm2_5.slice(0, 24)}
              label="PM2.5"
            />
          )}

          {/* Cards */}
          <div className="grid">
            <div className="card">
              🌡 Min: {weather.daily.temperature_2m_min[0]}
            </div>

            <div className="card">
              🌡 Max: {weather.daily.temperature_2m_max[0]}
            </div>

            <div className="card">
              💧 Humidity: {weather.hourly.relativehumidity_2m[0]}
            </div>

            <div className="card">
              🌧 Rain: {weather.hourly.precipitation[0]}
            </div>

            <div className="card">
              🌅 Sunrise: {weather.daily.sunrise[0]}
            </div>

            <div className="card">
              🌇 Sunset: {weather.daily.sunset[0]}
            </div>

            <div className="card">
              💨 Wind: {weather.hourly.windspeed_10m[0]}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default CurrentWeather;