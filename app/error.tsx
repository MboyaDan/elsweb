"use client";

export default function Error({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <section className="mx-auto max-w-3xl px-6 py-32">
      <h1 className="text-4xl font-semibold">Something went wrong</h1>
      <p className="mt-4">The page failed to load. Try again, and if it keeps happening, email us.</p>
      <button
        type="button"
        onClick={reset}
        className="mt-8 rounded bg-electric px-5 py-3 font-medium text-white"
      >
        Try again
      </button>
    </section>
  );
}
