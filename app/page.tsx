import { Suspense } from "react";
import { WeatherWidget } from "@/components/weather/WeatherWidget";
import { NewsFeed } from "@/components/news/NewsFeed";
export default function Home() {
  return (
    <main>
      <section aria-labelledby="weather-heading">
        <h2 id="weather-heading">Aarhus today</h2>
        <Suspense fallback={<p>Loading Weather</p>}>
          <WeatherWidget />
        </Suspense>
      </section>
      <section aria-labelledby="news-heading">
        <h2 id="news-heading"></h2>
        <Suspense fallback={<p>Loading News</p>}>
          <NewsFeed />
        </Suspense>
      </section>
    </main>
  );
}
