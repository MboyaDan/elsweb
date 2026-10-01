import { buildMetadata } from "../lib/seo";
import { siteConfig } from "../content/site.config";

export const metadata = buildMetadata({
  title: `${siteConfig.name}: engineering, data, AI and growth`,
  description: siteConfig.description,
  path: "/",
});

// Placeholder. The full homepage lands in Stage 2.
export default function Home() {
  return (
    <section className="bg-navy">
      <div className="mx-auto max-w-6xl px-6 py-24 md:py-32">
        <h1 className="max-w-3xl text-4xl font-semibold text-white md:text-6xl">
          Build the systems behind ambitious businesses.
        </h1>
        <p className="mt-6 max-w-2xl text-lg text-slate-300">{siteConfig.message}</p>
        <p className="mt-10 text-sm text-cyan">{siteConfig.narrative.join(" → ")}</p>
      </div>
    </section>
  );
}
