"use client";

import Script from "next/script";
import { useEffect, useRef } from "react";

declare global {
  interface Window {
    turnstile?: { render: (el: HTMLElement, o: { sitekey: string }) => string; remove: (id: string) => void };
  }
}

/** Cloudflare Turnstile widget. Renders nothing unless NEXT_PUBLIC_TURNSTILE_SITE_KEY is set. */
export function TurnstileField() {
  const key = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!key) return;
    let id: string | undefined;
    let tries = 0;
    const t = setInterval(() => {
      if (window.turnstile && ref.current) {
        clearInterval(t);
        id = window.turnstile.render(ref.current, { sitekey: key });
      } else if (++tries > 50) clearInterval(t);
    }, 200);
    return () => {
      clearInterval(t);
      if (id && window.turnstile) window.turnstile.remove(id);
    };
  }, [key]);
  if (!key) return null;
  return (
    <>
      <Script src="https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit" strategy="afterInteractive" />
      <div ref={ref} />
    </>
  );
}
