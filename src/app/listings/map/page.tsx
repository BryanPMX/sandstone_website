import Link from "next/link";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { ListingsMapPanel, ListingsMapSidebar } from "@/components/properties";
import { fetchActivePropertyCards } from "@/services";
import {
  LISTINGS_MAP_PATH,
  PROPERTY_SEARCH_PRICE_OPTIONS,
  PROPERTY_SEARCH_BED_OPTIONS,
  PROPERTY_SEARCH_BATH_OPTIONS,
  filterPropertyCardsWithFilters,
  parseListingsMapSearchParams,
} from "@/lib";

export const metadata = {
  title: "Map Search | Sandstone Real Estate Group",
  description:
    "Explore active listings on an interactive map with prices, addresses, and a live listing sidebar.",
};

interface ListingsMapPageProps {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}

export default async function ListingsMapPage({ searchParams }: ListingsMapPageProps) {
  const params = await searchParams;
  const {
    searchQuery,
    centerLat,
    centerLng,
    radiusMiles,
    filterPresets,
    numericFilters,
  } = parseListingsMapSearchParams(params);
  const hasLocationFilter =
    typeof centerLat === "number" &&
    Number.isFinite(centerLat) &&
    typeof centerLng === "number" &&
    Number.isFinite(centerLng) &&
    typeof radiusMiles === "number" &&
    radiusMiles > 0;
  const hasActivePresetFilters =
    filterPresets.pricePreset !== "any" ||
    filterPresets.bedsPreset !== "any" ||
    filterPresets.bathsPreset !== "any";

  const allProperties = await fetchActivePropertyCards();
  const properties = filterPropertyCardsWithFilters(allProperties, {
    search: searchQuery,
    centerLat,
    centerLng,
    radiusMiles,
    ...numericFilters,
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
            action={LISTINGS_MAP_PATH}
            method="get"
            className="mt-6 rounded-[2rem] border border-[var(--sandstone-navy)]/12 bg-white/90 p-4 shadow-[0_20px_46px_-30px_rgba(37,52,113,0.48)]"
          >
            {typeof centerLat === "number" ? (
              <input type="hidden" name="lat" value={centerLat} />
            ) : null}
            {typeof centerLng === "number" ? (
              <input type="hidden" name="lng" value={centerLng} />
            ) : null}
            {typeof radiusMiles === "number" ? (
              <input type="hidden" name="radiusMiles" value={radiusMiles} />
            ) : null}

            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-3 xl:flex-row">
                <div className="flex-1">
                  <label htmlFor="map-search" className="sr-only">
                    Search listings by address or neighborhood
                  </label>
                  <input
                    id="map-search"
                    name="search"
                    type="search"
                    defaultValue={searchQuery}
                    placeholder="Find a property in El Paso"
                    className="h-16 w-full rounded-full border border-[var(--sandstone-navy)]/18 px-6 text-base font-medium text-[var(--sandstone-charcoal)] placeholder:text-[var(--sandstone-charcoal)]/48 focus:border-[var(--sandstone-sand-gold)] focus:outline-none focus:ring-2 focus:ring-[var(--sandstone-sand-gold)]/25 md:text-lg"
                  />
                </div>
                <button
                  type="submit"
                  className="inline-flex h-16 items-center justify-center rounded-full bg-[var(--sandstone-navy)] px-7 text-sm font-semibold text-white transition hover:bg-[var(--sandstone-navy-deep)] xl:min-w-[164px]"
                >
                  Search map
                </button>
                <Link
                  href={LISTINGS_MAP_PATH}
                  className="inline-flex h-16 items-center justify-center rounded-full border border-[var(--sandstone-navy)]/18 px-7 text-sm font-semibold text-[var(--sandstone-charcoal)] transition hover:border-[var(--sandstone-sand-gold)] hover:text-[var(--sandstone-navy)] xl:min-w-[150px]"
                >
                  Clear all
                </Link>
              </div>

              <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
                <div className="flex flex-wrap gap-3">
                  <select
                    name="price"
                    defaultValue={filterPresets.pricePreset}
                    className="h-12 min-w-[156px] rounded-full border border-[var(--sandstone-navy)]/18 bg-[var(--sandstone-off-white)] px-4 text-sm font-medium text-[var(--sandstone-charcoal)] focus:border-[var(--sandstone-sand-gold)] focus:outline-none focus:ring-2 focus:ring-[var(--sandstone-sand-gold)]/20"
                  >
                    {PROPERTY_SEARCH_PRICE_OPTIONS.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>

                  <select
                    name="beds"
                    defaultValue={filterPresets.bedsPreset}
                    className="h-12 min-w-[132px] rounded-full border border-[var(--sandstone-navy)]/18 bg-[var(--sandstone-off-white)] px-4 text-sm font-medium text-[var(--sandstone-charcoal)] focus:border-[var(--sandstone-sand-gold)] focus:outline-none focus:ring-2 focus:ring-[var(--sandstone-sand-gold)]/20"
                  >
                    {PROPERTY_SEARCH_BED_OPTIONS.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>

                  <select
                    name="baths"
                    defaultValue={filterPresets.bathsPreset}
                    className="h-12 min-w-[132px] rounded-full border border-[var(--sandstone-navy)]/18 bg-[var(--sandstone-off-white)] px-4 text-sm font-medium text-[var(--sandstone-charcoal)] focus:border-[var(--sandstone-sand-gold)] focus:outline-none focus:ring-2 focus:ring-[var(--sandstone-sand-gold)]/20"
                  >
                    {PROPERTY_SEARCH_BATH_OPTIONS.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>

                <p className="text-sm text-[var(--sandstone-charcoal)]/65">
                  {hasLocationFilter
                    ? `Area filter active: within ${radiusMiles} miles of the selected location.`
                    : hasActivePresetFilters
                      ? "Preset filters stay applied when you refine the search."
                      : "Search by address, ZIP, price, beds, or baths."}
                </p>
              </div>
            </div>
          </form>
        </section>

        <section className="container mx-auto max-w-[1360px] px-4 pb-3 lg:px-6">
          {properties.length === 0 ? (
            <div className="rounded-2xl border border-[var(--sandstone-navy)]/12 bg-white p-8 text-center">
              <p className="text-[var(--sandstone-charcoal)]/85">
                No listings matched <strong>{searchQuery}</strong>.
              </p>
              <Link
                href={LISTINGS_MAP_PATH}
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
