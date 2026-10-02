import { buildMetadata } from "../../lib/seo";
import { siteConfig } from "../../content/site.config";
import { PageHero } from "../../components/PageHero";
import { ConsentReset } from "../../components/ConsentReset";

export const metadata = buildMetadata({
  title: "Privacy notice",
  description: "How EasyLiving Software Solutions handles personal data collected through this website.",
  path: "/privacy",
});

const H = ({ children }: { children: React.ReactNode }) => <h2 className="mt-10 text-2xl font-semibold">{children}</h2>;

export default function PrivacyPage() {
  const email = siteConfig.email;
  return (
    <>
      <PageHero
        crumbs={[
          { name: "Home", path: "/" },
          { name: "Privacy notice", path: "/privacy" },
        ]}
        overline="LEGAL"
        title="Privacy notice"
      >
        Last updated 1 October 2026.
      </PageHero>
      <section className="bg-white">
        <div className="mx-auto max-w-3xl space-y-4 px-6 py-16 text-lg">
          <H>Who is responsible</H>
          <p>
            {siteConfig.name} (ELS), based in {siteConfig.location}, is the controller of personal data collected
            through enquiries on this website.
            {email && (
              <>
                {" "}
                Contact us at <a className="text-electric underline" href={`mailto:${email}`}>{email}</a>.
              </>
            )}
          </p>
          {siteConfig.odpcRegistered && <p>ELS is registered with the Office of the Data Protection Commissioner of Kenya.</p>}

          <H>What we collect</H>
          <p>
            When you use the contact or growth audit form: your name, business or company, email, phone or WhatsApp
            number, website, city, the details of your request, and your consent. We also record where you came from
            (UTM parameters, referrer, landing page and which button you used) so we can see which pages lead to
            enquiries. If you message us on WhatsApp or email, we receive what you send.
          </p>

          <H>Why we use it</H>
          <ul className="list-disc space-y-2 pl-6">
            <li>To reply to your enquiry and deliver the audit or service you asked about.</li>
            <li>To follow up on that same enquiry.</li>
            <li>To keep the site secure and prevent spam.</li>
            <li>To understand which pages are useful, using analytics only if you accept it.</li>
          </ul>

          <H>Who receives it</H>
          <p>
            Service providers that help us run the site: email delivery, a spreadsheet or CRM where enquiries are
            stored, hosting, spam protection, and Google Analytics if you accept it. We do not sell personal data.
          </p>

          <H>How long we keep it</H>
          <p>
            Enquiries that do not lead to work are kept for up to 12 months, then deleted. If we work together, we keep
            records for as long as the engagement and our legal obligations require.
          </p>

          <H>Analytics and cookies</H>
          <p>
            Google Analytics 4 loads only after you accept the banner. Your choice is stored in your browser.{" "}
            {siteConfig.ga4Id && <ConsentReset />}
          </p>

          <H>Your rights</H>
          <p>
            You can ask to see, correct or delete your personal data, withdraw consent at any time, and object to our
            processing of your data, including for direct marketing. To exercise any of these, {email ? <>email <a className="text-electric underline" href={`mailto:${email}`}>{email}</a></> : "contact us"}. You
            can also complain to the Office of the Data Protection Commissioner in Kenya.
          </p>

          <H>Children</H>
          <p>This website is not directed at children and we do not knowingly collect data about minors.</p>

          <H>Changes</H>
          <p>We will update this page if our practices change and revise the date above.</p>
        </div>
      </section>
    </>
  );
}
