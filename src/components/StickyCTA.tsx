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
      const footer = document.getElementById("footer");
      const footerTop = footer ? footer.getBoundingClientRect().top + window.scrollY : Infinity;
      const shouldShow = window.scrollY > threshold && window.scrollY + window.innerHeight < footerTop - 80;
      setVisible(shouldShow);
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
          className="fixed bottom-[max(1rem,env(safe-area-inset-bottom))] left-4 right-4 z-[60] flex flex-col gap-2 sm:bottom-4 sm:left-auto sm:right-4"
        >
          <Link
            href={`tel:${SITE_CONTACT.phoneRaw}`}
            className="badge-sandstone-chip justify-center gap-2 px-4 py-2 text-sm font-semibold normal-case hover:-translate-y-0.5 hover:shadow-xl sm:justify-start"
            aria-label={`Call ${SITE_CONTACT.phone}`}
          >
            <PhoneCall className="h-4 w-4 text-sandstone-gold" aria-hidden />
            Call {SITE_CONTACT.phone}
          </Link>
          <Link
            href="/#contact"
            className="badge-sandstone-accent justify-center gap-2 px-4 py-2 text-sm tracking-[0.12em] hover:-translate-y-0.5 hover:shadow-xl sm:justify-start"
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
