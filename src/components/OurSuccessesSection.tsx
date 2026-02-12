"use client";

import { useState, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { STATS, GALLERY_TITLE, GALLERY_IMAGES } from "@/constants/site";
import { RollingStatValue } from "@/components/ui/rolling-number";
import { Button } from "@/components/ui/button";

const GALLERY_SLIDE_DURATION_MS = 4500;

export function OurSuccessesSection() {
  const [galleryIndex, setGalleryIndex] = useState(0);
  const galleryTotal = GALLERY_IMAGES.length;

  const galleryNext = useCallback(() => {
    setGalleryIndex((i) => (i + 1) % galleryTotal);
  }, [galleryTotal]);

  const galleryPrev = useCallback(() => {
    setGalleryIndex((i) => (i - 1 + galleryTotal) % galleryTotal);
  }, [galleryTotal]);

  useEffect(() => {
    if (galleryTotal === 0) return;
    const t = setInterval(galleryNext, GALLERY_SLIDE_DURATION_MS);
    return () => clearInterval(t);
  }, [galleryNext, galleryTotal]);

  return (
    <section
      id="our-successes"
      className="relative overflow-hidden bg-sandstone-navy py-10 md:py-12 scroll-mt-20"
    >
      <div className="pointer-events-none absolute -top-20 right-12 h-56 w-56 rounded-full bg-sandstone-bronze/20 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-20 left-10 h-48 w-48 rounded-full bg-white/10 blur-3xl" />
      <div className="container mx-auto max-w-5xl px-4">
        {/* Stats row */}
        <motion.h2
          className="font-heading text-xl font-bold text-sandstone-base mb-6 text-center md:text-2xl"
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          Our Successes
        </motion.h2>
        <motion.ul
          className="mb-10 flex gap-3 overflow-x-auto rounded-2xl border border-white/15 bg-white/5 p-4 backdrop-blur-md md:gap-4 md:p-5 [&::-webkit-scrollbar]:hidden [scrollbar-width:none]"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.4, staggerChildren: 0.04 }}
        >
          {STATS.map((stat, i) => (
            <motion.li
              key={stat.label}
              className="min-w-[190px] flex-1 rounded-xl border border-white/15 bg-black/10 px-4 py-3 text-center"
              initial={{ opacity: 0, y: 6 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.04, duration: 0.35 }}
            >
              <span className="block font-heading text-xl font-bold text-sandstone-base md:text-2xl">
                <RollingStatValue
                  rollDigits={stat.rollDigits}
                  commaAfterIndex={stat.commaAfterIndex}
                  suffix={stat.suffix}
                  delay={i * 0.04}
                  duration={0.6}
                />
              </span>
              <span className="mt-1 block text-[11px] font-medium uppercase tracking-wider text-white/80 md:text-xs">
                {stat.label}
              </span>
            </motion.li>
          ))}
        </motion.ul>

        {/* Gallery slideshow (under stats) */}
        <div id="gallery" className="scroll-mt-20">
          <h3 className="font-heading text-lg font-bold text-sandstone-base mb-4 text-center">
            {GALLERY_TITLE}
          </h3>
          <div className="relative max-w-2xl mx-auto aspect-[4/3] overflow-hidden rounded-xl bg-sandstone-base/20">
            {GALLERY_IMAGES.length > 0 ? (
              <>
                <AnimatePresence mode="wait" initial={false}>
                  <motion.div
                    key={galleryIndex}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="absolute inset-0"
                  >
                    <Image
                      src={GALLERY_IMAGES[galleryIndex].src}
                      alt={GALLERY_IMAGES[galleryIndex].alt}
                      fill
                      className="object-cover"
                      sizes="(max-width: 672px) 100vw, 672px"
                      unoptimized
                      onError={(e) => {
                        e.currentTarget.style.display = "none";
                      }}
                    />
                  </motion.div>
                </AnimatePresence>
                <div className="absolute inset-x-0 bottom-2 flex items-center justify-center gap-2">
                  <Button
                    type="button"
                    variant="outline"
                    size="icon"
                    className="h-8 w-8 border-white/40 text-white hover:bg-white/20"
                    onClick={galleryPrev}
                    aria-label="Previous image"
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                  <div className="flex gap-1.5">
                    {GALLERY_IMAGES.map((_, i) => (
                      <button
                        key={i}
                        type="button"
                        aria-label={`Image ${i + 1}`}
                        className={`h-1.5 rounded-full transition-all ${
                          i === galleryIndex ? "w-4 bg-sandstone-bronze" : "w-1.5 bg-white/50"
                        }`}
                        onClick={() => setGalleryIndex(i)}
                      />
                    ))}
                  </div>
                  <Button
                    type="button"
                    variant="outline"
                    size="icon"
                    className="h-8 w-8 border-white/40 text-white hover:bg-white/20"
                    onClick={galleryNext}
                    aria-label="Next image"
                  >
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              </>
            ) : (
              <div className="absolute inset-0 flex items-center justify-center text-white/60 text-sm">
                Add images to gallery
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
