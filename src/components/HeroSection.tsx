"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronRight, PlayCircle } from "lucide-react";
import Link from "next/link";
import { HeroMeta } from "./sections/HeroMeta";
import {
  HERO_TITLE,
  HERO_SLOGAN,
  HERO_CTA,
} from "@/constants/site";

const HERO_ROTATING_POINTS = [
  "Boutique Advisory",
  "Cinematic Marketing",
  "Relocation Expertise",
];

export function HeroSection() {
  const [activePoint, setActivePoint] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActivePoint((index) => (index + 1) % HERO_ROTATING_POINTS.length);
    }, 2600);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative isolate overflow-hidden bg-sandstone-navy text-white">
      <div className="absolute inset-0 z-0">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="h-full w-full object-cover"
          poster="/hero-poster.jpg"
        >
          <source src="/hero-video.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-br from-sandstone-navy/85 via-sandstone-navy/80 to-black/40" />
      </div>
      <div className="pointer-events-none absolute -left-32 top-20 h-64 w-64 rounded-full bg-sandstone-bronze/20 blur-3xl orb-drift" />
      <div className="pointer-events-none absolute -right-24 bottom-10 h-72 w-72 rounded-full bg-white/10 blur-3xl orb-drift [animation-delay:-5.5s]" />
      <div className="pointer-events-none absolute left-1/2 top-[-8rem] h-64 w-[38rem] -translate-x-1/2 rounded-full bg-sandstone-bronze/12 blur-[90px]" />

      <div className="relative z-10 mx-auto flex min-h-[70vh] max-w-6xl flex-col justify-center px-4 py-20 lg:flex-row lg:items-center lg:gap-12">
        <motion.div
          className="max-w-2xl space-y-4"
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className="inline-flex w-fit rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs uppercase tracking-[0.2em] text-white/75 backdrop-blur-sm">
            El Paso · Fort Bliss · Luxury · Relocation
          </p>
          <h1 className="font-heading text-4xl font-bold leading-tight text-sandstone-base sm:text-5xl lg:text-6xl">
            {HERO_TITLE}
          </h1>
          <p className="text-lg text-white/90 sm:text-xl leading-relaxed">
            {HERO_SLOGAN}
          </p>
          <div className="h-8">
            <AnimatePresence mode="wait" initial={false}>
              <motion.p
                key={HERO_ROTATING_POINTS[activePoint]}
                className="inline-flex items-center rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-sandstone-base backdrop-blur-md"
                initial={{ opacity: 0, y: 8, filter: "blur(4px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                exit={{ opacity: 0, y: -8, filter: "blur(4px)" }}
                transition={{ duration: 0.35 }}
              >
                {HERO_ROTATING_POINTS[activePoint]}
              </motion.p>
            </AnimatePresence>
          </div>
          <div className="flex flex-wrap items-center gap-3 pt-2">
            <Link
              href="/#contact"
              className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-sandstone-bronze px-5 py-3 text-sm font-semibold uppercase tracking-wider text-white shadow-lg shadow-black/20 transition-all duration-[460ms] ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-[3px] hover:shadow-[0_26px_42px_-18px_rgba(184,135,70,0.95)] focus-visible:-translate-y-[3px] focus-visible:outline-none"
            >
              <span
                aria-hidden
                className="pointer-events-none absolute inset-y-0 -left-2/3 w-[58%] -skew-x-12 bg-gradient-to-r from-white/0 via-white/50 to-white/0 opacity-0 transition-all duration-700 group-hover:left-[132%] group-hover:opacity-100 group-focus-visible:left-[132%] group-focus-visible:opacity-100"
              />
              <span className="relative z-10">{HERO_CTA}</span>
              <ChevronRight
                className="relative z-10 h-4 w-4 transition-transform duration-[420ms] group-hover:translate-x-1 group-hover:scale-110 group-focus-visible:translate-x-1 group-focus-visible:scale-110"
                aria-hidden
              />
            </Link>
            <Link
              href="/#gallery"
              className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full border border-white/30 px-5 py-3 text-sm font-semibold uppercase tracking-wider text-white/90 backdrop-blur-sm transition-all duration-[460ms] ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-[2px] hover:border-white hover:text-white hover:shadow-[0_24px_38px_-24px_rgba(255,255,255,0.95)] focus-visible:-translate-y-[2px] focus-visible:border-white focus-visible:text-white focus-visible:outline-none"
            >
              <span
                aria-hidden
                className="pointer-events-none absolute inset-x-0 bottom-0 h-full bg-gradient-to-r from-white/0 via-white/20 to-white/0 opacity-0 transition-opacity duration-500 group-hover:opacity-100 group-focus-visible:opacity-100"
              />
              <PlayCircle
                className="relative z-10 h-4 w-4 transition-transform duration-[420ms] group-hover:scale-125 group-focus-visible:scale-125"
                aria-hidden
              />
              <span className="relative z-10">Tour Listings</span>
            </Link>
          </div>
          <HeroMeta />
        </motion.div>

        <motion.div
          className="mt-10 w-full max-w-xl lg:mt-0"
          initial={{ opacity: 0, x: 24 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.65, delay: 0.1 }}
        >
          <div className="glass-dark relative overflow-hidden rounded-2xl border border-white/20 p-4 shadow-2xl fade-up-soft">
            <div className="rounded-xl bg-black/30 p-2">
              <div className="light-sweep image-structure relative aspect-[4/3] overflow-hidden rounded-lg">
                <video
                  autoPlay
                  muted
                  loop
                  playsInline
                  className="h-full w-full object-cover"
                  poster="/hero-poster.jpg"
                >
                  <source src="/hero-video.mp4" type="video/mp4" />
                </video>
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-xs text-white/80">
                  <div>
                    <p className="font-semibold">Featured cinematic tour</p>
                    <p className="text-[11px]">Updated weekly with new releases</p>
                  </div>
                  <span className="flex items-center gap-1 rounded-full bg-white/15 px-2 py-1 text-[11px] font-semibold text-white">
                    <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-sandstone-base" aria-hidden /> Now Showing
                  </span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
