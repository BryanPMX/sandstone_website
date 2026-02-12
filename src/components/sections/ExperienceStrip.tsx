"use client";

import { motion } from "framer-motion";
import { Camera, Plane, ShieldCheck } from "lucide-react";

const items = [
  {
    icon: Camera,
    title: "Media-first launches",
    body: "Cinematic tours, twilight photography, and short-form reels that mirror the live site you shared.",
  },
  {
    icon: Plane,
    title: "Relocation ready",
    body: "VA + PCS expertise, live video showings, and on-base closing support for Fort Bliss moves.",
  },
  {
    icon: ShieldCheck,
    title: "Concierge closings",
    body: "Offer strategy, appraisal prep, vendor coordination—all communicated with weekly check-ins.",
  },
];

export function ExperienceStrip() {
  return (
    <section className="py-12 md:py-14">
      <div className="container mx-auto max-w-6xl px-4">
        <div className="section-frame grid gap-4 p-5 md:grid-cols-3 md:p-6">
          {items.map((item, i) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.title}
                className="group relative overflow-hidden rounded-2xl border border-white/70 bg-white/65 p-5 shadow-[0_18px_30px_-25px_rgba(75,31,47,0.34)] backdrop-blur-md"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ delay: i * 0.08, duration: 0.5 }}
              >
                <div className="absolute inset-0 opacity-0 transition group-hover:opacity-100">
                  <div className="absolute inset-0 bg-gradient-to-br from-sandstone-bronze/12 via-white/0 to-sandstone-navy/12" />
                </div>
                <div className="flex items-center gap-3">
                  <span className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-sandstone-bronze shadow-sm">
                    <Icon className="h-5 w-5" aria-hidden />
                  </span>
                  <p className="font-heading text-lg font-semibold text-sandstone-navy">
                    {item.title}
                  </p>
                </div>
                <p className="mt-3 text-sm text-sandstone-text/80 leading-relaxed">
                  {item.body}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
