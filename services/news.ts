import mockNews from "@/mocks/news.json";
import { err, ok, type Result } from "./result";
import type { NewsHeadline } from "./types";
import { newsApiKey, hasNewsKey } from "./env";

const MAX_HEADLINES = 5;
const TIMEOUT_MS = 5000;

type NewsdataArticle = {
  article_id: string;
  title: string;
  link: string;
  description: string | null;
  image_url: string | null;
  source_name: string;
  pubDate: string;
};

type NewsdataResponse = {
  results: NewsdataArticle[];
};

function buildUrl(query?: string): string {
  const params = new URLSearchParams({
    apikey: newsApiKey,
    country: "dk",
    language: "da",
  });
  if (query) params.set("q", query);
  return `https://newsdata.io/api/1/latest?${params}`;
}

function isNewsdataArticle(value: unknown): value is NewsdataArticle {
  if (typeof value !== "object" || value === null) return false;
  const a = value as Record<string, unknown>;

  return (
    typeof a.article_id === "string" &&
    typeof a.title === "string" &&
    typeof a.link === "string" &&
    typeof a.source_name === "string" &&
    typeof a.pubDate === "string" &&
    (typeof a.description === "string" || a.description === null) &&
    (typeof a.image_url === "string" || a.image_url === null)
  );
}

function extractArticles(value: unknown): NewsdataArticle[] | null {
  if (typeof value !== "object" || value === null) return null;
  const results = (value as { results?: unknown }).results;
  if (!Array.isArray(results)) return null;

  return results.filter(isNewsdataArticle);
}

function toIsoDate(pubDate: string): string | null {
  const parsed = new Date(`${pubDate.replace(" ", "T")}Z`);
  return Number.isNaN(parsed.getTime()) ? null : parsed.toISOString();
}

function toHeadline(article: NewsdataArticle): NewsHeadline | null {
  const publishedAt = toIsoDate(article.pubDate);
  if (publishedAt === null) return null;

  return {
    id: article.article_id,
    title: article.title,
    description: article.description,
    url: article.link,
    imageUrl: article.image_url,
    source: article.source_name,
    publishedAt,
  };
}

function toHeadlines(articles: NewsdataArticle[]): NewsHeadline[] {
  return articles.flatMap((a) => toHeadline(a) ?? []).slice(0, MAX_HEADLINES);
}

export async function getNews(query?: string): Promise<Result<NewsHeadline[]>> {
  if (!hasNewsKey) {
    const articles = extractArticles(mockNews);
    if (articles === null) {
      console.error("[news] bundled mock data is malformed");
      return err("Sample headlines could not be read.");
    }
    return ok(toHeadlines(articles));
  }

  try {
    const res = await fetch(buildUrl(query), {
      next: { revalidate: 900 },
      signal: AbortSignal.timeout(TIMEOUT_MS),
    });

    if (!res.ok) {
      console.error("[news] upstream returned", res.status, res.statusText);
      return err("News is unavailable right now.");
    }

    const raw: unknown = await res.json();
    const articles = extractArticles(raw);

    if (articles === null) {
      console.error("[news] unexpected payload", raw);
      return err("News data could not be read.");
    }

    return ok(toHeadlines(articles));
  } catch (cause) {
    console.error("[news] request failed", cause);
    return err("News is unavailable right now.");
  }
}
