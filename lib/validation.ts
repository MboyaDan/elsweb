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
