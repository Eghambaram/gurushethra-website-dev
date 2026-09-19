# Gurushethra Institute of Martial Arts — Website

Premium, cinematic marketing website for GIMA — a Chennai-based Okinawan Goju-Ryu Karate academy. Built with Next.js 16 App Router, TailwindCSS v4, and Framer Motion, with a full admin CMS backed by Supabase and ImageKit so every page can be edited live without a redeploy.

---

## Tech Stack

| Layer | Choice |
|---|---|
| Framework | Next.js 16.2 (App Router, React 19, TypeScript strict) |
| Styling | TailwindCSS v4 (`@theme inline` in globals.css — no tailwind.config.ts) |
| Animation | Framer Motion |
| Database & Auth | Supabase (Postgres + Row Level Security + email/password auth for the admin account) |
| Media / CDN | ImageKit (admin-uploaded images) |
| Forms | React Hook Form + Zod |
| Icons | Lucide React |
| Email | Resend |
| Deployment | Vercel |

---

## Local Development

### Prerequisites

- Node.js 20+
- npm 10+
- A Supabase project (free tier is fine) and an ImageKit account (free tier is fine)

### Setup

```bash
# 1. Install dependencies
npm install

# 2. Copy env template and fill in your Supabase / ImageKit / Resend keys
cp .env.example .env.local

# 3. Run the database migrations (see "Database Setup" below) if this is a
#    fresh Supabase project

# 4. Start the dev server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) for the public site, or [http://localhost:3000/admin](http://localhost:3000/admin) for the CMS.

> **Corporate proxy note:** `images.unoptimized` is forced `true` in development to bypass SSL interception, and `NODE_OPTIONS=--use-system-ca` is set on all npm scripts so Node's TLS stack trusts the OS certificate store (needed for `fetch()` calls to Supabase behind a TLS-inspecting proxy). On Vercel production, image optimisation is automatically re-enabled and this flag is a no-op.

---

## Database Setup

Needed once per Supabase project (new clone, new environment, or disaster recovery).

1. Create a project at [supabase.com](https://supabase.com).
2. Open the SQL Editor and run, **in order**:
   - `supabase/migrations/0001_schema.sql` — creates all 17 tables, RLS policies, and `updated_at` triggers.
   - `supabase/migrations/0002_seed.sql` — seeds every table with the site's real launch content (generated from `src/data/*.json` via `scripts/generate-seed-sql.cjs`, so it exactly matches what shipped in Phase 1).
   - `supabase/migrations/0003_fix_contact_policy.sql` — adds the public-insert policy the contact form needs.
3. Create the one admin account: Supabase dashboard → **Authentication → Users → Add user**. There is no public sign-up — this is the only login the site ever creates.
4. Copy the Project URL, anon key, and service-role key (Project Settings → API) into `.env.local` / your Vercel environment variables.

Row Level Security is the actual enforcement layer, independent of the admin login screen: every content table allows public `SELECT` and blocks writes unless `auth.role() = 'authenticated'`; `contact_submissions` is the inverse (public `INSERT`, admin-only `SELECT`).

---

## Environment Variables

| Variable | Required | Description |
|---|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` | Yes | Supabase project URL. |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Yes | Public anon key — respects RLS, safe to expose to the browser. |
| `SUPABASE_SERVICE_ROLE_KEY` | Yes | Server-only. Bypasses RLS — never expose to the browser or commit it. |
| `NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY` | Yes | ImageKit public key. |
| `IMAGEKIT_PRIVATE_KEY` | Yes | Server-only. Used by the admin image upload action. |
| `NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT` | Yes | ImageKit CDN URL endpoint. |
| `RESEND_API_KEY` | Production only | Resend API key for contact form emails. Without it the form still saves the enquiry to Supabase, but no email is sent. |
| `CRON_SECRET` | Optional | Secures `/api/cron/keep-alive` (see [Keeping Supabase Awake](#keeping-supabase-awake)) so only Vercel's scheduled cron can trigger it. Safe to leave unset in local dev. |

`NODE_ENV` is set automatically by Next.js / Vercel — do not set it manually.

---

## Project Structure

```
src/
  app/
    (site)/          → All public routes (Home, About, Programs, …)
    admin/
      login/          → Admin sign-in (only entry point — no public signup)
      (dashboard)/    → Every CMS section: settings, hero, about, instructor,
                        team, programs, gallery, events, achievements,
                        branches, testimonials, faq, submissions
      actions.ts       → signIn / signOut / uploadImage (ImageKit) Server Actions
    api/contact/      → POST handler for the enquiry form (also persists to Supabase)
    api/cron/         → keep-alive route hit by Vercel Cron
    layout.tsx        → Root layout, global metadata, viewport, fonts
    sitemap.ts        → Dynamic XML sitemap
    robots.ts         → robots.txt
  components/
    admin/            → Shared admin UI (forms, image upload, delete button, …)
    layout/            → Navbar, Footer, MobileMenu
    common/            → Shared components (CTAButton, Counter, SectionHeading, …)
  features/            → Section-level components co-located by feature
  services/            → Data access layer — Supabase first, JSON fallback second
  data/                → JSON fallback content (used only if a Supabase read fails)
  lib/
    supabase/          → client.ts (browser), server.ts (session-aware), admin.ts
                        (service-role), public.ts (cookie-free, keeps public
                        pages statically rendered), middleware.ts (auth gate)
    schema.ts, fonts.ts, icons.ts, formData.ts, contactSchema.ts
  constants/           → site.ts (SITE_CONFIG, NAV_LINKS)
  types/                → TypeScript interfaces
supabase/
  migrations/          → SQL schema, seed data, and policy fixes (run in order)
scripts/
  generate-seed-sql.cjs → Regenerates 0002_seed.sql from src/data/*.json
public/
  images/              → Static images including gima-logo.jpg
```

### Data / Service layer rule

Components **never** import JSON or call Supabase directly. All data flows through `src/services/*.service.ts`, which each try a Supabase read first and fall back to the matching `src/data/*.json` file if the read fails — the JSON files are a safety net, not the source of truth.

---

## Admin Panel

Everything on the public site is editable at `/admin` by the single admin account created during Database Setup:

| Section | Editable content |
|---|---|
| Site Settings | Contact info, social links, default social-share image |
| Hero | Headline, stats, CTAs, trust badges, background image |
| About Page | Story hero, timeline, core values, "why choose us" reasons |
| Instructor | Founder profile, bio, stats, qualifications |
| Team | Staff roster grouped by category, credentials, achievements |
| Programs | Class offerings, features, schedule |
| Gallery | Photos grouped by category, reorderable |
| Events | Camps, gradings, tournaments — upcoming/past |
| Achievements | Headline stats + recent competition results |
| Branches | Training centre locations, hours, map |
| Testimonials | Student/parent reviews |
| FAQ | Question/answer pairs |
| Submissions | Read-only inbox of contact form enquiries (new/read/replied) |

Saving any form calls a Server Action that writes to Supabase and calls `revalidatePath()` — the public site reflects the change immediately, with no rebuild or redeploy. Images are uploaded straight to ImageKit from the browser via a server-side action (the private key never reaches the client) and the resulting CDN URL is stored in Supabase.

Auth is enforced twice, deliberately not relying on middleware alone: the `(dashboard)` layout checks the session server-side on every request (the real gate), and `middleware.ts` provides an additional optimistic check.

---

## Deployment to Vercel

### First-time setup

1. **Push to GitHub** (or GitLab / Bitbucket).

2. **Import project in Vercel:**
   - Go to [vercel.com/new](https://vercel.com/new)
   - Select the repository
   - Framework preset will auto-detect as **Next.js** — leave all build settings as default

3. **Set environment variables** in Vercel dashboard → Project → Settings → Environment Variables:

   | Name | Value | Environments |
   |---|---|---|
   | `NEXT_PUBLIC_SUPABASE_URL` | from Supabase project settings | Production, Preview |
   | `NEXT_PUBLIC_SUPABASE_ANON_KEY` | from Supabase project settings | Production, Preview |
   | `SUPABASE_SERVICE_ROLE_KEY` | from Supabase project settings | Production, Preview |
   | `NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY` | from ImageKit dashboard | Production, Preview |
   | `IMAGEKIT_PRIVATE_KEY` | from ImageKit dashboard | Production, Preview |
   | `NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT` | from ImageKit dashboard | Production, Preview |
   | `RESEND_API_KEY` | `re_xxxx…` | Production, Preview |
   | `CRON_SECRET` | any random string (e.g. `openssl rand -hex 32`) | Production |

4. **Add your sending domain in Resend:**
   - Sign in at [resend.com](https://resend.com)
   - Go to **Domains** → Add Domain → enter `gurushethra.com`
   - Add the DNS records Resend provides (SPF, DKIM, DMARC) to your domain registrar
   - Wait for verification (usually under 10 minutes)

5. **Run the database migrations** against the Supabase project you're pointing at, if not already done — see [Database Setup](#database-setup).

6. **Deploy** — Vercel will run `npm run build` then serve from the edge.

### Subsequent deploys

Every push to `main` triggers an automatic production deployment. Every PR gets a preview URL automatically.

### Keeping Supabase Awake

Free-tier Supabase projects auto-pause after 7 days with no API activity. `vercel.json` schedules a daily cron (`0 3 * * *`) that hits `/api/cron/keep-alive`, which does one trivial Supabase read — this alone prevents the pause indefinitely, with zero extra infra. Set `CRON_SECRET` in Vercel (see above) so the endpoint only responds to Vercel's own scheduled invocation, not arbitrary public requests.

### Custom domain

1. Vercel dashboard → Project → Settings → Domains → Add `gurushethra.com`
2. Point your domain's DNS to Vercel:
   - For the apex domain (`gurushethra.com`): add an **A record** pointing to `76.76.21.21`
   - For `www`: add a **CNAME** pointing to `cname.vercel-dns.com`
3. Vercel provisions a free SSL certificate automatically within minutes.

---

## Build & Type Check

```bash
# Type check only (no output files)
npx tsc --noEmit

# Production build (same as Vercel runs)
npm run build

# Start production server locally
npm start
```

---

## Content Updates

The primary way to update content is the **admin panel at `/admin`** — changes save to Supabase and go live immediately, no redeploy needed. See [Admin Panel](#admin-panel) above for what's editable.

`src/data/*.json` files are a fallback only, used if a Supabase read ever fails (e.g. the project is paused or misconfigured). They're not kept in sync automatically — if you need to change the fallback content itself (rare), edit the JSON directly. Phone/email/social links used in a few places outside the CMS also live in `src/constants/site.ts`.

---

## License

Private — all rights reserved. Gurushethra Institute of Martial Arts.
