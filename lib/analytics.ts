export type AnalyticsEvent =
  | "page_view"
  | "cta_click"
  | "contact_started"
  | "contact_submitted"
  | "audit_requested"
  | "whatsapp_click";

export const CONSENT_KEY = "els_analytics_consent";
export type Consent = "granted" | "denied" | null;

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    dataLayer?: unknown[];
  }
}

export function getConsent(): Consent {
  if (typeof window === "undefined") return null;
  try {
    const v = window.localStorage.getItem(CONSENT_KEY);
    return v === "granted" || v === "denied" ? v : null;
  } catch {
    return null;
  }
}

/** Sends an event to GA4 only after the visitor has granted consent and GA4 has loaded. */
export function track(event: AnalyticsEvent, params: Record<string, string | number | boolean> = {}) {
  if (typeof window === "undefined") return;
  if (getConsent() !== "granted" || !window.gtag) return;
  window.gtag("event", event, params);
}
