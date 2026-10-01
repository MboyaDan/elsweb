"use client";

import * as m from "motion/react-m";
import { funnelSteps } from "../content/growth.config";

const notes: Record<(typeof funnelSteps)[number], string> = {
  "Google / Meta / SEO": "Where searches and ads reach the business.",
  "Landing page": "A page built around one service and one action.",
  "WhatsApp / form": "Click-to-chat or a quote form, with the source recorded.",
  Qualification: "A few questions that sort serious enquiries from casual ones.",
  "CRM / API": "Each enquiry becomes a record other systems can read.",
  "Follow-up": "Alerts and sequences so no enquiry sits unanswered.",
  "Booking / quote": "The step where an enquiry turns into a job.",
  Dashboard: "Lead source to qualified lead to quote, in one view.",
};

export function GrowthFunnel() {
  return (
    <ol className="relative grid gap-0 border-l border-cyan/40 pl-6 sm:grid-cols-2 sm:gap-x-10 sm:border-l-0 sm:pl-0 lg:grid-cols-4">
      {funnelSteps.map((s, i) => (
        <m.li
          key={s}
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.45, delay: (i % 4) * 0.08 }}
          className="relative pb-8 sm:border-t sm:border-cyan/40 sm:pt-5"
        >
          <span
            aria-hidden
            className="absolute -left-[30px] top-1 h-2.5 w-2.5 rounded-full bg-cyan sm:-top-[5px] sm:left-0"
          />
          <p className="font-mono text-xs text-cyan">{String(i + 1).padStart(2, "0")}</p>
          <h3 className="mt-1 text-lg font-semibold !text-white">{s}</h3>
          <p className="mt-2 text-sm text-slate-300">{notes[s]}</p>
        </m.li>
      ))}
    </ol>
  );
}
