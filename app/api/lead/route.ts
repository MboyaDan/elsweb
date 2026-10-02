import { NextResponse } from "next/server";
import { attributionSchema, auditSchema, contactSchema, envelopeSchema } from "../../../lib/validation";
import { cleanLine, cleanRecord, cleanText } from "../../../lib/leads/sanitize";
import { dispatchLead, fallbackMessage } from "../../../lib/leads/dispatch";
import { rateLimited, turnstileOk } from "../../../lib/leads/protect";
import type { Lead } from "../../../lib/leads/types";

export const runtime = "nodejs";

const MIN_FILL_MS = 3000;
const bad = (message: string, status = 400) => NextResponse.json({ ok: false, message }, { status });

export async function POST(req: Request) {
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || req.headers.get("x-real-ip") || "unknown";
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return bad("Invalid request.");
  }

  const env = envelopeSchema.safeParse(body);
  if (!env.success) return bad("Invalid request.");

  // Bots: honeypot filled or form submitted implausibly fast. Pretend success, store nothing.
  if (env.data.company_website || env.data.elapsedMs < MIN_FILL_MS) {
    console.warn(JSON.stringify({ event: "lead_rejected_bot", ip, reason: env.data.company_website ? "honeypot" : "too_fast" }));
    return NextResponse.json({ ok: true });
  }

  if (await rateLimited(ip)) return bad("Too many submissions. Please try again later.", 429);
  if (!(await turnstileOk(env.data.turnstileToken, ip))) return bad("Verification failed. Please reload the page and try again.", 400);

  const parsed = env.data.type === "audit" ? auditSchema.safeParse(body) : contactSchema.safeParse(body);
  if (!parsed.success) return bad("Some fields are missing or invalid.", 422);

  const { consent: _consent, ...fields } = parsed.data as Record<string, string | boolean>;
  void _consent;
  const attribution = attributionSchema.safeParse(env.data.attribution ?? {});
  const data = cleanRecord({ ...fields, consent: true });
  const lead: Lead = {
    id: crypto.randomUUID().slice(0, 8),
    receivedAt: new Date().toISOString(),
    type: env.data.type,
    name: cleanLine(String(env.data.type === "audit" ? fields.businessName : fields.name), 120),
    email: cleanText(String(fields.email), 200),
    data,
    attribution: attribution.success
      ? (Object.fromEntries(Object.entries(attribution.data).map(([k, v]) => [k, v ? cleanLine(v, 500) : v])) as Lead["attribution"])
      : {},
  };

  const result = await dispatchLead(lead);
  if (!result.ok) return bad(fallbackMessage(), 503);
  return NextResponse.json({ ok: true });
}
