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
  const observedDate = new Intl.DateTimeFormat("en-GB", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  })
    .formatToParts(new Date(observedAt.slice(0, 10)))
    .filter((part) => part.type !== "literal")
    .map((part) => part.value)
    .join(", ");

  return (
    <div className="bg-brand-lightorange rounded-2xl border border-brand-color/30 px-4 pb-4 shadow-lg shadow-brand-color/70 sm:p-6">
      <p className="pt-2 font-display text-lg">
        Aarhus · <time dateTime={observedAt}>{observedTime}</time>
      </p>
      <div className="flex flex-row items-center gap-2">
        <WeatherIcon
          name={weather.data.icon}
          isDay={weather.data.isDay}
          className="size-4 shrink-0 text-brand-color sm:size-16"
        />{" "}
        <p className="text-sm opacity-70">{condition}</p>
      </div>
      <div className="flex flex-row items-start justify-start gap-12 pt-6">
        <div>
          <p className="font-display text-6xl tabular-nums sm:text-6xl">
            {Math.round(temperatureC)}°C
          </p>
        </div>
        <WeatherIcon
          name={weather.data.icon}
          isDay={weather.data.isDay}
          className="size-14 shrink-0 text-brand-color sm:size-16"
        />
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
        <time dateTime={observedAt.slice(0, 10)}>{observedDate}</time>
      </p>
    </div>
  );
}
