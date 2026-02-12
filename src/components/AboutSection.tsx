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
    <section id="about-us" className="relative scroll-mt-24 pt-14 pb-10 md:pt-16 md:pb-12">
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

          <div className="relative grid items-start gap-8 lg:grid-cols-[minmax(0,0.92fr)_minmax(0,1.08fr)] lg:items-stretch">
            <div className="panel-glass relative overflow-hidden rounded-[1.35rem] border border-white/75 p-4 shadow-[0_24px_45px_-32px_rgba(75,31,47,0.55)] md:p-6">
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-white/35 via-white/5 to-sandstone-navy/10" />

              <div className="relative">
                <p className="badge-sandstone-accent text-[10px] tracking-[0.16em]">
                  Founder
                </p>
              </div>

              <div className="relative mt-4 rounded-[1.05rem] bg-gradient-to-br from-white/90 via-sandstone-base/45 to-sandstone-navy/25 p-[1.6px] shadow-[0_20px_38px_-26px_rgba(75,31,47,0.65)]">
                <div className="relative overflow-hidden rounded-[0.95rem] border border-white/80 bg-white/30 p-3">
                  {!founderImgError ? (
                    <>
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
                    </>
                  ) : (
                    <span className="flex min-h-[340px] items-center justify-center text-sm text-sandstone-navy/60">
                      Founder image
                    </span>
                  )}
                  <div className="pointer-events-none absolute inset-2 rounded-[0.75rem] border border-white/60" />
                </div>
              </div>

              <div className="relative mt-4">
                <p className="badge-sandstone-accent">
                  Founder Alejandro Gamboa
                </p>
              </div>

              <p className="relative mt-4 text-xs uppercase tracking-[0.18em] text-sandstone-navy/60">
                Luxury and relocation advisory
              </p>
            </div>

            <div className="panel-glass relative flex h-full flex-col overflow-hidden rounded-[1.35rem] border border-white/75 p-6 shadow-[0_26px_44px_-32px_rgba(75,31,47,0.5)] md:p-7">
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/50 via-white/10 to-sandstone-base/30" />

              <div className="relative space-y-5">
                <p className="badge-sandstone-accent">About Me</p>
                <h2 className="text-3xl font-bold leading-tight text-sandstone-navy md:text-4xl">
                  {ABOUT_HEADLINE}
                </h2>
                <p className="max-w-2xl text-base leading-relaxed text-sandstone-text/90 md:text-lg">
                  {ABOUT_WHAT_WE_DO}
                </p>
              </div>

              <div className="relative mt-4 space-y-2.5">
                <div className="grid gap-3 sm:grid-cols-2">
                  <a
                    href={`tel:${SITE_CONTACT.phoneRaw}`}
                    className="badge-sandstone-accent justify-center px-4 py-3 text-sm normal-case tracking-[0.06em] sm:justify-start"
                  >
                    <span className="font-medium">{SITE_CONTACT.phone}</span>
                  </a>
                  <a
                    href={`mailto:${SITE_CONTACT.email}`}
                    className="badge-sandstone-dark justify-center px-4 py-3 text-sm normal-case tracking-[0.05em] text-white sm:justify-start"
                  >
                    <span className="break-all font-medium">{SITE_CONTACT.email}</span>
                  </a>
                </div>

                <p className="badge-sandstone-chip w-full justify-center px-4 py-2 text-[11px] uppercase tracking-[0.14em] text-sandstone-navy">
                  El Paso - Fort Bliss - Trust - Excellence
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
