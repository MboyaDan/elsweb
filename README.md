# ELS website

Public site for EasyLiving Software Solutions (ELS). Next.js (App Router, pinned in `package.json`), TypeScript strict, Tailwind CSS v4, deployed to Vercel from GitHub.

## Setup

```bash
nvm use                       # Node 22 (.nvmrc)
npm install
cp .env.example .env.local    # every value is optional in development
npm run dev                   # http://localhost:3000
```

In development, submitted leads are printed to the console and appended to `.data/leads.ndjson` (git-ignored).

## Scripts

| Command | What it does |
| --- | --- |
| `npm run dev` / `npm start` | Dev server / production server |
| `npm run build` | Runs the content check (prebuild), then `next build` |
| `npm run lint` / `npm run typecheck` | ESLint / `tsc --noEmit` |
| `npm run content:check` | Fails if an unverified metric, testimonial, case study or client logo is on a live route, if nav links to a missing route, or if banned terms (AWS, Kubernetes, Kafka, lorem ipsum) appear in source. Needs no env values |
| `npm run content:todo` | Regenerates `CONTENT_TODO.md` |

CI (`.github/workflows/ci.yml`) runs `npm ci`, lint, `tsc --noEmit`, the content check and the build on every push and PR.

## Environment variables

| Variable | Purpose | If unset |
| --- | --- | --- |
| `NEXT_PUBLIC_SITE_URL` | Canonical domain, e.g. `https://www.elssoftwaresolutions.co.ke` | Falls back to the Vercel production URL, then localhost. Set it before launch |
| `NEXT_PUBLIC_CONTACT_EMAIL` | Public business email | No email links; "Start a conversation" goes to `/contact` regardless |
| `NEXT_PUBLIC_WHATSAPP_NUMBER` | International format, digits only, no `+` | WhatsApp buttons are omitted |
| `NEXT_PUBLIC_GA4_ID` | GA4 measurement ID (`G-XXXX`) | No analytics, no consent banner |
| `RESEND_API_KEY`, `RESEND_FROM`, `LEAD_NOTIFY_TO` | Email sink: owner notification and acknowledgement to the submitter. `RESEND_FROM` must be an address on a verified sending subdomain | Sink disabled |
| `SHEETS_WEBHOOK_URL` | Receives each lead as a JSON POST (Google Apps Script web app or similar) | Sink disabled |
| `NEXT_PUBLIC_TURNSTILE_SITE_KEY`, `TURNSTILE_SECRET_KEY` | Cloudflare Turnstile | Widget not shown, no check |
| `UPSTASH_REDIS_REST_URL`, `UPSTASH_REDIS_REST_TOKEN` | Rate limiting (5 submissions per IP per 10 minutes) | No rate limiting |

Never commit `.env.local`. `NEXT_PUBLIC_*` values are visible in the browser.

## How leads work

`POST /api/lead` validates with the same Zod schemas as the browser forms, then sends to every configured sink (Resend, Sheets webhook, and in development a console and file sink). It succeeds if at least one sink succeeds. Every sink failure is logged to the server logs as JSON containing the full lead, so a lead can be recovered from Vercel logs. If no sink is configured in production, the visitor sees a message asking them to email or WhatsApp, and the lead is logged.

Spam protection: a hidden honeypot field, a 3-second minimum fill time (bots get a fake success and nothing is stored), server-side sanitisation (tags and control characters stripped), optional Turnstile, and optional Upstash rate limiting. **Without Upstash, there is no rate limiting**: in-memory limits do not work reliably on serverless, so protection then relies on the honeypot, minimum-time check and Turnstile.

Attribution fields stored with each lead: `utm_source`, `utm_medium`, `utm_campaign`, `referrer`, `landing_path`, `cta_id`.

## Analytics

GA4 loads only after a visitor accepts the banner. `track()` in `lib/analytics.ts` sends `page_view`, `cta_click` (any element with `data-cta-id`), `contact_started`, `contact_submitted`, `audit_requested` and `whatsapp_click`. It does nothing without consent.

## Adding a page

1. Create `app/<route>/page.tsx` and export `metadata` from `buildMetadata({ title, description, path })`.
2. Add the path to `liveRoutes` in `lib/routes.ts`. The sitemap, nav checks and content check read it. Add it to `navRoutes` if it belongs in the nav and footer.
3. Use `Breadcrumbs` (or `PageHero`, which includes it) and add JSON-LD where relevant.
4. Put any text or data that is not a one-off in `content/*.ts` with a Zod schema.
5. Any case study, metric, testimonial or client logo goes in `content/proof.ts` with `status` and, if verified, a `source` note. Only verified items render in production.

## Deploying to Vercel

1. Push the repo to GitHub (`git remote add origin <URL>`, `git push -u origin main`).
2. In Vercel, **Add New → Project**, import the repository. Vercel detects Next.js; no `vercel.json` is needed.
3. Under **Settings → Environment Variables**, add the variables above for Production (and Preview if you want). At minimum: `NEXT_PUBLIC_SITE_URL`, `NEXT_PUBLIC_CONTACT_EMAIL`, and the Resend variables.
4. **Settings → Domains**: add `www.elssoftwaresolutions.co.ke` (and the apex if you want a redirect).
5. At your DNS provider, add the records Vercel shows for the domain (typically a CNAME for `www`, or A records for the apex).
6. Redeploy after changing env vars.

## Resend domain verification

1. In Resend, add a domain. Use a sending **subdomain**, for example `mail.elssoftwaresolutions.co.ke`.
2. Resend shows the records to add at your DNS provider. Copy the exact values it gives you:
   - **DKIM**: a TXT record
   - **SPF**: a TXT record on the sending subdomain
   - **Return-path**: an MX record
3. Click **Verify** in Resend once DNS has propagated.
4. Set `RESEND_FROM` to an address on that subdomain, e.g. `ELS <hello@mail.elssoftwaresolutions.co.ke>`. Set `LEAD_NOTIFY_TO` to the inbox that should receive enquiries.
5. **DMARC** is a separate record you add yourself. Start in monitoring mode: a TXT record at `_dmarc.elssoftwaresolutions.co.ke` with the value `v=DMARC1; p=none; rua=mailto:<an address you read>`. Tighten the policy later once reports look clean.

Do not use `onboarding@resend.dev` as the sender; the code never does.

## Project layout

- `app/`: routes, including `app/api/lead/route.ts`
- `content/`: typed, Zod-validated content (`site.config.ts` reads env, `services.ts`, `growth.config.ts`, `construction.ts`, `proof.ts`)
- `lib/`: `routes.ts`, `seo.ts`, `analytics.ts`, `consent.ts`, `validation.ts`, `leads/`
- `components/`: UI. `Logo.tsx` uses the SVGs in `public/brand/` (nav lockup: mark + ELS; full lockup with tagline for the footer)
- `scripts/check-content.ts`: the prebuild verification check

## Dependencies beyond the brief

- `geist`: self-hosted Geist fonts via `next/font`, so builds do not need to reach Google Fonts.
- `tsx` (dev): runs the TypeScript content check script.

`CONTENT_TODO.md` lists every `[FILL]` value and unverified item. `/privacy` and `/terms` are drafts pending legal review.
