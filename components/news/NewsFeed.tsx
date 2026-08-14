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
      {!hasNewsKey && <p>Showing sample data — no API key configured.</p>}

      <ul>
        {news.data.map((headline) => (
          <li key={headline.id}>
            <NewsCard headline={headline} />
          </li>
        ))}
      </ul>
    </>
  );
}
