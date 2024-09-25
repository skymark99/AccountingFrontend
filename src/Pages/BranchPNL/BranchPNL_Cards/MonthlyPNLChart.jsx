import React from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const MonthlyPNLChart = ({ labels, datasets, stepSize = 200000 }) => {
  // Find the maximum value from the datasets
  const maxValue = Math.max(...datasets.flatMap((dataset) => dataset.data));

  // Round up to the nearest multiple of stepSize
  const max = Math.ceil(maxValue / stepSize) * stepSize;

  const data = {
    labels: labels,
    datasets: datasets.map((dataset, index) => ({
      label: dataset.label,
      data: dataset.data,
      backgroundColor: (context) => {
        const chart = context.chart;
        const { ctx, chartArea } = chart;

        if (!chartArea) {
          return null;
        }

        const gradient = ctx.createLinearGradient(
          0,
          chartArea.bottom,
          0,
          chartArea.top
        );
        gradient.addColorStop(0, dataset.gradientStart);
        gradient.addColorStop(1, dataset.gradientEnd);

        return gradient;
      },
      borderRadius: 5,
    })),
  };

  const options = {
    plugins: {
      tooltip: {
        mode: "index",
        intersect: false,
      },
      legend: {
        // display: false,
      },
    },
    responsive: true,
    scales: {
      x: {
        beginAtZero: false,
        grid: {
          display: true,
        },
      },
      y: {
        beginAtZero: false,
        max, // Use the dynamically calculated max value
        stepSize, // Use stepSize to control the increments
        ticks: {
          callback: function (value) {
            return `₹${value}`;
          },
        },
      },
    },
  };

  return <Bar data={data} options={options} />;
};

export default MonthlyPNLChart;
