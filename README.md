# Sandstone Real Estate Team — Official Website

**Tagline:** *Luxury. Lifestyle. Legacy.*

Next.js 15 (App Router) marketing site for **Sandstone Real Estate Team**, serving El Paso, Texas & Fort Bliss. Built for performance, maintainability, and seamless integration with **Rolu** for lead capture and listing feeds.

---

## Table of Contents

- [Purpose & Overview](#purpose--overview)
- [Design System](#design-system)
- [Tech Stack & Implementation](#tech-stack--implementation)
- [Architecture & Patterns](#architecture--patterns)
- [Features & Sections](#features--sections)
- [Lead Form & CRM (Rolu)](#lead-form--crm-rolu)
- [Property Listings & MSL Feed](#property-listings--msl-feed)
- [Configuration & Environment](#configuration--environment)
- [Setup, Run & Deploy](#setup-run--deploy)
- [Extending the Codebase](#extending-the-codebase)
- [Project Structure](#project-structure)
- [Further Documentation](#further-documentation)

---

## Purpose & Overview

This site is the primary web presence for Sandstone Real Estate Team. It:

- **Showcases** the team’s brand, expertise, and listings with a premium, cinematic feel.
- **Captures leads** via a contact form and sends them to Rolu (webhook) for CRM follow-up.
- **Displays listings** from an optional MSL feed (also Rolu-driven); without a feed, curated demo data is shown.
- **Stays maintainable** via SOLID-aligned structure, clear separation of config, validation, services, and UI.

The implementation favors **server-side data** (properties fetched in the page), **Server Actions** for form submission, and **presentational components** that receive data from the page—so adding new CRMs or data sources does not require changing existing UI code.

---

## Design System

### Brand Identity

- **Voice:** Boutique, trust-based, concierge-level service; “cinematic” and intentional.
- **Audience:** Buyers, sellers, and military/relocation families in El Paso & Fort Bliss.

### Color Palette (Tailwind)

| Token | Hex | Usage |
|-------|-----|--------|
| `sandstone-base` | `#e7d6c3` | Warm base, accents, secondary surfaces |
| `sandstone-bronze` | `#b88746` | Primary CTAs, gold highlights |
| `sandstone-navy` | `#4b1f2f` | Trust, hero background, headings |
| `sandstone-bg` | `#f6efe7` | Page background base |
| `sandstone-text` | `#3a2b25` | Body text |
| `sandstone-brown` | `#6a4632` | Supporting elements |
| `sandstone-maroon` | `#5a2232` | Dark accents |

These are extended in `tailwind.config.ts` and mirrored in `src/app/globals.css` as HSL variables for Shadcn/UI (e.g. `--primary`, `--background`), including a **dark** theme variant.

### Typography

- **Font:** Montserrat (Google Fonts via `next/font`).
  - **Weights:** 400, 500, 600, 700.
  - **Headings:** `font-heading` (Montserrat Bold).
  - **Body:** `font-sans` (Montserrat), `antialiased`.
- **CSS variables:** `--font-montserrat`, `--font-montserrat-bold` (set in `layout.tsx`).

### Visual Effects

- **Background:** Radial and linear gradients (bronze/maroon tints) in `globals.css` for a warm, premium feel.
- **Glassmorphism:** `.glass`, `.glass-warm`, `.section-frame`, `.panel-glass` for cards and overlays.
- **Motion:** Framer Motion for section reveal, staggered grids, and hero copy; custom keyframes: `sandstone-fade-up`, `sandstone-light-sweep`, `sandstone-orb-drift`.
- **Hero:** Full-bleed video with gradient overlay; optional `hero-video.mp4` and `hero-poster.jpg` in `public/`. Fallback gradient if video is missing.

---

## Tech Stack & Implementation

| Layer | Choice | Notes |
|-------|--------|--------|
| **Framework** | Next.js 15 (App Router) | RSC by default, Turbopack in dev |
| **Language** | TypeScript 5.7 | Strict types, shared contracts in `types/` |
| **Styling** | Tailwind CSS 3.4 | Brand tokens + Shadcn semantic tokens |
| **UI Primitives** | Radix (Slot), CVA, clsx, tailwind-merge | Buttons, inputs, cards, labels, textarea in `components/ui/` |
| **Animation** | Framer Motion 11 | Hero, sections, BentoGrid stagger |
| **Icons** | Lucide React | Tree-shaken via Next config |
| **Validation** | Zod 3.24 | Single schema for lead form; reused server-side |
| **CRM / Data** | Rolu webhooks | Lead webhook + optional MSL feed URL |

**Next.js config:** `next.config.ts` sets `remotePatterns` for images (any https/http host) and `optimizePackageImports` for `lucide-react` and `framer-motion` to optimize bundles (e.g. for Vercel edge).

---

## Architecture & Patterns

The codebase follows **SOLID** and a **clean, layered structure** so features can be extended without modifying existing code.

### SOLID Mapping

| Principle | Application |
|-----------|-------------|
| **S**ingle Responsibility | One reason to change per module: `schemas/` = validation, `services/` = external I/O, `actions/` = orchestration, `PropertyCard` = one listing, `BentoGrid` = layout only. |
| **O**pen/Closed | New CRMs: implement `ILeadSubmissionService` and swap in; new property sources: pass different `properties` into `BentoGrid` without changing the component. |
| **L**iskov Substitution | Any `ILeadSubmissionService` implementation can replace the default; any `PropertyCard[]` from constants, API, or CMS works with `BentoGrid`. |
| **I**nterface Segregation | Small contracts: `LeadInput`, `SubmitLeadState`, `PropertyCard`, `ILeadSubmissionService`. No fat interfaces. |
| **D**ependency Inversion | Actions depend on `@/config` and `@/services` (abstractions), not on `process.env` or `fetch` directly. Page injects `properties` into `BentoGrid`. |

### Design Patterns in Use

- **Repository-style data injection** — The home page fetches properties (MSL or fallback) and passes them into `<PropertyShowcaseSection properties={...} />` and thus `BentoGrid`. Data can later come from constants, an API, or a CMS without changing the grid.
- **Service abstraction** — Lead submission is behind `ILeadSubmissionService`; the Server Action validates and calls the service. Easy to add HubSpot, Salesforce, or a mock for tests.
- **Single source of truth for validation** — `LeadSchema` in `schemas/lead.ts` is used by the Server Action; the same schema can be reused for client-side validation if needed.
- **Centralized config** — `config/env.ts` owns environment variables so the rest of the app depends on a stable API, not raw `process.env` keys.

### Dependency Flow

- **App → components → ui** (pages compose sections and UI primitives).
- **actions → schemas, config, services** (orchestration only; no direct fetch/env in actions).
- **components → types** (shared contracts).
- Types and schemas stay dependency-free; no circular dependencies.

---

## Features & Sections

The home page is a single scroll with these sections (order reflected in `src/app/page.tsx`):

| Section | Component | Purpose |
|---------|-----------|---------|
| Header | `SiteHeader` | Nav (from `SITE_NAV`), branding |
| Hero | `HeroSection` | Full-bleed video, title, slogan, rotating tagline, CTAs (Schedule Tour, Tour Listings) |
| About | `AboutSection` | Headline + copy from `constants/site` |
| Experience strip | `ExperienceStrip` | Horizontal trust/experience strip |
| Property showcase | `PropertyShowcaseSection` | Bento grid of listings (from MSL or fallback) |
| Gallery | `GallerySection` | Image gallery (currently derived from first 9 properties) |
| Our successes | `OurSuccessesSection` | Stats (rolling numbers), social proof |
| News | `NewsSection` | Content boxes from `NEWS_ITEMS` |
| Agents | `AgentsSection` | Team profiles from `AGENTS` (name, title, image, contact, tagline, about, specialties, socials) |
| Contact | `ContactForm` | Lead form → Server Action → Rolu webhook |
| Footer | `SiteFooter` | Contact, address, hours, credits, social links |
| Sticky CTA | `StickyCTA` | Persistent call-to-action |

Content for nav, hero, about, stats, news, agents, contact, and footer lives in **`src/constants/site.ts`** as the single source of truth for copy and links.

---

## Lead Form & CRM (Rolu)

### Flow

1. User submits the form (firstName, lastName, email, phone, message).
2. **Server Action** `submitLead` in `src/actions/submit-lead.ts` runs:
   - Builds raw payload from `FormData`.
   - Validates with **Zod** `LeadSchema` (see `schemas/lead.ts`).
   - Reads webhook URL from **config** (`getRoluWebhookUrl()`).
   - Calls **`leadSubmissionService.submit(payload, webhookUrl)`** (implementation in `services/lead.service.ts`: POST JSON to webhook).
3. Action returns **`SubmitLeadState`**: either `{ success: true, message }` or `{ success: false, error, fieldErrors? }`.
4. **ContactForm** uses `useActionState(submitLead, null)` and renders success/error and field-level errors from `state`.

### Payload Sent to Rolu

JSON body (Zod-validated):

- `firstName`, `lastName`, `email`, `phone` (required), `message` (optional, default `""`).

### Validation Rules (LeadSchema)

- `firstName` / `lastName`: min 1, max 100.
- `email`: valid email.
- `phone`: min 1, max 30.
- `message`: max 2000, optional.

Field errors from Zod are mapped to `Record<string, string[]>` via **`lib/zod.ts`** (`zodIssuesToFieldErrors`) for display next to inputs.

---

## Property Listings & MSL Feed

### Data Flow

1. **Home page** (Server Component) calls **`fetchMslPropertyCards()`** from `services/msl.service.ts`.
2. **MSL service**:
   - Reads **`MSL_FEED_URL`** from config. If unset, returns **fallback demo listings** (curated `PropertyCard[]`).
   - If set: fetches feed with `next: { revalidate: 300 }` (5-minute cache), parses JSON array, and maps each item to **`PropertyCard`** (id, title, location, price, image, beds, baths, sqft, featured). Handles multiple possible field names (e.g. `beds`/`bedrooms`, `image.url`/`photo`).
3. Page passes **`properties`** into:
   - **PropertyShowcaseSection** → **BentoGrid** (grid of **PropertyCard** components),
   - and a **gallery** derived from the first 9 properties (image, title, location, price, stats string).

So the **UI never fetches data**; it only receives `PropertyCard[]` from the page. The data source can be swapped (e.g. different API or CMS) by changing how the page gets `properties`.

### PropertyCard Contract

Defined in `types/property.ts`: `id`, `title`, `location`, `price`, `image`, optional `beds`, `baths`, `sqft`, `featured`. The MSL service normalizes the feed into this shape; fallback data already matches it.

---

## Configuration & Environment

All env access is centralized in **`src/config/env.ts`**:

| Variable | Purpose |
|----------|---------|
| **`ROLU_WEBHOOK_URL`** | Rolu webhook URL for lead form submissions. If unset, form returns a “not configured” message. |
| **`MSL_FEED_URL`** | Optional. HTTP endpoint returning a JSON array of listing objects. If unset or on error, demo listings are used. |

No other code should read `process.env` directly; use `getRoluWebhookUrl()` and `getMslFeedUrl()`.

---

## Setup, Run & Deploy

### Prerequisites

- Node.js (LTS recommended)
- npm (or pnpm/yarn)

### Local setup

```bash
npm install
cp .env.example .env
# Edit .env: set ROLU_WEBHOOK_URL (from Rolu dashboard). Optionally set MSL_FEED_URL.
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). Dev runs with **Turbopack** (`next dev --turbopack`).

### Hero video (optional)

- Add **`public/hero-video.mp4`** for the full-screen hero background.
- Add **`public/hero-poster.jpg`** as poster when video is loading.
- If the video is missing, the hero still renders with a gradient overlay.

### Static images (community, news, hero)

- **Our Community** (slideshow in Our Successes): images are driven by `GALLERY_IMAGES` in `src/constants/site.ts`. Place files in **`public/community/`** (e.g. `1.jpg` … `5.jpg`) and keep the array in sync.
- **News section**: each of the three news cards uses **`public/news/1.jpg`**, **`public/news/2.jpg`**, **`public/news/3.jpg`**. Add or rename files there and add matching entries to `NEWS_ITEMS` in `site.ts` if you add more cards.
- **Hero poster**: **`public/hero-poster.jpg`** is used as the cinematic hero/video poster; replace this file to change the hero still.
- **Extra marketing assets**: **`public/marketing/`** holds additional marketing images (e.g. `4.jpg`, `5.jpg`) for future use (e.g. more news items or alternate hero imagery).

### Scripts

| Script | Command | Purpose |
|--------|---------|---------|
| **dev** | `next dev --turbopack` | Development server |
| **build** | `next build` | Production build |
| **start** | `next start` | Run production server |
| **lint** | `next lint` | ESLint |

### Deploy (e.g. Vercel)

The contact form submits leads via a server action that reads **`ROLU_WEBHOOK_URL`** at runtime. On Vercel, that value comes from **Environment Variables**, not from a local `.env` file. If it’s missing in Vercel, the form will show: *"Lead submission is not configured. Please try again later."*

**Set the webhook URL in Vercel:**

1. In the [Vercel dashboard](https://vercel.com/dashboard), open your project.
2. Go to **Settings → Environment Variables**.
3. Add **`ROLU_WEBHOOK_URL`** with your Go High Level (or other CRM) inbound webhook URL, e.g.  
   `https://services.leadconnectorhq.com/hooks/.../webhook-trigger/...`
4. Choose **Production** (and **Preview** if you want it on branch deployments), then Save.
5. **Redeploy** the project (Deployments → ⋮ on latest → Redeploy) so the new variable is applied.

Optionally add **`MSL_FEED_URL`** the same way if you use the MSL listings feed.

- Images and fonts are tuned for edge; no extra config required. Next config already allows remote images and optimizes the listed packages.

---

## Extending the Codebase

### Adding a New CRM (e.g. HubSpot)

1. Add a new file under **`services/`**, e.g. `hubspot.service.ts`.
2. Implement **`ILeadSubmissionService`**: `submit(payload: LeadInput, webhookUrl: string): Promise<LeadSubmissionResult>`.
3. In the Server Action (or a small factory in `config`), choose which service to use (e.g. by env var). The rest of the action and the form stay unchanged.

### Adding a New Data Source for Properties

1. Create a function or module that returns **`PropertyCard[]`** (e.g. in `constants/`, or a new `repositories/` or `data/` layer that calls an API).
2. In the page (or a layout/data wrapper), fetch that array and pass it into `<PropertyShowcaseSection properties={...} />` / `<BentoGrid properties={...} />`.
3. **BentoGrid** and **PropertyCard** remain unchanged (Open/Closed).

---

## Project Structure

```
standstone_website/
├── .gitignore
├── README.md                 # This file
├── docs/
│   ├── ARCHITECTURE.md       # SOLID, folder structure, patterns
│   └── ROLU-WORKFLOW.md      # Rolu MSL feed + webhook workflow
├── public/
│   ├── agents-1.jpg … agents-4.jpg
│   ├── logo.jpg
│   ├── hero-video.mp4        # optional
│   ├── hero-poster.jpg       # optional (cinematic hero poster)
│   ├── community/            # Our Community slideshow (1.jpg … 5.jpg)
│   ├── news/                 # News section cards (1.jpg, 2.jpg, 3.jpg)
│   └── marketing/            # Extra marketing images for future use
├── src/
│   ├── actions/              # Server Actions (orchestration)
│   │   └── submit-lead.ts
│   ├── app/
│   │   ├── globals.css       # Tailwind, brand CSS, utilities
│   │   ├── layout.tsx        # Root layout, fonts, metadata
│   │   └── page.tsx          # Home: fetch properties, compose sections
│   ├── components/
│   │   ├── ui/               # Primitives (button, input, card, label, textarea, rolling-number)
│   │   ├── properties/      # BentoGrid, PropertyCard (presentational)
│   │   ├── sections/        # ExperienceStrip, GallerySection, HeroMeta, PropertyShowcaseSection
│   │   ├── AboutSection.tsx
│   │   ├── AgentsSection.tsx
│   │   ├── ContactForm.tsx
│   │   ├── HeroSection.tsx
│   │   ├── NewsSection.tsx
│   │   ├── OurSuccessesSection.tsx
│   │   ├── SiteFooter.tsx
│   │   ├── SiteHeader.tsx
│   │   ├── StatsSection.tsx
│   │   └── StickyCTA.tsx
│   ├── config/
│   │   ├── env.ts            # getRoluWebhookUrl(), getMslFeedUrl()
│   │   └── index.ts
│   ├── constants/
│   │   ├── index.ts
│   │   ├── properties.ts     # (if any static property data)
│   │   └── site.ts           # Nav, contact, address, hero, about, stats, news, agents, footer
│   ├── lib/
│   │   ├── index.ts
│   │   ├── utils.ts          # cn(), etc.
│   │   └── zod.ts            # zodIssuesToFieldErrors
│   ├── schemas/
│   │   ├── index.ts
│   │   └── lead.ts           # LeadSchema (Zod)
│   ├── services/
│   │   ├── index.ts
│   │   ├── lead.service.ts   # ILeadSubmissionService, Rolu webhook impl
│   │   └── msl.service.ts    # fetchMslPropertyCards(), MSL feed + fallback
│   └── types/
│       ├── index.ts
│       ├── agent.ts
│       ├── gallery.ts
│       ├── lead.ts            # LeadInput, SubmitLeadState
│       └── property.ts        # PropertyCard
├── eslint.config.mjs
├── next.config.ts
├── package.json
├── postcss.config.mjs
├── tailwind.config.ts
└── tsconfig.json
```

---

## Further Documentation

- **[docs/ARCHITECTURE.md](docs/ARCHITECTURE.md)** — SOLID mapping, design patterns, folder roles, adding a new CRM or property data source.
- **[docs/ROLU-WORKFLOW.md](docs/ROLU-WORKFLOW.md)** — Rolu workflow for MSL feed and lead webhook: expected payloads, env vars, and recommended workflow structure.

---

*Sandstone Real Estate Team — Luxury. Lifestyle. Legacy.*
