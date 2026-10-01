import { z } from "zod";

export const statusSchema = z.enum(["verified", "placeholder", "draft"]);
export type ProofStatus = z.infer<typeof statusSchema>;

const base = {
  id: z.string().min(1),
  status: statusSchema,
  /** Required when status is "verified": where the claim can be checked. */
  source: z.string().optional(),
  /** Routes that render this item. */
  routes: z.array(z.string()).default([]),
};

function needsSource<T extends { status: ProofStatus; source?: string }>(v: T) {
  return v.status !== "verified" || Boolean(v.source && v.source.trim());
}
const sourceMsg = { message: 'Verified items need a non-empty "source" note.', path: ["source"] };

export const caseStudySchema = z
  .object({ ...base, title: z.string(), clientName: z.string().optional(), summary: z.string() })
  .refine(needsSource, sourceMsg);
export const metricSchema = z
  .object({ ...base, label: z.string(), value: z.string() })
  .refine(needsSource, sourceMsg);
export const testimonialSchema = z
  .object({ ...base, quote: z.string(), author: z.string(), role: z.string().optional() })
  .refine(needsSource, sourceMsg);
export const clientLogoSchema = z
  .object({ ...base, name: z.string(), file: z.string() })
  .refine(needsSource, sourceMsg);

export const proofSchema = z.object({
  caseStudies: z.array(caseStudySchema),
  metrics: z.array(metricSchema),
  testimonials: z.array(testimonialSchema),
  clientLogos: z.array(clientLogoSchema),
});
export type Proof = z.infer<typeof proofSchema>;
