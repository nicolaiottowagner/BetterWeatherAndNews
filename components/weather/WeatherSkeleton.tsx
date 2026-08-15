import { Skeleton } from "@/components/ui/Skeleton";

// Mirrors WeatherWidget's own shell and block heights so the hero does not
// reflow when the real data streams in. If the widget's layout changes, this
// has to change with it — the cost of a skeleton that actually matches.
export function WeatherSkeleton() {
  return (
    <div
      role="status"
      className="rounded-2xl border border-brand-color/30 px-4 pb-4 sm:p-6 md:pt-2"
    >
      <span className="sr-only">Indlæser vejret…</span>

      <Skeleton className="mt-2 h-7 w-40" />
      <Skeleton className="mt-3 h-4 w-28" />

      <div className="flex items-center justify-between gap-4 pt-6">
        <Skeleton className="h-14 w-40" />
        <Skeleton className="size-14 shrink-0 rounded-full sm:size-16 lg:size-20" />
      </div>

      <div className="mt-4 grid grid-cols-2 gap-3">
        <Skeleton className="h-10" />
        <Skeleton className="h-10" />
      </div>

      <Skeleton className="mt-4 h-4 w-52" />
    </div>
  );
}
