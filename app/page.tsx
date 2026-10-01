import { buildMetadata } from "../lib/seo";
import { siteConfig } from "../content/site.config";
import { services } from "../content/services";
import { growthLayers, growthPositioning } from "../content/growth.config";
import { Hero } from "../components/Hero";
import { SectionHeading } from "../components/SectionHeading";
import { ServiceCard } from "../components/ServiceCard";
import { GrowthFunnel } from "../components/GrowthFunnel";
import { TechnicalDiagram } from "../components/TechnicalDiagram";
import { CTASection } from "../components/CTASection";
import { Button } from "../components/Button";
import { ArrowUpRight } from "lucide-react";

export const metadata = buildMetadata({
  title: `${siteConfig.name}: engineering, data, AI and growth`,
  description: siteConfig.description,
  path: "/",
});

const { mezani, siteledger } = siteConfig.products;

export default function Home() {
  return (
    <>
      <Hero />

      <section id="capabilities" className="scroll-mt-16 bg-offwhite">
        <div className="mx-auto max-w-6xl px-6 py-20 md:py-28">
          <SectionHeading overline="WHAT WE BUILD" title="Six areas, one connected system.">
            {siteConfig.message}
          </SectionHeading>
          <ul className="mt-14 grid border-l border-t border-slate/20 md:grid-cols-2 lg:grid-cols-3">
            {services.map((s) => (
              <ServiceCard key={s.slug} service={s} />
            ))}
          </ul>
        </div>
      </section>

      <section id="growth" className="scroll-mt-16 bg-navy">
        <div className="mx-auto max-w-6xl px-6 py-20 md:py-28">
          <SectionHeading overline="GROWTH & CUSTOMER ACQUISITION" title="From first search to signed job." tone="dark">
            {growthPositioning}
          </SectionHeading>
          <ul className="mt-8 flex flex-wrap gap-2" aria-label="The six growth layers">
            {growthLayers.map((l) => (
              <li key={l.id} className="rounded-full border border-white/15 px-3 py-1 text-sm text-slate-200">
                {l.name}
              </li>
            ))}
          </ul>
          <div className="mt-14">
            <GrowthFunnel />
          </div>
        </div>
      </section>

      <section className="bg-offwhite">
        <div className="mx-auto max-w-6xl px-6 py-20 md:py-28">
          <SectionHeading overline="MARKETING + ENGINEERING" title="An ad and a form is a start. We build the whole chain.">
            Marketing decides who arrives. Engineering decides what happens next. We do both, so nothing gets lost
            between the two.
          </SectionHeading>
          <div className="mt-12">
            <TechnicalDiagram />
          </div>
        </div>
      </section>

      <section id="work" className="scroll-mt-16 border-t border-slate/15 bg-white">
        <div className="mx-auto max-w-6xl px-6 py-20 md:py-28">
          <SectionHeading overline="SELECTED WORK" title="Products we build and run." />
          <div className="mt-12 grid gap-6 md:grid-cols-2">
            <article className="flex flex-col border border-slate/20 p-8">
              <p className="w-fit rounded bg-emerald/10 px-2 py-1 text-xs font-medium text-emerald-800">Live</p>
              <h3 className="mt-4 text-2xl font-semibold">{mezani.name}</h3>
              <p className="mt-3 text-slate">{mezani.summary} It is live in its first Nairobi restaurant.</p>
              <ul className="mt-5 list-disc space-y-1 pl-5 text-slate">
                <li>QR-code table ordering, no app needed</li>
                <li>Real-time kitchen display</li>
                <li>Staff and sales dashboard</li>
                <li>AI assistant that answers from live branch data</li>
              </ul>
              <div className="mt-8">
                <Button href={mezani.url!} variant="ghost-light" external className="!px-0">
                  Visit {mezani.name} <ArrowUpRight className="h-4 w-4" aria-hidden />
                  <span className="sr-only"> (opens in a new tab)</span>
                </Button>
              </div>
            </article>
            <article className="flex flex-col border border-slate/20 p-8">
              <p className="w-fit rounded bg-slate/10 px-2 py-1 text-xs font-medium text-slate">In development</p>
              <h3 className="mt-4 text-2xl font-semibold">{siteledger.name}</h3>
              <p className="mt-3 text-slate">{siteledger.summary} Not yet launched.</p>
            </article>
          </div>
        </div>
      </section>

      <CTASection />
    </>
  );
}
