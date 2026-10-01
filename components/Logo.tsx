import Image from "next/image";
import { siteConfig } from "../content/site.config";

/**
 * Mark C, processed from the supplied artwork into transparent PNGs:
 * /public/brand/mark-dark.png (for light surfaces) and mark-light.png (white, for dark surfaces).
 * To swap the logo, replace those two files (keep them square-ish) or edit this component.
 */
export function Logo({ tone = "light" }: { tone?: "light" | "dark" }) {
  return (
    <span className="inline-flex items-center gap-3">
      <Image
        src={tone === "light" ? "/brand/mark-light.png" : "/brand/mark-dark.png"}
        alt=""
        width={36}
        height={36}
        priority
      />
      <span className={`text-lg font-semibold tracking-tight ${tone === "light" ? "text-white" : "text-navy"}`}>
        {siteConfig.shortName}
        <span className="ml-2 font-normal opacity-70">EasyLiving Software</span>
      </span>
    </span>
  );
}
