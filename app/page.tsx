import { Suspense } from "react";
import { WeatherWidget } from "@/components/weather/WeatherWidget";
import { WeatherSkeleton } from "@/components/weather/WeatherSkeleton";
import { NewsFeed } from "@/components/news/NewsFeed";
import { NewsSearch } from "@/components/news/NewsSearch";
import { NewsSkeleton } from "@/components/news/NewsSkeleton";
import { ChevronDown } from "lucide-react";

export default async function Home({ searchParams }: PageProps<"/">) {
  const params = await searchParams;

  const query =
    typeof params.q === "string" ? params.q.trim() || undefined : undefined;

  return (
    <main>
      <section
        aria-labelledby="hero-heading"

        className="relative flex min-h-dvh flex-col px-4 py-16 sm:px-6 md:min-h-[80dvh] md:py-24 lg:min-h-[85dvh] lg:px-12"
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
            <article className="lg:basis-4/5">
              <h1
                id="hero-heading"
                className="font-display text-4xl leading-tight text-balance uppercase sm:text-5xl md:text-6xl lg:text-7xl"
              >
                Better Weather and News
              </h1>
              <div className="mt-4 max-w-prose text-sm sm:text-lg md:text-xl">
                <p className="pb-4 text-pretty opacity-70">
                  Før du starter din dag ved din kontorplads hos Better
                  Developers, er du nødt til at vide, hvilket vejr du går glip
                  af at være ude i, samtidig med at tjekke de nyeste nyheder i
                  Danmark.
                </p>

                <p className="text-lg text-brand-color md:text-2xl">
                  Stay sharp · Stay up-to-date.
                </p>
              </div>
            </article>

            <div className="mx-auto w-full max-w-md lg:mx-0 lg:w-xl lg:max-w-none">
              <Suspense fallback={<WeatherSkeleton />}>
                <WeatherWidget />
              </Suspense>
            </div>
          </div>
        </div>

        <a
          href="#news"
          className="mx-auto mt-auto flex w-fit items-center gap-2 pt-12 text-sm opacity-70 motion-safe:animate-[bounce_2s_ease-in-out_infinite] lg:absolute lg:inset-x-0 lg:bottom-8 lg:mt-0 lg:pt-0"
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
          <article className="mx-auto mb-8 pt-10 text-center sm:mb-10 md:pt-16">
            <h2
              id="news-heading"
              className="font-display text-2xl text-balance uppercase sm:text-3xl md:text-5xl"
            >
              Dagens nyheder – hold dig opdateret
            </h2>
            <p className="mt-3 text-sm text-pretty opacity-70 md:text-base">
              Fem danske overskrifter, opdateret hvert kvarter. Resten af
              internettet må vente til frokostpausen.
            </p>
          </article>

          <div className="mb-8 self-start sm:mb-10">
            <NewsSearch defaultQuery={query} />
          </div>

          <div className="border-t border-b border-brand-color/60 py-6 sm:py-8">
            <Suspense key={query} fallback={<NewsSkeleton />}>
              <NewsFeed query={query} />
            </Suspense>
          </div>
        </section>
      </div>
    </main>
  );
}
