import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { ChevronRight } from "lucide-react";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { ListingInquiryCard } from "@/components/properties";
import { fetchPropertyDetailById } from "@/services";
import { SITE_CONTACT } from "@/constants";
import { cn, shouldBypassNextImageOptimization } from "@/lib";

interface PageProps {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ sparkId?: string; src?: string }>;
}

interface ListingGalleryImageProps {
  src?: string;
  alt: string;
  className: string;
  sizes: string;
  priority?: boolean;
}

function resolveDetailSourceHint(
  value: string | undefined
): "active" | "my" | undefined {
  return value === "active" || value === "my" ? value : undefined;
}

function formatFactNumber(value: number): string {
  return Number.isInteger(value) ? String(value) : value.toFixed(1).replace(/\.0$/, "");
}

function normalizeDialTarget(value: string | undefined): string | undefined {
  if (!value) {
    return undefined;
  }

  const trimmed = value.trim();

  if (!trimmed) {
    return undefined;
  }

  if (trimmed.startsWith("+")) {
    const digits = trimmed.slice(1).replace(/\D/g, "");
    return digits ? `+${digits}` : undefined;
  }

  const digits = trimmed.replace(/\D/g, "");
  return digits || undefined;
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

function ListingGalleryImage({
  src,
  alt,
  className,
  sizes,
  priority = false,
}: ListingGalleryImageProps) {
  if (!src) {
    return (
      <div
        className={cn(
          "flex min-h-[170px] items-center justify-center rounded-2xl border border-dashed border-[var(--sandstone-navy)]/18 bg-[var(--sandstone-off-white)] px-4 text-center text-sm text-[var(--sandstone-charcoal)]/62",
          className
        )}
      >
        Additional photos coming soon.
      </div>
    );
  }

  const bypassOptimization = shouldBypassNextImageOptimization(src);

  return (
    <div
      className={cn(
        "relative min-h-[170px] overflow-hidden rounded-2xl bg-[var(--sandstone-navy)]/10",
        className
      )}
    >
      <Image
        src={src}
        alt={alt}
        fill
        sizes={sizes}
        className="object-cover"
        priority={priority && !bypassOptimization}
        unoptimized={bypassOptimization}
      />
    </div>
  );
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
  const galleryImages = [
    uniqueImages[0] ?? property.image,
    uniqueImages[1],
    uniqueImages[2],
    uniqueImages[3],
  ];
  const remainingImages = uniqueImages.slice(4);
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
  const dialTarget = normalizeDialTarget(property.specs.listingAgentPhone) || SITE_CONTACT.phoneRaw;
  const whatsappNumber = dialTarget.replace(/^\+/, "").length === 10
    ? `1${dialTarget.replace(/^\+/, "")}`
    : dialTarget.replace(/^\+/, "");
  const whatsappHref = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
    `Hi, I would like to schedule a tour for ${property.title}.`
  )}`;

  return (
    <>
      <SiteHeader variant="lead" showDesktopCenterLogo={false} />
      <main className="min-h-screen bg-[var(--sandstone-off-white)] pb-20">
        <div className="container mx-auto max-w-6xl px-4 pt-8">
          <Link
            href="/listings"
            className="text-sm font-medium text-[var(--sandstone-sand-gold)] hover:underline"
          >
            ← Back to listings
          </Link>

          <section className="mt-6 rounded-[2rem] border border-white/70 bg-white px-4 py-5 shadow-[0_24px_70px_-36px_rgba(37,52,113,0.42)] md:px-6 md:py-7">
            <h1 className="font-heading text-2xl font-bold text-[var(--sandstone-navy)] md:text-4xl">
              {heading}
            </h1>

            {uniqueImages.length >= 4 ? (
              <div className="mt-6 grid gap-2 md:gap-3 lg:grid-cols-[1.12fr_0.9fr_1.12fr] lg:auto-rows-[172px]">
                <ListingGalleryImage
                  src={galleryImages[0]}
                  alt={property.title}
                  className="lg:row-span-2 lg:min-h-0"
                  sizes="(max-width: 1024px) 100vw, 36vw"
                  priority
                />
                <ListingGalleryImage
                  src={galleryImages[1]}
                  alt={`${property.title} photo 2`}
                  className="lg:min-h-0"
                  sizes="(max-width: 1024px) 100vw, 20vw"
                />
                <ListingGalleryImage
                  src={galleryImages[2]}
                  alt={`${property.title} photo 3`}
                  className="lg:min-h-0"
                  sizes="(max-width: 1024px) 100vw, 20vw"
                />
                <ListingGalleryImage
                  src={galleryImages[3]}
                  alt={`${property.title} photo 4`}
                  className="lg:row-span-2 lg:min-h-0"
                  sizes="(max-width: 1024px) 100vw, 36vw"
                />
              </div>
            ) : (
              <div className="mt-6 grid grid-cols-1 gap-2 md:grid-cols-2 md:gap-3">
                {uniqueImages.map((image, index) => (
                  <ListingGalleryImage
                    key={`${property.id}-photo-${index}`}
                    src={image}
                    alt={`${property.title} photo ${index + 1}`}
                    className="min-h-[190px] md:min-h-[220px]"
                    sizes="(max-width: 768px) 100vw, 50vw"
                    priority={index === 0}
                  />
                ))}
              </div>
            )}
            {remainingImages.length > 0 && (
              <div className="mt-3 grid grid-cols-2 gap-2 md:grid-cols-3 md:gap-3 lg:grid-cols-4">
                {remainingImages.map((image, index) => (
                  <ListingGalleryImage
                    key={`${property.id}-extra-${index}`}
                    src={image}
                    alt={`${property.title} photo ${index + 5}`}
                    className="min-h-[155px] md:min-h-[170px]"
                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                  />
                ))}
              </div>
            )}

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
                listingAgentName={agentName}
                whatsappHref={whatsappHref}
              />
            </div>
          </section>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
