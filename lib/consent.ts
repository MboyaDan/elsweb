import { CONSENT_KEY, getConsent } from "./analytics";

const EVT = "els-consent-change";

export function subscribeConsent(cb: () => void) {
  window.addEventListener(EVT, cb);
  window.addEventListener("storage", cb);
  return () => {
    window.removeEventListener(EVT, cb);
    window.removeEventListener("storage", cb);
  };
}
export const consentSnapshot = () => getConsent() ?? "unset";
export const consentServerSnapshot = () => "ssr" as const;

export function setConsent(v: "granted" | "denied" | null) {
  try {
    if (v) window.localStorage.setItem(CONSENT_KEY, v);
    else window.localStorage.removeItem(CONSENT_KEY);
  } catch {}
  window.dispatchEvent(new Event(EVT));
}
