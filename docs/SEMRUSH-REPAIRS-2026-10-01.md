# Semrush repairs, October 1, 2026

Prepared from September 30 Semrush audit. Branch: `fix/semrush-seo-2026-10-01`.

Implemented:
- Shared production origin for blog canonicals, structured data, share URLs and sitemap; permanent bare-domain redirect preserving query strings.
- Areas index with links to existing neighborhood guides; permanent redirects for three retired neighborhood category URLs; obsolete Fort Bliss category links updated.
- Page-one listing URL normalization preserving filters; self-canonical pagination and distinct page metadata.
- Correct existing Target asset path in Santa Teresa.
- One primary heading for home, PCS, rent, BAH guide, new-build guide and article body hierarchy.
- Short SEO titles for two articles and descriptive event link text.
- Footer links to existing map and military resources; static team profile links on join page.
- Missing `/buy` and `/about` pages removed from sitemap; actual neighborhood guides added.
- Midland sanitation link replaced with current official Solid Waste page: https://midlandtexas.gov/149/Solid-Waste
- Nullable pathname handled in SiteHeader for TypeScript compatibility.

Validation completed:
- SEO content regression checks passed.
- TypeScript passed.
- Focused ESLint reported no errors, with existing unused-variable warnings.
- Next.js 15.5.22 production build passed in an isolated verification directory.
- 17 HTTP checks passed: areas 200, category redirects, page-one redirect preserving filters, www redirect preserving query, one H1 across six routes, blog canonicals, optimized Target image 200 and page-two self-canonical.
- Actual Spark credentials, production form submissions and CRM delivery were not exercised locally.

Pending external validation:
- GitHub authenticated and repair branch uploaded. Authenticate Vercel and confirm connected production project, branch and permanent primary-domain redirect. A Vercel-level 307 can execute before application middleware and must be changed there.
- Preview live Spark/MLS queries, maps, inquiry forms, GoHighLevel integrations, analytics and mobile layout using existing configuration. No production forms submitted during local checks.
- Crawl again in Semrush after publication. The audit used JavaScript rendering disabled; low text-to-HTML ratios and word counts require page-quality review, not automatic padding.
- WhatsApp 429 responses and Spark images excluded by provider robots require provider/human verification. Do not remove working WhatsApp links or bypass MLS restrictions.
- Semrush Position Tracking India market must be corrected for the intended El Paso market; backlink quality requires separate review without automatic disavow.
- llms.txt is optional; it is not required to resolve Google indexing errors.
- Listing aliases with Spark parameters remain intact because Spark IDs are used to fetch property details.

Rollback: revert the repair commit(s) and redeploy the previous Vercel production version. Production has not been modified by preparing this branch.
