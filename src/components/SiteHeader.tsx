"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X } from "lucide-react";
import { SITE_NAV } from "@/constants/site";
import { cn } from "@/lib/utils";
import { MobileMenuPortal } from "@/components/MobileMenuPortal";

export function SiteHeader() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const scrollPositionRef = useRef(0);
  const menuButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!isMenuOpen) return;
    scrollPositionRef.current = window.scrollY;
    const { style } = document.body;
    const orig = {
      overflow: style.overflow,
      position: style.position,
      top: style.top,
      left: style.left,
      right: style.right,
      width: style.width,
    };
    style.overflow = "hidden";
    style.position = "fixed";
    style.top = `-${scrollPositionRef.current}px`;
    style.left = "0";
    style.right = "0";
    style.width = "100%";
    return () => {
      Object.assign(style, orig);
      requestAnimationFrame(() => window.scrollTo(0, scrollPositionRef.current));
    };
  }, [isMenuOpen]);

  useEffect(() => {
    if (!isMenuOpen) return;
    const closeOnDesktop = () => {
      if (window.innerWidth >= 768) setIsMenuOpen(false);
    };
    window.addEventListener("resize", closeOnDesktop);
    return () => window.removeEventListener("resize", closeOnDesktop);
  }, [isMenuOpen]);

  useEffect(() => {
    const closeOnHashChange = () => setIsMenuOpen(false);
    window.addEventListener("hashchange", closeOnHashChange);
    return () => window.removeEventListener("hashchange", closeOnHashChange);
  }, []);

  const prevMenuOpenRef = useRef(false);
  useEffect(() => {
    if (prevMenuOpenRef.current && !isMenuOpen) {
      requestAnimationFrame(() => menuButtonRef.current?.focus({ preventScroll: true }));
    }
    prevMenuOpenRef.current = isMenuOpen;
  }, [isMenuOpen]);

  const closeMenu = () => setIsMenuOpen(false);
  const toggleMenu = () => setIsMenuOpen((open) => !open);

  return (
    <header
      className={cn(
        "sticky top-0 left-0 right-0 z-[80] flex h-14 items-center justify-between px-4 md:h-16 md:px-6",
        "bg-[var(--sandstone-navy)] border-b border-white/10"
      )}
    >
      <Link
        href="/"
        className="flex items-center gap-2 text-[var(--sandstone-sand-gold)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--sandstone-sand-gold)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--sandstone-navy)]"
        aria-label="Sandstone Real Estate Group - Home"
      >
        <div className="relative h-9 w-9 shrink-0 md:h-10 md:w-10">
          <Image
            src="/logo-mark.webp"
            alt=""
            fill
            className="object-contain"
            sizes="40px"
            priority
          />
        </div>
      </Link>

      <nav className="absolute left-1/2 top-1/2 hidden -translate-x-1/2 -translate-y-1/2 md:flex md:items-center md:gap-6" aria-label="Main">
        <ul className="flex items-center gap-6">
          {SITE_NAV.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className="text-sm font-medium text-[var(--sandstone-off-white)]/90 transition hover:text-[var(--sandstone-sand-gold)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--sandstone-sand-gold)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--sandstone-navy)]"
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      <div className="ml-auto flex items-center">
        <button
          ref={menuButtonRef}
          type="button"
          className="p-2 text-[var(--sandstone-off-white)]/90 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--sandstone-sand-gold)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--sandstone-navy)] md:ml-0"
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          aria-expanded={isMenuOpen}
          aria-controls="mobile-nav"
          onClick={toggleMenu}
        >
          {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      <MobileMenuPortal isOpen={isMenuOpen} onClose={closeMenu} navItems={SITE_NAV} />
    </header>
  );
}
