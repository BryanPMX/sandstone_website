# Sandstone Real Estate Group — Official Website

**Tagline:** *Luxury. Lifestyle. Legacy.*

Next.js 15 (App Router) marketing site for **Sandstone Real Estate Group**, serving El Paso, Texas and the Southwest. The UI is aligned with the brand identity (colors, typography, tone) and built for performance, maintainability, and integration with **Rolu** for lead capture and listing feeds.

---

## Table of Contents

- [Purpose & Overview](#purpose--overview)
- [Brand Identity & Design System](#brand-identity--design-system)
- [Tech Stack & Implementation](#tech-stack--implementation)
- [Architecture & Patterns](#architecture--patterns)
- [Routes & Page Structure](#routes--page-structure)
- [Home Page Sections](#home-page-sections)
- [Lead Form & CRM (Rolu)](#lead-form--crm-rolu)
- [Property Listings & MSL Feed](#property-listings--msl-feed)
- [Configuration & Environment](#configuration--environment)
- [Setup, Run & Deploy](#setup-run--deploy)
- [Extending the Codebase](#extending-the-codebase)
- [Project Structure](#project-structure)
- [Further Documentation](#further-documentation)

---

## Purpose & Overview

This site is the primary web presence for Sandstone Real Estate Group. It:

- **Showcases** the brand, expertise, and listings with a clean, cinematic, luxury-and-lifestyle feel per the brand guideline.
- **Captures leads** via a contact form and sends them to Rolu (webhook) for CRM follow-up.
- **Displays listings** from an optional MSL feed (Rolu-driven); without a feed, curated demo data is shown.
- **Stays maintainable** via SOLID-aligned structure, clear separation of config, validation, services, and UI.

The implementation favors **server-side data** (properties fetched in the page), **Server Actions** for form submission, and **presentational components** that receive data from the page.

---

## Brand Identity & Design System

The UI follows the brand identity document (colors, typography, tone, design style).

### Voice & Tone

- **Voice:** Confident, insightful, and human.
- **Design style:** Clean, cinematic, warm; luxury and lifestyle. Real architectural and natural-light imagery where used.

### Design Tokens (CSS Variables)

All brand colors are defined in **`src/app/globals.css`** under `:root` and used consistently across header, buttons, cards, typography, and backgrounds.

| Token | Value | Usage |
|-------|--------|--------|
| `--sandstone-navy` | `#253471` | Primary dark (trust, header, footer, overlays) |
| `--sandstone-navy-deep` | `#1d2858` | Deep Navy (gradients) |
| `--sandstone-sand-gold` | `#b79678` | Sand Gold (luxury, warmth, primary accent, CTAs) |
| `--sandstone-bronze` | `#8b7355` | Bronze accent |
| `--sandstone-off-white` | `#f8f6f3` | Off-White (backgrounds, light surfaces) |
| `--sandstone-charcoal` | `#2d2f36` | Charcoal (body text) |
| `--sandstone-white` | `#ffffff` | White |

These are also exposed in **`tailwind.config.ts`** (e.g. `sandstone-navy`, `sandstone-sand-gold`) and mirrored as HSL variables for Shadcn/UI semantics (`--primary`, `--background`, etc.).

### Typography

- **Font:** Montserrat (Google Fonts via **`next/font/google`** in `src/app/layout.tsx`).
  - **Weights:** 400 (Regular), 600, 700 (Bold).
  - **Loading:** `display: "swap"`, `preload: true`, subset `latin`.
- **Usage:** Headlines use Montserrat Bold; body uses Montserrat Regular. Both are applied via the same `--font-montserrat` variable; Tailwind `font-heading` and `font-sans` reference it.

### Visual Style

- **Header:** Sticky top app bar; background Deep Navy; logo and icons in Sand Gold or Off-White.
- **Hero:** Full-width cinematic image with navy overlay gradient; centered brand lockup; pill-shaped search and primary Search button.
- **Cards and tiles:** Rounded corners, clear hierarchy, gradient overlays on listing thumbnails where needed.
- **Footer:** Deep Navy background; centered brand mark and copy; compliance logos row; bottom links (Privacy Policy, Terms & Conditions).

---

## Tech Stack & Implementation

| Layer | Choice | Notes |
|-------|--------|------|
| **Framework** | Next.js 15 (App Router) | RSC by default, Turbopack in dev |
| **Language** | TypeScript 5.7 | Strict types, shared contracts in `types/` |
| **Styling** | Tailwind CSS 3.4 | Brand tokens + design-token CSS vars + Shadcn semantic tokens |
| **UI Primitives** | Radix (Slot), CVA, clsx, tailwind-merge | Button, input, card, label, textarea in `components/ui/` |
| **Animation** | Framer Motion 11 | Used where needed (e.g. ContactForm) |
| **Icons** | Lucide React | Tree-shaken via Next config |
| **Validation** | Zod 3.24 | Single schema for lead form; reused server-side |
| **CRM / Data** | Rolu webhooks | Lead webhook + optional MSL feed URL |

**Next.js config:** `next.config.ts` sets `remotePatterns` for images (any https/http host) and `optimizePackageImports` for `lucide-react` and `framer-motion`.

---

## Architecture & Patterns

The codebase follows **SOLID** and a **layered structure** so features can be extended without modifying existing code.

### SOLID Mapping

| Principle | Application |
|-----------|-------------|
| **S**ingle Responsibility | One reason to change per module: `schemas/` = validation, `services/` = external I/O, `actions/` = orchestration, property card = one listing, grid/section = layout and composition. |
| **O**pen/Closed | New CRMs: implement `ILeadSubmissionService` and swap in; new property sources: pass different `properties` into listing sections without changing components. |
| **L**iskov Substitution | Any `ILeadSubmissionService` implementation can replace the default; any `PropertyCard[]` from constants, API, or CMS works with listing sections. |
| **I**nterface Segregation | Small contracts: `LeadInput`, `SubmitLeadState`, `PropertyCard`, `ILeadSubmissionService`. |
| **D**ependency Inversion | Actions depend on `@/config` and `@/services`; page injects `properties` into sections. |

### Design Patterns

- **Repository-style data injection** — The home page fetches properties (MSL or fallback) and passes them into `<FeaturedListingsSection properties={...} />`. Data can come from constants, an API, or a CMS without changing the section.
- **Service abstraction** — Lead submission is behind `ILeadSubmissionService`; the Server Action validates and calls the service.
- **Single source of truth for validation** — `LeadSchema` in `schemas/lead.ts` is used by the Server Action.
- **Centralized config** — `config/env.ts` owns environment variables.

### Dependency Flow

- **App to components to ui** (pages compose sections and UI primitives).
- **actions to schemas, config, services** (orchestration only).
- **components to types** (shared contracts).
- Types and schemas stay dependency-free; no circular dependencies.

---

## Routes & Page Structure

| Route | Type | Purpose |
|-------|------|---------|
| `/` | Static | Home: hero, Sandstone Collection, action tiles, about, contact, footer |
| `/sell` | Static | Stub: Sell My House; CTA to contact |
| `/rent` | Static | Stub: Rent My House; CTA to contact |
| `/join` | Static | Stub: Join the Team; CTA to contact |
| `/listings/[id]` | Dynamic | Listing detail: image, price, title, location, details; CTA to contact |
| `/privacy-policy` | Static | Privacy policy (view-only doc or fallback link) |
| `/terms-and-conditions` | Static | Terms and conditions (view-only doc or fallback link) |

**Anchors on home:** `/#about` (About section), `/#contact` (Contact form), `/#listings` (Sandstone Collection).

**Navigation (header and footer):** Sale a property (`/sell`), Rent a property (`/rent`), Join the Team (`/join`), About Us (`/#about`), Contact Us (`/#contact`). Content is driven by **`src/constants/site.ts`** (`SITE_NAV`).

---

## Home Page Sections

The home page is mobile-first and scrolls in this order (see `src/app/page.tsx`):

| Section | Component | Purpose |
|---------|-----------|---------|
| Top App Bar | `SiteHeader` | Sticky; Deep Navy; left = Sandstone mark (logo); right = hamburger opening slide-over menu. Desktop: centered nav links. |
| Hero | `HeroSection` | Full-width cinematic image (`hero.webp`) with navy overlay; centered brand lockup (logo + tagline); pill search input + Sand Gold Search button. Placeholder: "Enter an address, neighborhood in EP". |
| Featured Listings | `FeaturedListingsSection` | "Sandstone Collection" heading; 2-column grid of listing cards (thumbnail, bottom gradient, price, neighborhood); each card links to `/listings/[id]`. "View More" pill below grid. |
| Primary Action Tiles | `PrimaryActionTiles` | Three large rounded tiles: Sell My House (`/sell`), Rent My House (`/rent`), Join the Team (`/join`). Each uses a minimal icon and label. |
| About | `AboutSection` | Short headline and copy from `constants/site.ts` (about the team and market). |
| Contact | `ContactForm` | Lead form; Server Action to Rolu webhook; success/error and field-level validation. |
| Footer | `SiteFooter` | Centered brand mark and short brand paragraph; nav list (same as header); compliance logos row (Keller Williams, MLS); Privacy Policy and Terms & Conditions links; copyright. |

Content for nav, hero, about, contact, and footer lives in **`src/constants/site.ts`**.

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

JSON body (Zod-validated): `firstName`, `lastName`, `email`, `phone` (required), `message` (optional, default `""`).

### Validation Rules (LeadSchema)

- `firstName` / `lastName`: min 1, max 100.
- `email`: valid email.
- `phone`: min 1, max 30.
- `message`: max 2000, optional.

Field errors from Zod are mapped to `Record<string, string[]>` via **`lib/zod.ts`** for display next to inputs.

---

## Property Listings & MSL Feed

### Data Flow

1. **Home page** (Server Component) calls **`fetchMslPropertyCards()`** from `services/msl.service.ts`.
2. **MSL service**: Reads **`MSL_FEED_URL`** from config. If unset, returns **fallback demo listings** (`PropertyCard[]`). If set: fetches feed with `next: { revalidate: 300 }` (5-minute cache), parses JSON array, and maps each item to **`PropertyCard`** (id, title, location, price, image, beds, baths, sqft, featured). Handles multiple possible field names (e.g. `beds`/`bedrooms`, `image.url`/`photo`).
3. Page passes **`properties`** into **`FeaturedListingsSection`**, which renders a 2-column grid of cards; each card links to **`/listings/[id]`**.
4. **Listing detail page** (`/listings/[id]`) fetches the same list (or could be refactored to a single-property fetch), finds the item by `id`, and renders image, price, title, location, details, and a "Schedule a tour" CTA.

The **UI does not fetch data**; it receives `PropertyCard[]` from the page. The data source can be swapped by changing how the page gets `properties`.

### PropertyCard Contract

Defined in `types/property.ts`: `id`, `title`, `location`, `price`, `image`, optional `beds`, `baths`, `sqft`, `featured`. The MSL service normalizes the feed into this shape.

---

## Configuration & Environment

All env access is in **`src/config/env.ts`**:

| Variable | Purpose |
|----------|---------|
| **`ROLU_WEBHOOK_URL`** | Rolu webhook URL for lead form submissions. If unset, form returns a "not configured" message. |
| **`MSL_FEED_URL`** | Optional. HTTP endpoint returning a JSON array of listing objects. If unset or on error, demo listings are used. |

Use `getRoluWebhookUrl()` and `getMslFeedUrl()`; do not read `process.env` elsewhere.

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

### Static Assets (public/)

All site images live under **`public/`**. Do not rely on root-level image files; they are not served.

| Asset | Purpose |
|-------|---------|
| `logo-mark.webp` | Sandstone mark in header and footer |
| `logo-hero.webp` | Hero lockup (brand + tagline) |
| `hero.webp` | Full-width hero background image |
| `house1.webp`, `house2.webp` | Optional listing/feature imagery (e.g. fallbacks or future use) |
| `icon1.webp`, `icon2.webp`, `icon3.webp` | Icons for Primary Action Tiles (Sell, Rent, Join) |
| `keller-williams.webp`, `mls.webp` | Footer compliance logos |
| `agents-1.jpg` … `agents-4.jpg` | Agent photos (referenced in `constants/site.ts` for future use) |
| `privacy-policy.docx`, `terms-and-conditions.docx` | Source documents for view-only legal pages |

Replace or add files in `public/` as needed; update any references in `constants/site.ts` or components if paths or names change.

### Scripts

| Script | Command | Purpose |
|--------|---------|---------|
| **dev** | `next dev --turbopack` | Development server |
| **build** | `next build` | Production build |
| **start** | `next start` | Run production server |
| **lint** | `next lint` | ESLint |

### Deploy (e.g. Vercel)

The contact form submits leads via a Server Action that reads **`ROLU_WEBHOOK_URL`** at runtime. On Vercel, set that in **Environment Variables**. If it is missing, the form shows: *"Lead submission is not configured. Please try again later."*

1. In the Vercel dashboard, open your project.
2. Go to **Settings → Environment Variables**.
3. Add **`ROLU_WEBHOOK_URL`** with your webhook URL.
4. Optionally add **`MSL_FEED_URL`** for the listings feed.
5. Redeploy so the new variable is applied.

---

## Extending the Codebase

### Adding a New CRM (e.g. HubSpot)

1. Add a new file under **`services/`**, e.g. `hubspot.service.ts`.
2. Implement **`ILeadSubmissionService`**: `submit(payload: LeadInput, webhookUrl: string): Promise<LeadSubmissionResult>`.
3. In the Server Action (or a factory in config), choose which service to use. The rest of the action and the form stay unchanged.

### Adding a New Data Source for Properties

1. Create a function or module that returns **`PropertyCard[]`** (e.g. in `constants/`, or a new layer that calls an API).
2. In the page, fetch that array and pass it into `<FeaturedListingsSection properties={...} />`.
3. Listing section and card components remain unchanged (Open/Closed).

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
│   ├── logo-mark.webp        # Header/footer brand mark
│   ├── logo-hero.webp        # Hero lockup
│   ├── hero.webp             # Hero background
│   ├── house1.webp, house2.webp
│   ├── icon.webp, icon1.webp, icon2.webp, icon3.webp  # Action tile icons
│   ├── keller-williams.webp, mls.webp  # Footer compliance logos
│   ├── agents-1.jpg … agents-4.jpg     # Agent photos (site.ts)
│   ├── privacy-policy.docx
│   └── terms-and-conditions.docx
├── src/
│   ├── actions/
│   │   └── submit-lead.ts
│   ├── app/
│   │   ├── globals.css       # Design tokens, Tailwind, base styles
│   │   ├── layout.tsx        # Root layout, Montserrat font, metadata
│   │   ├── page.tsx          # Home: fetch properties, compose sections
│   │   ├── sell/page.tsx     # Sell My House stub
│   │   ├── rent/page.tsx    # Rent My House stub
│   │   ├── join/page.tsx    # Join the Team stub
│   │   ├── listings/[id]/page.tsx  # Listing detail
│   │   ├── privacy-policy/page.tsx
│   │   └── terms-and-conditions/page.tsx
│   ├── components/
│   │   ├── ui/               # Button, Input, Card, Label, Textarea, rolling-number
│   │   ├── properties/       # BentoGrid, PropertyCard (presentational)
│   │   ├── sections/         # FeaturedListingsSection, PrimaryActionTiles, AboutSection
│   │   ├── ContactForm.tsx
│   │   ├── HeroSection.tsx
│   │   ├── MobileMenuPortal.tsx  # Slide-over nav (mobile)
│   │   ├── SiteFooter.tsx
│   │   ├── SiteHeader.tsx
│   │   └── ViewOnlyDocument.tsx  # Legal doc view-only wrapper
│   ├── config/
│   │   ├── env.ts            # getRoluWebhookUrl(), getMslFeedUrl()
│   │   └── index.ts
│   ├── constants/
│   │   ├── index.ts
│   │   ├── properties.ts     # (if any static property data)
│   │   └── site.ts           # Nav, contact, footer, about, hero CTA, etc.
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
│   │   └── msl.service.ts   # fetchMslPropertyCards(), MSL feed + fallback
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

*Sandstone Real Estate Group — Luxury. Lifestyle. Legacy.*
