import Link from "next/link";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { ListingCard } from "@/components/properties";
import { fetchMyPropertyCards } from "@/services";
import {
  DEFAULT_PROPERTY_SEARCH_MARKET,
  PROPERTY_SEARCH_MARKET_OPTIONS,
  filterPropertyCards,
  getPropertySearchMarketLabel,
  isAlejandroListing,
  resolvePropertySearchMarket,
} from "@/lib";
import { getSparkListingsPageSize } from "@/config";

export const metadata = {
  title: "Listings | Sandstone Real Estate Group",
  description:
    "Browse listings curated by Sandstone Real Estate Group in El Paso and the Southwest.",
};

export const dynamic = "force-dynamic";

interface ListingsPageProps {
  searchParams: Promise<{ search?: string; page?: string; market?: string }>;
}

function paginateProperties<T>(items: T[], page: number, pageSize: number): {
  pageItems: T[];
  currentPage: number;
  totalPages: number;
} {
  const totalPages = Math.max(1, Math.ceil(items.length / pageSize));
  const currentPage = Math.min(Math.max(1, page), totalPages);
  const startIndex = (currentPage - 1) * pageSize;

  return {
    pageItems: items.slice(startIndex, startIndex + pageSize),
    currentPage,
    totalPages,
  };
}

function buildVisiblePageItems(currentPage: number, totalPages: number): Array<number | "ellipsis"> {
  if (totalPages <= 7) {
    return Array.from({ length: totalPages }, (_, index) => index + 1);
  }

  const pages = new Set<number>([1, totalPages, currentPage - 1, currentPage, currentPage + 1]);
  const sortedPages = Array.from(pages)
    .filter((page) => page >= 1 && page <= totalPages)
    .sort((a, b) => a - b);

  const items: Array<number | "ellipsis"> = [];

  for (let index = 0; index < sortedPages.length; index += 1) {
    const page = sortedPages[index];
    const previous = sortedPages[index - 1];

    if (previous != null && page - previous > 1) {
      items.push("ellipsis");
    }

    items.push(page);
  }

  return items;
}

