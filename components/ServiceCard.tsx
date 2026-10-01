import Link from "next/link";
import { ArrowRight, Bot, Cloud, Code, Database, Smartphone, TrendingUp, type LucideIcon } from "lucide-react";
import type { Service } from "../content/services";
import { isLive } from "../lib/routes";

const icons: Record<string, LucideIcon> = {
  "software-engineering": Code,
  mobile: Smartphone,
  "data-engineering": Database,
  "ai-ml": Bot,
  "cloud-devops": Cloud,
  growth: TrendingUp,
};

export function ServiceCard({ service }: { service: Service }) {
  const Icon = icons[service.slug] ?? Code;
  const href = isLive(service.href) ? service.href : undefined;
  return (
    <li className="border-b border-r border-slate/20 p-8">
      <Icon className="h-6 w-6 text-electric" aria-hidden />
      <h3 className="mt-6 text-xl font-semibold">{service.title}</h3>
      <p className="mt-3 text-slate">{service.summary}</p>
      {href && (
        <Link href={href} className="mt-5 inline-flex items-center gap-1 font-medium text-electric hover:underline">
          Learn more <ArrowRight className="h-4 w-4" aria-hidden />
        </Link>
      )}
    </li>
  );
}
