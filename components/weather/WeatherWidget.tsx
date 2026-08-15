import { getWeather } from "@/services/weather";

export async function WeatherWidget() {
  const weather = await getWeather();

  if (!weather.ok) {
    return <p>{weather.error}</p>;
  }

  const { temperatureC, feelsLikeC, windSpeedKmh, condition, observedAt } =
    weather.data;
  const observedTime = weather.data.observedAt.slice(11, 16);

  return (
    <div>
      <p>{Math.round(temperatureC)} C°</p>
      <p>{condition}</p>
      <dl>
        <div>
          <dt>Feels like</dt>
          <dd>{Math.round(feelsLikeC)} C°</dd>
        </div>
        <div>
          <dt>Wind</dt>
          <dd>{Math.round(windSpeedKmh)} km/h</dd>
        </div>
      </dl>
      <p>
        Aarhus <time dateTime={observedAt}>{observedTime}</time>
      </p>
    </div>
  );
}
