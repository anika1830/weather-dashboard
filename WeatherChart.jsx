import zoomPlugin from "chartjs-plugin-zoom";

import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, zoomPlugin);

const WeatherChart = ({ labels, data, label }) => {
  const chartData = {
    labels,
    datasets: [
      {
        label,
        data,
        borderColor: "blue",
      },
    ],
  };

  const options = {
  responsive: true,
  plugins: {
    legend: {
      labels: {
        color: "black",
      },
    },
    zoom: {
      zoom: {
        wheel: {
          enabled: true,   // mouse scroll zoom
        },
        pinch: {
          enabled: true,   // mobile zoom
        },
        mode: "x",         // horizontal zoom
      },
      pan: {
        enabled: true,
        mode: "x",
      },
    },
  },
  scales: {
    x: {
      ticks: { color: "black" },
    },
    y: {
      ticks: { color: "black" },
    },
  },
};
  return <Line data={chartData} />;
};

export default WeatherChart;