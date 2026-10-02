"use client";

import { setConsent } from "../lib/consent";

export function ConsentReset() {
  return (
    <button type="button" onClick={() => setConsent(null)} className="text-electric underline">
      Change your analytics choice
    </button>
  );
}
