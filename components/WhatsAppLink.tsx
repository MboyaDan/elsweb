"use client";

import { track } from "../lib/analytics";

export type WhatsAppVariant = "outline" | "outline-dark" | "link-dark";
const styles: Record<WhatsAppVariant, string> = {
  outline:
    "inline-flex min-h-12 items-center justify-center gap-2 rounded-md border border-emerald px-6 py-3 text-base font-medium text-emerald-800 hover:bg-emerald/10",
  "outline-dark":
    "inline-flex min-h-12 items-center justify-center gap-2 rounded-md border border-emerald px-6 py-3 text-base font-medium text-emerald hover:bg-emerald/10",
  "link-dark": "hover:text-white",
};

export function WhatsAppLink({
  href,
  refCode,
  variant = "outline",
  label = "Message us on WhatsApp",
}: {
  href: string;
  refCode: string;
  variant?: WhatsAppVariant;
  label?: string;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      data-cta-id={`whatsapp-${refCode}`}
      onClick={() => track("whatsapp_click", { ref: refCode })}
      className={styles[variant]}
    >
      {label}
      <span className="sr-only"> (opens in a new tab)</span>
    </a>
  );
}
