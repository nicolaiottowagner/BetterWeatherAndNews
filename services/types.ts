import type { WeatherIcon } from "./weather-codes";

export type WeatherNow = {
  temperatureC: number;
  feelsLikeC: number;
  windSpeedKmh: number;
  condition: string;
  icon: WeatherIcon;
  isDay: boolean;
  observedAt: string;
};
