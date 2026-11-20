import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Building2 } from "lucide-react";
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
  {
    key: "sale",
    label: "For Sale",
    heading: "Properties for sale",
    embedVariable: "CREXI_SALE_EMBED_URL",
  },
  {
    key: "lease",
    label: "For Lease",
    heading: "Properties for lease",
    embedVariable: "CREXI_LEASE_EMBED_URL",
  },
] as const;

function getEmbedUrl(value: string | undefined) {
  const url = value?.trim();
  if (!url || !URL.canParse(url)) return undefined;

  const parsedUrl = new URL(url);
  return parsedUrl.protocol === "https:" ? parsedUrl.href : undefined;
}

export default async function CommercialPropertiesPage({
  searchParams,
}: {
  searchParams: Promise<{ type?: string | string[] }>;
}) {
  const { type } = await searchParams;
  const selected = type === "lease" ? listingTypes[1] : listingTypes[0];
  const embedUrl = getEmbedUrl(process.env[selected.embedVariable]);

  return (
    <>
      <SiteHeader variant="lead" showDesktopCenterLogo={false} />

      <main className="bg-[var(--sandstone-off-white)] text-[var(--sandstone-navy-deep)]">
        <header className="border-b border-[var(--sandstone-sand-gold)] bg-[var(--sandstone-navy-deep)] text-white">
          <div className="mx-auto grid max-w-[1440px] md:grid-cols-2">
            <div className="flex flex-col justify-center px-5 py-12 sm:px-8 md:min-h-[360px] md:px-12 lg:px-16 xl:pl-24">
              <div
                aria-hidden="true"
                className="mb-6 h-px w-12 bg-[var(--sandstone-sand-gold)]"
              />
              <h1 className="font-heading text-4xl font-bold leading-[1.05] tracking-tight lg:text-6xl">
                Commercial Properties
              </h1>
              <p className="mt-5 max-w-sm text-base leading-relaxed text-white/85">
                Explore commercial real estate for sale and lease in the El Paso
                area.
              </p>
            </div>
            <div className="relative h-48 overflow-hidden sm:h-60 md:h-auto">
              <Image
                src="/uploads/el-paso-texas-real-estate.webp"
                alt="Downtown El Paso skyline"
                fill
                priority
                sizes="(min-width: 1440px) 720px, (min-width: 768px) 50vw, 100vw"
                className="object-cover object-[center_42%]"
              />
            </div>
          </div>
        </header>

        <section
          aria-labelledby="commercial-listings"
          className="mx-auto max-w-6xl px-5 pb-12 pt-9 sm:px-8 sm:pb-16 sm:pt-12"
        >
          <div className="mb-5 flex flex-wrap items-center justify-between gap-x-8 gap-y-4">
            <h2
              id="commercial-listings"
              className="font-heading text-2xl font-bold tracking-tight sm:text-3xl"
            >
              {selected.heading}
            </h2>
            <nav
              aria-label="Commercial listing type"
              className="inline-grid grid-cols-2 rounded-lg border border-slate-200 bg-white p-1"
            >
              {listingTypes.map(({ key, label }) => (
                <Link
                  key={key}
                  href={key === "sale" ? pagePath : `${pagePath}?type=lease`}
                  scroll={false}
                  aria-current={selected.key === key ? "page" : undefined}
                  className="inline-flex min-h-11 items-center justify-center whitespace-nowrap rounded-md px-4 text-sm font-semibold text-slate-700 transition hover:bg-slate-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--sandstone-navy)] aria-[current=page]:bg-[var(--sandstone-navy-deep)] aria-[current=page]:text-white"
                >
                  {label}
                </Link>
              ))}
            </nav>
          </div>

          <div className="overflow-hidden rounded-xl border border-slate-200 bg-white">
            {embedUrl ? (
              <iframe
                key={selected.key}
                src={embedUrl}
                title={`Crexi commercial listings ${selected.label.toLowerCase()}`}
                loading="lazy"
                className="block h-[640px] w-full border-0 sm:h-[760px]"
              />
            ) : (
              <div className="flex flex-col items-center px-5 py-12 text-center sm:py-14">
                <Building2
                  aria-hidden="true"
                  className="mb-4 h-7 w-7 text-[var(--sandstone-navy)]"
                />
                <p className="font-heading text-lg font-semibold">
                  Commercial listings coming soon
                </p>
                <p className="mt-2 max-w-md text-sm leading-relaxed text-slate-600">
                  In the meantime, our team can help you with your commercial
                  property search.
                </p>
              </div>
            )}

            <div className="flex flex-col items-start gap-3 border-t border-slate-200 bg-[#fbfaf8] px-5 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6">
              <p className="text-sm font-semibold">
                Questions about commercial real estate?
              </p>
              <Link
                href="/#contact"
                className="inline-flex min-h-11 items-center gap-2 rounded-md bg-[var(--sandstone-navy-deep)] px-4 text-sm font-semibold text-white transition hover:bg-[var(--sandstone-navy)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--sandstone-navy)]"
              >
                Contact Our Team{" "}
                <ArrowUpRight aria-hidden="true" className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </>
  );
}
