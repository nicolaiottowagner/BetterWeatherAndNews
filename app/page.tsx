import { Suspense } from "react";
import { WeatherWidget } from "@/components/weather/WeatherWidget";
import { NewsFeed } from "@/components/news/NewsFeed";
import { ChevronDown } from "lucide-react";
export default function Home() {
  return (
    <main>
      <section
        aria-labelledby="hero-heading"
        className="relative flex min-h-dvh flex-col px-4 py-16 sm:px-6 md:min-h-[80dvh] md:py-24 lg:px-12"
      >
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 -z-10 bg-linear-to-t from-brand-color/15 to-transparent"
        />

        <div className="mx-auto w-full md:px-8 lg:px-12">
          <p className="mb-4 font-display text-xs tracking-widest text-brand-color uppercase lg:text-base">
            by a Developer · for Staying up-to-date
          </p>

          <div className="flex flex-col gap-8 lg:flex-row lg:items-start lg:gap-12">
            <header className="lg:basis-4/5">
              <h1
                id="hero-heading"
                className="font-display text-4xl leading-tight text-balance sm:text-5xl md:text-6xl lg:text-7xl"
              >
                Better Weather and News
              </h1>
              <p className="mt-4 max-w-prose text-pretty opacity-70 sm:text-lg md:text-xl">
                Before starting your day at Better Developers behind af desk you
                have to know what kind of weather you are missing out from +
                checking the latest news in Denmark. Stay sharp, stay up-to-date
              </p>
            </header>

            <div className="mx-auto w-full max-w-md lg:mx-0 lg:w-xl lg:max-w-none">
              <Suspense fallback={<p>Loading weather…</p>}>
                <WeatherWidget />
              </Suspense>
            </div>
          </div>
        </div>

        <a
          href="#news"
          className="mx-auto mt-auto flex w-fit items-center gap-2 pt-12 text-sm opacity-70 lg:hidden"
        >
          Today&rsquo;s headlines
          <ChevronDown
            className="size-4 motion-safe:animate-bounce"
            aria-hidden
          />
        </a>
      </section>

      <div className="mx-auto w-full max-w-5xl px-4 pb-16 sm:px-6">
        <section
          aria-labelledby="news-heading"
          id="news"
          className="scroll-mt-6"
        >
          <h2 id="news-heading" className="font-display text-xl sm:text-2xl">
            Top headlines
          </h2>
          <Suspense fallback={<p>Loading news…</p>}>
            <NewsFeed />
          </Suspense>
        </section>
      </div>
    </main>
  );
}
