/**
 * Routes that exist. Navigation, footer and sitemap read from here so nothing links to a missing page.
 * Add a route here in the same commit that adds the page.
 */
export const liveRoutes = ["/"] as const;

export function isLive(path: string | undefined): path is string {
  return Boolean(path) && (liveRoutes as readonly string[]).includes(path as string);
}

/** Page routes shown in nav and footer. Empty until Stage 3 adds /services. */
export const navRoutes: { href: string; label: string }[] = [];

/** In-page anchors on the homepage. Each id exists in app/page.tsx. */
export const navAnchors = [
  { href: "/#capabilities", label: "Capabilities" },
  { href: "/#growth", label: "Growth" },
  { href: "/#work", label: "Work" },
] as const;
