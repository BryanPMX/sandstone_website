"use client";

import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { cn, shouldBypassNextImageOptimization } from "@/lib";

interface ListingDetailGalleryProps {
  images: string[];
  title: string;
}

interface GalleryImageTileProps {
  src: string;
  alt: string;
  className: string;
  sizes: string;
  priority?: boolean;
  onOpen: () => void;
}

function GalleryImageTile({
  src,
  alt,
  className,
  sizes,
  priority = false,
  onOpen,
}: GalleryImageTileProps) {
  const bypassOptimization = shouldBypassNextImageOptimization(src);

  return (
    <button
      type="button"
      onClick={onOpen}
      className={cn(
        "group relative min-h-[170px] overflow-hidden rounded-2xl bg-[var(--sandstone-navy)]/10 text-left",
        className
      )}
    >
      <Image
        src={src}
        alt={alt}
        fill
        sizes={sizes}
        className="object-cover transition duration-200 group-hover:scale-[1.02]"
        priority={priority && !bypassOptimization}
        unoptimized={bypassOptimization}
      />
    </button>
  );
}

export function ListingDetailGallery({ images, title }: ListingDetailGalleryProps) {
  const [showAll, setShowAll] = useState(false);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const visibleLeadImages = images.slice(0, 4);
  const remainingImages = images.slice(4);
  const activeImage = activeIndex != null ? images[activeIndex] : null;
  const hasManyImages = images.length > 4;

  const canGoPrevious = useMemo(
    () => activeIndex != null && activeIndex > 0,
    [activeIndex]
  );
  const canGoNext = useMemo(
    () => activeIndex != null && activeIndex < images.length - 1,
    [activeIndex, images.length]
  );

  useEffect(() => {
    if (activeIndex == null) {
      return;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setActiveIndex(null);
        return;
      }

      if (event.key === "ArrowLeft" && canGoPrevious) {
        setActiveIndex((current) => (current == null ? current : current - 1));
      }

      if (event.key === "ArrowRight" && canGoNext) {
        setActiveIndex((current) => (current == null ? current : current + 1));
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [activeIndex, canGoNext, canGoPrevious]);

  const openAtIndex = (index: number) => {
    setActiveIndex(index);
  };

  return (
    <>
      {visibleLeadImages.length >= 4 ? (
        <div className="mt-6 grid gap-2 md:gap-3 lg:grid-cols-[1.12fr_0.9fr_1.12fr] lg:auto-rows-[172px]">
          <GalleryImageTile
            src={visibleLeadImages[0]}
            alt={`${title} photo 1`}
            className="lg:row-span-2 lg:min-h-0"
            sizes="(max-width: 1024px) 100vw, 36vw"
            priority
            onOpen={() => openAtIndex(0)}
          />
          <GalleryImageTile
            src={visibleLeadImages[1]}
            alt={`${title} photo 2`}
            className="lg:min-h-0"
            sizes="(max-width: 1024px) 100vw, 20vw"
            onOpen={() => openAtIndex(1)}
          />
          <GalleryImageTile
            src={visibleLeadImages[2]}
            alt={`${title} photo 3`}
            className="lg:min-h-0"
            sizes="(max-width: 1024px) 100vw, 20vw"
            onOpen={() => openAtIndex(2)}
          />
          <GalleryImageTile
            src={visibleLeadImages[3]}
            alt={`${title} photo 4`}
            className="lg:row-span-2 lg:min-h-0"
            sizes="(max-width: 1024px) 100vw, 36vw"
            onOpen={() => openAtIndex(3)}
          />
        </div>
      ) : (
        <div className="mt-6 grid grid-cols-1 gap-2 md:grid-cols-2 md:gap-3">
          {visibleLeadImages.map((image, index) => (
            <GalleryImageTile
              key={`${title}-lead-${index}`}
              src={image}
              alt={`${title} photo ${index + 1}`}
              className="min-h-[190px] md:min-h-[220px]"
              sizes="(max-width: 768px) 100vw, 50vw"
              priority={index === 0}
              onOpen={() => openAtIndex(index)}
            />
          ))}
        </div>
      )}

      {hasManyImages && !showAll ? (
        <div className="mt-3 flex justify-center">
          <button
            type="button"
            onClick={() => setShowAll(true)}
            className="rounded-full border border-[var(--sandstone-navy)]/18 bg-white px-5 py-2 text-sm font-semibold text-[var(--sandstone-navy)] transition hover:bg-[var(--sandstone-off-white)]"
          >
            View all {images.length} photos
          </button>
        </div>
      ) : null}

      {showAll && remainingImages.length > 0 ? (
        <div className="mt-3">
          <div className="grid grid-cols-2 gap-2 md:grid-cols-3 md:gap-3 lg:grid-cols-4">
            {remainingImages.map((image, index) => (
              <GalleryImageTile
                key={`${title}-remaining-${index}`}
                src={image}
                alt={`${title} photo ${index + 5}`}
                className="min-h-[155px] md:min-h-[170px]"
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                onOpen={() => openAtIndex(index + 4)}
              />
            ))}
          </div>
          <div className="mt-3 flex justify-center">
            <button
              type="button"
              onClick={() => setShowAll(false)}
              className="rounded-full border border-[var(--sandstone-navy)]/18 bg-white px-5 py-2 text-sm font-semibold text-[var(--sandstone-navy)] transition hover:bg-[var(--sandstone-off-white)]"
            >
              Show fewer photos
            </button>
          </div>
        </div>
      ) : null}

      {activeImage && (
        <div
          className="fixed inset-0 z-[140] bg-black/88 p-4 md:p-8"
          role="dialog"
          aria-modal="true"
          onClick={() => setActiveIndex(null)}
        >
          <button
            type="button"
            onClick={() => setActiveIndex(null)}
            className="absolute right-4 top-4 rounded-full bg-white/12 p-2 text-white transition hover:bg-white/20"
            aria-label="Close photo viewer"
          >
            <X size={20} />
          </button>

          {canGoPrevious && (
            <button
              type="button"
              onClick={(event) => {
                event.stopPropagation();
                setActiveIndex((current) => (current == null ? current : current - 1));
              }}
              className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full bg-white/12 p-2 text-white transition hover:bg-white/20 md:left-6"
              aria-label="Previous photo"
            >
              <ChevronLeft size={22} />
            </button>
          )}

          {canGoNext && (
            <button
              type="button"
              onClick={(event) => {
                event.stopPropagation();
                setActiveIndex((current) => (current == null ? current : current + 1));
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
              src={activeImage}
              alt={title}
              fill
              className="object-contain"
              sizes="100vw"
              unoptimized={shouldBypassNextImageOptimization(activeImage)}
            />
          </div>
        </div>
      )}
    </>
  );
}
