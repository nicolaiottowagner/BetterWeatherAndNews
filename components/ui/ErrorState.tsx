// The message is the user-facing string from Result.error
export function ErrorState({ message }: { message: string }) {
  return (
    <div
      role="alert"
      className="rounded-2xl border border-foreground/20 p-4 text-sm"
    >
      <p>{message}</p>
      <p className="mt-1 opacity-70">
        Vi henter data igen automatisk inden for 15 minutter.
      </p>
    </div>
  );
}
