"use client";

import { useRouter } from "next/navigation";

export function NewsSearch({
  defaultQuery,
  disabled = false,
}: {
  defaultQuery?: string;
  disabled?: boolean;
}) {
  const router = useRouter();

  return (
    <div className="mx-auto max-w-md">
      <form
        role="search"
        action="/"
        onSubmit={(event) => {
          event.preventDefault();
          const q = String(
            new FormData(event.currentTarget).get("q") ?? "",
          ).trim();
          router.push(q ? `/?q=${encodeURIComponent(q)}#news` : "/#news");
        }}
        className="flex gap-2"
      >
        <label htmlFor="news-search" className="sr-only">
          Søg blandt danske nyheder
        </label>
        <input
          id="news-search"
          type="search"
          name="q"
          defaultValue={defaultQuery}
          disabled={disabled}
          aria-describedby={disabled ? "news-search-hint" : undefined}
          placeholder="Søg blandt danske nyheder"
          className="min-w-0 grow rounded-full border border-foreground/20 px-4 py-2 text-sm focus-visible:outline-2 focus-visible:outline-brand-color disabled:cursor-not-allowed disabled:opacity-50"
        />
        <button
          type="submit"
          disabled={disabled}
          className="shrink-0 rounded-full border border-brand-color px-4 py-2 text-sm text-brand-color disabled:cursor-not-allowed disabled:opacity-50"
        >
          Søg
        </button>
      </form>

      {disabled && (
        <p
          id="news-search-hint"
          className="mt-2 text-center text-xs opacity-70"
        >
          Søgning kræver en API-nøgle. Feedet viser eksempeldata.
        </p>
      )}
    </div>
  );
}
