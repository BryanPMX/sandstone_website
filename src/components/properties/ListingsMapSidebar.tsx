"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import type { PropertyCard } from "@/types";
import { ListingCard } from "./ListingCard";

const SIDEBAR_PAGE_SIZE = 12;
const MAX_VISIBLE_PAGE_BUTTONS = 5;

function buildVisiblePageWindow(currentPage: number, totalPages: number): number[] {
  if (totalPages <= MAX_VISIBLE_PAGE_BUTTONS) {
    return Array.from({ length: totalPages }, (_, index) => index + 1);
  }

  const half = Math.floor(MAX_VISIBLE_PAGE_BUTTONS / 2);
  let start = Math.max(1, currentPage - half);
  let end = start + MAX_VISIBLE_PAGE_BUTTONS - 1;

  if (end > totalPages) {
    end = totalPages;
    start = Math.max(1, end - MAX_VISIBLE_PAGE_BUTTONS + 1);
  }

  return Array.from({ length: end - start + 1 }, (_, index) => start + index);
}

interface ListingsMapSidebarProps {
  properties: PropertyCard[];
}

export function ListingsMapSidebar({ properties }: ListingsMapSidebarProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const containerRef = useRef<HTMLElement>(null);
  const totalPages = Math.max(1, Math.ceil(properties.length / SIDEBAR_PAGE_SIZE));

  useEffect(() => {
    setCurrentPage(1);
  }, [properties]);

  useEffect(() => {
    setCurrentPage((previousPage) => Math.min(previousPage, totalPages));
  }, [totalPages]);

  const firstVisibleIndex = (currentPage - 1) * SIDEBAR_PAGE_SIZE;
  const visibleProperties = useMemo(
    () => properties.slice(firstVisibleIndex, firstVisibleIndex + SIDEBAR_PAGE_SIZE),
    [firstVisibleIndex, properties]
  );
  const visiblePageButtons = useMemo(
    () => buildVisiblePageWindow(currentPage, totalPages),
    [currentPage, totalPages]
  );
  const visibleStart = properties.length === 0 ? 0 : firstVisibleIndex + 1;
  const visibleEnd = firstVisibleIndex + visibleProperties.length;

  const handlePageChange = (page: number) => {
    if (page < 1 || page > totalPages || page === currentPage) {
      return;
    }

    setCurrentPage(page);

    if (containerRef.current) {
      containerRef.current.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <aside
      ref={containerRef}
      className="rounded-[1.65rem] border border-[var(--sandstone-navy)]/12 bg-white/84 p-4 shadow-[0_24px_64px_-34px_rgba(37,52,113,0.45)] lg:max-h-[calc(100vh-9.25rem)] lg:overflow-y-auto"
    >
      <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
        <p
          aria-live="polite"
          className="text-xs font-semibold uppercase tracking-[0.08em] text-[var(--sandstone-charcoal)]/70"
        >
          Showing {visibleStart}-{visibleEnd} of {properties.length}
        </p>
        <p className="text-xs text-[var(--sandstone-charcoal)]/65">Page {currentPage} of {totalPages}</p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-1 2xl:grid-cols-2">
        {visibleProperties.map((property, index) => (
          <ListingCard
            key={property.id}
            property={property}
            priority={currentPage === 1 && index < 2}
          />
        ))}
      </div>

      {totalPages > 1 && (
        <nav className="mt-5 flex flex-wrap items-center justify-center gap-2" aria-label="Listing pages">
          <button
            type="button"
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage <= 1}
            className="rounded-full border border-[var(--sandstone-navy)]/20 px-3 py-1.5 text-xs font-semibold text-[var(--sandstone-charcoal)] transition hover:border-[var(--sandstone-sand-gold)] hover:text-[var(--sandstone-navy)] disabled:cursor-not-allowed disabled:opacity-45"
          >
            Previous
          </button>

          {visiblePageButtons.map((pageNumber) => (
            <button
              key={pageNumber}
              type="button"
              onClick={() => handlePageChange(pageNumber)}
              aria-current={pageNumber === currentPage ? "page" : undefined}
              className={`h-8 min-w-8 rounded-full px-2 text-xs font-semibold transition ${
                pageNumber === currentPage
                  ? "bg-[var(--sandstone-sand-gold)] text-white shadow-[0_10px_24px_-16px_rgba(183,150,120,0.95)]"
                  : "border border-[var(--sandstone-navy)]/20 text-[var(--sandstone-charcoal)] hover:border-[var(--sandstone-sand-gold)] hover:text-[var(--sandstone-navy)]"
              }`}
            >
              {pageNumber}
            </button>
          ))}

          <button
            type="button"
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage >= totalPages}
            className="rounded-full border border-[var(--sandstone-navy)]/20 px-3 py-1.5 text-xs font-semibold text-[var(--sandstone-charcoal)] transition hover:border-[var(--sandstone-sand-gold)] hover:text-[var(--sandstone-navy)] disabled:cursor-not-allowed disabled:opacity-45"
          >
            Next
          </button>
        </nav>
      )}
    </aside>
  );
}
