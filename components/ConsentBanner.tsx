"use client";

import Link from "next/link";
import { useSyncExternalStore } from "react";
import { consentServerSnapshot, consentSnapshot, setConsent, subscribeConsent } from "../lib/consent";
import { isLive } from "../lib/routes";

export function ConsentBanner({ enabled }: { enabled: boolean }) {
  const consent = useSyncExternalStore(subscribeConsent, consentSnapshot, consentServerSnapshot);
  if (!enabled || consent !== "unset") return null;
  const btn = "inline-flex min-h-11 items-center justify-center rounded-md border px-5 py-2 text-sm font-medium";
  return (
    <section
      aria-label="Analytics consent"
      className="fixed inset-x-0 bottom-0 z-50 border-t border-white/10 bg-navy p-4 text-slate-200 shadow-lg"
    >
      <div className="mx-auto flex max-w-6xl flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm">
          We use Google Analytics to see which pages are useful. It only loads if you accept.
          {isLive("/privacy") && (
            <>
              {" "}
              <Link href="/privacy" className="underline">
                Privacy notice
              </Link>
              .
            </>
          )}
        </p>
        <div className="flex gap-3">
          <button type="button" onClick={() => setConsent("denied")} className={`${btn} border-white/40 text-white hover:bg-white/10`}>
            Decline
          </button>
          <button type="button" onClick={() => setConsent("granted")} className={`${btn} border-electric bg-electric text-white hover:bg-blue-700`}>
            Accept
          </button>
        </div>
      </div>
    </section>
  );
}
