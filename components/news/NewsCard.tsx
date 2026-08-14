import type { NewsHeadline } from "@/services/types";

export function NewsCard({ headline }: { headline: NewsHeadline }) {
  return (
    <article>
      <h3>
        <a href={headline.url} target="_blank" rel="noopener noreferrer"></a>
      </h3>
      {headline.description && <p>{headline.description}</p>}
      <p>
        {headline.source}{" "}
        <time dateTime={headline.publishedAt}>{headline.publishedAt}</time>
      </p>
    </article>
  );
}
