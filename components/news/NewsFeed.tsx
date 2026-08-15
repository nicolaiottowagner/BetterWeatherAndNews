import { hasNewsKey } from "@/services/env";
import { getNews } from "@/services/news";
import { NewsCard } from "./NewsCard";

export async function NewsFeed() {
  const news = await getNews();

  if (!news.ok) {
    return <p>{news.error}</p>;
  }
  if (news.data.length === 0) {
    return <p>No headlines right now.</p>;
  }

  return (
    <>
      {!hasNewsKey && (
        <p className="mt-4 inline-block rounded-full border border-brand-color/40 px-3 py-1 text-xs tracking-widest text-brand-color uppercase">
          Sample data — no API key configured
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
