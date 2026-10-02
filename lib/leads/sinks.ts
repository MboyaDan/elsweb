import { appendFile, mkdir } from "node:fs/promises";
import { join } from "node:path";
import { Resend } from "resend";
import { escapeHtml } from "./sanitize";
import type { Lead, LeadSink } from "./types";

const label = (t: Lead["type"]) => (t === "audit" ? "growth audit request" : "contact enquiry");

function bodyText(l: Lead) {
  const rows = Object.entries(l.data).map(([k, v]) => `${k}: ${String(v)}`);
  const attr = Object.entries(l.attribution)
    .filter(([, v]) => v)
    .map(([k, v]) => `${k}: ${v}`);
  return [`Lead ${l.id} (${label(l.type)}) received ${l.receivedAt}`, "", ...rows, "", "Attribution", ...attr].join("\n");
}

export const resendSink: LeadSink = {
  name: "resend",
  enabled: () => Boolean(process.env.RESEND_API_KEY && process.env.RESEND_FROM && process.env.LEAD_NOTIFY_TO),
  async send(lead) {
    const resend = new Resend(process.env.RESEND_API_KEY);
    const from = process.env.RESEND_FROM as string;
    const to = process.env.LEAD_NOTIFY_TO as string;
    const text = bodyText(lead);
    const owner = await resend.emails.send({
      from,
      to,
      replyTo: lead.email,
      subject: `New ${label(lead.type)}: ${lead.name}`.slice(0, 200),
      text,
      html: `<pre style="font-family:ui-monospace,monospace;white-space:pre-wrap">${escapeHtml(text)}</pre>`,
    });
    if (owner.error) throw new Error(`Resend owner email failed: ${owner.error.message}`);

    // Acknowledgement to the submitter. A failure here must not fail the lead: the owner already has it.
    const ack = await resend.emails.send({
      from,
      to: lead.email,
      replyTo: to,
      subject: "We received your request",
      text: [
        `Hi ${lead.name},`,
        "",
        `Thanks for getting in touch with EasyLiving Software Solutions. We received your ${label(lead.type)} and will reply by email or WhatsApp.`,
        "",
        "If you did not send this, or you do not want to hear from us, reply with STOP and we will delete your details.",
      ].join("\n"),
    });
    if (ack.error) {
      console.error(JSON.stringify({ event: "lead_ack_failed", leadId: lead.id, error: ack.error.message }));
    }
  },
};

export const sheetsSink: LeadSink = {
  name: "sheets-webhook",
  enabled: () => Boolean(process.env.SHEETS_WEBHOOK_URL),
  async send(lead) {
    const res = await fetch(process.env.SHEETS_WEBHOOK_URL as string, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(lead),
      redirect: "follow",
    });
    if (!res.ok) throw new Error(`Sheets webhook responded ${res.status}`);
  },
};

/** Development only: console plus .data/leads.ndjson. Never enabled in production. */
export const devSink: LeadSink = {
  name: "dev-file",
  enabled: () => process.env.NODE_ENV !== "production",
  async send(lead) {
    console.log("[lead:dev]", JSON.stringify(lead));
    const dir = join(process.cwd(), ".data");
    await mkdir(dir, { recursive: true });
    await appendFile(join(dir, "leads.ndjson"), JSON.stringify(lead) + "\n");
  },
};

export const allSinks: LeadSink[] = [resendSink, sheetsSink, devSink];
