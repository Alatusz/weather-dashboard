export type THourlyForecast = {
  time: string;
  temp_c: number;
  condition: {
    icon: string;
  };
  chance_of_rain: number;
};
