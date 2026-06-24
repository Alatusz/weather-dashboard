import { useTranslation } from "react-i18next";

import { CloudDrizzle } from "lucide-react";

import type { TRainPrecipitation } from "../types/TRainPrecipitation";

export const RainDashboard = ({ precip_mm }: TRainPrecipitation) => {
  const { t } = useTranslation();

  let rainText: string;
  if (precip_mm === 0) {
    rainText = t("weather.noRain");
  } else if (precip_mm < 2.5) {
    rainText = t("weather.lightRain");
  } else if (precip_mm < 7.6) {
    rainText = t("weather.moderateRain");
  } else {
    rainText = t("weather.heavyRain");
  }

  // Calculate bar width percentage smoothly across the categories
  // 0 -> 0%
  // 0 - 2.5 -> 1% to 33%
  // 2.5 - 7.6 -> 33% to 66%
  // 7.6+ -> 66% to 100%
  let percentage = 0 as number;

  if (precip_mm > 0) {
    if (precip_mm <= 2.5) {
      percentage = Math.max(2, (precip_mm / 2.5) * 33);
    } else if (precip_mm <= 7.6) {
      percentage = 33 + ((precip_mm - 2.5) / 5.1) * 33;
    } else {
      percentage = Math.min(100, 66 + ((precip_mm - 7.6) / 5) * 34);
    }
  }

  return (
    <div className="glass-card p-6 w-full h-full flex flex-col relative overflow-hidden group min-h-[200px]">
      <div className="absolute inset-0 bg-liquid-gradient opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-xl pointer-events-none" />

      <div className="flex items-center justify-between mb-4 z-10">
        <h3 className="text-base font-semibold text-liquid-heading">
          {t("weather.rainPrecipitation")}
        </h3>
        <CloudDrizzle className="w-4 h-4 text-liquid-text" />
      </div>

      <div className="flex-1 flex flex-col justify-center gap-4 z-10">
        <div className="flex items-end gap-2">
          <span className="text-5xl font-extrabold text-liquid-heading tracking-tighter">
            {precip_mm}
          </span>
          <span className="text-liquid-text font-medium mb-1">mm</span>
        </div>
        <p className="text-sm text-liquid-text">{rainText}</p>

        {/* Dynamic Intensity Bar */}
        <div className="mt-4 w-full flex flex-col gap-2">
          <div className="flex justify-between text-[10px] text-liquid-text/70 uppercase font-bold px-1 relative">
            <span className="w-1/4 text-left">{t("weather.noRain")}</span>
            <span className="w-1/4 text-center">{t("weather.lightRain")}</span>
            <span className="w-1/4 text-center">
              {t("weather.moderateRain")}
            </span>
            <span className="w-1/4 text-right">{t("weather.heavyRain")}</span>
          </div>
          <div className="w-full h-3 bg-liquid-bg/50 rounded-full relative overflow-hidden shadow-inner">
            <div
              className="absolute top-0 left-0 h-full bg-gradient-to-r from-blue-500/50 to-blue-400/80 rounded-full transition-all duration-1000 ease-out"
              style={{ width: `${percentage}%` }}
            ></div>

            {/* Markers for the scale */}
            <div className="absolute top-0 left-1/3 w-[1px] h-full bg-liquid-heading/10 z-10"></div>
            <div className="absolute top-0 left-2/3 w-[1px] h-full bg-liquid-heading/10 z-10"></div>
          </div>
        </div>
      </div>
    </div>
  );
};
