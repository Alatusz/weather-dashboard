import { keepPreviousData, useQuery } from "@tanstack/react-query";

import { getCurrentWeather, getForeCast } from "../services/weather.services";

const useCurrentWeather = (city: string) => {
  return useQuery({
    queryKey: ["weather", city],
    queryFn: () => getCurrentWeather(city),

    placeholderData: keepPreviousData,
  });
};

const useForecastWeather = (city: string, days: number) => {
  return useQuery({
    queryKey: ["forecast", city],
    queryFn: () => getForeCast(city, days),

    placeholderData: keepPreviousData,
  });
};

export { useCurrentWeather, useForecastWeather };
