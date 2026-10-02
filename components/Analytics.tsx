"use client";

import Script from "next/script";
import { useEffect, useSyncExternalStore } from "react";
import { usePathname } from "next/navigation";
import { track } from "../lib/analytics";
import { consentServerSnapshot, consentSnapshot, subscribeConsent } from "../lib/consent";

/** Loads GA4 only after the visitor accepts. Also reports page views and CTA clicks. */
export function Analytics({ ga4Id }: { ga4Id?: string }) {
  const consent = useSyncExternalStore(subscribeConsent, consentSnapshot, consentServerSnapshot);
  const pathname = usePathname();
  const active = Boolean(ga4Id) && consent === "granted";

  useEffect(() => {
    if (!active || !ga4Id || window.gtag) return;
    window.dataLayer = window.dataLayer || [];
    window.gtag = function () {
      // eslint-disable-next-line prefer-rest-params
      window.dataLayer!.push(arguments);
    };
    window.gtag("js", new Date());
    window.gtag("config", ga4Id, { send_page_view: false });
  }, [active, ga4Id]);

  useEffect(() => {
    if (active) track("page_view", { page_path: pathname });
  }, [active, pathname]);

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const el = (e.target as Element | null)?.closest("[data-cta-id]");
      const id = el?.getAttribute("data-cta-id");
      if (id) track("cta_click", { cta_id: id });
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  if (!active) return null;
  return <Script src={`https://www.googletagmanager.com/gtag/js?id=${ga4Id}`} strategy="afterInteractive" />;
}
