import { z } from "zod";

export const industries = ["Construction", "Security and facilities", "Private school", "Other"] as const;

const siteOrMaps = /^(https?:\/\/)?[^\s/.]+(\.[^\s/.]+)+(\/\S*)?$/i;
const phone = /^\+?[0-9][0-9\s-]{7,17}$/;

export const attributionSchema = z.object({
  utm_source: z.string().max(200).optional(),
  utm_medium: z.string().max(200).optional(),
  utm_campaign: z.string().max(200).optional(),
  referrer: z.string().max(500).optional(),
  landing_path: z.string().max(300).optional(),
  cta_id: z.string().max(100).optional(),
});
export type Attribution = z.infer<typeof attributionSchema>;

/** Shared by the browser form and the API route (Stage 4). */
export const auditSchema = z.object({
  businessName: z.string().trim().min(2, "Enter your business name").max(120),
  website: z
    .string()
    .trim()
    .min(1, "Enter your website or Google Maps link")
    .max(300)
    .regex(siteOrMaps, "Enter a web address, for example example.co.ke"),
  city: z.string().trim().min(2, "Enter your city or town").max(80),
  industry: z.enum(industries, { error: "Choose an industry" }),
  whatsapp: z.string().trim().regex(phone, "Enter a phone number, for example +254 700 000 000"),
  email: z.email("Enter a valid email address").max(200),
  goal: z.string().trim().min(10, "Tell us a little more (at least 10 characters)").max(1000),
  consent: z.boolean().refine((v) => v === true, { message: "Tick the box so we can contact you about this request" }),
});
export type AuditInput = z.infer<typeof auditSchema>;

export const contactServices = [
  "Software engineering",
  "Mobile",
  "Data engineering",
  "AI and machine learning",
  "Cloud and DevOps",
  "Growth and customer acquisition",
  "Not sure yet",
] as const;
export const budgetRanges = ["Under $2,000", "$2,000 to $5,000", "$5,000 to $15,000", "Over $15,000", "Not sure yet"] as const;
export const timelines = ["As soon as possible", "Within 1 to 3 months", "More than 3 months", "Just exploring"] as const;

export const contactSchema = z.object({
  name: z.string().trim().min(2, "Enter your name").max(100),
  company: z.string().trim().max(120),
  email: z.email("Enter a valid email address").max(200),
  phone: z.string().trim().regex(phone, "Enter a phone or WhatsApp number, for example +254 700 000 000"),
  website: z
    .string()
    .trim()
    .max(300)
    .refine((v) => v === "" || siteOrMaps.test(v), "Enter a web address, for example example.co.ke"),
  service: z.enum(contactServices, { error: "Choose a service" }),
  budget: z.enum(budgetRanges, { error: "Choose a budget range" }),
  timeline: z.enum(timelines, { error: "Choose a timeline" }),
  message: z.string().trim().min(10, "Tell us a little more (at least 10 characters)").max(2000),
  consent: z.boolean().refine((v) => v === true, { message: "Tick the box so we can contact you about this request" }),
});
export type ContactInput = z.infer<typeof contactSchema>;

/** Wrapper fields sent with every submission, checked before the form data itself. */
export const envelopeSchema = z.object({
  type: z.enum(["contact", "audit"]),
  company_website: z.string().max(500).optional(),
  elapsedMs: z.number().min(0).max(86_400_000),
  turnstileToken: z.string().max(4096).optional(),
  attribution: attributionSchema.optional(),
});
