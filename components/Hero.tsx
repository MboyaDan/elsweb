import { Button } from "./Button";
import { HeroVisual } from "./HeroVisual";
import { startConversationHref } from "../lib/cta";

export function Hero() {
  const href = startConversationHref();
  return (
    <section className="bg-navy">
      <div className="mx-auto grid max-w-6xl items-center gap-12 px-6 pb-20 pt-12 md:grid-cols-[1.2fr_1fr] md:pb-28 md:pt-20">
        <div>
          <p className="font-mono text-xs tracking-widest text-cyan">ENGINEERING · DATA · AI · GROWTH</p>
          <h1 className="mt-5 text-4xl font-semibold leading-[1.05] !text-white sm:text-5xl md:text-7xl">
            Build the systems behind ambitious businesses.
          </h1>
          <p className="mt-6 max-w-xl text-lg text-slate-300">
            EasyLiving Software Solutions designs software, data infrastructure, AI systems and digital growth
            engines that help organizations operate, scale and compete.
          </p>
          <div className="mt-10 flex flex-col items-stretch gap-3 sm:flex-row sm:items-center sm:gap-6">
            {href && (
              <Button href={href} ctaId="hero-primary">
                Start a conversation
              </Button>
            )}
            <Button href="/#capabilities" variant="ghost-dark" ctaId="hero-secondary">
              Explore our capabilities →
            </Button>
          </div>
        </div>
        <div className="flex md:justify-end">
          <HeroVisual />
        </div>
      </div>
    </section>
  );
}
