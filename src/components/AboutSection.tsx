"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import {
  ABOUT_HEADLINE,
  ABOUT_WHAT_WE_DO,
  ABOUT_FOUNDER_ALT,
  SITE_CONTACT,
  SITE_ADDRESS,
} from "@/constants/site";

export function AboutSection() {
  const [founderImgError, setFounderImgError] = useState(false);
  return (
    <section id="about-us" className="relative scroll-mt-24 py-14 md:py-20">
      <div className="pointer-events-none absolute inset-x-0 top-4 mx-auto h-40 max-w-5xl rounded-full bg-sandstone-bronze/15 blur-[80px]" />
      <div className="container mx-auto max-w-6xl px-4">
        <motion.div
          className="section-frame relative overflow-hidden p-6 md:p-10"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.5 }}
        >
          <div className="pointer-events-none absolute -right-16 -top-20 h-44 w-44 rounded-full bg-sandstone-navy/10 blur-3xl" />
          <div className="pointer-events-none absolute -left-20 bottom-4 h-40 w-40 rounded-full bg-sandstone-bronze/20 blur-3xl" />

          <div className="relative grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] lg:items-center">
            <div className="space-y-6">
              <p className="inline-flex rounded-full border border-white/70 bg-white/60 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-sandstone-navy/75 backdrop-blur-sm">
                Sandstone Signature
              </p>
              <h2 className="text-2xl font-bold leading-tight text-sandstone-navy md:text-4xl">
                {ABOUT_HEADLINE}
              </h2>

              <div className="panel-glass p-5 text-sandstone-text/90">
                <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-sandstone-navy/70">
                  Contact
                </p>
                <div className="mt-3 space-y-2 text-sm">
                  <a
                    href={`tel:${SITE_CONTACT.phoneRaw}`}
                    className="block transition-colors hover:text-sandstone-bronze"
                  >
                    {SITE_CONTACT.phone}
                  </a>
                  <a
                    href={`mailto:${SITE_CONTACT.email}`}
                    className="block break-all transition-colors hover:text-sandstone-bronze"
                  >
                    {SITE_CONTACT.email}
                  </a>
                  <p className="pt-1">
                    {SITE_ADDRESS.line1}
                    <br />
                    {SITE_ADDRESS.city}, {SITE_ADDRESS.state} {SITE_ADDRESS.zip}
                  </p>
                </div>
              </div>

              <p className="text-[11px] uppercase tracking-[0.18em] text-sandstone-navy/60">
                El Paso • Fort Bliss • Luxury & Relocation
              </p>
            </div>

            <div className="grid gap-5">
              <div className="panel-glass relative overflow-hidden p-6 md:p-7">
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/55 via-white/15 to-sandstone-base/35" />
                <div className="relative">
                  <h3 className="mb-3 text-xl font-bold text-sandstone-navy">
                    What we can do for you
                  </h3>
                  <p className="leading-relaxed text-sandstone-text/90">
                    {ABOUT_WHAT_WE_DO}
                  </p>
                </div>
              </div>

              <div className="light-sweep image-structure relative aspect-[7/5] overflow-hidden rounded-2xl border border-white/70 bg-white/45 shadow-[0_24px_45px_-30px_rgba(75,31,47,0.55)]">
                <Image
                  src="/agents-1.jpg"
                  alt={ABOUT_FOUNDER_ALT}
                  fill
                  className="object-cover object-center"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  unoptimized
                  onError={() => setFounderImgError(true)}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-sandstone-navy/45 via-sandstone-navy/5 to-transparent" />
                <div className="absolute inset-x-3 bottom-3 rounded-xl border border-white/35 bg-white/15 p-3 text-white/95 backdrop-blur-md">
                  <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-white/75">
                    Founder
                  </p>
                  <p className="text-sm font-semibold">Alejandro Gamboa</p>
                </div>

                {founderImgError && (
                  <span className="absolute inset-0 flex items-center justify-center bg-sandstone-base/40 text-sm text-sandstone-navy/60">
                    Founder image
                  </span>
                )}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
