import React, { useEffect, useRef } from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

// Register necessary components with Chart.js
ChartJS.register(ArcElement, Tooltip, Legend);

const Chart = ({ colors, data, labels }) => {
  const chartRef = useRef(null);

  useEffect(() => {
    // Cleanup any existing chart instance before creating a new one
    if (chartRef.current) {
      chartRef.current.chartInstance?.destroy();
    }
  }, [colors, data, labels]);

  const backgroundColors = colors.map((color) => color.background);
  const borderColors = colors.map((color) => color.border);
  const borderWidths = colors.map((color) => color.borderWidth || 1);
  const hoverOffsets = colors.map((color) => color.hoverOffset || 0);

  const passingData = {
    labels: labels,
    datasets: [
      {
        label: "Dataset 1",
        data: data,
        backgroundColor: backgroundColors,
        borderColor: borderColors,
        borderWidth: borderWidths,
        hoverOffset: hoverOffsets,
      },
    ],
  };

  const options = {
    cutout: "80%",
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      tooltip: {
        callbacks: {
          label: (context) => {
            const label = context.label || "";
            const value = context.raw || 0;
            const formattedValue = Number(value).toFixed(2);
            return `${label}: ${formattedValue}%`;
          },
        },
      },
      legend: {
        display: false,
      },
    },
    layout: {
      padding: {
        top: 10,
        bottom: 10,
        left: 10,
        right: 10,
      },
    },
  };

  return (
    <div className="chart-container">
      <Doughnut ref={chartRef} data={passingData} options={options} />
    </div>
  );
};

export default Chart;
