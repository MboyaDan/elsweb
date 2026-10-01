import type { ProofStatus } from "../content/verification";

/** Production renders verified items only. In development every item renders (with a badge). */
export function visibleProof<T extends { status: ProofStatus }>(items: T[]): T[] {
  if (process.env.NODE_ENV === "production") return items.filter((i) => i.status === "verified");
  return items;
}
