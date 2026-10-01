export default function Loading() {
  return (
    <div role="status" aria-live="polite" className="mx-auto max-w-3xl px-6 py-32">
      <span className="sr-only">Loading</span>
      <div className="h-2 w-40 animate-pulse rounded bg-slate/30" />
    </div>
  );
}
