"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import type { GalleryImage } from "@/types";
import { GALLERY_TITLE, GALLERY_SUBTITLE } from "@/constants/site";

interface GallerySectionProps {
  images: GalleryImage[];
}

/**
 * Responsive gallery fed by live listings. Falls back to skeletons if empty.
 */
export function GallerySection({ images }: GallerySectionProps) {
  const hasImages = images.length > 0;

  return (
    <section
      id="gallery"
      className="py-16 md:py-20 scroll-mt-20"
      aria-label="Gallery"
    >
      <div className="container mx-auto max-w-6xl px-4">
        <div className="section-frame mb-8 p-6 text-center md:p-8">
          <p className="text-xs uppercase tracking-[0.3em] text-sandstone-text/60">Fresh this week</p>
          <h2 className="font-heading text-3xl font-bold text-sandstone-navy md:text-4xl">
            {GALLERY_TITLE}
          </h2>
          <p className="mt-2 text-sandstone-text/70">{GALLERY_SUBTITLE}</p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {(hasImages ? images : new Array(6).fill(null)).map((img, i) => (
            <motion.figure
              key={img?.src ?? i}
              className={`group relative overflow-hidden rounded-xl border border-white/65 bg-white/70 shadow-[0_20px_45px_-26px_rgba(75,31,47,0.36)] backdrop-blur-md ${
                i % 5 === 0 ? "sm:col-span-2" : ""
              }`}
              initial={{ opacity: 0, y: 16, filter: "blur(6px)" }}
              whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ delay: i * 0.04, duration: 0.4 }}
            >
              <div
                className={`light-sweep image-structure relative overflow-hidden ${
                  i % 5 === 0 ? "aspect-[16/9]" : "aspect-[4/3]"
                }`}
              >
                {img ? (
                  <Image
                    src={img.src}
                    alt={img.alt}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    priority={i < 2}
                  />
                ) : (
                  <div className="h-full w-full animate-pulse bg-sandstone-base/40" />
                )}
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                {img && (
                  <figcaption className="absolute inset-x-0 bottom-0 flex items-center justify-between p-3 text-sm text-white">
                    <div>
                      <p className="font-semibold leading-tight">{img.location ?? "El Paso, TX"}</p>
                      {img.stats && <p className="text-xs text-white/80">{img.stats}</p>}
                    </div>
                    {img.price && (
                      <span className="rounded-full bg-black/60 px-3 py-1 text-xs font-semibold">
                        {img.price}
                      </span>
                    )}
                  </figcaption>
                )}
              </div>
            </motion.figure>
          ))}
        </div>
      </div>
    </section>
  );
}
