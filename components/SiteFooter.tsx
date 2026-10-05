import Link from "next/link";
import { Logo } from "./Logo";
import { WhatsAppButton } from "./WhatsAppButton";
import { siteConfig } from "../content/site.config";
import { legalRoutes, navAnchors, navRoutes } from "../lib/routes";

export function SiteFooter() {
  return (
    <footer className="bg-navy text-slate-300">
      <div className="mx-auto grid max-w-6xl gap-8 px-6 py-12 md:grid-cols-[2fr_1fr]">
        <div className="space-y-3">
          <Logo variant="full" className="h-14" />
          <p className="max-w-md text-sm">{siteConfig.tagline}</p>
          <p className="text-sm">{siteConfig.delivery}</p>
        </div>
        <ul className="space-y-2 text-sm">
          {[...navRoutes, ...navAnchors].map((r) => (
            <li key={r.href}>
              <Link href={r.href} className="hover:text-white">
                {r.label}
              </Link>
            </li>
          ))}
          <li>
            <WhatsAppButton topic="working with ELS" refCode="ft-web" variant="link-dark" label="WhatsApp" />
          </li>
          {siteConfig.email && (
            <li>
              <a href={`mailto:${siteConfig.email}`} className="hover:text-white">
                {siteConfig.email}
              </a>
            </li>
          )}
        </ul>
      </div>
      <div className="flex flex-col items-center justify-between gap-2 border-t border-white/10 px-6 py-4 text-xs sm:flex-row">
        <span>
          © {new Date().getFullYear()} {siteConfig.name}
        </span>
        <ul className="flex gap-4">
          {legalRoutes.map((r) => (
            <li key={r.href}>
              <Link href={r.href} className="hover:text-white">
                {r.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </footer>
  );
}
