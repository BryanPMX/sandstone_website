"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { PhoneCall, CalendarDays } from "lucide-react";
import { SITE_CONTACT, HERO_CTA } from "@/constants/site";

/**
 * Floating CTA that appears after user scrolls past hero.
 * Helps the site feel "alive" and keeps the primary action visible.
 */
export function StickyCTA() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const threshold = 420;
      setVisible(window.scrollY > threshold);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 80, opacity: 0 }}
          transition={{ type: "spring", stiffness: 380, damping: 28 }}
          className="fixed bottom-4 right-4 z-[60] flex flex-col gap-2"
        >
          <Link
            href={`tel:${SITE_CONTACT.phoneRaw}`}
            className="inline-flex items-center gap-2 rounded-full border border-white/70 bg-white/85 px-4 py-2 text-sm font-semibold text-sandstone-navy shadow-lg shadow-black/10 backdrop-blur-md transition hover:-translate-y-0.5 hover:shadow-xl"
            aria-label={`Call ${SITE_CONTACT.phone}`}
          >
            <PhoneCall className="h-4 w-4 text-sandstone-bronze" aria-hidden />
            Call {SITE_CONTACT.phone}
          </Link>
          <Link
            href="/#contact"
            className="inline-flex items-center gap-2 rounded-full bg-sandstone-bronze px-4 py-2 text-sm font-semibold uppercase tracking-wider text-white shadow-lg shadow-black/15 transition hover:-translate-y-0.5 hover:shadow-xl"
            aria-label={HERO_CTA}
          >
            <CalendarDays className="h-4 w-4" aria-hidden />
            {HERO_CTA}
          </Link>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
