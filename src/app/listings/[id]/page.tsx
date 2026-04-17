import { notFound } from "next/navigation";
import { headers } from "next/headers";
import Link from "next/link";
import { ChevronRight, Mail } from "lucide-react";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { ListingDetailGallery, ListingInquiryCard } from "@/components/properties";
import { ListingBackLink } from "@/components/properties/ListingBackLink.client";
import { fetchPropertyDetailById } from "@/services";
import { SITE_CONTACT } from "@/constants";
import {
  buildListingsMapHref,
  resolvePropertySearchMarket,
  type PropertySearchPresetFilters,
} from "@/lib";

interface PageProps {
  params: Promise<{ id: string }>;
  searchParams: Promise<{
    sparkId?: string;
    src?: string;
    from?: string;
    search?: string;
    market?: string;
    listingType?: string;
    price?: string;
    beds?: string;
    baths?: string;
  }>;
}

function resolveDetailSourceHint(
  value: string | undefined
): "active" | "my" | undefined {
  return value === "active" || value === "my" ? value : undefined;
}

function resolveListingTypeForMap(value: string | undefined): "active" | "rental" {
  return value === "rental" ? "rental" : "active";
}

function resolveMapPricePreset(
  value: string | undefined
): PropertySearchPresetFilters["pricePreset"] | undefined {
  const allowed: Array<PropertySearchPresetFilters["pricePreset"]> = [
    "under-150",
    "150-250",
    "250-500",
    "500-750",
    "750-plus",
    "rent-under-1000",
    "rent-1000-2500",
    "rent-2500-5000",
    "rent-5000-plus",
  ];

  return allowed.includes(value as PropertySearchPresetFilters["pricePreset"])
    ? (value as PropertySearchPresetFilters["pricePreset"])
    : undefined;
}

function resolveMapCountPreset(
  value: string | undefined
): PropertySearchPresetFilters["bedsPreset"] | undefined {
  if (value === "1" || value === "2" || value === "3" || value === "4") {
    return value;
  }

  return undefined;
}

function formatFactNumber(value: number): string {
  return Number.isInteger(value) ? String(value) : value.toFixed(1).replace(/\.0$/, "");
}

function buildMapUrls(input: {
  latitude?: number;
  longitude?: number;
  mapAddress?: string;
  fallbackQuery: string;
}): { embed: string; details: string } {
  const hasCoordinates = input.latitude != null && input.longitude != null;
  const query = hasCoordinates
    ? `${input.latitude},${input.longitude}`
    : input.mapAddress?.trim() || input.fallbackQuery;
  const encodedQuery = encodeURIComponent(query);

  return {
    embed: `https://maps.google.com/maps?hl=en&q=${encodedQuery}&z=14&output=embed`,
    details: `https://www.google.com/maps/search/?api=1&query=${encodedQuery}`,
  };
}

async function getSiteBaseUrl(): Promise<string> {
  const envBaseUrl =
    process.env.NEXT_PUBLIC_SITE_URL?.trim() ||
    process.env.SITE_URL?.trim();

  if (envBaseUrl) {
    return envBaseUrl.replace(/\/+$/, "");
  }

  const requestHeaders = await headers();
  const host = requestHeaders.get("x-forwarded-host") || requestHeaders.get("host");
  const protocol = requestHeaders.get("x-forwarded-proto") || "https";

  if (host) {
    return `${protocol}://${host}`;
  }

  return "https://sandstone.homes";
}

export async function generateMetadata({ params }: PageProps) {
  const { id } = await params;

  return {
    title: `Listing ${id} | Sandstone Real Estate Group`,
    description: "Property details from Sandstone Real Estate Group.",
  };
}

