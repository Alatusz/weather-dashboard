import { useState } from "react";
import { useTranslation } from "react-i18next";

import { Search } from "lucide-react";

import { AirQualityDashboard } from "./components/AirQualityDashboard";
import { CurrentWeatherDetails } from "./components/CurrentWeatherDetails";
import { HourlyForecastChart } from "./components/HourlyForecastChart";
import { RainDashboard } from "./components/RainDashboard";
import { SevenDayForecast } from "./components/SevenDayForecast";
import { WeatherComparison } from "./components/WeatherComparison";
import { WeatherMapWidget } from "./components/WeatherMapWidget";
import { DashboardSkeleton } from "./components/skeletons/DashboardSkeleton";
import { useCurrentWeather, useForecastWeather } from "./hooks/hooks";

const App = () => {
  const [searchInput, setSearchInput] = useState("");

  const [searchedCity, setSearchedCity] = useState("Bangkok");

  const {
    data: currentWeather,
    isLoading,
    isError,
  } = useCurrentWeather(searchedCity);

  const { data: sevenDayForecast } = useForecastWeather(searchedCity, 7);
  const { t, i18n } = useTranslation();

  const toggleLanguage = () => {
    const newLang = i18n.language === "th" ? "en" : "th";
    i18n.changeLanguage(newLang);
  };

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (searchInput.trim() !== "") {
      setSearchedCity(searchInput);
    }
  };

  if (isLoading) {
    return <DashboardSkeleton />;
  }

  if (isError) {
    return (
      <div className="min-h-screen bg-liquid-bg flex flex-col items-center justify-center text-liquid-heading relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-red-500/10 rounded-full blur-[100px] pointer-events-none" />
        <div className="text-6xl mb-6 relative z-10 opacity-80">🌍</div>
        <h2 className="text-2xl font-bold mb-2 relative z-10 tracking-tight">
          {t("errors.cityNotFound")}
        </h2>
        <p className="text-liquid-text mb-8 relative z-10 max-w-sm text-center">
          {t("errors.cityNotFoundDesc", { city: searchedCity })}
        </p>
        <button
          onClick={() => {
            setSearchedCity("Bangkok");
            setSearchInput("");
          }}
          className="relative z-10 px-8 py-3 rounded-full bg-liquid-heading/10 hover:bg-liquid-heading/20 border border-liquid-heading/10 transition-all hover:scale-105 active:scale-95 text-sm font-semibold tracking-wide"
        >
          {t("errors.returnHome")}
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-liquid-bg relative flex font-sans selection:bg-liquid-primary/30 selection:text-liquid-heading">
      {/* Abstract Background Orbs for Liquid Effect */}
      <div className="fixed top-0 left-1/4 w-[500px] h-[500px] bg-liquid-depth/40 rounded-full blur-[120px] pointer-events-none -translate-y-1/2" />
      <div className="fixed bottom-0 right-1/4 w-[600px] h-[600px] bg-[#1a1a1a] rounded-full blur-[150px] pointer-events-none translate-y-1/4" />

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col relative z-10 w-full min-h-screen">
        {/* Dashboard Content Grid */}
        <div className="p-4 md:p-6 flex-1 flex flex-col max-w-[1600px] mx-auto w-full">
          <div className="mb-6 flex flex-col sm:flex-row sm:justify-between sm:items-end gap-4">
            <div>
              <h1 className="text-4xl font-bold text-liquid-heading tracking-tight mb-2">
                {t("common.overview")}
              </h1>
              <p className="text-liquid-text flex items-center gap-1">
                {t("common.comprehensiveAnalytics")}
                <span className="font-medium text-liquid-heading">
                  {currentWeather?.location?.name}
                </span>
              </p>
            </div>
            <div className="w-full sm:w-auto sm:min-w-[300px] flex items-center gap-3">
              <button
                onClick={toggleLanguage}
                className="p-3 h-10 w-10 flex items-center justify-center rounded-full bg-liquid-heading/5 border border-liquid-heading/10 backdrop-blur-md transition-all duration-300 hover:bg-liquid-heading/10 hover:border-white/30 hover:shadow-[0_0_20px_rgba(255,255,255,0.05)] text-liquid-heading font-bold text-xs uppercase"
                title="Toggle Language"
              >
                {i18n.language === "th" ? "TH" : "EN"}
              </button>
              <form
                onSubmit={handleSearch}
                className="relative flex items-center w-full h-12 rounded-full bg-liquid-heading/5 border border-liquid-heading/10 backdrop-blur-md transition-all duration-300 focus-within:bg-liquid-heading/10 focus-within:border-white/30 focus-within:shadow-[0_0_20px_rgba(255,255,255,0.05)] group overflow-hidden"
              >
                <div className="pl-4 pr-3 text-liquid-text/70 group-focus-within:text-liquid-heading transition-colors">
                  <Search className="w-4 h-4" />
                </div>
                <input
                  type="text"
                  placeholder={t("common.search")}
                  className="w-full h-full bg-transparent border-none outline-none text-liquid-heading placeholder:text-liquid-text/50 text-sm"
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                />
                <button
                  type="submit"
                  className="pr-5 pl-3 h-full flex items-center justify-center text-[11px] uppercase tracking-wider font-bold text-liquid-text hover:text-liquid-heading transition-all opacity-0 translate-x-4 group-focus-within:opacity-100 group-focus-within:translate-x-0 focus:opacity-100 focus:translate-x-0"
                >
                  {t("common.enter")}
                </button>
              </form>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {/* Row 1 */}
            <div className="lg:col-span-2 xl:col-span-3">
              <CurrentWeatherDetails
                locationName={currentWeather?.location?.name || "Unknown"}
                localTime={currentWeather?.location?.localtime || "-"}
                temperature={currentWeather?.current?.temp_c || 0}
                feelsLike={currentWeather?.current?.feelslike_c || 0}
                conditionText={currentWeather?.current?.condition?.text || "-"}
                humidity={currentWeather?.current?.humidity || 0}
                windSpeed={currentWeather?.current?.wind_kph || 0}
                pressure={currentWeather?.current?.pressure_mb || 0}
                visibility={currentWeather?.current?.vis_km || 0}
                uvIndex={currentWeather?.current?.uv || 0}
                cloudCover={currentWeather?.current?.cloud || 0}
              />
            </div>
            <div className="lg:col-span-1 xl:col-span-1">
              <AirQualityDashboard
                aqi={currentWeather?.current?.air_quality?.["us-epa-index"]}
                co={currentWeather?.current?.air_quality?.co || 0}
                no2={currentWeather?.current?.air_quality?.no2 || 0}
                o3={currentWeather?.current?.air_quality?.o3 || 0}
                so2={currentWeather?.current?.air_quality?.so2 || 0}
                pm2_5={currentWeather?.current?.air_quality?.pm2_5 || 0}
                pm10={currentWeather?.current?.air_quality?.pm10 || 0}
              />
            </div>

            {/* Row 2 */}
            <div className="lg:col-span-2 xl:col-span-2">
              <HourlyForecastChart
                hours={sevenDayForecast?.forecast?.forecastday?.[0]?.hour || []}
              />
            </div>
            <div className="lg:col-span-1 xl:col-span-1">
              <RainDashboard
                precip_mm={currentWeather?.current?.precip_mm || 0}
              />
            </div>
            <div className="lg:col-span-1 xl:col-span-1">
              <WeatherComparison />
            </div>

            {/* Row 3 */}
            <div className="lg:col-span-1 xl:col-span-2">
              <SevenDayForecast
                days={sevenDayForecast?.forecast?.forecastday || []}
              />
            </div>
            <div className="lg:col-span-1 xl:col-span-2">
              <WeatherMapWidget
                lat={currentWeather?.location?.lat}
                lon={currentWeather?.location?.lon}
              />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default App;
