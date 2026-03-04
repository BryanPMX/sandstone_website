import Link from "next/link";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { ListingCard } from "@/components/properties";
import { fetchActivePropertyCards, fetchActivePropertyCardsPage } from "@/services";
import { filterPropertyCards } from "@/lib";

export const metadata = {
  title: "Listings | Sandstone Real Estate Group",
  description:
    "Browse listings curated by Sandstone Real Estate Group in El Paso and the Southwest.",
};

interface ListingsPageProps {
  searchParams: Promise<{ search?: string; page?: string }>;
}

export default async function ListingsPage({ searchParams }: ListingsPageProps) {
  const params = await searchParams;
  const searchQuery = (params.search ?? "").trim();
  const requestedPage = Number.parseInt(params.page ?? "1", 10);
  const currentPage = Number.isFinite(requestedPage) && requestedPage > 0
    ? requestedPage
    : 1;

  const paginatedResult = searchQuery
    ? null
    : await fetchActivePropertyCardsPage(currentPage);
  const properties = searchQuery
    ? filterPropertyCards(await fetchActivePropertyCards(), searchQuery)
    : paginatedResult?.properties ?? [];
  const totalRows = searchQuery ? properties.length : paginatedResult?.totalRows ?? 0;
  const totalPages = searchQuery ? 1 : paginatedResult?.totalPages ?? 1;
  const resolvedPage = searchQuery ? 1 : paginatedResult?.currentPage ?? 1;
  const hasPagination = !searchQuery && totalPages > 1;

  const buildPageHref = (page: number) => {
    const targetPage = Math.max(1, page);
    return `/listings?page=${targetPage}`;
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
            Sandstone Collection
          </h1>
          <p className="mt-2 max-w-2xl text-[var(--sandstone-charcoal)]/80">
            {searchQuery
              ? `Results for "${searchQuery}".`
              : `Showing page ${resolvedPage} of ${totalPages} from the current Spark feed (${totalRows.toLocaleString()} active listings).`}
          </p>

          {properties.length === 0 ? (
            <div className="mt-10 rounded-2xl border border-[var(--sandstone-navy)]/10 bg-white p-6 text-center">
              <p className="text-[var(--sandstone-charcoal)]/85">
                No listings matched <strong>{searchQuery}</strong>.
              </p>
              <Link
                href="/listings"
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