export default async function ListingsPage({ searchParams }: ListingsPageProps) {
  const params = await searchParams;
  const searchQuery = (params.search ?? "").trim();
  const market = resolvePropertySearchMarket(params.market);
  const requestedPage = Number.parseInt(params.page ?? "1", 10);
  const currentPage = Number.isFinite(requestedPage) && requestedPage > 0
    ? requestedPage
    : 1;
  const pageSize = getSparkListingsPageSize();

  const allAlejandroProperties = (await fetchMyPropertyCards()).filter(
    (property) => Boolean(property.sparkSource) && isAlejandroListing(property)
  );

  const searchableProperties = searchQuery
    ? filterPropertyCards(allAlejandroProperties, searchQuery)
    : allAlejandroProperties;
  const totalMatchingCount = searchableProperties.length;

  const paginated = paginateProperties(searchableProperties, currentPage, pageSize);

  const properties = paginated.pageItems;
  const totalPages = paginated.totalPages;
  const resolvedPage = paginated.currentPage;

  const hasPagination = totalPages > 1;
  const visiblePageItems = hasPagination
    ? buildVisiblePageItems(resolvedPage, totalPages)
    : [];

  const buildPageHref = (page: number) => {
    const nextParams = new URLSearchParams();
    const targetPage = Math.max(1, page);
    nextParams.set("page", String(targetPage));

    if (searchQuery) {
      nextParams.set("search", searchQuery);
    }

    if (market !== DEFAULT_PROPERTY_SEARCH_MARKET) {
      nextParams.set("market", market);
    }

    return `/listings?${nextParams.toString()}`;
  };

  return (
    <>
      <SiteHeader variant="lead" showDesktopCenterLogo={false} />
      <main className="min-h-screen bg-[var(--sandstone-off-white)] pb-16">
        <section className="container mx-auto max-w-6xl px-4 pt-10">
          <Link
            href="/#listings"
            className="text-sm font-medium text-[var(--sandstone-sand-gold)] hover:underline"
          >
            ← Back to home listings
          </Link>
          <h1 className="mt-4 font-heading text-3xl font-bold text-[var(--sandstone-charcoal)] md:text-4xl">
            Sandstone All Listings
          </h1>
          <div className="mt-3 flex flex-wrap items-center gap-2">
            <p className="text-sm text-[var(--sandstone-charcoal)]/70">
              Showing {totalMatchingCount} listing{totalMatchingCount === 1 ? "" : "s"}
            </p>
            <span className="inline-flex items-center rounded-full border border-[var(--sandstone-sand-gold)]/35 bg-[var(--sandstone-sand-gold)]/12 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.05em] text-[var(--sandstone-charcoal)]/80">
              {getPropertySearchMarketLabel(market)}
            </span>
          </div>
          <div className="mt-4 flex max-w-xl items-center rounded-full border border-[var(--sandstone-navy)]/16 bg-white p-1.5 shadow-sm">
            {PROPERTY_SEARCH_MARKET_OPTIONS.map((option) => {
              const nextParams = new URLSearchParams();
              if (searchQuery) {
                nextParams.set("search", searchQuery);
              }
              if (option.value !== DEFAULT_PROPERTY_SEARCH_MARKET) {
                nextParams.set("market", option.value);
              }

              const href = nextParams.toString() ? `/listings?${nextParams.toString()}` : "/listings";

              return (
                <Link
                  key={option.value}
                  href={href}
                  aria-current={market === option.value ? "page" : undefined}
                  className={`flex-1 rounded-full px-4 py-2 text-center text-sm font-semibold transition ${
                    market === option.value
                      ? "bg-[var(--sandstone-navy)] text-white shadow-[0_2px_8px_-2px_rgba(37,52,113,0.5)]"
                      : "text-[var(--sandstone-charcoal)] hover:bg-[var(--sandstone-navy)]/10"
                  }`}
                >
                  {option.label}
                </Link>
              );
            })}
          </div>
          {market !== "el-paso" ? (
            <p className="mt-3 max-w-2xl rounded-2xl border border-[var(--sandstone-sand-gold)]/35 bg-[var(--sandstone-sand-gold)]/12 px-4 py-3 text-sm text-[var(--sandstone-charcoal)]/85">
              {getPropertySearchMarketLabel(market)} inventory is coming soon. El Paso listings are shown for now.
            </p>
          ) : null}
          {searchQuery ? (
            <p className="mt-2 max-w-2xl text-[var(--sandstone-charcoal)]/80">
              {`Results for "${searchQuery}".`}
            </p>
          ) : null}

          {properties.length === 0 ? (
            <div className="mt-10 rounded-2xl border border-[var(--sandstone-navy)]/10 bg-white p-6 text-center">
              <p className="text-[var(--sandstone-charcoal)]/85">
                No listings matched <strong>{searchQuery}</strong>.
              </p>
              <Link
                href={market === DEFAULT_PROPERTY_SEARCH_MARKET ? "/listings" : `/listings?market=${market}`}
                className="mt-4 inline-block rounded-full bg-[var(--sandstone-navy)] px-5 py-2.5 text-sm font-semibold text-white hover:opacity-95"
              >
                Clear search
              </Link>
            </div>
          ) : (
            <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {properties.map((property, index) => (
                <ListingCard
                  key={property.id}
                  property={property}
                  priority={index < 3}
                />
              ))}
            </div>
          )}

          {hasPagination && (
            <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-between">
              <p className="text-sm text-[var(--sandstone-charcoal)]/70">
                Page {resolvedPage} of {totalPages}
              </p>
              <div className="flex items-center gap-3">
                <Link
                  href={buildPageHref(resolvedPage - 1)}
                  aria-disabled={resolvedPage <= 1}
                  className={`inline-flex rounded-full px-5 py-2.5 text-sm font-semibold transition ${
                    resolvedPage <= 1
                      ? "pointer-events-none border border-[var(--sandstone-navy)]/10 bg-white text-[var(--sandstone-charcoal)]/35"
                      : "bg-white text-[var(--sandstone-navy)] shadow-sm hover:bg-[var(--sandstone-off-white)]"
                  }`}
                >
                  Previous
                </Link>
                <div className="flex items-center gap-2">
                  {visiblePageItems.map((item, index) => {
                    if (item === "ellipsis") {
                      return (
                        <span
                          key={`ellipsis-${index}`}
                          className="inline-flex min-w-9 items-center justify-center px-1 text-sm text-[var(--sandstone-charcoal)]/55"
                        >
                          …
                        </span>
                      );
                    }

                    const isActive = item === resolvedPage;

                    return (
                      <Link
                        key={`page-${item}`}
                        href={buildPageHref(item)}
                        aria-current={isActive ? "page" : undefined}
                        className={`inline-flex min-w-9 items-center justify-center rounded-full px-3 py-2 text-sm font-semibold transition ${
                          isActive
                            ? "bg-[var(--sandstone-navy)] text-white"
                            : "bg-white text-[var(--sandstone-navy)] shadow-sm hover:bg-[var(--sandstone-off-white)]"
                        }`}
                      >
                        {item}
                      </Link>
                    );
                  })}
                </div>
                <Link
                  href={buildPageHref(resolvedPage + 1)}
                  aria-disabled={resolvedPage >= totalPages}
                  className={`inline-flex rounded-full px-5 py-2.5 text-sm font-semibold transition ${
                    resolvedPage >= totalPages
                      ? "pointer-events-none border border-[var(--sandstone-navy)]/10 bg-white text-[var(--sandstone-charcoal)]/35"
                      : "bg-[var(--sandstone-navy)] text-white hover:opacity-95"
                  }`}
                >
                  Next
                </Link>
              </div>
            </div>
          )}
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
