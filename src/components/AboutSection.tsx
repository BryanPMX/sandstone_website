"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import {
  ABOUT_HEADLINE,
  ABOUT_WHAT_WE_DO,
  ABOUT_FOUNDER_ALT,
  SITE_CONTACT,
} from "@/constants/site";

export function AboutSection() {
  const [founderImgError, setFounderImgError] = useState(false);
  return (
    <section id="about-us" className="relative scroll-mt-24 py-14 md:py-20">
      <div className="pointer-events-none absolute inset-x-0 top-8 mx-auto h-44 max-w-5xl rounded-full bg-sandstone-bronze/15 blur-[90px]" />
      <div className="pointer-events-none absolute -left-16 bottom-8 h-36 w-36 rounded-full bg-sandstone-navy/15 blur-3xl" />
      <div className="container mx-auto max-w-6xl px-4">
        <motion.div
          className="section-frame relative overflow-hidden p-5 md:p-9"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.5 }}
        >
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_15%_25%,rgba(184,135,70,0.16),transparent_45%),radial-gradient(circle_at_82%_80%,rgba(75,31,47,0.14),transparent_44%)]" />

          <div className="relative grid items-center gap-8 lg:grid-cols-[minmax(0,0.92fr)_minmax(0,1.08fr)]">
            <div className="panel-glass light-sweep relative overflow-hidden rounded-[1.35rem] p-4 md:p-6">
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-white/35 via-white/5 to-sandstone-navy/10" />

              <div className="relative">
                <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-sandstone-navy/70">
                  Founder
                </p>
                <p className="mt-1 text-lg font-semibold text-sandstone-navy">
                  Alejandro Gamboa
                </p>
              </div>

              <div className="relative mt-4 rounded-xl border border-white/60 bg-white/35 p-3">
                {!founderImgError ? (
                  <Image
                    src="/agents-1.jpg"
                    alt={ABOUT_FOUNDER_ALT}
                    width={960}
                    height={1200}
                    className="h-auto w-full object-contain"
                    sizes="(max-width: 1024px) 100vw, 42vw"
                    unoptimized
                    onError={() => setFounderImgError(true)}
                  />
                ) : (
                  <span className="flex min-h-[340px] items-center justify-center text-sm text-sandstone-navy/60">
                    Founder image
                  </span>
                )}
              </div>

              <p className="relative mt-4 text-xs uppercase tracking-[0.18em] text-sandstone-navy/60">
                Luxury and relocation advisory
              </p>
            </div>

            <div className="space-y-5">
              <p className="inline-flex rounded-full border border-white/75 bg-white/65 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-sandstone-navy/75 backdrop-blur-sm">
                About Me
              </p>
              <h2 className="text-3xl font-bold leading-tight text-sandstone-navy md:text-4xl">
                {ABOUT_HEADLINE}
              </h2>
              <p className="max-w-2xl text-base leading-relaxed text-sandstone-text/90 md:text-lg">
                {ABOUT_WHAT_WE_DO}
              </p>

              <div className="grid gap-3 sm:grid-cols-2">
                <a
                  href={`tel:${SITE_CONTACT.phoneRaw}`}
                  className="group relative overflow-hidden rounded-xl border border-white/70 bg-white/50 px-4 py-3 text-sm text-sandstone-text/90 backdrop-blur-md transition duration-300 hover:-translate-y-0.5 hover:border-sandstone-bronze/55"
                >
                  <span className="absolute inset-0 bg-gradient-to-r from-sandstone-bronze/10 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                  <span className="relative font-medium">{SITE_CONTACT.phone}</span>
                </a>
                <a
                  href={`mailto:${SITE_CONTACT.email}`}
                  className="group relative overflow-hidden rounded-xl border border-white/70 bg-white/50 px-4 py-3 text-sm text-sandstone-text/90 backdrop-blur-md transition duration-300 hover:-translate-y-0.5 hover:border-sandstone-navy/45"
                >
                  <span className="absolute inset-0 bg-gradient-to-r from-sandstone-navy/10 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                  <span className="relative break-all font-medium">{SITE_CONTACT.email}</span>
                </a>
              </div>

              <p className="text-[11px] uppercase tracking-[0.18em] text-sandstone-navy/65">
                El Paso - Fort Bliss - Trust - Excellence
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
