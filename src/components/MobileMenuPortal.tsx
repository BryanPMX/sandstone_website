"use client";

import { type CSSProperties, useEffect, useState } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import { HERO_CTA } from "@/constants/site";

const HEADER_HEIGHT_PX = 56;

export type NavItem = { label: string; href: string };

type MobileMenuPortalProps = {
  isOpen: boolean;
  onClose: () => void;
  navItems: readonly NavItem[];
};

export function MobileMenuPortal({
  isOpen,
  onClose,
  navItems,
}: MobileMenuPortalProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);
  useEffect(() => {
    if (!isOpen) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [isOpen, onClose]);

  if (!mounted || !isOpen || typeof document === "undefined") return null;

  const overlayStyle: CSSProperties = {
    position: "fixed",
    left: 0,
    top: HEADER_HEIGHT_PX,
    width: "100vw",
    height: `calc(100dvh - ${HEADER_HEIGHT_PX}px)`,
    zIndex: 70,
    backgroundColor: "var(--sandstone-navy)",
  };

  const content = (
    <div className="md:hidden" style={overlayStyle} onClick={onClose} role="presentation">
      <div
        id="mobile-nav"
        role="dialog"
        aria-modal="true"
        aria-label="Mobile navigation"
        className="h-full overflow-y-auto px-4 pt-6 pb-safe"
        style={{ paddingBottom: "max(1.5rem, env(safe-area-inset-bottom))" }}
        onClick={(e) => e.stopPropagation()}
      >
        <nav aria-label="Main">
          <ul className="space-y-1">
            {navItems.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  onClick={onClose}
                  className="block rounded-xl px-4 py-3 text-base font-medium text-[var(--sandstone-off-white)] hover:bg-white/10 hover:text-[var(--sandstone-sand-gold)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--sandstone-sand-gold)]"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div className="mt-8">
          <Link
            href="/#contact"
            onClick={onClose}
            className="block w-full rounded-full bg-[var(--sandstone-sand-gold)] py-3 text-center font-semibold text-white hover:opacity-95"
          >
            {HERO_CTA}
          </Link>
        </div>
        <p className="mt-6 text-sm text-white/70">
          Sandstone Real Estate Group. Luxury. Lifestyle. Legacy.
        </p>
      </div>
    </div>
  );

  return createPortal(content, document.body);
}
