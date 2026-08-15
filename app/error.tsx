"use client";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <main className="mx-auto flex min-h-dvh w-full max-w-2xl flex-col justify-center px-4 py-16">
      <h1 className="font-display text-3xl uppercase sm:text-4xl">
        Noget gik galt
      </h1>
      <p className="mt-4 opacity-70">
        Siden kunne ikke indlæses. Prøv igen — hjælper det ikke, er der
        formentlig et midlertidigt problem hos en af vores datakilder.
      </p>

      {error.digest && (
        <p className="mt-2 text-xs opacity-50">Fejl-ID: {error.digest}</p>
      )}

      <button
        type="button"
        onClick={reset}
        className="mt-8 w-fit rounded-full border border-brand-color px-5 py-2 text-sm text-brand-color transition-colors focus-visible:outline-2 focus-visible:outline-brand-color pointer-fine:hover:bg-brand-color/10"
      >
        Prøv igen
      </button>
    </main>
  );
}
