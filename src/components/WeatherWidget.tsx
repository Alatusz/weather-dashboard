import { CloudRain, Droplets, Wind } from "lucide-react";

interface WeatherWidgetProps {
  city: string;
  temperature: number;
  condition: string;
  humidity: number;
  windSpeed: number;
}

export const WeatherWidget = ({
  city,
  temperature,
  condition,
  humidity,
  windSpeed,
}: WeatherWidgetProps) => {
  return (
    <div className="glass-card p-6 w-full max-w-sm relative overflow-hidden group">
      {/* 3D Depth / Shadow effect on the card itself */}
      <div className="absolute inset-0 bg-liquid-gradient opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-xl" />

      {/* Inner Content */}
      <div className="relative z-10 flex flex-col items-center">
        <h2 className="text-2xl font-semibold text-liquid-heading mb-1">
          {city}
        </h2>
        <p className="text-liquid-text text-sm mb-6">{condition}</p>

        {/* Main Temperature Display with 3D drop shadow text effect */}
        <div className="text-6xl font-bold text-liquid-heading tracking-tighter mb-8 drop-shadow-[0_4px_12px_rgba(44,44,44,0.8)]">
          {temperature}°
        </div>

        {/* Details Section */}
        <div className="flex w-full justify-between px-4 pt-4 border-t border-liquid-heading/10">
          <div className="flex flex-col items-center gap-2">
            <div className="p-2 rounded-full bg-liquid-depth/40 border border-liquid-heading/5">
              <Droplets className="w-5 h-5 text-liquid-text" />
            </div>
            <span className="text-xs text-liquid-text">{humidity}%</span>
          </div>

          <div className="flex flex-col items-center gap-2">
            <div className="p-2 rounded-full bg-liquid-depth/40 border border-liquid-heading/5">
              <CloudRain className="w-5 h-5 text-liquid-text" />
            </div>
            <span className="text-xs text-liquid-text">80%</span>
          </div>

          <div className="flex flex-col items-center gap-2">
            <div className="p-2 rounded-full bg-liquid-depth/40 border border-liquid-heading/5">
              <Wind className="w-5 h-5 text-liquid-text" />
            </div>
            <span className="text-xs text-liquid-text">{windSpeed} km/h</span>
          </div>
        </div>
      </div>

      {/* Decorative Blur Orbs for Liquid Effect */}
      <div className="absolute -top-10 -right-10 w-32 h-32 bg-liquid-primary/20 rounded-full blur-2xl pointer-events-none" />
      <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-liquid-depth/30 rounded-full blur-2xl pointer-events-none" />
    </div>
  );
};
