import { growthPackages } from "../content/growth.config";

export function PackageList() {
  return (
    <ol className="divide-y divide-slate/20 border-y border-slate/20">
      {growthPackages.map((p, i) => (
        <li key={p.id} className="grid gap-4 py-8 md:grid-cols-[3rem_1fr_1.2fr]">
          <span className="font-mono text-sm text-electric">{String(i + 1).padStart(2, "0")}</span>
          <div>
            <h3 className="text-xl font-semibold">{p.name}</h3>
            <p className="mt-2 text-slate">{p.summary}</p>
          </div>
          <ul className="flex flex-wrap content-start gap-2">
            {p.includes.map((x) => (
              <li key={x} className="rounded border border-slate/25 bg-white px-3 py-1 text-sm text-slate">
                {x}
              </li>
            ))}
          </ul>
        </li>
      ))}
    </ol>
  );
}
