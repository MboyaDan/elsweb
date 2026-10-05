"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Logo } from "./Logo";
import { Button } from "./Button";
import { navAnchors, navRoutes } from "../lib/routes";

export function SiteNav({ ctaHref }: { ctaHref?: string }) {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  const links = [...navRoutes, ...navAnchors];
  return (
    <header
      className={`sticky top-0 z-40 transition-colors duration-300 ${
        scrolled ? "border-b border-white/10 bg-navy/95 backdrop-blur" : "border-b border-transparent bg-navy"
      }`}
    >
      <nav aria-label="Primary" className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-6">
        <Link href="/" aria-label="EasyLiving Software Solutions, home" className="shrink-0">
          <Logo />
        </Link>
        <div className="flex items-center gap-6">
          <ul className="hidden items-center gap-6 text-sm text-slate-200 md:flex">
            {links.map((r) => (
              <li key={r.href}>
                <Link href={r.href} className="hover:text-white">
                  {r.label}
                </Link>
              </li>
            ))}
          </ul>
          {ctaHref && (
            <Button href={ctaHref} ctaId="nav-cta" className="!min-h-10 whitespace-nowrap !px-4 !py-2 text-sm">
              Start a conversation
            </Button>
          )}
        </div>
      </nav>
    </header>
  );
}
