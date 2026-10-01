import Link from "next/link";
import type { ReactNode } from "react";

type Variant = "primary" | "ghost-dark" | "ghost-light";
const styles: Record<Variant, string> = {
  primary: "bg-electric text-white hover:bg-blue-700",
  "ghost-dark": "text-white hover:text-cyan",
  "ghost-light": "text-navy hover:text-electric",
};

export function Button({
  href,
  children,
  variant = "primary",
  external = false,
  ctaId,
  className = "",
}: {
  href: string;
  children: ReactNode;
  variant?: Variant;
  external?: boolean;
  ctaId?: string;
  className?: string;
}) {
  const cls = `inline-flex min-h-12 items-center justify-center gap-2 rounded-md px-6 py-3 text-base font-medium transition-colors ${styles[variant]} ${className}`;
  const isInternal = href.startsWith("/") && !href.startsWith("/#");
  if (isInternal) {
    return (
      <Link href={href} className={cls} data-cta-id={ctaId}>
        {children}
      </Link>
    );
  }
  return (
    <a
      href={href}
      className={cls}
      data-cta-id={ctaId}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
    >
      {children}
    </a>
  );
}
