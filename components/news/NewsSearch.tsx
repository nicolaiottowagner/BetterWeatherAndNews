"use client";

import { useRouter } from "next/navigation";

export function NewsSearch({ defaultQuery }: { defaultQuery?: string }) {
  const router = useRouter();

  return (
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
      className="mx-auto flex max-w-md gap-2"
    >
      <label htmlFor="news-search" className="sr-only">
        Søg blandt danske nyheder
      </label>
      <input
        id="news-search"
        type="search"
        name="q"
        defaultValue={defaultQuery}
        placeholder="Søg blandt danske nyheder"
        className="min-w-0 grow rounded-full border border-foreground/20 px-4 py-2 text-sm focus-visible:outline-2 focus-visible:outline-brand-color"
      />
      <button
        type="submit"
        className="shrink-0 rounded-full border border-brand-color px-4 py-2 text-sm text-brand-color"
      >
        Søg
      </button>
    </form>
  );
}
