import Link from "next/link";
import { Logo } from "./Logo";
import { navRoutes } from "../lib/routes";

export function SiteNav() {
  return (
    <header className="bg-navy">
      <nav aria-label="Primary" className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        <Link href="/" aria-label="EasyLiving Software Solutions, home">
          <Logo />
        </Link>
        <ul className="flex items-center gap-6 text-sm text-slate-200">
          {navRoutes.map((r) => (
            <li key={r.href}>
              <Link href={r.href} className="hover:text-white">
                {r.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
