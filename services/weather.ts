import { err, ok, type Result } from "./result";
import type { WeatherNow } from "./types";
import { describeWeatherCode } from "./weather-codes";

const AARHUS = { latitude: 56.1567, longitude: 10.2108 } as const;
const TIMEOUT_MS = 5000;
const CURRENT_FIELDS = [
  "temperature_2m",
  "apparent_temperature",
  "wind_speed_10m",
  "weather_code",
  "is_day",
] as const;

type OpenMeteoResponse = {
  current: {
    time: string;
    temperature_2m: number;
    apparent_temperature: number;
    wind_speed_10m: number;
    weather_code: number;
    is_day: number;
  };
};

function buildUrl(): string {
  const params = new URLSearchParams({
    latitude: String(AARHUS.latitude),
    longitude: String(AARHUS.longitude),
    current: CURRENT_FIELDS.join(","),
    timezone: "Europe/Copenhagen",
  });
  return `https://api.open-meteo.com/v1/forecast?${params}`;
}

function toWeatherNow(raw: OpenMeteoResponse): WeatherNow {
  const c = raw.current;
  const condition = describeWeatherCode(c.weather_code);
  return {
    temperatureC: c.temperature_2m,
    feelsLikeC: c.apparent_temperature,
    windSpeedKmh: c.wind_speed_10m,
    condition: condition.label,
    icon: condition.icon,
    isDay: c.is_day === 1,
    observedAt: c.time,
  };
}

function isOpenMeteoResponse(value: unknown): value is OpenMeteoResponse {
  if (typeof value !== "object" || value === null) return false;
  const current = (value as { current?: unknown }).current;
  if (typeof current !== "object" || current === null) return false;

  const c = current as Record<string, unknown>;
  return (
    typeof c.time === "string" &&
    typeof c.temperature_2m === "number" &&
    typeof c.apparent_temperature === "number" &&
    typeof c.wind_speed_10m === "number" &&
    typeof c.weather_code === "number" &&
    typeof c.is_day === "number"
  );
}

export async function getWeather(): Promise<Result<WeatherNow>> {
  try {
    const res = await fetch(buildUrl(), {
      next: { revalidate: 900 },
      signal: AbortSignal.timeout(TIMEOUT_MS),
    });

    if (!res.ok) {
      console.error("[weather] upstream returned", res.status, res.statusText);
      return err("Weather is unavailable right now.");
    }

    const raw: unknown = await res.json();

    if (!isOpenMeteoResponse(raw)) {
      console.error("[weather] unexpected payload", raw);
      return err("Weather data could not be read.");
    }

    return ok(toWeatherNow(raw));
  } catch (cause) {
    console.error("[weather] request failed", cause);
    return err("Weather is unavailable right now.");
  }
}
