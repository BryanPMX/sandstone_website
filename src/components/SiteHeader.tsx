"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X } from "lucide-react";
import { SITE_NAV } from "@/constants/site";
import { cn } from "@/lib/utils";
import { MobileMenuPortal } from "@/components/MobileMenuPortal";

interface SiteHeaderProps {
  overlayDesktop?: boolean;
}

export function SiteHeader({ overlayDesktop = false }: SiteHeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const scrollPositionRef = useRef(0);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const desktopLeftNav = SITE_NAV.slice(0, 2);
  const desktopRightNav = SITE_NAV.slice(2);

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
      if (window.innerWidth >= 1024) setIsMenuOpen(false);
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
        "left-0 right-0 z-[80]",
        overlayDesktop
          ? "sticky top-0 border-b border-white/10 bg-[var(--sandstone-navy)] lg:absolute lg:top-0 lg:border-none lg:bg-transparent"
          : "sticky top-0 border-b border-white/10 bg-[var(--sandstone-navy)]"
      )}
    >
      <div className="mx-auto flex h-14 w-full max-w-6xl items-center px-4 lg:h-24 lg:px-6">
        <div className="flex w-full items-center justify-between lg:hidden">
          <Link
            href="/"
            className="flex items-center gap-2 text-[var(--sandstone-sand-gold)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--sandstone-sand-gold)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--sandstone-navy)]"
            aria-label="Sandstone Real Estate Group - Home"
          >
            <div className="relative h-9 w-9 shrink-0">
              <Image
                src="/mobile-header-logo.webp"
                alt="Sandstone Real Estate Group"
                fill
                className="object-contain brightness-110 contrast-110"
                sizes="36px"
                priority
              />
            </div>
          </Link>

          <button
            ref={menuButtonRef}
            type="button"
            className="p-2 text-[var(--sandstone-sand-gold)] hover:text-[var(--sandstone-off-white)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--sandstone-sand-gold)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--sandstone-navy)]"
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={isMenuOpen}
            aria-controls="mobile-nav"
            onClick={toggleMenu}
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        <div className="hidden w-full items-center justify-between lg:flex">
          <nav aria-label="Primary left">
            <ul className="flex items-center gap-8">
              {desktopLeftNav.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={cn(
                      "text-sm font-medium tracking-wide text-[var(--sandstone-off-white)] transition hover:text-[var(--sandstone-sand-gold)] drop-shadow-[0_2px_3px_rgba(0,0,0,0.45)]",
                      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--sandstone-sand-gold)]"
                    )}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <Link
            href="/"
            className="flex items-center gap-2 text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.4)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--sandstone-sand-gold)]"
            aria-label="Sandstone Real Estate Group - Home"
          >
            <div className="relative h-[88px] w-[119px] shrink-0">
              <Image
                src="/desktop-hero-logo.webp"
                alt="Sandstone Real Estate Group"
                fill
                className="object-contain"
                sizes="119px"
                priority
              />
            </div>
          </Link>

          <nav aria-label="Primary right">
            <ul className="flex items-center gap-8">
              {desktopRightNav.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={cn(
                      "text-sm font-medium tracking-wide text-[var(--sandstone-off-white)] transition hover:text-[var(--sandstone-sand-gold)] drop-shadow-[0_2px_3px_rgba(0,0,0,0.45)]",
                      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--sandstone-sand-gold)]"
                    )}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>

      <MobileMenuPortal
        isOpen={isMenuOpen}
        onClose={closeMenu}
        navItems={SITE_NAV}
      />
    </header>
  );
}
