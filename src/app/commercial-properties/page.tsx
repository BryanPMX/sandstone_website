import type { Metadata } from "next";
import Link from "next/link";
import { Building2 } from "lucide-react";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";

const pagePath = "/commercial-properties";

export const metadata: Metadata = {
  title: "Commercial Properties | Sandstone Real Estate Group",
  description:
    "Explore commercial properties for sale and lease in the El Paso area.",
  alternates: { canonical: pagePath },
};

const listingTypes = [
  { key: "sale", label: "For Sale", heading: "Properties for sale" },
  { key: "lease", label: "For Lease", heading: "Properties for lease" },
] as const;

export default async function CommercialPropertiesPage({
  searchParams,
}: {
  searchParams: Promise<{ type?: string | string[] }>;
}) {
  const { type } = await searchParams;
  const selected = type === "lease" ? listingTypes[1] : listingTypes[0];

  return (
    <>
      <SiteHeader variant="lead" showDesktopCenterLogo={false} />

      <main className="bg-[var(--sandstone-off-white)] text-[var(--sandstone-navy-deep)]">
        <header className="bg-[var(--sandstone-navy-deep)] text-white">
          <div className="mx-auto max-w-6xl px-5 pb-11 pt-10 sm:px-8 sm:pb-16 sm:pt-14">
            <div
              aria-hidden="true"
              className="mb-5 h-0.5 w-12 bg-[var(--sandstone-sand-gold)]"
            />
            <h1 className="max-w-3xl font-heading text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
              Commercial Properties
            </h1>
            <p className="mt-4 max-w-xl text-sm leading-relaxed text-white/85 sm:text-base">
              Explore commercial properties for sale and lease in the El Paso
              area.
            </p>
          </div>
        </header>

        <div className="mx-auto max-w-6xl px-5 py-8 sm:px-8 sm:py-10">
          <nav
            aria-label="Commercial listing type"
            className="flex gap-6 border-b border-slate-300"
          >
            {listingTypes.map((listingType) => (
              <Link
                key={listingType.key}
                href={
                  listingType.key === "sale"
                    ? pagePath
                    : `${pagePath}?type=lease`
                }
                scroll={false}
                aria-current={
                  selected.key === listingType.key ? "page" : undefined
                }
                className="inline-flex min-h-12 items-center border-b-2 border-transparent px-1 text-sm font-semibold text-slate-600 transition hover:text-[var(--sandstone-navy)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--sandstone-navy)] aria-[current=page]:border-[var(--sandstone-navy)] aria-[current=page]:text-[var(--sandstone-navy)]"
              >
                {listingType.label}
              </Link>
            ))}
          </nav>

          <section aria-labelledby="commercial-listings" className="mt-7">
            <h2
              id="commercial-listings"
              className="mb-4 font-heading text-xl font-bold sm:text-2xl"
            >
              {selected.heading}
            </h2>

            {/* Replace this placeholder with the Crexi Fuse embed for the selected listing type. */}
            <div className="flex min-h-48 flex-col items-center justify-center rounded-xl border border-dashed border-slate-300 bg-white px-6 py-9 text-center">
              <div className="mb-3 rounded-full bg-[var(--sandstone-off-white)] p-3">
                <Building2
                  aria-hidden="true"
                  className="h-6 w-6 text-[var(--sandstone-navy)]"
                />
              </div>
              <p className="font-semibold">Commercial listings coming soon</p>
              <p className="mt-1 text-sm text-slate-600">
                Contact our team to ask about current availability.
              </p>
            </div>
          </section>

          <div className="mt-7 flex flex-col items-start justify-between gap-4 rounded-xl border border-slate-200 bg-white px-5 py-5 sm:flex-row sm:items-center sm:px-6">
            <p className="font-semibold">
              Have a question about a commercial property?
            </p>
            <Link
              href="/#contact"
              className="inline-flex min-h-11 items-center justify-center rounded-md bg-[var(--sandstone-navy)] px-5 py-2 text-sm font-semibold text-white transition hover:bg-[var(--sandstone-navy-deep)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--sandstone-navy)]"
            >
              Contact Our Team
            </Link>
          </div>
        </div>
      </main>

      <SiteFooter />
    </>
  );
}
