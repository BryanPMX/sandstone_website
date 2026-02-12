# Architecture & Design Principles

This project follows **SOLID** principles and a **clean file architecture** so that features can be extended without modifying existing code.

---

## SOLID Mapping

| Principle | Application |
|-----------|-------------|
| **S**ingle Responsibility | Each module has one reason to change: `schemas/` = validation, `services/` = external I/O, `actions/` = orchestration, `PropertyCard` = display one listing, `BentoGrid` = layout only. |
| **O**pen/Closed | New CRMs: implement `ILeadSubmissionService` and swap in; new property sources: pass different `properties` into `BentoGrid` without changing the component. |
| **L**iskov Substitution | Any `ILeadSubmissionService` implementation can replace `leadSubmissionService`; any `PropertyCard[]` from constants, API, or CMS works with `BentoGrid`. |
| **I**nterface Segregation | Small contracts: `LeadInput`, `SubmitLeadState`, `PropertyCard`, `ILeadSubmissionService`. No fat interfaces. |
| **D**ependency Inversion | Actions depend on `@/config` and `@/services` (abstractions), not on `process.env` or `fetch` directly. Page injects `properties` into `BentoGrid`. |

---

## Design Patterns

- **Repository-style data injection** — `BentoGrid` receives `properties` from the page; data can come from constants, an API, or a future repository without changing the grid.
- **Service abstraction** — Lead submission is behind `ILeadSubmissionService`; the Server Action orchestrates validation and calls the service. Easy to add HubSpot, Salesforce, or a mock for tests.
- **Single source of truth for validation** — `LeadSchema` in `schemas/lead.ts` is used by the Server Action; client-side validation can reuse the same schema.
- **Centralized config** — `config/env.ts` owns environment variables so the rest of the app depends on a stable API, not `process.env` keys.

---

## Folder Structure

```
src/
├── actions/           # Server Actions (orchestration only)
│   └── submit-lead.ts
├── app/                # Next.js App Router (pages, layout, global styles)
├── components/
│   ├── ui/             # Primitives (Button, Input, Card, etc.)
│   ├── properties/     # Property grid + card (presentational)
│   ├── HeroSection.tsx
│   └── ContactForm.tsx
├── config/             # Environment & app config (single place for env)
│   └── env.ts
├── constants/          # Static data (e.g. mock properties)
│   └── properties.ts
├── lib/                # Pure utilities (cn, zod helpers)
│   ├── utils.ts
│   └── zod.ts
├── schemas/            # Validation (Zod schemas, single source of truth)
│   └── lead.ts
├── services/           # External I/O (CRM webhooks, future APIs)
│   └── lead.service.ts
└── types/              # Shared TypeScript types & contracts
    ├── lead.ts
    ├── property.ts
    └── index.ts
```

**Dependency flow:** `app` → `components` → `ui`; `actions` → `schemas`, `config`, `services`; `components` → `types`. No circular dependencies; types and schemas stay dependency-free.

---

## Adding a New CRM

1. Add a new file under `services/`, e.g. `hubspot.service.ts`.
2. Implement `ILeadSubmissionService` (same `submit(payload, url)` contract).
3. In the action (or a small factory in `config`), choose which service to use (e.g. by env var). No need to change the rest of the action or the form.

---

## Adding a New Data Source for Properties

1. Create a function or module that returns `PropertyCard[]` (e.g. in `constants/`, or a new `repositories/` or `data/` layer that calls an API).
2. In the page (or a layout/data wrapper), pass that array into `<BentoGrid properties={...} />`.
3. `BentoGrid` and `PropertyCard` remain unchanged (Open/Closed).
