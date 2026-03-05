import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { ChevronRight, Mail, MessageCircle, Phone } from "lucide-react";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
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

function formatPhoneForDisplay(value: string): string {
  const digits = value.replace(/\D/g, "");

  if (digits.length === 10) {
    return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6)}`;
  }

  if (digits.length === 11 && digits.startsWith("1")) {
    return `+1 (${digits.slice(1, 4)}) ${digits.slice(4, 7)}-${digits.slice(7)}`;
  }

  return value;
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

function getInitials(name: string): string {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part.charAt(0).toUpperCase())
    .join("");
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
  const agentName = property.specs.listingAgentName || "Sandstone Listing Agent";
  const agentEmail = property.specs.listingAgentEmail || SITE_CONTACT.email;
  const dialTarget = normalizeDialTarget(property.specs.listingAgentPhone) || SITE_CONTACT.phoneRaw;
  const agentPhoneDisplay = formatPhoneForDisplay(
    property.specs.listingAgentPhone || SITE_CONTACT.phone
  );
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

              <aside className="rounded-2xl border border-[var(--sandstone-navy)]/10 bg-[var(--sandstone-off-white)]/70 p-5">
                <h2 className="font-heading text-2xl font-bold text-[var(--sandstone-navy)]">
                  Contact Agent
                </h2>
                <div className="mt-4 flex items-center gap-3 border-b border-[var(--sandstone-navy)]/15 pb-4">
                  <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[var(--sandstone-navy)] text-base font-bold text-white">
                    {getInitials(agentName)}
                  </div>
                  <div>
                    <p className="text-lg font-semibold text-[var(--sandstone-charcoal)]">
                      {agentName}
                    </p>
                    <p className="text-base text-[var(--sandstone-charcoal)]/62">
                      Real Estate Agent
                    </p>
                  </div>
                </div>

                <div className="mt-4 space-y-3">
                  <Link
                    href={`tel:${dialTarget}`}
                    className="flex items-center gap-2 rounded-lg border border-[var(--sandstone-navy)]/14 bg-white px-3 py-2 text-sm text-[var(--sandstone-charcoal)] hover:border-[var(--sandstone-navy)]/28"
                  >
                    <Phone size={16} className="text-[var(--sandstone-navy)]" />
                    <span>{agentPhoneDisplay}</span>
                  </Link>
                  <Link
                    href={`mailto:${agentEmail}`}
                    className="flex items-center gap-2 rounded-lg border border-[var(--sandstone-navy)]/14 bg-white px-3 py-2 text-sm text-[var(--sandstone-charcoal)] hover:border-[var(--sandstone-navy)]/28"
                  >
                    <Mail size={16} className="text-[var(--sandstone-navy)]" />
                    <span>{agentEmail}</span>
                  </Link>
                </div>

                <div className="mt-4 space-y-3">
                  <Link
                    href="/#contact"
                    className="block rounded-lg bg-[var(--sandstone-navy)] px-4 py-2.5 text-center text-base font-semibold text-white transition hover:opacity-95"
                  >
                    Schedule Tour
                  </Link>
                  <Link
                    href={whatsappHref}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center justify-center gap-2 rounded-lg bg-[#21b94f] px-4 py-2.5 text-base font-semibold text-white transition hover:brightness-95"
                  >
                    <MessageCircle size={18} />
                    WhatsApp
                  </Link>
                </div>
              </aside>
            </div>
          </section>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
