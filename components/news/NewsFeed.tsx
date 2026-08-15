import { ErrorState } from "@/components/ui/ErrorState";
import { hasNewsKey } from "@/services/env";
import { getNews } from "@/services/news";
import { NewsCard } from "./NewsCard";

export async function NewsFeed() {
  const news = await getNews();

  if (!news.ok) {
    return <ErrorState message={news.error} />;
  }

  // Distinct from the error path: the request worked, there is just nothing to
  // show. Phase 5's keyword search is what makes this reachable in practice.
  if (news.data.length === 0) {
    return (
      <p className="rounded-2xl border border-foreground/20 p-4 text-sm">
        Ingen overskrifter lige nu.
      </p>
    );
  }

  return (
    <>
      {!hasNewsKey && (
        <p className="mt-4 inline-block rounded-full border border-brand-color/40 px-3 py-1 text-xs tracking-widest text-brand-color uppercase">
          Eksempeldata – ingen API-nøgle
        </p>
      )}

      {/* auto-rows-fr keeps every row the same height, so a headline with no
          description does not produce a shorter card than its neighbours. */}
      <ul className="mt-4 grid auto-rows-fr gap-4 lg:grid-cols-2">
        {news.data.map((headline) => (
          <li key={headline.id}>
            <NewsCard headline={headline} />
          </li>
        ))}
      </ul>
    </>
  );
}
