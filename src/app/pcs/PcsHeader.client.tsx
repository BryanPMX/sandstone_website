"use client";

import { useEffect, useId, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { ChevronDown } from "lucide-react";
import { CONTACT_US_MENU } from "@/constants/site";
import { MobileMenuPortal } from "@/components/MobileMenuPortal";
import { cn } from "@/lib/utils";

type TopNavItem = { label: string; href: string };

const TOP_NAV: TopNavItem[] = [
  { label: "HOME", href: "/" },
  { label: "PCS", href: "/pcs" },
  { label: "Blog", href: "/blog" },
  { label: "Contact Us", href: "/#contact" },
];

export function PcsHeader() {
  const pathname = usePathname();
  const contactMenuId = useId();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isContactMenuOpen, setIsContactMenuOpen] = useState(false);

  useEffect(() => {
    setIsMobileMenuOpen(false);
    setIsContactMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!isContactMenuOpen) return;

    const handleClickOutside = () => setIsContactMenuOpen(false);
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsContactMenuOpen(false);
    };
    window.addEventListener("click", handleClickOutside);
    window.addEventListener("keydown", handleEscape);
    return () => {
      window.removeEventListener("click", handleClickOutside);
      window.removeEventListener("keydown", handleEscape);
    };
  }, [isContactMenuOpen]);

  return (
    <header className="sticky top-0 z-[90] border-b border-white/10 bg-[var(--sandstone-navy)] shadow-[0_10px_24px_-20px_rgba(17,24,61,0.85)]">
      <div className="mx-auto flex h-16 w-full max-w-6xl items-center px-4 lg:h-[84px] lg:px-6">
        <Link
          href="/"
          className="flex items-center gap-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--sandstone-sand-gold)]"
          aria-label="Home"
        >
          <div className="relative h-12 w-12 shrink-0 lg:h-[72px] lg:w-[72px]">
            <Image
              src="/tinified/Logo.webp"
              alt="Logo"
              fill
              sizes="72px"
              className="object-contain"
              priority
            />
          </div>
        </Link>

        <nav aria-label="PCS navigation" className="ml-auto hidden lg:block">
          <ul className="flex items-center gap-6">
            {TOP_NAV.map((item) =>
              item.href === "/#contact" ? (
                <li key={item.href} className="relative">
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setIsContactMenuOpen((prev) => !prev);
                    }}
                    aria-haspopup="menu"
                    aria-expanded={isContactMenuOpen}
                    aria-controls={contactMenuId}
                    className="inline-flex items-center gap-2 text-[13px] font-extrabold uppercase tracking-[0.16em] text-[var(--sandstone-off-white)] transition hover:text-[var(--sandstone-sand-gold)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--sandstone-sand-gold)]"
                  >
                    <span>{item.label}</span>
                    <ChevronDown
                      aria-hidden
                      className={cn("h-4 w-4 transition-transform", isContactMenuOpen && "rotate-180")}
                    />
                  </button>

                  {isContactMenuOpen ? (
                    <div
                      id={contactMenuId}
                      role="menu"
                      aria-label="Contact menu"
                      className="absolute right-0 top-[calc(100%+0.75rem)] z-[120] w-64 overflow-hidden rounded-2xl border border-white/18 bg-[var(--sandstone-navy)] shadow-[0_30px_70px_-40px_rgba(0,0,0,0.75)]"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <ul className="py-2">
                        {CONTACT_US_MENU.map((link) => (
                          <li key={link.href}>
                            <Link
                              href={link.href}
                              role="menuitem"
                              className="block px-4 py-3 text-sm font-semibold text-white/90 transition hover:bg-white/10 hover:text-[var(--sandstone-sand-gold)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--sandstone-sand-gold)]"
                            >
                              {link.label}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ) : null}
                </li>
              ) : (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-[13px] font-extrabold uppercase tracking-[0.16em] text-[var(--sandstone-off-white)] transition hover:text-[var(--sandstone-sand-gold)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--sandstone-sand-gold)]"
                  >
                    {item.label}
                  </Link>
                </li>
              )
            )}
          </ul>
        </nav>

        <div className="ml-auto lg:hidden">
          <button
            type="button"
            onClick={() => setIsMobileMenuOpen((prev) => !prev)}
            aria-expanded={isMobileMenuOpen}
            aria-controls="mobile-nav"
            aria-label={isMobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
            className="inline-flex h-10 items-center gap-2 rounded-full border border-[var(--sandstone-sand-gold)]/45 bg-[var(--sandstone-sand-gold)]/8 px-3 text-[11px] font-bold uppercase tracking-[0.09em] text-[var(--sandstone-sand-gold)] transition hover:border-[var(--sandstone-sand-gold)]/70 hover:bg-[var(--sandstone-sand-gold)]/16 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--sandstone-sand-gold)]"
          >
            <span aria-hidden className="inline-flex flex-col gap-1">
              <span className="block h-0.5 w-4 rounded-full bg-current" />
              <span className="block h-0.5 w-4 rounded-full bg-current" />
              <span className="block h-0.5 w-4 rounded-full bg-current" />
            </span>
            {isMobileMenuOpen ? "Close" : "Menu"}
          </button>
        </div>
      </div>

      <MobileMenuPortal
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
        navItems={[...TOP_NAV.filter((item) => item.href !== "/#contact"), ...CONTACT_US_MENU]}
      />
    </header>
  );
}

