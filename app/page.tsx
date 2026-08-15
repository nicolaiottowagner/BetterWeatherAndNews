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
          className="pointer-events-none absolute inset-0 -z-10 bg-linear-to-t from-brand-color/30 to-transparent"
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
                Før du starter din dag ved din kontorplads hos Better
                Developers, er du nødt til at vide, hvilket vejr du går glip af
                at være ude i + at tjekke de nyeste nyheder i Danmark. Stay
                sharp, stay up-to-date.
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
          className="mx-auto mt-auto flex w-fit items-center gap-2 pt-12 text-sm opacity-70 motion-safe:animate-[bounce_2s_ease-in-out_infinite]"
        >
          Tjek dagens overskrifter i DK
          <ChevronDown className="size-4" aria-hidden />
        </a>
      </section>

      <div className="mx-auto w-full px-4 pb-16 lg:px-20">
        <section
          aria-labelledby="news-heading"
          id="news"
          className="scroll-mt-6"
        >
          <article className="mb-6">
            <h2
              id="news-heading"
              className="font-display text-2xl text-balance sm:text-3xl"
            >
              Dagens nyheder – hold dig opdateret
            </h2>
            <p className="mt-2 max-w-prose text-pretty opacity-70">
              Fem danske overskrifter, opdateret hvert kvarter. Resten af
              internettet må vente til frokostpausen.
            </p>
          </article>

          <Suspense fallback={<p>Henter nyheder…</p>}>
            <div className="border-t border-b border-brand-color/60">
              <NewsFeed />
            </div>
          </Suspense>
        </section>
      </div>
    </main>
  );
}
