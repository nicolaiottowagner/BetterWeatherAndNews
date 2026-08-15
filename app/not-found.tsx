import Link from "next/link";

// Server Component — no interactivity needed, just a way back to the one page
// this app has.
export default function NotFound() {
  return (
    <main className="mx-auto flex min-h-dvh w-full max-w-2xl flex-col justify-center px-4 py-16">
      <p className="font-display text-sm tracking-widest text-brand-color uppercase">
        404
      </p>
      <h1 className="mt-4 font-display text-3xl uppercase sm:text-4xl">
        Siden findes ikke
      </h1>
      <p className="mt-4 opacity-70">
        Vi kunne ikke finde den side, du ledte efter.
      </p>

      <Link
        href="/"
        className="mt-8 w-fit rounded-full border border-brand-color px-5 py-2 text-sm text-brand-color transition-colors focus-visible:outline-2 focus-visible:outline-brand-color pointer-fine:hover:bg-brand-color/10"
      >
        Tilbage til forsiden
      </Link>
    </main>
  );
}
