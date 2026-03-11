import Link from "next/link";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { ListingsMapPanel, ListingsMapSidebar } from "@/components/properties";
import { fetchActivePropertyCards } from "@/services";
import { filterPropertyCardsWithFilters } from "@/lib";

export const metadata = {
  title: "Map Search | Sandstone Real Estate Group",
  description:
    "Explore active listings on an interactive map with prices, addresses, and a live listing sidebar.",
};

interface ListingsMapPageProps {
  searchParams: Promise<{
    search?: string;
    lat?: string;
    lng?: string;
    radiusMiles?: string;
    minPrice?: string;
    maxPrice?: string;
    beds?: string;
    baths?: string;
  }>;
}

export default async function ListingsMapPage({ searchParams }: ListingsMapPageProps) {
  const params = await searchParams;
  const searchQuery = (params.search ?? "").trim();
  const centerLat = params.lat ? Number(params.lat) : undefined;
  const centerLng = params.lng ? Number(params.lng) : undefined;
  const radiusMiles = params.radiusMiles ? Number(params.radiusMiles) : undefined;
  const minPrice = params.minPrice ? Number(params.minPrice) : undefined;
  const maxPrice = params.maxPrice ? Number(params.maxPrice) : undefined;
  const minBeds = params.beds ? Number(params.beds) : undefined;
  const minBaths = params.baths ? Number(params.baths) : undefined;

  const allProperties = await fetchActivePropertyCards();
  const properties = filterPropertyCardsWithFilters(allProperties, {
    search: searchQuery,
    centerLat,
    centerLng,
    radiusMiles,
    minPrice,
    maxPrice,
    minBeds,
    minBaths,
  });
  const totalFound = properties.length;

  return (
    <>
      <SiteHeader variant="lead" showDesktopCenterLogo={false} />
      <main className="min-h-screen bg-[var(--sandstone-off-white)] pb-16">
        <section className="container mx-auto max-w-[1360px] px-4 pb-3 pt-8 lg:px-6">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <Link
                href="/listings"
                className="text-sm font-medium text-[var(--sandstone-sand-gold)] hover:underline"
              >
                ← Back to listings
              </Link>
              <h1 className="mt-3 font-heading text-3xl font-bold text-[var(--sandstone-charcoal)] md:text-4xl">
                Search by Map
              </h1>
            </div>
            <p className="text-sm text-[var(--sandstone-charcoal)]/70">
              {searchQuery
                ? `${properties.length} listing${properties.length === 1 ? "" : "s"} found`
                : `Showing ${totalFound} listing${totalFound === 1 ? "" : "s"} on the map`}
            </p>
          </div>

          <form
            action="/listings/map"
            method="get"
            className="mt-6 grid gap-3 rounded-2xl border border-[var(--sandstone-navy)]/12 bg-white/88 p-3 shadow-[0_16px_36px_-28px_rgba(37,52,113,0.48)] md:grid-cols-[minmax(0,1fr)_120px_120px]"
          >
            <label htmlFor="map-search" className="sr-only">
              Search listings by address or neighborhood
            </label>
            <input
              id="map-search"
              name="search"
              type="search"
              defaultValue={searchQuery}
              placeholder="Find a property in El Paso"
              className="w-full rounded-full border border-[var(--sandstone-navy)]/22 px-5 py-3 text-[var(--sandstone-charcoal)] placeholder:text-[var(--sandstone-charcoal)]/55 focus:border-[var(--sandstone-sand-gold)] focus:outline-none focus:ring-2 focus:ring-[var(--sandstone-sand-gold)]/30"
            />
            <button
              type="submit"
              className="rounded-full bg-[var(--sandstone-navy)] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[var(--sandstone-navy-deep)]"
            >
              Search
            </button>
            <button
              type="button"
              disabled
              className="cursor-not-allowed rounded-full border border-[var(--sandstone-navy)]/22 bg-white px-5 py-3 text-sm font-semibold text-[var(--sandstone-charcoal)]/55"
              title="Price and advanced filters can be enabled next."
            >
              Filters
            </button>
          </form>
        </section>

        <section className="container mx-auto max-w-[1360px] px-4 pb-3 lg:px-6">
          {properties.length === 0 ? (
            <div className="rounded-2xl border border-[var(--sandstone-navy)]/12 bg-white p-8 text-center">
              <p className="text-[var(--sandstone-charcoal)]/85">
                No listings matched <strong>{searchQuery}</strong>.
              </p>
              <Link
                href="/listings/map"
                className="mt-4 inline-block rounded-full bg-[var(--sandstone-navy)] px-5 py-2.5 text-sm font-semibold text-white hover:opacity-95"
              >
                Clear search
              </Link>
            </div>
          ) : (
            <div className="grid gap-5 lg:grid-cols-[minmax(0,1.5fr)_minmax(340px,0.95fr)]">
              <ListingsMapPanel properties={properties} />
              <ListingsMapSidebar properties={properties} />
            </div>
          )}
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
