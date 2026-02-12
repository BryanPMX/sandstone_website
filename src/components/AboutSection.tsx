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
    <section
      id="about-us"
      className="py-12 md:py-16 scroll-mt-20"
    >
      <div className="container mx-auto max-w-6xl px-4">
        <motion.div
          className="section-frame grid gap-10 p-6 md:grid-cols-2 md:gap-12 md:p-8"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.5 }}
        >
          {/* Column 1: About Us */}
          <div className="space-y-6">
            <p className="inline-flex rounded-full border border-sandstone-base/60 bg-sandstone-base/25 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-sandstone-navy/75">
              First Impression
            </p>
            <h2 className="font-heading text-2xl font-bold text-sandstone-navy md:text-3xl">
              {ABOUT_HEADLINE}
            </h2>
            <div className="panel-glass space-y-2 p-4 text-sandstone-text/90">
              <p className="font-medium text-sandstone-navy">Contact</p>
              <a
                href={`tel:${SITE_CONTACT.phoneRaw}`}
                className="block text-sm hover:text-sandstone-bronze transition-colors"
              >
                {SITE_CONTACT.phone}
              </a>
              <a
                href={`mailto:${SITE_CONTACT.email}`}
                className="block text-sm hover:text-sandstone-bronze transition-colors break-all"
              >
                {SITE_CONTACT.email}
              </a>
              <p className="text-sm pt-2">
                {SITE_ADDRESS.line1}
                <br />
                {SITE_ADDRESS.city}, {SITE_ADDRESS.state} {SITE_ADDRESS.zip}
              </p>
            </div>
            <div className="relative aspect-[3/4] max-w-sm overflow-hidden rounded-xl border border-white/70 bg-sandstone-base/30 shadow-lg flex items-center justify-center">
              <Image
                src="/founder.jpg"
                alt={ABOUT_FOUNDER_ALT}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
                unoptimized
                onError={() => setFounderImgError(true)}
              />
              {founderImgError && (
                <span className="absolute inset-0 flex items-center justify-center bg-sandstone-base/40 text-sandstone-navy/60 text-sm">
                  Founder image
                </span>
              )}
            </div>
          </div>

          {/* Column 2: What we can do for you */}
          <div className="flex flex-col justify-center">
            <h3 className="font-heading text-xl font-bold text-sandstone-navy mb-3">
              What we can do for you
            </h3>
            <p className="text-sandstone-text/90 leading-relaxed">
              {ABOUT_WHAT_WE_DO}
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
