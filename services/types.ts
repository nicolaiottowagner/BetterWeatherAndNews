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

export type NewsHeadline = {
  id: string;
  title: string;
  description: string | null;
  url: string;
  imageUrl: string | null;
  source: string;
  publishedAt: string;
};
