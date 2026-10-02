import { siteConfig } from "../content/site.config";
import { WhatsAppLink, type WhatsAppVariant } from "./WhatsAppLink";

/** Renders nothing if NEXT_PUBLIC_WHATSAPP_NUMBER is unset. */
export function WhatsAppButton({
  topic,
  refCode,
  variant,
  label,
}: {
  topic: string;
  refCode: string;
  variant?: WhatsAppVariant;
  label?: string;
}) {
  if (!siteConfig.whatsappNumber) return null;
  const text = `Hi ELS, I'm interested in ${topic} (ref: ${refCode})`;
  const href = `https://wa.me/${siteConfig.whatsappNumber}?text=${encodeURIComponent(text)}`;
  return <WhatsAppLink href={href} refCode={refCode} variant={variant} label={label} />;
}
