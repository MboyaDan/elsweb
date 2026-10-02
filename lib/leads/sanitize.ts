/** Strips tags and control characters, collapses whitespace, enforces a length cap. */
export function cleanText(v: string, max = 2000): string {
  return v
    .replace(/<[^>]*>/g, " ")
    .replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g, "")
    .replace(/[ \t]+/g, " ")
    .replace(/\n{3,}/g, "\n\n")
    .trim()
    .slice(0, max);
}

/** Single-line variant for names, subjects and similar. */
export const cleanLine = (v: string, max = 200) => cleanText(v, max).replace(/\s*\n\s*/g, " ");

export function cleanRecord(rec: Record<string, string | boolean>): Record<string, string | boolean> {
  const out: Record<string, string | boolean> = {};
  for (const [k, v] of Object.entries(rec)) out[k] = typeof v === "string" ? cleanText(v) : v;
  return out;
}

export const escapeHtml = (s: string) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
