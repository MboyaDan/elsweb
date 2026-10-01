import { growthLayers } from "../content/growth.config";

export function LayerGrid() {
  return (
    <ol className="grid border-l border-t border-slate/20 md:grid-cols-2 lg:grid-cols-3">
      {growthLayers.map((l, i) => (
        <li key={l.id} className="border-b border-r border-slate/20 bg-white p-8">
          <p className="font-mono text-xs text-electric">{String(i + 1).padStart(2, "0")}</p>
          <h3 className="mt-2 text-xl font-semibold">{l.name}</h3>
          <ul className="mt-4 space-y-2 text-slate">
            {l.tasks.map((t) => (
              <li key={t} className="flex gap-2">
                <span aria-hidden className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-cyan" />
                {t}
              </li>
            ))}
          </ul>
        </li>
      ))}
    </ol>
  );
}
