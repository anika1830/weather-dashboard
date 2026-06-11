import axios from "axios";

export const fetchWeather = async (lat, lon) => {
  const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&hourly=temperature_2m,relativehumidity_2m,precipitation,windspeed_10m,visibility&daily=temperature_2m_max,temperature_2m_min,sunrise,sunset&current_weather=true&timezone=auto`;

  const res = await axios.get(url);
  return res.data;
};