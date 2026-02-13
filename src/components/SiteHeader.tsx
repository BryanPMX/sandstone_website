"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, Mail, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SITE_NAV, HERO_CTA } from "@/constants/site";
import { cn } from "@/lib/utils";

export function SiteHeader() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const { style } = document.body;
    const originalOverflow = style.overflow;

    if (isMenuOpen) {
      style.overflow = "hidden";
    } else {
      style.overflow = "";
    }

    return () => {
      style.overflow = originalOverflow;
    };
  }, [isMenuOpen]);

  const closeMenu = () => setIsMenuOpen(false);

  return (
    <header
      className={cn(
        "fixed left-0 right-0 top-0 z-50 flex items-center justify-between px-3 py-4 sm:px-4 md:px-8",
        "bg-sandstone-navy/72 backdrop-blur-xl border-b border-white/15 shadow-[0_10px_30px_-24px_rgba(0,0,0,0.9)]"
      )}
    >
      {/* Logo */}
      <Link
        href="/"
        className="group flex items-center gap-3 text-sandstone-base transition-colors duration-500 hover:text-white focus-visible:text-white focus-visible:outline-none"
        aria-label="Sandstone Real Estate Team - Home"
      >
        <div className="relative h-10 w-10 overflow-hidden rounded bg-white/10">
          <Image
            src="/logo.jpg"
            alt="Sandstone Real Estate Team logo"
            fill
            className="object-contain"
            sizes="40px"
            priority
          />
        </div>
        <div className="hidden leading-tight sm:block">
          <span className="block text-xs font-semibold uppercase tracking-wider text-sandstone-base">
            Sandstone
          </span>
          <span className="block text-[10px] font-medium uppercase tracking-widest text-sandstone-base/90 transition-colors duration-500 group-hover:text-white/90 group-focus-visible:text-white/90">
            Real Estate Team
          </span>
        </div>
      </Link>

      {/* Nav links – centered */}
      <nav
        className="absolute left-1/2 top-1/2 hidden -translate-x-1/2 -translate-y-1/2 items-center gap-6 md:flex"
        aria-label="Main"
      >
        <ul className="flex items-center gap-6">
          {SITE_NAV.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className="group relative isolate inline-flex items-center px-1 py-1 text-base font-medium text-white/90 transition-all duration-[420ms] ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-px hover:text-sandstone-base focus-visible:-translate-y-px focus-visible:text-sandstone-base focus-visible:outline-none"
              >
                <span
                  aria-hidden
                  className="pointer-events-none absolute inset-x-[-0.45rem] inset-y-[-0.18rem] z-0 scale-[0.985] rounded-full bg-gradient-to-r from-white/[0.01] via-white/[0.1] to-white/[0.01] opacity-0 transition-all duration-[420ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-100 group-hover:opacity-100 group-focus-visible:scale-100 group-focus-visible:opacity-100"
                />
                <span
                  aria-hidden
                  className="pointer-events-none absolute -bottom-1 left-1/2 z-0 h-px w-[calc(100%+0.65rem)] -translate-x-1/2 origin-center scale-x-0 bg-gradient-to-r from-transparent via-sandstone-base to-transparent transition-transform duration-500 ease-out group-hover:scale-x-100 group-focus-visible:scale-x-100"
                />
                <span className="relative z-10">{item.label}</span>
              </Link>
            </li>
          ))}
        </ul>
        <Link
          href="/#contact"
          className="group flex items-center gap-1.5 text-base text-white/90 transition-all duration-500 hover:-translate-y-px hover:text-sandstone-base"
          aria-label="Contact us"
        >
          <Mail
            className="h-4 w-4 transition-transform duration-500 group-hover:-rotate-3 group-hover:scale-[1.05]"
            aria-hidden
          />
          <span>Contact Us</span>
        </Link>
      </nav>

      {/* CTA + mobile menu – far right */}
      <div className="ml-auto flex items-center gap-2">
        <Button
          asChild
          variant="outline"
          size="sm"
          className="group relative hidden overflow-hidden border-sandstone-bronze/85 text-sandstone-base shadow-[0_8px_20px_-14px_rgba(0,0,0,0.65)] transition-all duration-[460ms] ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-1 hover:border-sandstone-base hover:bg-sandstone-bronze/25 hover:text-white hover:shadow-[0_20px_34px_-18px_rgba(183,150,120,0.82)] sm:inline-flex"
        >
          <Link href="/#contact">
            <span
              aria-hidden
              className="pointer-events-none absolute inset-y-0 -left-2/3 w-[55%] -skew-x-12 bg-gradient-to-r from-white/0 via-white/45 to-white/0 opacity-0 transition-all duration-700 group-hover:left-[130%] group-hover:opacity-100"
            />
            <span className="relative z-10">{HERO_CTA}</span>
          </Link>
        </Button>
        <button
          type="button"
          className="p-2 text-white/90 transition-colors duration-300 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sandstone-base focus-visible:ring-offset-2 focus-visible:ring-offset-sandstone-navy/80 md:hidden"
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          aria-expanded={isMenuOpen}
          aria-controls="mobile-nav"
          onClick={() => setIsMenuOpen((open) => !open)}
        >
          {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            key="mobile-menu-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.18 }}
            className="fixed inset-0 z-40 bg-gradient-to-b from-sandstone-navy via-sandstone-navy/95 to-sandstone-navy/90 backdrop-blur-xl md:hidden"
            onClick={closeMenu}
          >
            <motion.div
              key="mobile-menu-panel"
              initial={{ y: -16, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -12, opacity: 0 }}
              transition={{ type: "spring", stiffness: 360, damping: 32, mass: 0.7 }}
              className="flex h-full flex-col gap-6 px-4 pb-10 pt-24"
              id="mobile-nav"
              role="dialog"
              aria-label="Mobile navigation"
              onClick={(event) => event.stopPropagation()}
            >
              <div className="space-y-2">
                {SITE_NAV.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={closeMenu}
                    className="group flex items-center justify-between rounded-xl border border-white/5 bg-white/5 px-4 py-3 text-base font-semibold text-white/90 shadow-[0_10px_30px_-24px_rgba(0,0,0,0.9)] transition-all duration-300 ease-out hover:-translate-y-[2px] hover:border-sandstone-base/60 hover:bg-white/10 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sandstone-base/70 focus-visible:ring-offset-2 focus-visible:ring-offset-sandstone-navy/90"
                  >
                    <span className="tracking-wide">{item.label}</span>
                    <span
                      aria-hidden
                      className="text-sm text-sandstone-base/80 transition-transform duration-300 group-hover:translate-x-1"
                    >
                      ↗
                    </span>
                  </Link>
                ))}
              </div>

              <div className="space-y-3">
                <Button
                  asChild
                  size="lg"
                  className="w-full justify-center bg-sandstone-base text-sandstone-navy shadow-[0_18px_48px_-22px_rgba(255,210,175,0.95)] hover:-translate-y-[3px] hover:bg-sandstone-base/90"
                >
                  <Link href="/#contact" onClick={closeMenu}>
                    {HERO_CTA}
                  </Link>
                </Button>

                <Link
                  href="/#contact"
                  onClick={closeMenu}
                  className="flex items-center justify-center gap-2 rounded-xl border border-white/8 bg-white/5 px-4 py-3 text-base font-medium text-white/90 transition-all duration-300 hover:-translate-y-[2px] hover:border-sandstone-base/60 hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sandstone-base/70 focus-visible:ring-offset-2 focus-visible:ring-offset-sandstone-navy/90"
                >
                  <Mail className="h-4 w-4" aria-hidden />
                  <span>Contact Us</span>
                </Link>
              </div>

              <div className="mt-auto space-y-1 text-sm text-white/60">
                <p className="font-semibold text-white/80">Sandstone Real Estate Team</p>
                <p className="leading-relaxed text-white/60">
                  Luxury guidance, relocation expertise, and concierge support — now one tap away.
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
