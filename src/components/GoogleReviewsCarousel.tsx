"use client";

import { useRef, useState } from "react";
import {
  BadgeCheck,
  ChevronLeft,
  ChevronRight,
  Quote,
  Star,
} from "lucide-react";

type GoogleReview = {
  author_name: string;
  author_url: string;
  profile_photo_url: string;
  rating: number;
  relative_time_description: string;
  text: string;
  time: number;
};

type GoogleReviewsCarouselProps = {
  reviews: GoogleReview[];
};

export function GoogleReviewsCarousel({
  reviews,
}: GoogleReviewsCarouselProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [expandedReviews, setExpandedReviews] = useState<
    Record<number, boolean>
  >({});

  const scroll = (direction: "left" | "right") => {
    const container = scrollRef.current;

    if (!container) {
      return;
    }

    const firstCard = container.firstElementChild as HTMLElement | null;

    if (!firstCard) {
      return;
    }

    const containerStyles = window.getComputedStyle(container);
    const gap = Number.parseFloat(
      containerStyles.columnGap || containerStyles.gap || "0"
    );

    const scrollAmount = firstCard.offsetWidth + gap;

    container.scrollBy({
      left: direction === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    });
  };

  const toggleExpand = (index: number) => {
    setExpandedReviews((previous) => ({
      ...previous,
      [index]: !previous[index],
    }));
  };

  if (reviews.length === 0) {
    return null;
  }

  return (
    <div className="relative mt-14">
      {/* Previous button */}
      <button
        type="button"
        onClick={() => scroll("left")}
        className="absolute -left-3 top-1/2 z-20 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-[var(--sandstone-navy)]/10 bg-white text-[var(--sandstone-navy)] shadow-md transition-all hover:scale-105 hover:bg-[var(--sandstone-sand-gold)] hover:text-white hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--sandstone-sand-gold)] md:-left-5 lg:-left-6"
        aria-label="Previous reviews"
      >
        <ChevronLeft className="h-6 w-6" />
      </button>

      {/* Next button */}
      <button
        type="button"
        onClick={() => scroll("right")}
        className="absolute -right-3 top-1/2 z-20 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-[var(--sandstone-navy)]/10 bg-white text-[var(--sandstone-navy)] shadow-md transition-all hover:scale-105 hover:bg-[var(--sandstone-sand-gold)] hover:text-white hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--sandstone-sand-gold)] md:-right-5 lg:-right-6"
        aria-label="Next reviews"
      >
        <ChevronRight className="h-6 w-6" />
      </button>

      {/* Hides partial cards outside the carousel */}
      <div className="overflow-hidden">
        <div
          ref={scrollRef}
          className="flex snap-x snap-mandatory gap-6 overflow-x-auto scroll-smooth pb-8 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {reviews.map((review, index) => {
            const isExpanded = expandedReviews[index] ?? false;
            const textTooLong = review.text.length > 150;

            return (
              <article
                key={`${review.author_name}-${review.time}-${index}`}
                className="relative flex min-h-[288px] w-full shrink-0 snap-start flex-col overflow-hidden rounded-2xl border border-[var(--sandstone-navy)]/10 bg-white p-6 shadow-[0_4px_20px_-10px_rgba(37,52,113,0.15)] transition-all duration-300 sm:w-[calc((100%-1.5rem)/2)] lg:w-[calc((100%-3rem)/3)]"
              >
                <div
                  aria-hidden="true"
                  className="absolute right-0 top-0 h-24 w-24 -translate-y-1/3 translate-x-1/3 rounded-full bg-[var(--sandstone-sand-gold)]/5 blur-2xl"
                />

                <Quote
                  aria-hidden="true"
                  className="absolute right-5 top-5 h-8 w-8 text-[var(--sandstone-sand-gold)]/15"
                  strokeWidth={1}
                />

                <div
                  className="flex items-center gap-1.5 text-[var(--sandstone-sand-gold)]"
                  aria-label={`${review.rating} out of 5 stars`}
                >
                  {Array.from({ length: 5 }).map((_, starIndex) => (
                    <Star
                      key={starIndex}
                      aria-hidden="true"
                      className={`h-4 w-4 ${
                        starIndex < review.rating
                          ? "fill-current"
                          : "text-gray-200"
                      }`}
                    />
                  ))}
                </div>

                <div className="mt-5 flex-1">
                  <p
                    className={`text-sm leading-relaxed text-[var(--sandstone-charcoal)]/90 ${
                      isExpanded ? "" : "line-clamp-4"
                    }`}
                  >
                    &ldquo;{review.text}&rdquo;
                  </p>

                  {textTooLong && (
                    <button
                      type="button"
                      onClick={() => toggleExpand(index)}
                      className="mt-2 text-[13px] font-semibold text-[var(--sandstone-sand-gold)] transition-colors hover:text-[var(--sandstone-bronze)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--sandstone-sand-gold)]"
                      aria-expanded={isExpanded}
                    >
                      {isExpanded ? "Read less" : "Read more"}
                    </button>
                  )}
                </div>

                <div className="mt-6 flex items-center gap-4 border-t border-[var(--sandstone-navy)]/10 pt-4">
                  {review.profile_photo_url ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={review.profile_photo_url}
                      alt={`${review.author_name} profile`}
                      className="h-10 w-10 shrink-0 rounded-full object-cover shadow-sm"
                      referrerPolicy="no-referrer"
                    />
                  ) : (
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[var(--sandstone-navy)] text-sm font-bold text-white shadow-sm">
                      {review.author_name.charAt(0).toUpperCase()}
                    </div>
                  )}

                  <div className="min-w-0">
                    <div className="flex items-center gap-1.5">
                      <a
                        href={review.author_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="truncate text-sm font-bold text-[var(--sandstone-navy)] transition-colors hover:text-[var(--sandstone-bronze)]"
                      >
                        {review.author_name}
                      </a>

                      <BadgeCheck
                        className="h-[15px] w-[15px] shrink-0 text-blue-500"
                        strokeWidth={2.5}
                        aria-label="Google reviewer"
                      />
                    </div>

                    <p className="text-xs text-[var(--sandstone-charcoal)]/60">
                      {review.relative_time_description}
                    </p>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </div>
  );
}