import { weatherApi } from "../lib/weather-api";

export const getCurrentWeather = async (city: string) => {
  const response = await weatherApi.get(`/current.json?q=${city}&aqi=yes`);

  return response.data;
};

export const getForeCast = async (city: string, days: number) => {
  const response = await weatherApi.get(
    `/forecast.json?q=${city}&days=${days}`,
  );

  return response.data;
};
