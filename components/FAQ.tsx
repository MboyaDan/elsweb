export function FAQ({ items }: { items: { q: string; a: string }[] }) {
  return (
    <div className="divide-y divide-slate/20 border-y border-slate/20">
      {items.map((f) => (
        <details key={f.q} className="group py-5">
          <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-lg font-medium text-navy">
            {f.q}
            <span aria-hidden className="font-mono text-electric transition-transform group-open:rotate-45">
              +
            </span>
          </summary>
          <p className="mt-3 max-w-2xl text-slate">{f.a}</p>
        </details>
      ))}
    </div>
  );
}
