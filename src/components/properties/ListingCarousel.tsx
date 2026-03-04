"use client";

import { useEffect, useId, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { PropertyCard } from "@/types";
import { Button } from "@/components/ui/button";
import { ListingCard } from "./ListingCard";

interface ListingCarouselProps {
  properties: PropertyCard[];
}

export function ListingCarousel({ properties }: ListingCarouselProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const carouselId = useId();
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(properties.length > 1);

  useEffect(() => {
    const container = containerRef.current;
    const updateScrollState = () => {
      if (!container) {
        setCanScrollLeft(false);
        setCanScrollRight(properties.length > 1);
        return;
      }

      const maxScrollLeft = container.scrollWidth - container.clientWidth;
      setCanScrollLeft(container.scrollLeft > 8);
      setCanScrollRight(maxScrollLeft - container.scrollLeft > 8);
    };

    if (!container) {
      updateScrollState();
      return;
    }

    updateScrollState();

    const handleScroll = () => {
      updateScrollState();
    };

    const handleResize = () => {
      updateScrollState();
    };

    container.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleResize);

    return () => {
      container.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
    };
  }, [properties.length]);

  const scrollByViewport = (direction: "left" | "right") => {
    const container = containerRef.current;

    if (!container) {
      return;
    }

    const distance = Math.max(container.clientWidth * 0.9, 320);
    container.scrollBy({
      left: direction === "left" ? -distance : distance,
      behavior: "smooth",
    });
  };

  return (
    <div className="mt-10 md:mt-12">
      <div className="relative">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-y-0 left-0 z-10 hidden w-20 bg-gradient-to-r from-[#f8f6f3] to-transparent md:block"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-y-0 right-0 z-10 hidden w-20 bg-gradient-to-l from-[#f8f6f3] to-transparent md:block"
        />

        <Button
          type="button"
          size="icon"
          variant="outline"
          aria-controls={carouselId}
          aria-label="Scroll listings left"
          onClick={() => scrollByViewport("left")}
          disabled={!canScrollLeft}
          className="absolute left-1 top-1/2 z-20 h-10 w-10 -translate-y-1/2 rounded-full border-[var(--sandstone-navy)]/18 bg-white/95 text-[var(--sandstone-navy)] shadow-[0_12px_28px_-18px_rgba(17,24,61,0.65)] backdrop-blur disabled:opacity-45 md:left-2 md:h-11 md:w-11"
        >
          <ChevronLeft />
        </Button>
        <Button
          type="button"
          size="icon"
          variant="outline"
          aria-controls={carouselId}
          aria-label="Scroll listings right"
          onClick={() => scrollByViewport("right")}
          disabled={!canScrollRight}
          className="absolute right-1 top-1/2 z-20 h-10 w-10 -translate-y-1/2 rounded-full border-[var(--sandstone-navy)]/18 bg-white/95 text-[var(--sandstone-navy)] shadow-[0_12px_28px_-18px_rgba(17,24,61,0.65)] backdrop-blur disabled:opacity-45 md:right-2 md:h-11 md:w-11"
        >
          <ChevronRight />
        </Button>

        <div
          id={carouselId}
          ref={containerRef}
          className="flex snap-x snap-mandatory gap-4 overflow-x-auto px-1 pb-5 pt-1 scroll-smooth [scroll-padding-inline:1rem] [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden md:gap-5"
        >
          {properties.map((property, index) => (
            <div
              key={property.id}
              className="min-w-[84%] snap-start sm:min-w-[360px] lg:min-w-[380px]"
            >
              <ListingCard property={property} priority={index < 2} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
