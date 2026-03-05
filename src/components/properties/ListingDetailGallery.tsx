"use client";

import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import { ChevronLeft, ChevronRight, Expand, X } from "lucide-react";
import { cn, shouldBypassNextImageOptimization } from "@/lib";

interface ListingDetailGalleryProps {
  images: string[];
  title: string;
}

const MAX_COMPACT_THUMBS = 10;

export function ListingDetailGallery({ images, title }: ListingDetailGalleryProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showAllThumbs, setShowAllThumbs] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const currentImage = images[currentIndex];
  const lightboxImage = lightboxIndex != null ? images[lightboxIndex] : null;
  const canGoPrev = currentIndex > 0;
  const canGoNext = currentIndex < images.length - 1;
  const visibleThumbCount = showAllThumbs
    ? images.length
    : Math.min(images.length, MAX_COMPACT_THUMBS);
  const visibleThumbs = useMemo(
    () => images.slice(0, visibleThumbCount),
    [images, visibleThumbCount]
  );

  useEffect(() => {
    if (lightboxIndex == null) {
      return;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setLightboxIndex(null);
        return;
      }

      if (event.key === "ArrowLeft") {
        setLightboxIndex((current) => (current == null ? current : Math.max(0, current - 1)));
      }

      if (event.key === "ArrowRight") {
        setLightboxIndex((current) => (
          current == null ? current : Math.min(images.length - 1, current + 1)
        ));
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [images.length, lightboxIndex]);

  if (!currentImage) {
    return null;
  }

  return (
    <>
      <div className="mt-6 rounded-2xl border border-[var(--sandstone-navy)]/12 bg-[var(--sandstone-off-white)]/55 p-2.5 md:p-3">
        <div className="relative overflow-hidden rounded-xl bg-[var(--sandstone-navy)]/8">
          <div className="relative aspect-[16/9] w-full">
            <Image
              src={currentImage}
              alt={`${title} photo ${currentIndex + 1}`}
              fill
              sizes="(max-width: 1024px) 100vw, 80vw"
              className="object-cover"
              priority={currentIndex === 0 && !shouldBypassNextImageOptimization(currentImage)}
              unoptimized={shouldBypassNextImageOptimization(currentImage)}
            />
          </div>

          {canGoPrev && (
            <button
              type="button"
              onClick={() => setCurrentIndex((index) => Math.max(0, index - 1))}
              className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full bg-black/35 p-2 text-white transition hover:bg-black/55"
              aria-label="Previous photo"
            >
              <ChevronLeft size={20} />
            </button>
          )}

          {canGoNext && (
            <button
              type="button"
              onClick={() => setCurrentIndex((index) => Math.min(images.length - 1, index + 1))}
              className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-black/35 p-2 text-white transition hover:bg-black/55"
              aria-label="Next photo"
            >
              <ChevronRight size={20} />
            </button>
          )}

          <button
            type="button"
            onClick={() => setLightboxIndex(currentIndex)}
            className="absolute right-2 top-2 rounded-full bg-black/35 p-2 text-white transition hover:bg-black/55"
            aria-label="Open fullscreen photo viewer"
          >
            <Expand size={16} />
          </button>
        </div>

        <div className="mt-2 flex items-center justify-between">
          <p className="text-sm font-medium text-[var(--sandstone-charcoal)]/80">
            Photo {currentIndex + 1} of {images.length}
          </p>
          {images.length > MAX_COMPACT_THUMBS && !showAllThumbs ? (
            <button
              type="button"
              onClick={() => setShowAllThumbs(true)}
              className="text-sm font-semibold text-[var(--sandstone-navy)] hover:underline"
            >
              View all photos
            </button>
          ) : null}
        </div>

        <div className="mt-2 overflow-x-auto pb-1 [scrollbar-width:thin]">
          <div className="flex gap-2">
            {visibleThumbs.map((image, index) => {
              const isActive = currentIndex === index;

              return (
                <button
                  key={`${title}-thumb-${index}`}
                  type="button"
                  onClick={() => setCurrentIndex(index)}
                  className={cn(
                    "relative h-16 w-24 shrink-0 overflow-hidden rounded-lg border-2 transition",
                    isActive
                      ? "border-[var(--sandstone-navy)]"
                      : "border-transparent hover:border-[var(--sandstone-navy)]/35"
                  )}
                  aria-label={`View photo ${index + 1}`}
                >
                  <Image
                    src={image}
                    alt={`${title} thumbnail ${index + 1}`}
                    fill
                    sizes="96px"
                    className="object-cover"
                    unoptimized={shouldBypassNextImageOptimization(image)}
                  />
                </button>
              );
            })}
          </div>
        </div>

        {showAllThumbs && images.length > MAX_COMPACT_THUMBS ? (
          <div className="mt-2 flex justify-end">
            <button
              type="button"
              onClick={() => setShowAllThumbs(false)}
              className="text-sm font-semibold text-[var(--sandstone-navy)] hover:underline"
            >
              Show fewer thumbnails
            </button>
          </div>
        ) : null}
      </div>

      {lightboxImage && (
        <div
          className="fixed inset-0 z-[140] bg-black/88 p-4 md:p-8"
          role="dialog"
          aria-modal="true"
          onClick={() => setLightboxIndex(null)}
        >
          <button
            type="button"
            onClick={() => setLightboxIndex(null)}
            className="absolute right-4 top-4 rounded-full bg-white/12 p-2 text-white transition hover:bg-white/20"
            aria-label="Close photo viewer"
          >
            <X size={20} />
          </button>

          {lightboxIndex != null && lightboxIndex > 0 && (
            <button
              type="button"
              onClick={(event) => {
                event.stopPropagation();
                setLightboxIndex((index) => (index == null ? index : Math.max(0, index - 1)));
              }}
              className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full bg-white/12 p-2 text-white transition hover:bg-white/20 md:left-6"
              aria-label="Previous photo"
            >
              <ChevronLeft size={22} />
            </button>
          )}

          {lightboxIndex != null && lightboxIndex < images.length - 1 && (
            <button
              type="button"
              onClick={(event) => {
                event.stopPropagation();
                setLightboxIndex((index) => (
                  index == null ? index : Math.min(images.length - 1, index + 1)
                ));
              }}
              className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full bg-white/12 p-2 text-white transition hover:bg-white/20 md:right-6"
              aria-label="Next photo"
            >
              <ChevronRight size={22} />
            </button>
          )}

          <div
            className="relative mx-auto h-full w-full max-w-6xl"
            onClick={(event) => event.stopPropagation()}
          >
            <Image
              src={lightboxImage}
              alt={title}
              fill
              className="object-contain"
              sizes="100vw"
              unoptimized={shouldBypassNextImageOptimization(lightboxImage)}
            />
          </div>
        </div>
      )}
    </>
  );
}
