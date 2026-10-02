import { buildMetadata } from "../../lib/seo";
import { siteConfig } from "../../content/site.config";
import { PageHero } from "../../components/PageHero";
import { ContactForm } from "../../components/ContactForm";
import { WhatsAppButton } from "../../components/WhatsAppButton";

export const metadata = buildMetadata({
  title: "Contact",
  description:
    "Tell EasyLiving Software Solutions what you are trying to build, fix or measure. Based in Nairobi, delivering to clients in Kenya and internationally.",
  path: "/contact",
});

export default function ContactPage() {
  return (
    <>
      <PageHero
        crumbs={[
          { name: "Home", path: "/" },
          { name: "Contact", path: "/contact" },
        ]}
        overline="CONTACT"
        title="Tell us the problem you need solved."
      >
        {siteConfig.delivery}
      </PageHero>
      <section className="bg-offwhite">
        <div className="mx-auto grid max-w-6xl gap-12 px-6 py-16 md:grid-cols-[1fr_1.4fr] md:py-24">
          <div className="space-y-6">
            <p>Fill in the form and we will reply by email or WhatsApp. If you prefer, write to us directly.</p>
            {siteConfig.email && (
              <p>
                Email:{" "}
                <a className="text-electric underline" href={`mailto:${siteConfig.email}`}>
                  {siteConfig.email}
                </a>
              </p>
            )}
            <WhatsAppButton topic="working with ELS" refCode="ct-web" />
          </div>
          <ContactForm contactEmail={siteConfig.email} />
        </div>
      </section>
    </>
  );
}
