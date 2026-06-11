import { useState } from "react";
import WeatherChart from "../components/WeatherChart";

const HistoricalWeather = () => {
  const [data, setData] = useState(null);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const fetchData = () => {
    navigator.geolocation.getCurrentPosition(async (pos) => {
      const lat = pos.coords.latitude;
      const lon = pos.coords.longitude;

      const res = await fetch(
        `https://archive-api.open-meteo.com/v1/archive?latitude=${lat}&longitude=${lon}&start_date=${startDate}&end_date=${endDate}&daily=temperature_2m_max,temperature_2m_min,precipitation_sum`
      );

      const result = await res.json();
      setData(result);
    });
  };

  return (
    <div>
      <h1>📊 Historical Weather</h1>

      {/* DATE PICKERS */}
      <input type="date" onChange={(e) => setStartDate(e.target.value)} />
      <input type="date" onChange={(e) => setEndDate(e.target.value)} />

      <button onClick={fetchData}>Load Data</button>

      {data && (
        <>
          <WeatherChart
            labels={data.daily.time}
            data={data.daily.temperature_2m_max}
            label="Max Temp"
          />

          <WeatherChart
            labels={data.daily.time}
            data={data.daily.temperature_2m_min}
            label="Min Temp"
          />

          <WeatherChart
            labels={data.daily.time}
            data={data.daily.precipitation_sum}
            label="Rain"
          />
        </>
      )}
    </div>
  );
};

export default HistoricalWeather;