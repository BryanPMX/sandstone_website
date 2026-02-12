"use client";

import { motion } from "framer-motion";
import { ShieldCheck, Clock3, Handshake } from "lucide-react";

const items = [
  {
    icon: ShieldCheck,
    title: "VA & relocation specialists",
    body: "Full PCS support, virtual tours, and on-base closings for Fort Bliss families.",
  },
  {
    icon: Clock3,
    title: "10-day launch",
    body: "Cleaning, staging, pro photos, and MLS syndication in under two weeks.",
  },
  {
    icon: Handshake,
    title: "Concierge negotiations",
    body: "Offer strategy, appraisal prep, and repair coordination handled end-to-end.",
  },
];

export function HeroMeta() {
  return (
    <div className="mt-8 grid gap-3 sm:grid-cols-3">
      {items.map((item, i) => {
        const Icon = item.icon;
        return (
          <motion.div
            key={item.title}
            className="rounded-xl border border-white/10 bg-white/5 p-3 shadow-lg backdrop-blur-sm"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 + i * 0.05, duration: 0.45 }}
          >
            <div className="flex items-center gap-2 text-sandstone-base">
              <Icon className="h-4 w-4" aria-hidden />
              <span className="text-xs font-semibold uppercase tracking-wide">{item.title}</span>
            </div>
            <p className="mt-2 text-sm text-white/80 leading-relaxed">{item.body}</p>
          </motion.div>
        );
      })}
    </div>
  );
}
