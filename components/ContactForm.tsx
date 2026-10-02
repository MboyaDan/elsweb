"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { TurnstileField } from "./TurnstileField";
import { track } from "../lib/analytics";
import { isLive } from "../lib/routes";
import { budgetRanges, contactSchema, contactServices, timelines } from "../lib/validation";

type Status = "idle" | "submitting" | "success" | "error";
const input =
  "w-full rounded-md border bg-white px-4 py-3 text-base text-navy placeholder:text-slate/60 border-slate/40 aria-[invalid=true]:border-red-700";

function Field({ id, label, error, hint, children }: { id: string; label: string; error?: string; hint?: string; children: React.ReactNode }) {
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

function Select({ options, ...rest }: { options: readonly string[] } & React.SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <select {...rest} defaultValue="" className={input}>
      <option value="" disabled>
        Choose one
      </option>
      {options.map((o) => (
        <option key={o} value={o}>
          {o}
        </option>
      ))}
    </select>
  );
}

export function ContactForm({ contactEmail }: { contactEmail?: string }) {
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<Status>("idle");
  const [serverMsg, setServerMsg] = useState("");
  const mountedAt = useRef(0);
  const started = useRef(false);
  useEffect(() => {
    mountedAt.current = Date.now();
  }, []);

  const aria = (id: string) => ({
    id,
    name: id,
    "aria-invalid": errors[id] ? (true as const) : undefined,
    "aria-describedby": errors[id] ? `${id}-error` : `${id}-hint`,
  });

  function onFirstTouch() {
    if (started.current) return;
    started.current = true;
    track("contact_started", { form: "contact" });
  }

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const get = (k: string) => String(fd.get(k) ?? "");
    const parsed = contactSchema.safeParse({
      name: get("name"),
      company: get("company"),
      email: get("email"),
      phone: get("phone"),
      website: get("website"),
      service: get("service"),
      budget: get("budget"),
      timeline: get("timeline"),
      message: get("message"),
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
    setServerMsg("");
    setStatus("submitting");
    const qs = new URLSearchParams(window.location.search);
    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "contact",
          ...parsed.data,
          company_website: get("company_website"),
          elapsedMs: Date.now() - mountedAt.current,
          turnstileToken: get("cf-turnstile-response") || undefined,
          attribution: {
            utm_source: qs.get("utm_source") ?? undefined,
            utm_medium: qs.get("utm_medium") ?? undefined,
            utm_campaign: qs.get("utm_campaign") ?? undefined,
            referrer: document.referrer || undefined,
            landing_path: window.location.pathname,
            cta_id: qs.get("cta_id") ?? "contact-form",
          },
        }),
      });
      if (!res.ok) {
        const j = (await res.json().catch(() => null)) as { message?: string } | null;
        setServerMsg(j?.message ?? "");
        throw new Error(String(res.status));
      }
      track("contact_submitted", { service: parsed.data.service });
      setStatus("success");
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div role="status" className="border border-emerald/40 bg-white p-8">
        <h2 className="text-2xl font-semibold">Message received</h2>
        <p className="mt-3 text-slate">Thank you. We will reply by email or WhatsApp.</p>
      </div>
    );
  }

  const count = Object.keys(errors).length;
  return (
    <form onSubmit={onSubmit} onFocusCapture={onFirstTouch} noValidate className="space-y-5 border border-slate/20 bg-white p-6 md:p-8">
      <h2 className="text-2xl font-semibold">Start a conversation</h2>
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
      <div className="grid gap-5 sm:grid-cols-2">
        <Field id="name" label="Name" error={errors.name}>
          <input {...aria("name")} type="text" autoComplete="name" className={input} />
        </Field>
        <Field id="company" label="Company (optional)" error={errors.company}>
          <input {...aria("company")} type="text" autoComplete="organization" className={input} />
        </Field>
      </div>
      <div className="grid gap-5 sm:grid-cols-2">
        <Field id="email" label="Email" error={errors.email}>
          <input {...aria("email")} type="email" autoComplete="email" className={input} />
        </Field>
        <Field id="phone" label="Phone or WhatsApp" error={errors.phone}>
          <input {...aria("phone")} type="tel" autoComplete="tel" className={input} />
        </Field>
      </div>
      <Field id="website" label="Website (optional)" error={errors.website}>
        <input {...aria("website")} type="text" inputMode="url" autoComplete="url" className={input} />
      </Field>
      <Field id="service" label="Service" error={errors.service}>
        <Select {...aria("service")} options={contactServices} />
      </Field>
      <div className="grid gap-5 sm:grid-cols-2">
        <Field id="budget" label="Budget range" error={errors.budget}>
          <Select {...aria("budget")} options={budgetRanges} />
        </Field>
        <Field id="timeline" label="Timeline" error={errors.timeline}>
          <Select {...aria("timeline")} options={timelines} />
        </Field>
      </div>
      <Field id="message" label="Message" error={errors.message} hint="What are you trying to build, fix or measure?">
        <textarea {...aria("message")} rows={5} className={input} />
      </Field>
      <div>
        <div className="flex items-start gap-3">
          <input {...aria("consent")} type="checkbox" className="mt-1 h-5 w-5 shrink-0 accent-electric" />
          <label htmlFor="consent" className="text-sm text-slate">
            I agree that ELS may contact me about this enquiry
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
      <TurnstileField />
      {status === "error" && (
        <p role="alert" className="border border-red-700/40 bg-red-50 p-3 text-sm text-red-800">
          {serverMsg ||
            (contactEmail ? `We could not send this just now. Please email ${contactEmail} instead.` : "We could not send this just now. Please try again later.")}
        </p>
      )}
      <button
        type="submit"
        disabled={status === "submitting"}
        className="inline-flex min-h-12 w-full items-center justify-center rounded-md bg-electric px-6 py-3 text-base font-medium text-white hover:bg-blue-700 disabled:opacity-60 sm:w-auto"
      >
        {status === "submitting" ? "Sending…" : "Send message"}
      </button>
    </form>
  );
}
