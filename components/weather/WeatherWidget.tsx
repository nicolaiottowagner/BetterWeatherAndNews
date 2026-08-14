import { getWeather } from "@/services/weather";

export async function WeatherWidget() {
  const weather = await getWeather();

  if (!weather.ok) {
    return <p>{weather.error}</p>;
  }

  return <pre>{JSON.stringify(weather.data, null, 2)}</pre>;
}
