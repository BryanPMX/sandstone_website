"use client";

import { type CSSProperties, useEffect, useState } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import { Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { HERO_CTA } from "@/constants/site";

const HEADER_HEIGHT_PX = 64;

export type NavItem = { label: string; href: string };

type MobileMenuPortalProps = {
  isOpen: boolean;
  onClose: () => void;
  navItems: readonly NavItem[];
};

/**
 * Renders the mobile menu into document.body so no ancestor layout (overflow,
 * flex, transform) can clip or collapse the list. Uses explicit dimensions
 * and a plain scrollable div (no Framer Motion on the scroll container).
 */
export function MobileMenuPortal({
  isOpen,
  onClose,
  navItems,
}: MobileMenuPortalProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!isOpen) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [isOpen, onClose]);

  if (!mounted || !isOpen || typeof document === "undefined") {
    return null;
  }

  const overlayStyle: CSSProperties = {
    position: "fixed",
    left: 0,
    top: HEADER_HEIGHT_PX,
    width: "100vw",
    height: `calc(100dvh - ${HEADER_HEIGHT_PX}px)`,
    zIndex: 70,
    backgroundColor: "#253471", // sandstone-navy
  };

  const panelStyle: CSSProperties = {
    width: "100%",
    height: "100%",
    overflowY: "auto",
    WebkitOverflowScrolling: "touch",
    padding: "20px 12px 0",
    paddingBottom: "max(2.5rem, env(safe-area-inset-bottom, 2.5rem))",
    boxSizing: "border-box",
  };

  const content = (
    <div
      className="md:hidden"
      style={overlayStyle}
      onClick={onClose}
      role="presentation"
    >
      <div
        id="mobile-nav"
        role="dialog"
        aria-modal="true"
        aria-label="Mobile navigation"
        style={panelStyle}
        onClick={(e) => e.stopPropagation()}
      >
        <nav aria-label="Main">
          <ul
            style={{
              listStyle: "none",
              margin: 0,
              padding: 0,
              display: "block",
            }}
          >
            {navItems.map((item) => (
              <li
                key={item.href}
                style={{
                  display: "block",
                  minHeight: 48,
                  marginBottom: 8,
                }}
              >
                <Link
                  href={item.href}
                  onClick={onClose}
                  className="group relative isolate block overflow-hidden rounded-xl border border-sandstone-base/45 bg-gradient-to-r from-sandstone-maroon/92 via-sandstone-navy/95 to-[#70543c]/92 px-4 py-3 text-[15px] font-semibold tracking-[0.06em] text-white no-underline shadow-[0_16px_30px_-22px_rgba(37,52,113,0.85)] transition-all duration-300 hover:-translate-y-px hover:border-sandstone-base/80 hover:shadow-[0_20px_36px_-20px_rgba(183,150,120,0.65)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sandstone-base focus-visible:ring-offset-2 focus-visible:ring-offset-sandstone-navy"
                >
                  <span
                    aria-hidden
                    className="pointer-events-none absolute inset-y-0 -left-2/3 w-[58%] -skew-x-12 bg-gradient-to-r from-white/0 via-white/45 to-white/0 opacity-0 transition-all duration-700 group-hover:left-[132%] group-hover:opacity-100 group-focus-visible:left-[132%] group-focus-visible:opacity-100"
                  />
                  <span className="relative z-10">{item.label}</span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="mt-6 space-y-3">
          <Button
            asChild
            size="lg"
            className="w-full justify-center bg-sandstone-base text-sandstone-navy shadow-[0_18px_48px_-22px_rgba(255,210,175,0.95)] hover:-translate-y-[3px] hover:bg-sandstone-base/90"
          >
            <Link href="/#contact" onClick={onClose}>
              {HERO_CTA}
            </Link>
          </Button>

          <Link
            href="/#contact"
            onClick={onClose}
            className="flex items-center justify-center gap-2 rounded-xl border border-white/20 bg-white/15 py-3 px-4 text-base font-medium text-white no-underline transition-colors hover:border-sandstone-base/80 hover:bg-white/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sandstone-base focus-visible:ring-offset-2 focus-visible:ring-offset-sandstone-navy"
          >
            <Mail className="h-4 w-4" aria-hidden />
            <span>Contact Us</span>
          </Link>
        </div>

        <div className="mt-8 space-y-1 text-sm text-white/70">
          <p className="font-semibold text-white/90">Sandstone Real Estate Team</p>
          <p className="leading-relaxed">
            Luxury guidance, relocation expertise, and concierge support — now
            one tap away.
          </p>
        </div>
      </div>
    </div>
  );

  return createPortal(content, document.body);
}
