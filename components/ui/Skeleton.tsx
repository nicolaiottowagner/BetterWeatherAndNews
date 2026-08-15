// A single placeholder block.
export function Skeleton({ className }: { className?: string }) {
  return (
    <div
      aria-hidden
      className={`rounded-md bg-foreground/10 motion-safe:animate-pulse ${className ?? ""}`}
    />
  );
}
