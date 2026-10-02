import { buildMetadata, absoluteUrl } from "../../../lib/seo";
import { siteConfig } from "../../../content/site.config";
import { construction as c } from "../../../content/construction";
import { PageHero } from "../../../components/PageHero";
import { SectionHeading } from "../../../components/SectionHeading";
import { FAQ } from "../../../components/FAQ";
import { CTASection } from "../../../components/CTASection";
import { JsonLd } from "../../../components/JsonLd";
import { WhatsAppButton } from "../../../components/WhatsAppButton";

export const metadata = buildMetadata({
  title: "Growth for contractors, builders and developers",
  description:
    "Customer acquisition for small and mid-sized contractors, builders and developers in Kenya: search presence, WhatsApp qualification, tracking and follow-up.",
  path: "/growth/construction",
});

const serviceLd = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Growth for contractors, builders and developers",
  serviceType: "Customer acquisition for construction businesses",
  description: c.audience,
  url: absoluteUrl("/growth/construction"),
  provider: { "@type": "Organization", name: siteConfig.name, url: siteConfig.url },
  areaServed: { "@type": "Country", name: "Kenya" },
};

function Checklist({ items }: { items: string[] }) {
  return (
    <ul className="space-y-3">
      {items.map((x) => (
        <li key={x} className="flex gap-3">
          <span aria-hidden className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-cyan" />
          {x}
        </li>
      ))}
    </ul>
  );
}

export default function ConstructionGrowthPage() {
  return (
    <>
      <PageHero
        crumbs={[
          { name: "Home", path: "/" },
          { name: "Growth", path: "/services/growth" },
          { name: "Construction", path: "/growth/construction" },
        ]}
        overline="GROWTH FOR CONSTRUCTION"
        title="Make it easy for serious clients to find you and reach you."
        cta={{ href: "/growth-audit", label: "Request a growth audit", id: "construction-hero" }}
      >
        {c.audience}
      </PageHero>

      <section className="bg-offwhite">
        <div className="mx-auto max-w-6xl px-6 py-20 md:py-24">
          <SectionHeading overline="HOW CLIENTS LOOK" title="How people usually find a contractor." />
          <p className="mt-6 max-w-3xl text-lg">{c.discovery}</p>
        </div>
      </section>

      <section className="bg-white">
        <div className="mx-auto grid max-w-6xl gap-12 px-6 py-20 md:grid-cols-2 md:py-24">
          <div>
            <h2 className="text-2xl font-semibold md:text-3xl">{c.setup.title}</h2>
            <div className="mt-6">
              <Checklist items={c.setup.items} />
            </div>
          </div>
          <div>
            <h2 className="text-2xl font-semibold md:text-3xl">The WhatsApp qualification flow</h2>
            <p className="mt-4">Five questions, asked in order, so your team knows what each enquiry needs.</p>
            <ol className="mt-6 divide-y divide-slate/20 border-y border-slate/20">
              {c.questions.map((q, i) => (
                <li key={q} className="flex gap-4 py-4">
                  <span className="font-mono text-sm text-electric">{String(i + 1).padStart(2, "0")}</span>
                  <span className="text-navy">{q}</span>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      <section className="bg-navy">
        <div className="mx-auto grid max-w-6xl gap-12 px-6 py-20 md:grid-cols-2 md:py-24">
          <div className="text-slate-300">
            <h2 className="text-2xl font-semibold !text-white md:text-3xl">{c.measures.title}</h2>
            <ul className="mt-6 space-y-3">
              {c.measures.items.map((x) => (
                <li key={x} className="flex gap-3">
                  <span aria-hidden className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-cyan" />
                  {x}
                </li>
              ))}
            </ul>
          </div>
          <div className="text-slate-300">
            <h2 className="text-2xl font-semibold !text-white md:text-3xl">{c.clientProvides.title}</h2>
            <ul className="mt-6 space-y-3">
              {c.clientProvides.items.map((x) => (
                <li key={x} className="flex gap-3">
                  <span aria-hidden className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-cyan" />
                  {x}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="bg-offwhite">
        <div className="mx-auto max-w-4xl px-6 py-20 md:py-24">
          <SectionHeading overline="FAQ" title="Common questions." />
          <div className="mt-10">
            <FAQ items={c.faq} />
          </div>
        </div>
      </section>

      <div className="bg-offwhite pb-16">
        <div className="mx-auto max-w-6xl px-6">
          <WhatsAppButton topic="construction growth" refCode="gc-web" />
        </div>
      </div>
      <CTASection variant="growth" />
      <JsonLd data={serviceLd} />
    </>
  );
}
