import { Newspaper } from "lucide-react";
import type { NewsHeadline } from "@/services/types";

const RELATIVE = new Intl.RelativeTimeFormat("da-DK", { numeric: "auto" });

function relativeTime(iso: string): string {
  const minutes = Math.round((Date.now() - new Date(iso).getTime()) / 60_000);
  if (minutes < 60) return RELATIVE.format(-minutes, "minute");
  const hours = Math.round(minutes / 60);
  if (hours < 24) return RELATIVE.format(-hours, "hour");
  return RELATIVE.format(-Math.round(hours / 24), "day");
}

export function NewsCard({ headline }: { headline: NewsHeadline }) {
  return (
    <a
      href={headline.url}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={headline.title}
      className="block h-full rounded-2xl focus-visible:outline-2 focus-visible:outline-brand-color"
    >
      <article className="flex h-full gap-4 rounded-2xl border border-brand-color/40 p-4 transition-colors pointer-fine:border-foreground/10 pointer-fine:hover:border-brand-color/40">
        {headline.imageUrl ? (
          // CLAUDE COMMENT
          // next/image would need remotePatterns "**" for arbitrary news domains,
          // which turns /_next/image into an open proxy. Thumbnails are small
          // enough that skipping optimisation is the cheaper trade. The tinted
          // background doubles as the fallback when a CDN blocks hotlinking.
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={headline.imageUrl}
            alt=""
            loading="lazy"
            decoding="async"
            className="size-20 shrink-0 rounded-lg bg-foreground/5 object-cover sm:size-24"
          />
        ) : (
          <div
            aria-hidden
            className="flex size-20 shrink-0 items-center justify-center rounded-lg bg-foreground/5 sm:size-24"
          >
            <Newspaper className="size-8 text-brand-color/40" />
          </div>
        )}

        <div className="flex min-w-0 flex-col">
          <h3 className="line-clamp-2 font-display text-lg leading-snug">
            {headline.title}
          </h3>

          {headline.description && (
            <p className="mt-2 line-clamp-2 text-sm opacity-70">
              {headline.description}
            </p>
          )}

          <p className="mt-auto pt-3 text-xs opacity-70">
            {headline.source} ·{" "}
            <time dateTime={headline.publishedAt}>
              {relativeTime(headline.publishedAt)}
            </time>
          </p>
        </div>
      </article>
    </a>
  );
}
