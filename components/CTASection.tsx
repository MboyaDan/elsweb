import { Button } from "./Button";
import { startConversationHref } from "../lib/cta";
import { WhatsAppButton } from "./WhatsAppButton";

export function CTASection({
  variant = "default",
  whatsappRef,
}: {
  variant?: "default" | "growth";
  /** Reference code for the WhatsApp button beside the primary CTA. Omit to leave it out. */
  whatsappRef?: string;
}) {
  const growth = variant === "growth";
  const href = growth ? "/growth-audit" : startConversationHref();
  return (
    <section className="bg-navy">
      <div className="mx-auto max-w-6xl px-6 py-20 md:py-28">
        <h2 className="max-w-3xl text-3xl font-semibold !text-white md:text-5xl">
          {growth ? "See how your business shows up today." : "Start with the problem you need solved."}
        </h2>
        <p className="mt-5 max-w-2xl text-lg text-slate-300">
          {growth
            ? "A Growth Audit is a short review of how customers find you, with the top fixes and how long each one takes."
            : "Tell us what you are trying to build, fix or measure, and we will tell you how we would approach it."}
        </p>
        {href && (
          <div className="mt-10 flex flex-col items-stretch gap-3 sm:flex-row sm:items-center">
            <Button href={href} ctaId={growth ? "growth-final-cta" : "final-cta"}>
              {growth ? "Request a growth audit" : "Start a conversation"}
            </Button>
            {whatsappRef && (
              <WhatsAppButton topic="working with ELS" refCode={whatsappRef} variant="outline-dark" label="Or message us on WhatsApp" />
            )}
          </div>
        )}
      </div>
    </section>
  );
}
