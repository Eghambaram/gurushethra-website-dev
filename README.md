# Gurushethra Institute of Martial Arts — Website

Premium, cinematic marketing website for GIMA — a Chennai-based Okinawan Goju-Ryu Karate academy. Built with Next.js 16 App Router, TailwindCSS v4, Framer Motion, and shadcn/ui primitives.

---

## Tech Stack

| Layer | Choice |
|---|---|
| Framework | Next.js 16.2 (App Router, React 19, TypeScript strict) |
| Styling | TailwindCSS v4 (`@theme inline` in globals.css — no tailwind.config.ts) |
| Animation | Framer Motion |
| UI Primitives | shadcn/ui (Radix-based) |
| Forms | React Hook Form + Zod |
| Icons | Lucide React |
| Email | Resend |
| Deployment | Vercel |

---

## Local Development

### Prerequisites

- Node.js 20+
- npm 10+

### Setup

```bash
# 1. Install dependencies
npm install

# 2. Copy env template and fill in your Resend key
cp .env.example .env.local

# 3. Start the dev server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

> **Corporate proxy note:** `images.unoptimized` is forced `true` in development to bypass SSL interception. On Vercel production this is automatically `false` — full WebP/AVIF optimisation is enabled.

---

## Environment Variables

| Variable | Required | Description |
|---|---|---|
| `RESEND_API_KEY` | Production only | Resend API key for contact form emails. Without it the form silently succeeds in dev but no email is sent. |

`NODE_ENV` is set automatically by Next.js / Vercel — do not set it manually.

---

## Project Structure

```
src/
  app/
    (site)/          → All public routes (Home, About, Programs, …)
    api/contact/     → POST handler for the enquiry form
    layout.tsx       → Root layout, global metadata, viewport, fonts
    sitemap.ts       → Dynamic XML sitemap
    robots.ts        → robots.txt
  components/
    ui/              → shadcn primitives
    layout/          → Navbar, Footer, MobileMenu
    common/          → Shared components (CTAButton, Counter, SectionHeading, …)
  features/          → Section-level components co-located by feature
  services/          → Data access layer (swap JSON → Supabase here in Phase 2)
  data/              → JSON content files (single source of truth for all copy)
  lib/               → schema.ts (JSON-LD), fonts.ts, seo.ts
  constants/         → site.ts (SITE_CONFIG, NAV_LINKS)
  types/             → TypeScript interfaces
  utils/             → cn.ts, formatDate.ts
public/
  images/            → All static images including gima-logo.jpg
```

### Data / Service layer rule

Components **never** import JSON directly. All data flows through `src/services/*.service.ts`. This is the seam where Supabase replaces local JSON in Phase 2 without touching any UI.

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
   | `RESEND_API_KEY` | `re_xxxx…` | Production, Preview |

4. **Add your sending domain in Resend:**
   - Sign in at [resend.com](https://resend.com)
   - Go to **Domains** → Add Domain → enter `gurushethra.com`
   - Add the DNS records Resend provides (SPF, DKIM, DMARC) to your domain registrar
   - Wait for verification (usually under 10 minutes)

5. **Deploy** — Vercel will run `npm run build` then serve from the edge. No additional configuration needed.

### Subsequent deploys

Every push to `main` triggers an automatic production deployment. Every PR gets a preview URL automatically.

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

All website copy lives in `src/data/*.json`. To update:

| What | File |
|---|---|
| Hero headline, stats, CTA | `src/data/hero.json` |
| Programs | `src/data/programs.json` |
| Instructor bio & timeline | `src/data/instructor.json` |
| Branches & timings | `src/data/branches.json` |
| FAQ & fees | `src/data/faq.json` |
| Achievements | `src/data/achievements.json` |
| Gallery | `src/data/gallery.json` |
| Events | `src/data/events.json` |
| Testimonials | `src/data/testimonials.json` |
| Phone, email, social links | `src/constants/site.ts` |

After any JSON change, commit and push — Vercel redeploys in ~30 seconds.

---

## Phase 2 — Admin Panel & Database (future)

Phase 1 is the public website backed by local JSON. Phase 2 will add:
- Supabase for data storage
- Admin panel for content management

Only `src/services/*.service.ts` needs updating — the UI is unchanged. The async function signatures are already compatible.

---

## License

Private — all rights reserved. Gurushethra Institute of Martial Arts.
