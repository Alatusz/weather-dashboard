import { Chart } from "react-chartjs-2";
import { useTranslation } from "react-i18next";

import {
  BarController,
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Filler,
  Legend,
  LineController,
  LineElement,
  LinearScale,
  PointElement,
  type ScriptableContext,
  Title,
  Tooltip,
  type TooltipItem,
} from "chart.js";
import { Clock } from "lucide-react";

import type { THourlyForecast } from "../types/THourlyForecast";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  LineController,
  BarController,
  Title,
  Tooltip,
  Filler,
  Legend,
);

export const HourlyForecastChart = ({
  hours,
}: {
  hours: THourlyForecast[];
}) => {
  const { t } = useTranslation();

  const displayHours = hours.filter((_, index) => index % 3 === 0) ?? [];

  const data = {
    labels: displayHours.map((hour) => hour.time.split(" ")[1]),
    datasets: [
      {
        type: "line" as const,
        label: "Temperature",
        data: displayHours.map((hour) => hour.temp_c),
        borderColor: "rgba(255, 255, 255, 0.8)",
        backgroundColor: (context: ScriptableContext<"line">) => {
          const chart = context.chart;
          const { ctx, chartArea } = chart;
          if (!chartArea) {
            return "rgba(255, 255, 255, 0.05)";
          }
          const gradient = ctx.createLinearGradient(
            0,
            chartArea.bottom,
            0,
            chartArea.top,
          );
          gradient.addColorStop(0, "rgba(255, 255, 255, 0)");
          gradient.addColorStop(1, "rgba(255, 255, 255, 0.2)");
          return gradient;
        },
        fill: true,
        tension: 0.4, // Smooth curved lines
        yAxisID: "y",
        pointBackgroundColor: "rgba(255, 255, 255, 1)",
        pointBorderColor: "rgba(0, 0, 0, 0.5)",
        pointBorderWidth: 2,
        pointRadius: 4,
        pointHoverRadius: 6,
      },
      {
        type: "bar" as const,
        label: "Rain Probability",
        data: displayHours.map((hour) => hour.chance_of_rain),
        backgroundColor: "rgba(59, 130, 246, 0.4)",
        hoverBackgroundColor: "rgba(59, 130, 246, 0.8)",
        borderRadius: 4,
        yAxisID: "y1",
        barThickness: 16,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    interaction: {
      mode: "index" as const,
      intersect: false,
    },
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        backgroundColor: "rgba(20, 20, 20, 0.8)",
        titleColor: "#ffffff",
        bodyColor: "#c1c1c1",
        borderColor: "rgba(255, 255, 255, 0.1)",
        borderWidth: 1,
        padding: 12,
        boxPadding: 4,
        usePointStyle: true,
        callbacks: {
          label: function (context: TooltipItem<"line" | "bar">) {
            let label = context.dataset.label || "";
            if (label) {
              label += ": ";
            }
            if (context.parsed.y !== null) {
              label += context.parsed.y;
              label += context.datasetIndex === 0 ? "°" : "%";
            }
            return label;
          },
        },
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
        ticks: {
          color: "rgba(193, 193, 193, 0.8)",
          font: {
            family: "'Inter', sans-serif",
            size: 11,
          },
        },
        border: {
          display: false,
        },
      },
      y: {
        type: "linear" as const,
        display: false,
        position: "left" as const,
        // Give temp some headroom
        suggestedMin: Math.min(...displayHours.map((h) => h.temp_c)) - 5,
        suggestedMax: Math.max(...displayHours.map((h) => h.temp_c)) + 5,
      },
      y1: {
        type: "linear" as const,
        display: false,
        position: "right" as const,
        min: 0,
        max: 400,
        grid: {
          drawOnChartArea: false,
        },
      },
    },
  };

  return (
    <div className="glass-card p-4 md:p-5 w-full h-full flex flex-col min-h-[320px]">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-base font-semibold text-liquid-heading">
          {t("weather.hourlyForecast")}
        </h3>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1.5">
            <div className="w-2 h-2 rounded-full bg-white/80 shadow-[0_0_8px_rgba(255,255,255,0.6)]"></div>
            <span className="text-[10px] text-liquid-text">Temp</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-2 h-2 rounded-sm bg-blue-500/50"></div>
            <span className="text-[10px] text-liquid-text">
              {t("weather.rainProb")}
            </span>
          </div>
          <Clock className="w-4 h-4 ml-2 text-liquid-text" />
        </div>
      </div>

      <div className="flex-1 relative w-full h-full mt-2">
        <Chart type="line" data={data} options={options} />
      </div>
    </div>
  );
};
