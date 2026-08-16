import { ErrorState } from "@/components/ui/ErrorState";
import { hasNewsKey } from "@/services/env";
import { getNews } from "@/services/news";
import { NewsCard } from "./NewsCard";

export async function NewsFeed({ query }: { query?: string }) {
  const news = await getNews(query);

  if (!news.ok) {
    return <ErrorState message={news.error} />;
  }

  if (news.data.length === 0) {
    return (
      <p className="rounded-2xl border border-foreground/20 p-4 text-sm">
        Ingen nyhedsartikler.
      </p>
    );
  }

  return (
    <>
      {!hasNewsKey && (
        <p className="mt-4 inline-block rounded-full border border-brand-color px-3 py-1 text-xs tracking-widest text-brand-color uppercase">
          Eksempeldata – ingen API-nøgle
        </p>
      )}

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
