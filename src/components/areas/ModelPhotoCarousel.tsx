"use client";

import { useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";

type CarouselImage = { src: string; alt: string };

export function ModelPhotoCarousel({ images }: { images: CarouselImage[] }) {
  const [current, setCurrent] = useState(0);

  const prev = () => setCurrent((i) => (i - 1 + images.length) % images.length);
  const next = () => setCurrent((i) => (i + 1) % images.length);

  return (
    <div>
      {/* Main photo */}
      <div className="relative overflow-hidden rounded-2xl" style={{ aspectRatio: "16/9" }}>

        {/* Counter pill */}
        <div className="absolute left-4 top-4 z-20 rounded-full bg-white/90 px-3 py-1.5 text-xs font-bold text-[var(--sandstone-navy)] shadow-sm">
          {current + 1} / {images.length}
        </div>

        <Image
          src={images[current].src}
          alt={images[current].alt}
          fill
          sizes="(max-width: 1024px) 100vw, 80vw"
          className="object-cover transition-opacity duration-300"
          priority
        />

        {/* Prev arrow */}
        <button
          onClick={prev}
          aria-label="Previous photo"
          className="absolute left-4 top-1/2 z-20 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 shadow-md transition hover:bg-white"
        >
          <ChevronLeft size={20} className="text-[var(--sandstone-navy)]" />
        </button>

        {/* Next arrow */}
        <button
          onClick={next}
          aria-label="Next photo"
          className="absolute right-4 top-1/2 z-20 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 shadow-md transition hover:bg-white"
        >
          <ChevronRight size={20} className="text-[var(--sandstone-navy)]" />
        </button>

        {/* Dot indicators */}
        <div className="absolute bottom-4 left-1/2 z-20 flex -translate-x-1/2 items-center gap-1.5">
          {images.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              aria-label={`Go to photo ${i + 1}`}
              className={`h-1.5 rounded-full transition-all duration-200 ${
                i === current ? "w-5 bg-white" : "w-1.5 bg-white/50"
              }`}
            />
          ))}
        </div>
      </div>

      {/* Thumbnail strip */}
      <div className="mt-3 flex gap-2 overflow-x-auto pb-1">
        {images.map((img, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            aria-label={`View photo ${i + 1}`}
            className={`relative h-16 w-24 flex-none overflow-hidden rounded-lg transition ${
              i === current
                ? "ring-2 ring-[var(--sandstone-navy)] ring-offset-1"
                : "opacity-55 hover:opacity-90"
            }`}
          >
            <Image src={img.src} alt="" fill sizes="96px" className="object-cover" />
          </button>
        ))}
      </div>
    </div>
  );
}
