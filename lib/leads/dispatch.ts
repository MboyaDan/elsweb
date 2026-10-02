import { siteConfig } from "../../content/site.config";
import { allSinks } from "./sinks";
import type { Lead } from "./types";

export function fallbackMessage() {
  const parts: string[] = [];
  if (siteConfig.email) parts.push(`email ${siteConfig.email}`);
  if (siteConfig.whatsappNumber) parts.push(`message us on WhatsApp (+${siteConfig.whatsappNumber})`);
  return parts.length
    ? `We can't take online submissions right now. Please ${parts.join(" or ")} instead.`
    : "We can't take online submissions right now. Please try again later.";
}

/** Sends to every enabled sink. Succeeds if at least one does. Every failure is logged with the full lead. */
export async function dispatchLead(lead: Lead): Promise<{ ok: boolean; reason?: "no_sink" | "all_failed" }> {
  const sinks = allSinks.filter((s) => s.enabled());
  if (sinks.length === 0) {
    console.error(JSON.stringify({ event: "lead_no_sink_configured", lead }));
    return { ok: false, reason: "no_sink" };
  }
  const results = await Promise.allSettled(sinks.map((s) => s.send(lead)));
  let delivered = 0;
  results.forEach((r, i) => {
    if (r.status === "fulfilled") delivered++;
    else {
      console.error(
        JSON.stringify({
          event: "lead_sink_failed",
          sink: sinks[i].name,
          error: r.reason instanceof Error ? r.reason.message : String(r.reason),
          lead,
        }),
      );
    }
  });
  return delivered > 0 ? { ok: true } : { ok: false, reason: "all_failed" };
}
