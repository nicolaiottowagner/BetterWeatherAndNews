import type { NewsHeadline } from "@/services/types";

export function NewsCard({ headline }: { headline: NewsHeadline }) {
  return (
    <article className="flex flex-col p-2">
      <h3>
        <a href={headline.url} target="_blank" rel="noopener noreferrer">
          {headline.title}
        </a>
      </h3>
      {headline.description && <p>{headline.description}</p>}
      <p>
        {headline.source}{" "}
        <time dateTime={headline.publishedAt}>{headline.publishedAt}</time>
      </p>
    </article>
  );
}
