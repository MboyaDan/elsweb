import { proofSchema } from "./verification";

/**
 * Every case study, metric, testimonial and client logo lives here.
 * Nothing is published until status is "verified" and a source note is set.
 * Currently empty on purpose: no verified client proof exists yet.
 */
export const proof = proofSchema.parse({
  caseStudies: [],
  metrics: [],
  testimonials: [],
  clientLogos: [],
});
