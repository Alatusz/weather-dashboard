import { useTranslation } from "react-i18next";

import { X } from "lucide-react";

import { useForecastWeather } from "../hooks/hooks";

import { ComparisonCardSkeleton } from "./skeletons/ComparisonCardSkeleton";

type ComparisonCityCardProps = {
  city: string;
  onRemove: () => void;
};

export const ComparisonCityCard = ({
  city,
  onRemove,
}: ComparisonCityCardProps) => {
  const { data, isLoading, isError } = useForecastWeather(city, 1);
  const { t } = useTranslation();

  if (isLoading) {
    return <ComparisonCardSkeleton />;
  }

  if (isError || !data) {
    return (
      <div className="flex items-center justify-between p-3 bg-liquid-bg/30 rounded-xl border border-red-500/20 h-[76px]">
        <span className="text-sm text-red-400 font-medium">
          {t("errors.failedToLoad")} {city}
        </span>
        <button
          onClick={onRemove}
          className="text-liquid-text hover:text-red-400 p-1"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    );
  }

  const current = data.current;
  const todayForecast = data.forecast?.forecastday?.[0]?.day;

  return (
    <div className="flex items-center justify-between p-3 bg-liquid-bg/30 rounded-xl border border-liquid-heading/5 group relative overflow-hidden transition-all hover:bg-liquid-bg/50">
      <div className="flex items-center gap-3 relative z-10">
        <img
          src={current?.condition?.icon}
          alt={current?.condition?.text}
          className="w-10 h-10 drop-shadow-md"
        />
        <div className="flex flex-col justify-center">
          <span
            className="text-sm font-semibold text-liquid-heading block truncate max-w-[120px]"
            title={data.location?.name}
          >
            {data.location?.name}
          </span>
          <span className="text-[10px] text-liquid-text truncate max-w-[120px] block font-medium">
            {current?.condition?.text}
          </span>
        </div>
      </div>

      <div className="text-right flex items-center gap-2 relative z-10">
        <div className="flex flex-col items-end">
          <span className="text-xl font-bold text-liquid-heading block">
            {current?.temp_c}°
          </span>
          <span className="text-[10px] text-liquid-text font-medium tracking-wide">
            H:{todayForecast?.maxtemp_c}° L:{todayForecast?.mintemp_c}°
          </span>
        </div>
        <button
          onClick={onRemove}
          className="p-1.5 ml-1 rounded-full bg-liquid-heading/5 text-liquid-text hover:bg-red-500/20 hover:text-red-400 transition-colors opacity-0 group-hover:opacity-100"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Subtle hover gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-liquid-heading/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out pointer-events-none" />
    </div>
  );
};
