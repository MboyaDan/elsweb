import { z } from "zod";

const blank = (v: unknown) => (typeof v === "string" && v.trim() === "" ? undefined : v);
const opt = <T extends z.ZodType>(s: T) => z.preprocess(blank, s.optional());

// Next.js only inlines NEXT_PUBLIC_* when each one is referenced literally.
const rawEnv = {
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL,
  email: process.env.NEXT_PUBLIC_CONTACT_EMAIL,
  whatsappNumber: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER,
  ga4Id: process.env.NEXT_PUBLIC_GA4_ID,
};

const envSchema = z.object({
  siteUrl: opt(z.url()),
  email: opt(z.email()),
  whatsappNumber: opt(z.string().regex(/^\d{8,15}$/, "International format, digits only, no +")),
  ga4Id: opt(z.string().regex(/^G-[A-Z0-9]+$/)),
});

const parsed = envSchema.safeParse(rawEnv);
if (!parsed.success) {
  throw new Error(`Invalid site env values: ${z.prettifyError(parsed.error)}`);
}
const env = parsed.data;

const vercelUrl = process.env.VERCEL_PROJECT_PRODUCTION_URL
  ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
  : undefined;

const productSchema = z.object({
  name: z.string(),
  status: z.enum(["live", "in-development"]),
  url: z.url().optional(),
  summary: z.string(),
});

export const siteConfig = {
  name: "EasyLiving Software Solutions",
  shortName: "ELS",
  tagline: "Engineering, data, AI and growth systems for ambitious businesses.",
  message:
    "We understand the technology deeply, and we understand the business problem it needs to solve.",
  description:
    "EasyLiving Software Solutions designs software, data infrastructure, AI systems and digital growth engines for ambitious businesses. Based in Nairobi, delivering to clients in Kenya and internationally.",
  narrative: ["Build", "Connect", "Analyze", "Automate", "Grow"],
  locale: "en_KE",
  // Falls back to the Vercel production URL, then localhost. Set NEXT_PUBLIC_SITE_URL for the real domain.
  url: env.siteUrl ?? vercelUrl ?? "http://localhost:3000",
  siteUrlIsSet: Boolean(env.siteUrl),
  email: env.email,
  whatsappNumber: env.whatsappNumber,
  ga4Id: env.ga4Id,
  location: "Nairobi, Kenya",
  delivery: "Based in Nairobi, delivering to clients in Kenya and internationally.",
  // GitHub and X: [FILL]. null = not shown anywhere.
  social: { linkedin: "https://www.linkedin.com/in/danroylex", github: null, x: null } as Record<string, string | null>,
  // [FILL] Never state ODPC registration unless this is true (Dan to confirm).
  odpcRegistered: false,
  products: {
    // [FILL] Spelling confirmation: "Mezani" (default) or "Mezzani".
    mezani: productSchema.parse({
      name: "Mezani",
      status: "live",
      url: "https://mezani.vercel.app",
      summary: "A multi-tenant restaurant operating system for Kenyan hospitality.",
    }),
    siteledger: productSchema.parse({
      name: "SiteLedger",
      status: "in-development",
      summary:
        "An offline-first, M-Pesa-native construction management product for Kenyan SME contractors.",
    }),
  },
} as const;

export type SiteConfig = typeof siteConfig;
