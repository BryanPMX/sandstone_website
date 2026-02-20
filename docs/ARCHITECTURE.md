# Architecture & Design Principles

This project follows **SOLID** principles and a **clean file architecture** so that features can be extended without modifying existing code.

---

## SOLID Mapping

| Principle | Application |
|-----------|-------------|
| **S**ingle Responsibility | Each module has one reason to change: `schemas/` = validation, `services/` = external I/O, `actions/` = orchestration, property card = display one listing, listing section = layout and composition only. |
| **O**pen/Closed | New CRMs: implement `ILeadSubmissionService` and swap in; new property sources: pass different `properties` into `FeaturedListingsSection` without changing the component. |
| **L**iskov Substitution | Any `ILeadSubmissionService` implementation can replace `leadSubmissionService`; any `PropertyCard[]` from constants, API, or CMS works with the listing section and grid. |
| **I**nterface Segregation | Small contracts: `LeadInput`, `SubmitLeadState`, `PropertyCard`, `ILeadSubmissionService`. No fat interfaces. |
| **D**ependency Inversion | Actions depend on `@/config` and `@/services` (abstractions), not on `process.env` or `fetch` directly. Page injects `properties` into sections. |

---

## Design Patterns

- **Repository-style data injection** — The home page fetches properties (MSL or fallback) and passes them into `<FeaturedListingsSection properties={...} />`. Data can later come from constants, an API, or a CMS without changing the section or card components.
- **Service abstraction** — Lead submission is behind `ILeadSubmissionService`; the Server Action orchestrates validation and calls the service. Easy to add HubSpot, Salesforce, or a mock for tests.
- **Single source of truth for validation** — `LeadSchema` in `schemas/lead.ts` is used by the Server Action; the same schema can be reused for client-side validation if needed.
- **Centralized config** — `config/env.ts` owns environment variables so the rest of the app depends on a stable API, not `process.env` keys.
- **Design tokens** — Brand colors and semantics live in `src/app/globals.css` as CSS variables and are referenced by Tailwind and components for consistent theming.

---

## Folder Structure

```
src/
├── actions/           # Server Actions (orchestration only)
│   └── submit-lead.ts
├── app/               # Next.js App Router
│   ├── globals.css    # Design tokens (brand palette), Tailwind, base styles
│   ├── layout.tsx     # Root layout, Montserrat font (next/font), metadata
│   ├── page.tsx       # Home: fetch properties, compose sections
│   ├── sell/          # Sell My House stub page
│   ├── rent/          # Rent My House stub page
│   ├── join/          # Join the Team stub page
│   ├── listings/[id]/ # Listing detail (dynamic)
│   ├── privacy-policy/
│   └── terms-and-conditions/
├── components/
│   ├── ui/            # Primitives (Button, Input, Card, Label, Textarea, rolling-number)
│   ├── properties/    # BentoGrid, PropertyCard (presentational; used where needed)
│   ├── sections/      # FeaturedListingsSection, PrimaryActionTiles, AboutSection
│   ├── SiteHeader.tsx      # Sticky top app bar, logo, nav, hamburger
│   ├── HeroSection.tsx     # Hero image, lockup, pill search + Search button
│   ├── MobileMenuPortal.tsx # Slide-over menu (mobile)
│   ├── ContactForm.tsx
│   ├── SiteFooter.tsx
│   └── ViewOnlyDocument.tsx # Legal doc view-only wrapper
├── config/            # Environment & app config
│   └── env.ts
├── constants/         # Static data, nav, copy
│   ├── site.ts        # SITE_NAV, contact, footer, about, hero CTA, agents, etc.
│   └── properties.ts  # (if any static property data)
├── lib/               # Pure utilities (cn, zod helpers)
│   ├── utils.ts
│   └── zod.ts
├── schemas/           # Validation (Zod schemas)
│   └── lead.ts
├── services/          # External I/O (CRM webhooks, MSL feed)
│   ├── lead.service.ts
│   └── msl.service.ts
└── types/             # Shared TypeScript contracts
    ├── lead.ts
    ├── property.ts
    ├── agent.ts
    ├── gallery.ts
    └── index.ts
```

**Dependency flow:** `app` to `components` to `ui`; `actions` to `schemas`, `config`, `services`; `components` to `types`. No circular dependencies; types and schemas stay dependency-free.

---

## Adding a New CRM

1. Add a new file under `services/`, e.g. `hubspot.service.ts`.
2. Implement `ILeadSubmissionService` (same `submit(payload, url)` contract).
3. In the action (or a small factory in `config`), choose which service to use (e.g. by env var). No need to change the rest of the action or the form.

---

## Adding a New Data Source for Properties

1. Create a function or module that returns `PropertyCard[]` (e.g. in `constants/`, or a new layer that calls an API).
2. In the home page (or a layout/data wrapper), fetch that array and pass it into `<FeaturedListingsSection properties={...} />`.
3. `FeaturedListingsSection` and card/link behavior remain unchanged (Open/Closed). The listing detail page `/listings/[id]` currently uses the same `fetchMslPropertyCards()` and finds by `id`; a future single-property fetch could be added without changing the section.
