import { buildMetadata, absoluteUrl } from "../../../lib/seo";
import { siteConfig } from "../../../content/site.config";
import { growthFaq, growthPositioning } from "../../../content/growth.config";
import { PageHero } from "../../../components/PageHero";
import { SectionHeading } from "../../../components/SectionHeading";
import { PackageList } from "../../../components/PackageList";
import { LayerGrid } from "../../../components/LayerGrid";
import { GrowthFunnel } from "../../../components/GrowthFunnel";
import { TechnicalDiagram } from "../../../components/TechnicalDiagram";
import { FAQ } from "../../../components/FAQ";
import { CTASection } from "../../../components/CTASection";
import { JsonLd } from "../../../components/JsonLd";

export const metadata = buildMetadata({
  title: "Growth and customer acquisition",
  description:
    "Generate, capture, qualify and convert digital demand, with the technical infrastructure behind it. Packages from a short growth audit to custom builds.",
  path: "/services/growth",
});

const serviceLd = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Growth and customer acquisition",
  serviceType: "Digital growth and lead-generation systems",
  description: growthPositioning,
  url: absoluteUrl("/services/growth"),
  provider: { "@type": "Organization", name: siteConfig.name, url: siteConfig.url },
  areaServed: { "@type": "Country", name: "Kenya" },
};

export default function GrowthServicePage() {
  return (
    <>
      <PageHero
        crumbs={[
          { name: "Home", path: "/" },
          { name: "Services", path: "/services" },
          { name: "Growth", path: "/services/growth" },
        ]}
        overline="GROWTH & CUSTOMER ACQUISITION"
        title="Turn digital demand into enquiries you can act on."
        cta={{ href: "/growth-audit", label: "Request a growth audit", id: "growth-hero" }}
      >
        {growthPositioning}
      </PageHero>

      <section className="bg-offwhite">
        <div className="mx-auto max-w-6xl px-6 py-20 md:py-24">
          <SectionHeading overline="PACKAGES" title="Start small, add what you need.">
            Each package builds on the one before it. Custom builds are scoped per project.
          </SectionHeading>
          <div className="mt-12">
            <PackageList />
          </div>
        </div>
      </section>

      <section className="bg-white">
        <div className="mx-auto max-w-6xl px-6 py-20 md:py-24">
          <SectionHeading overline="SIX LAYERS" title="What the work covers.">
            Marketing and engineering sit in the same plan, so an enquiry is tracked from first click to quote.
          </SectionHeading>
          <div className="mt-12">
            <LayerGrid />
          </div>
        </div>
      </section>

      <section className="bg-navy">
        <div className="mx-auto max-w-6xl px-6 py-20 md:py-24">
          <SectionHeading overline="THE CHAIN" title="One path from search to quote." tone="dark" />
          <div className="mt-12">
            <GrowthFunnel />
          </div>
        </div>
      </section>

      <section className="bg-offwhite">
        <div className="mx-auto max-w-6xl px-6 py-20 md:py-24">
          <SectionHeading overline="COMPARED" title="An ad and a form, or the whole chain." />
          <div className="mt-12">
            <TechnicalDiagram />
          </div>
        </div>
      </section>

      <section className="bg-white">
        <div className="mx-auto max-w-4xl px-6 py-20 md:py-24">
          <SectionHeading overline="FAQ" title="Questions we get asked." />
          <div className="mt-10">
            <FAQ items={growthFaq} />
          </div>
        </div>
      </section>

      <CTASection variant="growth" />
      <JsonLd data={serviceLd} />
    </>
  );
}
