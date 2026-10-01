"use client";

import * as m from "motion/react-m";
import { ArrowRight } from "lucide-react";
import { funnelSteps } from "../content/growth.config";

function Chip({ children, strong = false }: { children: React.ReactNode; strong?: boolean }) {
  return (
    <span
      className={`rounded-md border px-3 py-2 font-mono text-xs sm:text-sm ${
        strong ? "border-electric/40 bg-white text-navy" : "border-slate/30 bg-white text-slate"
      }`}
    >
      {children}
    </span>
  );
}

/** Contrast diagram: the usual ad-to-form path against the full ELS chain. */
export function TechnicalDiagram() {
  const short = ["Ad", "Website", "Form"];
  return (
    <div className="space-y-8">
      <div className="border border-slate/20 bg-white p-6">
        <p className="font-mono text-xs tracking-widest text-slate">AD → WEBSITE → FORM</p>
        <div className="mt-4 flex flex-wrap items-center gap-2" role="list">
          {short.map((s, i) => (
            <span key={s} role="listitem" className="flex items-center gap-2">
              <Chip>{s}</Chip>
              {i < short.length - 1 && <ArrowRight className="h-4 w-4 text-slate/60" aria-hidden />}
            </span>
          ))}
        </div>
        <p className="mt-4 text-sm text-slate">The enquiry lands in an inbox and waits.</p>
      </div>
      <div className="border border-electric/40 bg-offwhite p-6">
        <p className="font-mono text-xs tracking-widest text-electric">THE FULL ELS CHAIN</p>
        <ol className="mt-4 flex flex-wrap items-center gap-2">
          {funnelSteps.map((s, i) => (
            <m.li
              key={s}
              initial={{ opacity: 0, x: -8 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.35, delay: i * 0.08 }}
              className="flex items-center gap-2"
            >
              <Chip strong>{s}</Chip>
              {i < funnelSteps.length - 1 && <ArrowRight className="h-4 w-4 text-cyan" aria-hidden />}
            </m.li>
          ))}
        </ol>
        <p className="mt-4 text-sm text-slate">
          Every step is recorded, so you can see which source produced a qualified lead.
        </p>
      </div>
    </div>
  );
}
