import { Suspense } from "react";
import { WeatherWidget } from "@/components/weather/WeatherWidget";
export default function Home() {
  return (
    <main>
      <section>
        <h1>Aarhus today</h1>
        <Suspense fallback={<p>Loading Weather</p>}>
          <WeatherWidget />
        </Suspense>
      </section>
    </main>
  );
}
