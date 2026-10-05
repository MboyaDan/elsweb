import Image from "next/image";

/**
 * Brand logo, from the supplied SVG set (files live in /public/brand/).
 * - "nav": mark + ELS wordmark. Compact, used in the header.
 * - "full": mark + ELS + "EasyLiving Software Solutions" tagline. Used where it is large enough to read (footer).
 * tone="light" is for dark backgrounds (reversed artwork); tone="dark" is for light backgrounds.
 * The company name is part of the artwork, so it is not repeated as text beside it.
 */
const files = {
  nav: { light: "/brand/logo-nav-reversed.svg", dark: "/brand/logo-nav-light.svg", w: 458, h: 208 },
  full: { light: "/brand/logo-full-reversed.svg", dark: "/brand/logo-full-light.svg", w: 668, h: 208 },
} as const;

export function Logo({
  tone = "light",
  variant = "nav",
  className = "h-10",
}: {
  tone?: "light" | "dark";
  variant?: "nav" | "full";
  className?: string;
}) {
  const f = files[variant];
  return (
    <Image
      src={tone === "light" ? f.light : f.dark}
      alt="EasyLiving Software Solutions (ELS)"
      width={f.w}
      height={f.h}
      priority={variant === "nav"}
      unoptimized
      className={`w-auto ${className}`}
    />
  );
}
