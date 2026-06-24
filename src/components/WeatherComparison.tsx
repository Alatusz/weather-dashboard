import { useState } from "react";

import { ArrowRightLeft, Plus, Search, X } from "lucide-react";
import { useTranslation } from "react-i18next";

import { useLocalStorage } from "../hooks/useLocalStorage";

import { ComparisonCityCard } from "./ComparisonCityCard";

export const WeatherComparison = () => {
  const { t } = useTranslation();
  const [cities, setCities] = useLocalStorage<string[]>(
    "weather_comparison_cities",
    ["London", "Tokyo", "New York"],
  );

  const [isAdding, setIsAdding] = useState(false);
  const [searchInput, setSearchInput] = useState("");

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();

    const city = searchInput.trim();
    if (city && !cities.some((c) => c.toLowerCase() === city.toLowerCase())) {
      setCities((prev) => {
        const next = [...prev, city];
        return next.slice(-3);
      });
      setSearchInput("");
      setIsAdding(false);
    }
  };

  const handleRemove = (cityToRemove: string) => {
    setCities(cities.filter((c) => c !== cityToRemove));
  };

  return (
    <div className="glass-card p-4 md:p-5 w-full h-full flex flex-col min-h-[300px]">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-base font-semibold text-liquid-heading">
          {t("common.comparison")}
        </h3>
        <ArrowRightLeft className="w-4 h-4 text-liquid-text" />
      </div>

      <div className="flex-1 flex flex-col gap-3 overflow-y-auto pr-1 custom-scrollbar">
        {cities.length === 0 && !isAdding && (
          <div className="flex-1 flex flex-col items-center justify-center text-sm text-liquid-text/50 gap-2 h-[150px]">
            <ArrowRightLeft className="w-8 h-8 opacity-20" />
            <span>{t("common.noCities")}</span>
          </div>
        )}

        {cities.map((city) => (
          <ComparisonCityCard
            key={city}
            city={city}
            onRemove={() => handleRemove(city)}
          />
        ))}

        {isAdding && (
          <form
            onSubmit={handleAdd}
            className="flex items-center gap-2 mt-1 animate-in fade-in slide-in-from-top-2 duration-300"
          >
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-liquid-text" />
              <input
                autoFocus
                type="text"
                placeholder={t("common.search")}
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                className="w-full bg-liquid-bg/50 border border-liquid-heading/20 rounded-xl py-2 pl-9 pr-3 text-sm text-liquid-heading focus:outline-none focus:border-liquid-heading/50 transition-colors shadow-inner"
              />
            </div>
            <button
              type="button"
              onClick={() => setIsAdding(false)}
              className="p-2 text-liquid-text hover:text-red-400 bg-liquid-bg/30 rounded-xl border border-liquid-heading/10 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </form>
        )}
      </div>

      {!isAdding && (
        <button
          onClick={() => setIsAdding(true)}
          className="mt-4 w-full py-2.5 flex items-center justify-center gap-2 rounded-xl bg-liquid-primary/10 text-liquid-heading text-sm font-semibold hover:bg-liquid-primary/30 transition-all duration-300 border border-liquid-primary/20 shadow-md hover:shadow-lg"
        >
          <Plus className="w-4 h-4" />
          {t("common.addLocation")}
        </button>
      )}
    </div>
  );
};
