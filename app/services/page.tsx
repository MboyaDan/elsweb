import { buildMetadata } from "../../lib/seo";
import { services } from "../../content/services";
import { siteConfig } from "../../content/site.config";
import { PageHero } from "../../components/PageHero";
import { ServiceCard } from "../../components/ServiceCard";
import { CTASection } from "../../components/CTASection";
import { startConversationHref } from "../../lib/cta";

export const metadata = buildMetadata({
  title: "Services",
  description:
    "Software engineering, mobile, data engineering, AI and machine learning, cloud and DevOps, and growth systems from EasyLiving Software Solutions in Nairobi.",
  path: "/services",
});

export default function ServicesPage() {
  const href = startConversationHref();
  return (
    <>
      <PageHero
        crumbs={[
          { name: "Home", path: "/" },
          { name: "Services", path: "/services" },
        ]}
        overline={siteConfig.narrative.join(" → ").toUpperCase()}
        title="Engineering, data, AI and growth systems."
        cta={href ? { href, label: "Start a conversation", id: "services-hero" } : undefined}
      >
        {siteConfig.message}
      </PageHero>
      <section className="bg-offwhite">
        <div className="mx-auto max-w-6xl px-6 py-16 md:py-24">
          <ul className="grid border-l border-t border-slate/20 md:grid-cols-2 lg:grid-cols-3">
            {services.map((s) => (
              <ServiceCard key={s.slug} service={s} />
            ))}
          </ul>
        </div>
      </section>
      <CTASection />
    </>
  );
}
