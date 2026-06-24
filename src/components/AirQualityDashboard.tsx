import { useTranslation } from "react-i18next";

import { Wind } from "lucide-react";

import type { TAirQuality } from "../types/TAirQuality";

export const AirQualityDashboard = ({
  aqi,
  co,
  no2,
  o3,
  so2,
  pm2_5,
  pm10,
}: TAirQuality) => {
  const { t } = useTranslation();

  const aqiStatusMap = {
    1: {
      label: t("weather.good"),
      color: "text-green-400",
      dot: "bg-green-400 shadow-[0_0_8px_rgba(74,222,128,0.8)]",
    },
    2: {
      label: t("weather.moderate"),
      color: "text-yellow-400",
      dot: "bg-yellow-400 shadow-[0_0_8px_rgba(250,204,21,0.8)]",
    },
    3: {
      label: t("weather.unhealthySensitive"),
      color: "text-orange-400",
      dot: "bg-orange-400 shadow-[0_0_8px_rgba(251,146,60,0.8)]",
    },
    4: {
      label: t("weather.unhealthy"),
      color: "text-red-400",
      dot: "bg-red-400 shadow-[0_0_8px_rgba(248,113,113,0.8)]",
    },
    5: {
      label: t("weather.veryUnhealthy"),
      color: "text-purple-400",
      dot: "bg-purple-400 shadow-[0_0_8px_rgba(192,132,252,0.8)]",
    },
    6: {
      label: t("weather.hazardous"),
      color: "text-rose-500",
      dot: "bg-rose-500 shadow-[0_0_8px_rgba(244,63,94,0.8)]",
    },
  } as const;

  return (
    <div className="glass-card p-4 md:p-5 w-full h-full flex flex-col">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-base font-semibold text-liquid-heading">
          {t("weather.airQuality")}
        </h3>
        <Wind className="w-4 h-4 text-liquid-text" />
      </div>

      <div className="flex flex-col items-center justify-center my-2 relative">
        {/* Spinning indicator ring */}
        <div className="w-24 h-24 rounded-full border-[5px] border-liquid-heading/10 flex items-center justify-center relative shadow-[0_0_20px_rgba(255,255,255,0.05)]">
          <div className="absolute inset-0 rounded-full border-t-[5px] border-l-[5px] border-liquid-heading animate-spin-slow"></div>
          <div className="flex flex-col items-center">
            <span className="text-3xl font-extrabold text-liquid-heading">
              {aqi}
            </span>
            <span className="text-[10px] text-liquid-text uppercase font-semibold">
              AQI
            </span>
          </div>
        </div>

        <div className="mt-4 flex items-center gap-2.5 bg-liquid-bg/30 px-3 py-1.5 rounded-full border border-liquid-heading/5">
          <div
            className={`w-2.5 h-2.5 rounded-full ${aqiStatusMap[aqi as keyof typeof aqiStatusMap]?.dot}`}
          />
          <span
            className={`text-sm font-semibold tracking-wide ${aqiStatusMap[aqi as keyof typeof aqiStatusMap]?.color}`}
          >
            {aqiStatusMap[aqi as keyof typeof aqiStatusMap]?.label}
          </span>
        </div>
      </div>

      {/* Mini Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2 mt-auto pt-4 border-t border-liquid-heading/10">
        {[
          { label: "SO2", value: so2 },
          { label: "PM2.5", value: pm2_5 },
          { label: "PM10", value: pm10 },
          { label: "CO", value: co },
          { label: "NO₂", value: no2 },
          { label: "O₃", value: o3 },
        ].map((item, idx) => (
          <div
            key={idx}
            className="flex flex-col items-center p-2 rounded bg-liquid-bg/20"
          >
            <span className="text-[10px] text-liquid-text/70 uppercase font-bold mb-1">
              {item.label}
            </span>
            <span className="text-sm text-liquid-heading font-medium">
              {item.value}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};
