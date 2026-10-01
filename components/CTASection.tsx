import { Button } from "./Button";
import { startConversationHref } from "../lib/cta";

export function CTASection() {
  const href = startConversationHref();
  return (
    <section className="bg-navy">
      <div className="mx-auto max-w-6xl px-6 py-20 md:py-28">
        <h2 className="max-w-3xl text-3xl font-semibold !text-white md:text-5xl">
          Start with the problem you need solved.
        </h2>
        <p className="mt-5 max-w-2xl text-lg text-slate-300">
          Tell us what you are trying to build, fix or measure, and we will tell you how we would approach it.
        </p>
        {href && (
          <div className="mt-10">
            <Button href={href} ctaId="final-cta">
              Start a conversation
            </Button>
          </div>
        )}
      </div>
    </section>
  );
}