export default async function ListingPage({ params, searchParams }: PageProps) {
  const { id } = await params;
  const query = await searchParams;
  const property = await fetchPropertyDetailById(
    id,
    query.sparkId?.trim() || undefined,
    resolveDetailSourceHint(query.src)
  );

  if (!property) {
    notFound();
  }

  const uniqueImages = Array.from(
    new Set([property.image, ...property.images].filter(Boolean))
  );
  const primaryStats = [
    property.beds != null ? `${formatFactNumber(property.beds)} Beds` : null,
    property.baths != null ? `${formatFactNumber(property.baths)} Baths` : null,
    property.sqft ? `${property.sqft} SF` : null,
  ].filter((item): item is string => Boolean(item));
  const interiorFeatures = property.specs.interiorFeatures.slice(0, 8);
  const nearbySchools = property.specs.nearbySchools.slice(0, 5);
  const heading = property.title.includes(property.location)
    ? property.title
    : `${property.title}, ${property.location}`;
  const mapUrls = buildMapUrls({
    latitude: property.specs.latitude,
    longitude: property.specs.longitude,
    mapAddress: property.specs.mapAddress,
    fallbackQuery: heading,
  });
  const agentName = property.specs.listingAgentName;
  const listingPath = (() => {
    const params = new URLSearchParams();

    if (query.sparkId?.trim()) {
      params.set("sparkId", query.sparkId.trim());
    }

    if (query.src?.trim()) {
      params.set("src", query.src.trim());
    }

    const queryString = params.toString();
    const basePath = `/listings/${property.routeId}`;

    return queryString ? `${basePath}?${queryString}` : basePath;
  })();
  const mapBackHref = query.from === "map"
    ? buildListingsMapHref({
        search: query.search?.trim() || undefined,
        market: resolvePropertySearchMarket(query.market),
        listingType: resolveListingTypeForMap(query.listingType),
        filterPresets: {
          pricePreset: resolveMapPricePreset(query.price),
          bedsPreset: resolveMapCountPreset(query.beds),
          bathsPreset: resolveMapCountPreset(query.baths),
        },
      })
    : null;
  const listingShareUrl = `${await getSiteBaseUrl()}${listingPath}`;
  const facebookShareHref = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(listingShareUrl)}`;
  const emailShareHref = `mailto:?subject=${encodeURIComponent(
    `Check out this property: ${property.title}`
  )}&body=${encodeURIComponent(
    `I thought you might like this listing:\n\n${property.title}\n${listingShareUrl}`
  )}`;

  return (
    <>
      <SiteHeader variant="lead" showDesktopCenterLogo={false} />
      <main className="min-h-screen bg-[var(--sandstone-off-white)] pb-20">
        <div className="container mx-auto max-w-6xl px-4 pt-8">
          <ListingBackLink mapBackHref={mapBackHref} fallbackHref="/listings" />

          <section className="mt-6 rounded-[2rem] border border-white/70 bg-white px-4 py-5 shadow-[0_24px_70px_-36px_rgba(37,52,113,0.42)] md:px-6 md:py-7">
            <h1 className="font-heading text-2xl font-bold text-[var(--sandstone-navy)] md:text-4xl">
              {heading}
            </h1>

            <ListingDetailGallery images={uniqueImages} title={property.title} />

            <div className="mt-5 flex flex-wrap items-center gap-x-6 gap-y-2 md:gap-x-8">
              <p className="font-heading text-4xl font-bold text-[var(--sandstone-navy)]">
                {property.price}
              </p>
              {primaryStats.map((item) => (
                <p
                  key={item}
                  className="flex items-center gap-3 text-xl text-[var(--sandstone-charcoal)]/86"
                >
                  <span aria-hidden className="text-[var(--sandstone-charcoal)]/35">
                    |
                  </span>
                  {item}
                </p>
              ))}

              <div className="ml-auto flex items-center gap-2">
                <Link
                  href={facebookShareHref}
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Share this listing on Facebook"
                  className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-[#1877f2] text-lg font-bold text-white transition hover:brightness-95"
                >
                  <span aria-hidden>f</span>
                </Link>
                <Link
                  href={emailShareHref}
                  aria-label="Share this listing by email"
                  className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-[var(--sandstone-navy)] text-white transition hover:brightness-95"
                >
                  <Mail size={18} />
                </Link>
              </div>
            </div>
            <div className="mt-4 border-t border-[var(--sandstone-navy)]/20" />

            <div className="mt-6 grid gap-4 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.65fr)_minmax(280px,1fr)]">
              <article className="rounded-2xl border border-[var(--sandstone-navy)]/10 bg-[var(--sandstone-off-white)]/70 p-5">
                <h2 className="font-heading text-2xl font-bold text-[var(--sandstone-navy)]">
                  Interior Features
                </h2>
                <div className="mt-3 border-t border-[var(--sandstone-navy)]/18" />
                {interiorFeatures.length > 0 ? (
                  <ul className="mt-4 space-y-2.5 text-base text-[var(--sandstone-charcoal)]/85">
                    {interiorFeatures.map((feature) => (
                      <li key={feature} className="flex gap-2">
                        <span aria-hidden>•</span>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="mt-4 text-sm text-[var(--sandstone-charcoal)]/72">
                    Full interior specs are available from the listing agent.
                  </p>
                )}
              </article>

              <article className="overflow-hidden rounded-2xl border border-[var(--sandstone-navy)]/10 bg-[var(--sandstone-off-white)]/70">
                <div className="px-5 pb-4 pt-5">
                  <h2 className="font-heading text-2xl font-bold text-[var(--sandstone-navy)]">
                    School & Location
                  </h2>
                  <div className="mt-3 border-t border-[var(--sandstone-navy)]/18" />
                  <div className="mt-4 overflow-hidden rounded-xl border border-[var(--sandstone-navy)]/12">
                    <iframe
                      title={`Map for ${property.title}`}
                      src={mapUrls.embed}
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                      className="h-44 w-full"
                    />
                  </div>
                  <div className="mt-4">
                    <p className="text-base font-semibold text-[var(--sandstone-navy)]">
                      Nearby Schools:
                    </p>
                    {nearbySchools.length > 0 ? (
                      <ul className="mt-2 space-y-1.5 text-base text-[var(--sandstone-charcoal)]/85">
                        {nearbySchools.map((school) => (
                          <li key={school} className="flex gap-2">
                            <span aria-hidden>•</span>
                            <span>{school}</span>
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p className="mt-2 text-sm text-[var(--sandstone-charcoal)]/72">
                        School information is available by request.
                      </p>
                    )}
                  </div>
                </div>
                <div className="border-t border-[var(--sandstone-navy)]/12 bg-white/70 px-5 py-3">
                  <Link
                    href={mapUrls.details}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 text-sm font-semibold text-[var(--sandstone-navy)] hover:underline"
                  >
                    View Details
                    <ChevronRight size={16} />
                  </Link>
                </div>
              </article>

              <ListingInquiryCard
                listingTitle={property.title}
                listingRouteId={property.routeId}
                listingNumber={property.listingNumber}
                listingSparkId={property.sparkId}
                listingPath={listingPath}
                listingPrice={property.price}
                listingAgentName={agentName}
              />
            </div>
          </section>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
