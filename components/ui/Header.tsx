import Link from "next/link";
import { ThemeToggle } from "./ThemeToggle";

export function Header() {
  return (
    <header className="sticky top-0 z-10 border-b border-foreground/10 bg-background/80 backdrop-blur">
      <div className="mx-auto flex w-full items-center justify-between px-4 py-3 sm:px-6 lg:px-12">
        <Link
          href="/"
          aria-label="Better Developers – forside"
          className="rounded-sm focus-visible:outline-2 focus-visible:outline-brand-color"
        >
          <span className="font-display text-sm tracking-widest uppercase">
            Better Developers
          </span>
        </Link>

        <ThemeToggle />
      </div>
    </header>
  );
}
