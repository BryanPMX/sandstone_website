"use client";

import { useRef, useState } from "react";
import { Star, Quote, ChevronLeft, ChevronRight, BadgeCheck } from "lucide-react";

type GoogleReview = {
  author_name: string;
  author_url: string;
  profile_photo_url: string;
  rating: number;
  relative_time_description: string;
  text: string;
  time: number;
};

export function GoogleReviewsCarousel({ reviews }: { reviews: GoogleReview[] }) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [expandedReviews, setExpandedReviews] = useState<Record<number, boolean>>({});

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const scrollAmount = scrollRef.current.clientWidth;
      scrollRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  const toggleExpand = (idx: number) => {
    setExpandedReviews((prev) => ({
      ...prev,
      [idx]: !prev[idx],
    }));
  };

  return (
    <div className="relative mt-14">
      {/* Left/Right Navigation Buttons */}
      <div className="absolute -left-4 top-1/2 z-10 -translate-y-1/2 md:-left-6 lg:-left-12">
        <button
          onClick={() => scroll("left")}
          className="flex h-12 w-12 items-center justify-center rounded-full border border-[var(--sandstone-navy)]/10 bg-white text-[var(--sandstone-navy)] shadow-md transition-all hover:scale-105 hover:bg-[var(--sandstone-sand-gold)] hover:text-white hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--sandstone-sand-gold)]"
          aria-label="Previous reviews"
        >
          <ChevronLeft className="h-6 w-6" />
        </button>
      </div>

      <div className="absolute -right-4 top-1/2 z-10 -translate-y-1/2 md:-right-6 lg:-right-12">
        <button
          onClick={() => scroll("right")}
          className="flex h-12 w-12 items-center justify-center rounded-full border border-[var(--sandstone-navy)]/10 bg-white text-[var(--sandstone-navy)] shadow-md transition-all hover:scale-105 hover:bg-[var(--sandstone-sand-gold)] hover:text-white hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--sandstone-sand-gold)]"
          aria-label="Next reviews"
        >
          <ChevronRight className="h-6 w-6" />
        </button>
      </div>

      {/* Scroll Container */}
      <div
        ref={scrollRef}
        className="flex snap-x snap-mandatory gap-6 overflow-x-auto pb-8 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {reviews.map((review, idx) => {
          const isExpanded = expandedReviews[idx];
          const textTooLong = review.text.length > 150; // threshold for showing "Read more"

          return (
            <div
              key={idx}
              className="relative flex h-auto w-[85vw] max-w-sm flex-none snap-center flex-col overflow-hidden rounded-2xl border border-[var(--sandstone-navy)]/10 bg-white p-6 shadow-[0_4px_20px_-10px_rgba(37,52,113,0.15)] transition-all duration-300 sm:w-[340px]"
            >
              <div
                aria-hidden
                className="absolute right-0 top-0 h-24 w-24 -translate-y-1/3 translate-x-1/3 rounded-full bg-[var(--sandstone-sand-gold)]/5 blur-2xl"
              />
              <Quote
                className="absolute right-5 top-5 h-8 w-8 text-[var(--sandstone-sand-gold)]/15"
                strokeWidth={1}
              />

              <div className="flex items-center gap-1.5 text-[var(--sandstone-sand-gold)]">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-4 w-4 ${i < review.rating ? "fill-current" : "text-gray-200"}`}
                  />
                ))}
              </div>

              <div className="mt-5 flex-1">
                <p
                  className={`text-sm leading-relaxed text-[var(--sandstone-charcoal)]/90 ${
                    !isExpanded ? "line-clamp-4" : ""
                  }`}
                >
                  &ldquo;{review.text}&rdquo;
                </p>
                {textTooLong && (
                  <button
                    onClick={() => toggleExpand(idx)}
                    className="mt-2 text-[13px] font-semibold text-[var(--sandstone-sand-gold)] transition-colors hover:text-[var(--sandstone-bronze)]"
                  >
                    {isExpanded ? "Read less" : "Read more"}
                  </button>
                )}
              </div>

              <div className="mt-6 flex items-center gap-4 border-t border-[var(--sandstone-navy)]/5 pt-4">
                {review.profile_photo_url ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={review.profile_photo_url}
                    alt={review.author_name}
                    className="h-10 w-10 rounded-full object-cover shadow-sm"
                    referrerPolicy="no-referrer"
                  />
                ) : (
                  <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-[var(--sandstone-navy)] text-sm font-bold text-white shadow-sm">
                    {review.author_name.charAt(0)}
                  </div>
                )}
                <div>
                  <div className="flex items-center gap-1.5">
                    <a
                      href={review.author_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block text-sm font-bold text-[var(--sandstone-navy)] hover:text-[var(--sandstone-bronze)]"
                    >
                      {review.author_name}
                    </a>
                    <BadgeCheck className="h-[15px] w-[15px] text-blue-500" strokeWidth={2.5} aria-label="Verified Reviewer" />
                  </div>
                  <p className="text-xs text-[var(--sandstone-charcoal)]/60">
                    {review.relative_time_description}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
