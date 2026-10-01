import { Breadcrumbs } from "./Breadcrumbs";
import { Button } from "./Button";

export function PageHero({
  crumbs,
  overline,
  title,
  children,
  cta,
}: {
  crumbs: { name: string; path: string }[];
  overline: string;
  title: string;
  children: React.ReactNode;
  cta?: { href: string; label: string; id: string };
}) {
  return (
    <section className="bg-navy">
      <div className="mx-auto max-w-6xl px-6 pb-16 pt-8 md:pb-24">
        <div className="text-slate-300">
          <Breadcrumbs items={crumbs} />
        </div>
        <p className="mt-10 font-mono text-xs tracking-widest text-cyan">{overline}</p>
        <h1 className="mt-4 max-w-4xl text-4xl font-semibold leading-[1.05] !text-white md:text-6xl">{title}</h1>
        <p className="mt-6 max-w-2xl text-lg text-slate-300">{children}</p>
        {cta && (
          <div className="mt-8">
            <Button href={cta.href} ctaId={cta.id}>
              {cta.label}
            </Button>
          </div>
        )}
      </div>
    </section>
  );
}
