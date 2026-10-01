import { buildMetadata } from "../../lib/seo";
import { siteConfig } from "../../content/site.config";
import { growthPackages } from "../../content/growth.config";
import { PageHero } from "../../components/PageHero";
import { AuditForm } from "../../components/AuditForm";

export const metadata = buildMetadata({
  title: "Request a growth audit",
  description:
    "A short review of how your business shows up when customers search, with the top fixes and how long each one takes.",
  path: "/growth-audit",
});

export default function GrowthAuditPage() {
  const audit = growthPackages[0];
  return (
    <>
      <PageHero
        crumbs={[
          { name: "Home", path: "/" },
          { name: "Growth audit", path: "/growth-audit" },
        ]}
        overline="GROWTH AUDIT"
        title="See how your business shows up when customers search."
      >
        {audit.summary}
      </PageHero>
      <section className="bg-offwhite">
        <div className="mx-auto grid max-w-6xl gap-12 px-6 py-16 md:grid-cols-[1fr_1.2fr] md:py-24">
          <div>
            <h2 className="text-2xl font-semibold">What you get</h2>
            <ul className="mt-5 space-y-3">
              {audit.includes.map((x) => (
                <li key={x} className="flex gap-3">
                  <span aria-hidden className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-cyan" />
                  {x}
                </li>
              ))}
            </ul>
            <p className="mt-8">
              The audit tells you what to fix first and what each fix involves. It does not promise results.
            </p>
            {siteConfig.email && (
              <p className="mt-6">
                Prefer email? Write to{" "}
                <a className="text-electric underline" href={`mailto:${siteConfig.email}`}>
                  {siteConfig.email}
                </a>
                .
              </p>
            )}
          </div>
          <AuditForm contactEmail={siteConfig.email} />
        </div>
      </section>
    </>
  );
}
