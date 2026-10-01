/**
 * Routes that exist. Navigation, footer and sitemap read from here so nothing links to a missing page.
 * Add a route here in the same commit that adds the page.
 */
export const liveRoutes = ["/"] as const;

export function isLive(path: string | undefined): path is string {
  return Boolean(path) && (liveRoutes as readonly string[]).includes(path as string);
}

export const navRoutes: { href: string; label: string }[] = [
  // { href: "/services", label: "Services" },  (added in Stage 3)
];
