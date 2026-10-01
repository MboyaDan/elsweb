import { siteConfig } from "../content/site.config";

/**
 * LOGO SWAP POINT.
 * Mark C has not been supplied, so this renders a plain text wordmark.
 * To use the real mark: save it as /public/brand/mark-c.svg and replace the body below with
 * <Image src="/brand/mark-c.svg" alt={siteConfig.name} width={..} height={..} priority />.
 */
export function Logo({ tone = "light" }: { tone?: "light" | "dark" }) {
  return (
    <span
      className={`text-lg font-semibold tracking-tight ${tone === "light" ? "text-white" : "text-navy"}`}
    >
      {siteConfig.shortName}
      <span className="ml-2 font-normal opacity-70">EasyLiving Software</span>
    </span>
  );
}
