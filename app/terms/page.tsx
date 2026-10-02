import { buildMetadata } from "../../lib/seo";
import { siteConfig } from "../../content/site.config";
import { PageHero } from "../../components/PageHero";

export const metadata = buildMetadata({
  title: "Terms of use",
  description: "Terms for using the EasyLiving Software Solutions website.",
  path: "/terms",
});

const H = ({ children }: { children: React.ReactNode }) => <h2 className="mt-10 text-2xl font-semibold">{children}</h2>;

export default function TermsPage() {
  return (
    <>
      <PageHero
        crumbs={[
          { name: "Home", path: "/" },
          { name: "Terms of use", path: "/terms" },
        ]}
        overline="LEGAL"
        title="Terms of use"
      >
        Last updated 1 October 2026.
      </PageHero>
      <section className="bg-white">
        <div className="mx-auto max-w-3xl space-y-4 px-6 py-16 text-lg">
          <H>About this site</H>
          <p>
            This website is operated by {siteConfig.name} (ELS), based in {siteConfig.location}. By using it you agree
            to these terms.
          </p>
          <H>Information on the site</H>
          <p>
            The content is general information about our services. It is not an offer or a guarantee of any result.
            Services are provided under a separate written agreement.
          </p>
          <H>Acceptable use</H>
          <p>Do not misuse the site, attempt to disrupt it, or submit false or harmful content through its forms.</p>
          <H>Intellectual property</H>
          <p>The site, its text, design and code belong to ELS unless stated otherwise. Do not copy them without permission.</p>
          <H>Third-party links</H>
          <p>Links to other sites, such as our products, are provided for convenience. We are not responsible for their content.</p>
          <H>Liability</H>
          <p>
            To the extent the law allows, ELS is not liable for loss arising from your use of this website. Nothing here
            limits liability that cannot be limited by law.
          </p>
          <H>Governing law</H>
          <p>These terms are governed by the laws of Kenya.</p>
          <H>Changes and contact</H>
          <p>
            We may update these terms and will revise the date above.
            {siteConfig.email && (
              <>
                {" "}
                Questions: <a className="text-electric underline" href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a>.
              </>
            )}
          </p>
        </div>
      </section>
    </>
  );
}
