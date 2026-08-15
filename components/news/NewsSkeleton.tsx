import { Skeleton } from "@/components/ui/Skeleton";

const PLACEHOLDER_COUNT = 5;

// Same grid and card shell as NewsFeed, so the feed does not shift when it
// resolves. Index keys are safe here: the list is fixed-length and never
// reorders.
export function NewsSkeleton() {
  return (
    <div role="status">
      <span className="sr-only">Indlæser nyheder…</span>

      <ul className="mt-4 grid auto-rows-fr gap-4 lg:grid-cols-2">
        {Array.from({ length: PLACEHOLDER_COUNT }, (_, index) => (
          <li key={index}>
            <div className="flex h-full gap-4 rounded-2xl border border-brand-color/40 p-4">
              <Skeleton className="size-20 shrink-0 rounded-lg sm:size-24" />

              <div className="flex min-w-0 grow flex-col">
                <Skeleton className="h-5 w-3/4" />
                <Skeleton className="mt-3 h-4" />
                <Skeleton className="mt-1.5 h-4 w-2/3" />
                <Skeleton className="mt-auto h-3 w-1/3" />
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
