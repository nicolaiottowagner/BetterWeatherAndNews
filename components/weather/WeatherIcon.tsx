import { WeatherIcon as WeatherIconName } from "@/services/weather-codes";
import {
  Sun,
  CloudSun,
  Cloudy,
  CloudFog,
  CloudDrizzle,
  CloudRain,
  CloudSnow,
  CloudLightning,
  CircleHelp,
  Moon,
  CloudMoon,
  type LucideIcon,
} from "lucide-react";

const ICONS: Record<WeatherIconName, LucideIcon> = {
  clear: Sun,
  "partly-cloudy": CloudSun,
  overcast: Cloudy,
  fog: CloudFog,
  drizzle: CloudDrizzle,
  rain: CloudRain,
  snow: CloudSnow,
  thunderstorm: CloudLightning,
  unknown: CircleHelp,
};

const NIGHT_ICONS: Partial<Record<WeatherIconName, LucideIcon>> = {
  clear: Moon,
  "partly-cloudy": CloudMoon,
};

export function WeatherIcon({
  name,
  isDay,
  className,
}: {
  name: WeatherIconName;
  isDay: boolean;
  className: string;
}) {
  const Icon = (isDay ? undefined : NIGHT_ICONS[name]) ?? ICONS[name];
  return <Icon className={className} aria-hidden />;
}
