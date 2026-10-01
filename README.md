# ELS website

Public site for EasyLiving Software Solutions (ELS). Next.js App Router, TypeScript (strict), Tailwind CSS v4.

> Skeleton from Stage 1. Setup, env var reference, "how to add a page" and Vercel deploy steps are completed in Stage 4.

## Quick start

```bash
nvm use            # Node 22
npm install
cp .env.example .env.local   # all values optional in development
npm run dev
```

## Scripts

| Command | What it does |
| --- | --- |
| `npm run dev` | Dev server |
| `npm run build` | Runs the content check (prebuild), then builds |
| `npm run lint` / `npm run typecheck` | ESLint / `tsc --noEmit` |
| `npm run content:check` | Fails if unverified proof, banned terms or dead nav links exist |
| `npm run content:todo` | Regenerates `CONTENT_TODO.md` |

## Structure

- `content/`: typed, Zod-validated content (`site.config.ts` reads env, `services.ts`, `growth.config.ts`, `proof.ts`)
- `lib/routes.ts`: the list of routes that exist. Nav, footer and sitemap read it.
- `lib/seo.ts`, `lib/analytics.ts`: metadata and JSON-LD helpers, consent-gated `track()`
- `components/Logo.tsx`: Mark C (transparent PNGs in `public/brand/`, dark and white variants)

## Dependencies beyond the brief

- `geist`: self-hosted Geist fonts via `next/font`, so builds do not need to reach Google Fonts.
- `tsx` (dev): runs the TypeScript content check script.
