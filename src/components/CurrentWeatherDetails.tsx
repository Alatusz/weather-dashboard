import {
  Cloud,
  CloudRain,
  Droplets,
  Eye,
  Gauge,
  Sun,
  Thermometer,
  Wind,
} from "lucide-react";
import { useTranslation } from "react-i18next";

import type { TCurrentWeatherDetails } from "../types/TCurrentWeatherDetails";

const CurrentWeatherDetails = ({
  locationName,
  localTime,
  temperature,
  feelsLike,
  conditionText,
  humidity,
  windSpeed,
  pressure,
  visibility,
  uvIndex,
  cloudCover,
}: TCurrentWeatherDetails) => {
  const { t } = useTranslation();

  return (
    <div className="glass-card p-6 w-full h-full relative overflow-hidden group flex flex-col justify-between min-h-[220px]">
      <div className="absolute inset-0 bg-liquid-gradient opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-xl pointer-events-none" />

      <div className="flex items-center justify-between mb-4 z-10">
        <div>
          <h2 className="text-xl font-bold text-liquid-heading">
            {locationName}
          </h2>
        </div>
        <div className="text-liquid-text/50 text-sm">{localTime}</div>
      </div>

      <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-5 z-10">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 bg-liquid-depth/40 rounded-full flex items-center justify-center border border-liquid-heading/10 shadow-[0_0_30px_rgba(255,255,255,0.05)]">
            <CloudRain className="w-8 h-8 text-liquid-heading" />
          </div>
          <div>
            <div className="text-5xl font-extrabold text-liquid-heading tracking-tighter drop-shadow-[0_4px_12px_rgba(44,44,44,0.8)]">
              {temperature}°
            </div>
            <p className="text-liquid-text text-base font-medium">
              {conditionText}
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-auto z-10">
        {[
          { icon: Thermometer, label: t("weather.feelsLike"), value: `${feelsLike}°` },
          { icon: Droplets, label: t("weather.humidity"), value: `${humidity} %` },
          { icon: Wind, label: t("weather.wind"), value: `${windSpeed} km/h` },
          { icon: Gauge, label: t("weather.pressure"), value: `${pressure} mb` },
          { icon: Eye, label: t("weather.visibility"), value: `${visibility} km` },
          { icon: Sun, label: t("weather.uvIndex"), value: `${uvIndex}` },
          { icon: Cloud, label: t("weather.cloudCover"), value: `${cloudCover} %` },
        ].map((item, idx) => (
          <div
            key={idx}
            className="flex flex-col gap-1 p-2.5 rounded-lg bg-liquid-bg/20 border border-liquid-heading/5"
          >
            <div className="flex items-center gap-1.5 text-liquid-text/70">
              <item.icon className="w-3.5 h-3.5" />
              <span className="text-[10px] uppercase font-semibold">
                {item.label}
              </span>
            </div>
            <span className="text-sm text-liquid-heading font-medium">
              {item.value}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export { CurrentWeatherDetails };
