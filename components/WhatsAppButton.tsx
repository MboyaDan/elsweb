import { siteConfig } from "../content/site.config";
import { WhatsAppLink } from "./WhatsAppLink";

/** Renders nothing if NEXT_PUBLIC_WHATSAPP_NUMBER is unset. */
export function WhatsAppButton({ topic, refCode }: { topic: string; refCode: string }) {
  if (!siteConfig.whatsappNumber) return null;
  const text = `Hi ELS, I'm interested in ${topic} (ref: ${refCode})`;
  const href = `https://wa.me/${siteConfig.whatsappNumber}?text=${encodeURIComponent(text)}`;
  return <WhatsAppLink href={href} refCode={refCode} />;
}
