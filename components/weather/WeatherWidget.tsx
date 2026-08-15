import { getWeather } from "@/services/weather";
import { WeatherIcon } from "./WeatherIcon";

export async function WeatherWidget() {
  const weather = await getWeather();

  if (!weather.ok) {
    return <p>{weather.error}</p>;
  }

  return (
    <pre>
      {JSON.stringify(weather.data, null, 2)}
      <pre>
        <WeatherIcon
          name={weather.data.icon}
          isDay={weather.data.isDay}
          className="size-16"
        />
      </pre>
    </pre>
  );
}
