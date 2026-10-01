import type { ProofStatus } from "../content/verification";

export function UnverifiedBadge({ status }: { status: ProofStatus }) {
  if (status === "verified" || process.env.NODE_ENV === "production") return null;
  return (
    <span className="rounded border border-amber/60 bg-amber/10 px-1.5 py-0.5 text-xs font-medium text-amber-900">
      UNVERIFIED
    </span>
  );
}
