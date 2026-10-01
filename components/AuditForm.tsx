"use client";

import Link from "next/link";
import { useRef, useState } from "react";
import { auditSchema, industries } from "../lib/validation";
import { track } from "../lib/analytics";
import { isLive } from "../lib/routes";

type Status = "idle" | "submitting" | "success" | "error";

const input =
  "w-full rounded-md border bg-white px-4 py-3 text-base text-navy placeholder:text-slate/60 border-slate/40 aria-[invalid=true]:border-red-700";

function Field({
  id,
  label,
  error,
  hint,
  children,
}: {
  id: string;
  label: string;
  error?: string;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label htmlFor={id} className="mb-1.5 block text-sm font-medium text-navy">
        {label}
      </label>
      {children}
      {hint && !error && (
        <p id={`${id}-hint`} className="mt-1 text-sm text-slate">
          {hint}
        </p>
      )}
      {error && (
        <p id={`${id}-error`} className="mt-1 text-sm font-medium text-red-700">
          {error}
        </p>
      )}
    </div>
  );
}

export function AuditForm({ contactEmail }: { contactEmail?: string }) {
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<Status>("idle");
  const startedAt = useRef<number | null>(null);
  const started = useRef(false);

  const aria = (id: string) => ({
    id,
    name: id,
    "aria-invalid": errors[id] ? (true as const) : undefined,
    "aria-describedby": errors[id] ? `${id}-error` : `${id}-hint`,
  });

  function onFirstTouch() {
    if (started.current) return;
    started.current = true;
    startedAt.current = Date.now();
    track("contact_started", { form: "growth_audit" });
  }

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const get = (k: string) => String(fd.get(k) ?? "");
    const parsed = auditSchema.safeParse({
      businessName: get("businessName"),
      website: get("website"),
      city: get("city"),
      industry: get("industry"),
      whatsapp: get("whatsapp"),
      email: get("email"),
      goal: get("goal"),
      consent: fd.get("consent") === "on",
    });
    if (!parsed.success) {
      const next: Record<string, string> = {};
      for (const issue of parsed.error.issues) {
        const key = String(issue.path[0]);
        if (!next[key]) next[key] = issue.message;
      }
      setErrors(next);
      const first = Object.keys(next)[0];
      requestAnimationFrame(() => document.getElementById(first)?.focus());
      return;
    }
    setErrors({});
    setStatus("submitting");

    const qs = new URLSearchParams(window.location.search);
    const payload = {
      type: "audit",
      ...parsed.data,
      company_website: get("company_website"),
      elapsedMs: startedAt.current ? Date.now() - startedAt.current : 0,
      attribution: {
        utm_source: qs.get("utm_source") ?? undefined,
        utm_medium: qs.get("utm_medium") ?? undefined,
        utm_campaign: qs.get("utm_campaign") ?? undefined,
        referrer: document.referrer || undefined,
        landing_path: window.location.pathname,
        cta_id: qs.get("cta_id") ?? "growth-audit-form",
      },
    };
    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error(String(res.status));
      track("audit_requested", { industry: parsed.data.industry });
      setStatus("success");
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div role="status" className="border border-emerald/40 bg-white p-8">
        <h2 className="text-2xl font-semibold">Request received</h2>
        <p className="mt-3 text-slate">Thank you. We will review your details and reply by email or WhatsApp.</p>
      </div>
    );
  }

  const count = Object.keys(errors).length;
  return (
    <form onSubmit={onSubmit} onFocusCapture={onFirstTouch} noValidate className="space-y-5 border border-slate/20 bg-white p-6 md:p-8">
      <h2 className="text-2xl font-semibold">Request a growth audit</h2>
      {count > 0 && (
        <p role="alert" className="border border-red-700/40 bg-red-50 p-3 text-sm font-medium text-red-800">
          Please fix {count} {count === 1 ? "field" : "fields"} below.
        </p>
      )}
      <div aria-hidden className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
        <label>
          Leave this field empty
          <input type="text" name="company_website" tabIndex={-1} autoComplete="off" />
        </label>
      </div>
      <Field id="businessName" label="Business name" error={errors.businessName}>
        <input {...aria("businessName")} type="text" autoComplete="organization" className={input} />
      </Field>
      <Field id="website" label="Website or Google Maps link" error={errors.website} hint="A Maps link works if you have no website.">
        <input {...aria("website")} type="text" inputMode="url" autoComplete="url" className={input} />
      </Field>
      <div className="grid gap-5 sm:grid-cols-2">
        <Field id="city" label="City or town" error={errors.city}>
          <input {...aria("city")} type="text" autoComplete="address-level2" className={input} />
        </Field>
        <Field id="industry" label="Industry" error={errors.industry}>
          <select {...aria("industry")} defaultValue="" className={input}>
            <option value="" disabled>
              Choose one
            </option>
            {industries.map((i) => (
              <option key={i} value={i}>
                {i}
              </option>
            ))}
          </select>
        </Field>
      </div>
      <div className="grid gap-5 sm:grid-cols-2">
        <Field id="whatsapp" label="WhatsApp number" error={errors.whatsapp}>
          <input {...aria("whatsapp")} type="tel" autoComplete="tel" className={input} />
        </Field>
        <Field id="email" label="Email" error={errors.email}>
          <input {...aria("email")} type="email" autoComplete="email" className={input} />
        </Field>
      </div>
      <Field id="goal" label="Main goal" error={errors.goal} hint="For example: more quote requests from Google, or faster replies to enquiries.">
        <textarea {...aria("goal")} rows={4} className={input} />
      </Field>
      <div>
        <div className="flex items-start gap-3">
          <input
            {...aria("consent")}
            type="checkbox"
            className="mt-1 h-5 w-5 shrink-0 accent-electric"
          />
          <label htmlFor="consent" className="text-sm text-slate">
            I agree that ELS may contact me about this request
            {isLive("/privacy") && (
              <>
                {" "}
                (see the{" "}
                <Link href="/privacy" className="text-electric underline">
                  privacy notice
                </Link>
                )
              </>
            )}
            .
          </label>
        </div>
        {errors.consent && (
          <p id="consent-error" className="mt-1 text-sm font-medium text-red-700">
            {errors.consent}
          </p>
        )}
      </div>
      {status === "error" && (
        <p role="alert" className="border border-red-700/40 bg-red-50 p-3 text-sm text-red-800">
          We could not send this just now.{" "}
          {contactEmail ? (
            <>
              Please email{" "}
              <a className="underline" href={`mailto:${contactEmail}`}>
                {contactEmail}
              </a>{" "}
              instead.
            </>
          ) : (
            "Please try again later."
          )}
        </p>
      )}
      <button
        type="submit"
        disabled={status === "submitting"}
        className="inline-flex min-h-12 w-full items-center justify-center rounded-md bg-electric px-6 py-3 text-base font-medium text-white hover:bg-blue-700 disabled:opacity-60 sm:w-auto"
      >
        {status === "submitting" ? "Sending…" : "Request a growth audit"}
      </button>
    </form>
  );
}
