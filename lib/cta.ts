import { siteConfig } from "../content/site.config";
import { isLive } from "./routes";

/**
 * Target for "Start a conversation". Uses /contact once that route is live (Stage 4),
 * otherwise a mailto link. Returns undefined if neither exists, and callers then render no CTA.
 */
export function startConversationHref(): string | undefined {
  if (isLive("/contact")) return "/contact";
  if (siteConfig.email) {
    return `mailto:${siteConfig.email}?subject=${encodeURIComponent("Enquiry from the ELS website")}`;
  }
  return undefined;
}
