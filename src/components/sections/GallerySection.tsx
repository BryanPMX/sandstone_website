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
      className="relative overflow-hidden bg-gradient-to-br from-sandstone-maroon via-sandstone-navy to-sandstone-bronze/80 py-[70px] md:py-[84px] scroll-mt-20"
      aria-label="Gallery"
    >
      <div className="pointer-events-none absolute inset-0 bg-black/35" aria-hidden />
      <div className="pointer-events-none absolute -top-24 right-8 h-64 w-64 rounded-full bg-sandstone-bronze/28 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-28 left-8 h-56 w-56 rounded-full bg-white/14 blur-3xl" />
      <div className="container relative z-10 mx-auto max-w-6xl px-4">
        <div className="section-frame mb-[35px] p-[28px] text-center md:p-[35px]">
          <p className="badge-sandstone mx-auto">Fresh this week</p>
          <h2 className="font-heading text-3xl font-bold text-sandstone-gold md:text-4xl">
            {GALLERY_TITLE}
          </h2>
          <p className="mt-[14px] text-sandstone-gold">{GALLERY_SUBTITLE}</p>
        </div>

        <div className="grid gap-[21px] sm:grid-cols-2 lg:grid-cols-3">
          {(hasImages ? images : new Array(6).fill(null)).map((img, i) => (
            <motion.figure
              key={img?.src ?? i}
              className={`group relative overflow-hidden rounded-xl border border-white/65 bg-white/70 shadow-[0_20px_45px_-26px_rgba(37,52,113,0.33)] backdrop-blur-md ${
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
                      <span className="badge-sandstone-dark px-3 py-1 text-[11px] normal-case tracking-[0.08em]">
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
