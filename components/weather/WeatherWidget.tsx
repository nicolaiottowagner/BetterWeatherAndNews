import { getWeather } from "@/services/weather";
import { WeatherIcon } from "./WeatherIcon";

export async function WeatherWidget() {
  const weather = await getWeather();

  if (!weather.ok) {
    return <p>{weather.error}</p>;
  }

  const { temperatureC, feelsLikeC, windSpeedKmh, condition, observedAt } =
    weather.data;
  const observedTime = weather.data.observedAt.slice(11, 16);

  return (
    <div className="rounded-2xl border border-foreground/10 p-4 sm:p-6">
      <div className="flex items-center gap-4">
        <WeatherIcon
          name={weather.data.icon}
          isDay={weather.data.isDay}
          className="size-12 shrink-0 text-brand-color sm:size-16"
        />
      </div>

      <div>
        <p className="font-display text-5xl tabular-nums sm:text-6xl">
          {Math.round(temperatureC)}°C
        </p>
        <p className="text-sm opacity-70">{condition}</p>
      </div>
      <dl className="mt-4 grid grid-cols-2 gap-3 sm:flex sm:gap-8">
        <div>
          <dt className="text-sm opacity-70">Feels like</dt>
          <dd className="tabular-nums">{Math.round(feelsLikeC)}°</dd>
        </div>
        <div>
          <dt className="text-sm opacity-70">Wind</dt>
          <dd className="tabular-nums">{Math.round(windSpeedKmh)} km/h</dd>
        </div>
      </dl>
      <p className="mt-4 text-sm opacity-70">
        Aarhus <time dateTime={observedAt}>{observedTime}</time>
      </p>
    </div>
  );
}
