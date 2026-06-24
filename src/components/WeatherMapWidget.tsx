import { useEffect } from "react";
import { MapContainer, Marker, TileLayer, useMap } from "react-leaflet";

import L from "leaflet";
// Fix default Leaflet
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";
import { Map } from "lucide-react";

import "leaflet/dist/leaflet.css";

delete (L.Icon.Default.prototype as L.Icon.Default & { _getIconUrl?: string })
  ._getIconUrl;
L.Icon.Default.mergeOptions({
  iconUrl: markerIcon,
  iconRetinaUrl: markerIcon2x,
  shadowUrl: markerShadow,
});

const MapUpdater = ({ lat, lon }: { lat: number; lon: number }) => {
  const map = useMap();
  useEffect(() => {
    map.setView([lat, lon], map.getZoom());
  }, [lat, lon, map]);
  return null;
};

export const WeatherMapWidget = ({
  lat = 13.7563,
  lon = 100.5018,
}: {
  lat?: number;
  lon?: number;
}) => {
  return (
    <div className="glass-card p-0 w-full h-full min-h-[300px] relative overflow-hidden group flex flex-col">
      {/* Overlay controls */}
      <div className="absolute top-4 left-4 right-4 flex justify-between items-center z-[400] pointer-events-none">
        <div className="flex items-center gap-2 bg-liquid-bg/80 backdrop-blur-md px-3 py-1.5 rounded-full border border-liquid-heading/20 pointer-events-auto shadow-[0_0_15px_rgba(0,0,0,0.5)]">
          <Map className="w-4 h-4 text-liquid-text" />
          <span className="text-xs font-semibold text-liquid-heading">
            Live Map
          </span>
        </div>
        <div className="bg-liquid-bg/80 backdrop-blur-md px-3 py-1.5 rounded-full border border-liquid-heading/20 pointer-events-auto shadow-[0_0_15px_rgba(0,0,0,0.5)]">
          <span className="text-xs text-liquid-text font-medium">
            Carto Dark
          </span>
        </div>
      </div>

      <div className="absolute inset-0 z-0 [&_.leaflet-control-zoom]:!border-liquid-heading/20 [&_.leaflet-control-zoom]:!bg-liquid-bg/80 [&_.leaflet-bar_a]:!bg-transparent [&_.leaflet-bar_a]:!text-liquid-heading [&_.leaflet-bar_a]:!border-liquid-heading/20 hover:[&_.leaflet-bar_a]:!bg-liquid-heading/10 [&_.leaflet-container]:font-sans">
        <MapContainer
          center={[lat, lon]}
          zoom={10}
          scrollWheelZoom={false}
          style={{ height: "100%", width: "100%", background: "#000000" }}
        >
          {/* Dark map tiles to fit the Liquid Glass aesthetic */}
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OSM</a> &copy; <a href="https://carto.com/attributions">CARTO</a>'
            url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
          />
          <MapUpdater lat={lat} lon={lon} />
          <Marker position={[lat, lon]} />
        </MapContainer>
      </div>
    </div>
  );
};
