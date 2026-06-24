import { Chart } from "react-chartjs-2";
import { useTranslation } from "react-i18next";

import {
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Filler,
  Legend,
  LineElement,
  LinearScale,
  PointElement,
  type ScriptableContext,
  Title,
  Tooltip,
  type TooltipItem,
} from "chart.js";

import type { TForecastDay } from "../types/TForecastDay";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Filler,
  Legend,
);

export const SevenDayForecast = ({ days = [] }: { days?: TForecastDay[] }) => {
  const { t } = useTranslation();

  const getDayName = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString("en-US", { weekday: "short" });
  };

  const data = {
    labels: days.map((d) => getDayName(d.date)),
    datasets: [
      {
        type: "line" as const,
        label: t("weather.minTemp"),
        data: days.map((d) => d.day.mintemp_c),
        borderColor: "rgba(96, 165, 250, 0.9)", // blue-400
        backgroundColor: (context: ScriptableContext<"line">) => {
          const chart = context.chart;
          const { ctx, chartArea } = chart;
          if (!chartArea) return undefined;
          const gradient = ctx.createLinearGradient(
            0,
            chartArea.top,
            0,
            chartArea.bottom,
          );
          gradient.addColorStop(0, "rgba(96, 165, 250, 0.15)");
          gradient.addColorStop(1, "rgba(96, 165, 250, 0)");
          return gradient;
        },
        fill: true,
        tension: 0.4,
        yAxisID: "y",
        pointBackgroundColor: "rgba(96, 165, 250, 1)",
        pointBorderColor: "rgba(0, 0, 0, 0.5)",
        pointBorderWidth: 2,
        pointRadius: 4,
        pointHoverRadius: 6,
      },
      {
        type: "line" as const,
        label: t("weather.maxTemp"),
        data: days.map((d) => d.day.maxtemp_c),
        borderColor: "rgba(248, 113, 113, 0.9)", // red-400
        backgroundColor: (context: ScriptableContext<"line">) => {
          const chart = context.chart;
          const { ctx, chartArea } = chart;
          if (!chartArea) return undefined;
          const gradient = ctx.createLinearGradient(
            0,
            chartArea.top,
            0,
            chartArea.bottom,
          );
          // Red to Blue gradient for the fill area
          gradient.addColorStop(0, "rgba(248, 113, 113, 0.25)");
          gradient.addColorStop(1, "rgba(96, 165, 250, 0.25)");
          return gradient;
        },
        fill: "-1", // Fill area between Max and Min dataset
        tension: 0.4,
        yAxisID: "y",
        pointBackgroundColor: "rgba(248, 113, 113, 1)",
        pointBorderColor: "rgba(0, 0, 0, 0.5)",
        pointBorderWidth: 2,
        pointRadius: 4,
        pointHoverRadius: 6,
      },
      {
        type: "bar" as const,
        label: t("weather.rainProb"),
        data: days.map((d) => d.day.daily_chance_of_rain),
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
              label += context.dataset.type === "bar" ? "%" : "°";
            }
            return label;
          },
        },
      },
    },
    scales: {
      x: {
        grid: { display: false },
        ticks: {
          color: "rgba(193, 193, 193, 0.8)",
          font: { family: "'Inter', sans-serif", size: 11 },
        },
        border: { display: false },
      },
      y: {
        type: "linear" as const,
        display: false,
        position: "left" as const,
        suggestedMin: Math.min(...days.map((d) => d.day.mintemp_c)) - 10,
        suggestedMax: Math.max(...days.map((d) => d.day.maxtemp_c)) + 5,
      },
      y1: {
        type: "linear" as const,
        display: false,
        position: "right" as const,
        min: 0,
        max: 400,
        grid: { drawOnChartArea: false },
      },
    },
  };

  return (
    <div className="glass-card p-4 md:p-5 w-full h-full flex flex-col min-h-[320px]">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 gap-2">
        <h3 className="text-base font-semibold text-liquid-heading">
          {t("weather.forecast")}
        </h3>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1.5">
            <div className="w-2 h-2 rounded-full bg-red-400 shadow-[0_0_8px_rgba(248,113,113,0.6)]"></div>
            <span className="text-[10px] text-liquid-text">
              {t("weather.maxTemp")}
            </span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-2 h-2 rounded-full bg-blue-400 shadow-[0_0_8px_rgba(96,165,250,0.6)]"></div>
            <span className="text-[10px] text-liquid-text">
              {t("weather.minTemp")}
            </span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-2 h-2 rounded-sm bg-blue-500/50"></div>
            <span className="text-[10px] text-liquid-text">
              {t("weather.rainProb")}
            </span>
          </div>
        </div>
      </div>

      <div className="flex-1 relative w-full h-full mt-2">
        <Chart type="line" data={data} options={options} />
      </div>
    </div>
  );
};
