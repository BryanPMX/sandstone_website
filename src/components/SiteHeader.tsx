"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Menu, X } from "lucide-react";
import { SITE_NAV } from "@/constants/site";
import { cn } from "@/lib/utils";
import { MobileMenuPortal } from "@/components/MobileMenuPortal";

interface SiteHeaderProps {
  overlayDesktop?: boolean;
  variant?: "default" | "lead";
  showDesktopCenterLogo?: boolean;
}

export function SiteHeader({
  overlayDesktop = false,
  variant = "default",
  showDesktopCenterLogo = true,
}: SiteHeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();
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
  const isHeroHeader = overlayDesktop;
  const isLeadHeader = !overlayDesktop && variant === "lead";
  const desktopLogoSrc = "/desktop-hero-logo.webp";
  const mobileLogoSrc = isLeadHeader ? desktopLogoSrc : "/mobile-header-logo.webp";
  const showLeadCenteredDesktopNav = isLeadHeader && !showDesktopCenterLogo;
  const isActiveNavItem = (href: string) => {
    if (href.includes("#")) return false;
    return pathname === href;
  };

  return (
    <header
      className={cn(
        "left-0 right-0 z-[80]",
        overlayDesktop
          ? "sticky top-0 border-b border-white/10 bg-[var(--sandstone-navy)] lg:absolute lg:top-0 lg:border-none lg:bg-transparent"
          : cn(
              "sticky top-0 border-b border-white/10 bg-[var(--sandstone-navy)]",
              isLeadHeader && "shadow-[0_10px_24px_-20px_rgba(17,24,61,0.85)]"
            )
      )}
    >
      <div
        className={cn(
          "mx-auto flex h-14 w-full max-w-6xl items-center px-4 lg:px-6",
          isHeroHeader
            ? "lg:h-28 lg:items-start lg:pt-3"
            : isLeadHeader
              ? "lg:h-[92px]"
              : "lg:h-[92px]"
        )}
      >
        <div className="flex w-full items-center justify-between lg:hidden">
          <Link
            href="/"
            className="flex items-center gap-2 text-[var(--sandstone-sand-gold)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--sandstone-sand-gold)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--sandstone-navy)]"
            aria-label="Sandstone Real Estate Group - Home"
          >
            <div
              className={cn(
                "relative shrink-0",
                isLeadHeader ? "h-11 w-11" : "h-9 w-9"
              )}
            >
              <Image
                src={mobileLogoSrc}
                alt="Sandstone Real Estate Group"
                fill
                className={cn(
                  "object-contain",
                  isLeadHeader
                    ? "drop-shadow-[0_2px_8px_rgba(183,150,120,0.25)]"
                    : "brightness-110 contrast-110"
                )}
                sizes={isLeadHeader ? "44px" : "36px"}
                priority
              />
            </div>
          </Link>

          <button
            ref={menuButtonRef}
            type="button"
            className={cn(
              "p-2 text-[var(--sandstone-sand-gold)] hover:text-[var(--sandstone-off-white)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--sandstone-sand-gold)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--sandstone-navy)]"
            )}
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={isMenuOpen}
            aria-controls="mobile-nav"
            onClick={toggleMenu}
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        <div
          className={cn(
            "hidden w-full justify-center lg:flex",
            showLeadCenteredDesktopNav ? "gap-0" : isLeadHeader ? "gap-4 xl:gap-6" : "gap-8 xl:gap-12",
            isHeroHeader ? "items-start" : "items-center"
          )}
        >
          {showLeadCenteredDesktopNav ? (
            <>
              <nav aria-label="Primary left">
                <ul className="flex items-center gap-2.5">
                  {desktopLeftNav.map((item) => (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        className={cn(
                          "inline-flex items-center rounded-full border border-[var(--sandstone-sand-gold)]/45 bg-[var(--sandstone-sand-gold)]/8 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.12em] text-[var(--sandstone-sand-gold)] shadow-[inset_0_1px_0_rgba(255,255,255,0.04)] transition duration-200 hover:-translate-y-px hover:border-[var(--sandstone-sand-gold)]/70 hover:bg-[var(--sandstone-sand-gold)]/18 hover:text-white hover:shadow-[0_10px_18px_-14px_rgba(183,150,120,0.65)]",
                          isActiveNavItem(item.href) &&
                            "border-[var(--sandstone-sand-gold)] bg-[var(--sandstone-sand-gold)] text-[var(--sandstone-navy)] shadow-[0_12px_22px_-16px_rgba(183,150,120,0.8)] hover:text-[var(--sandstone-navy)]",
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
                className={cn(
                  "inline-flex items-center rounded-full border border-[var(--sandstone-sand-gold)]/45 bg-[var(--sandstone-sand-gold)]/8 px-5 py-2 text-[11px] font-semibold uppercase tracking-[0.12em] text-[var(--sandstone-sand-gold)] shadow-[inset_0_1px_0_rgba(255,255,255,0.04)] transition duration-200 hover:-translate-y-px hover:border-[var(--sandstone-sand-gold)]/70 hover:bg-[var(--sandstone-sand-gold)]/18 hover:text-white hover:shadow-[0_10px_18px_-14px_rgba(183,150,120,0.65)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--sandstone-sand-gold)]",
                  isActiveNavItem("/") &&
                    "border-[var(--sandstone-sand-gold)] bg-[var(--sandstone-sand-gold)] text-[var(--sandstone-navy)] shadow-[0_12px_22px_-16px_rgba(183,150,120,0.8)] hover:text-[var(--sandstone-navy)]"
                )}
                aria-label="Home"
              >
                Home
              </Link>

              <nav aria-label="Primary right">
                <ul className="flex items-center gap-2.5">
                  {desktopRightNav.map((item) => (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        className={cn(
                          "inline-flex items-center rounded-full border border-[var(--sandstone-sand-gold)]/45 bg-[var(--sandstone-sand-gold)]/8 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.12em] text-[var(--sandstone-sand-gold)] shadow-[inset_0_1px_0_rgba(255,255,255,0.04)] transition duration-200 hover:-translate-y-px hover:border-[var(--sandstone-sand-gold)]/70 hover:bg-[var(--sandstone-sand-gold)]/18 hover:text-white hover:shadow-[0_10px_18px_-14px_rgba(183,150,120,0.65)]",
                          isActiveNavItem(item.href) &&
                            "border-[var(--sandstone-sand-gold)] bg-[var(--sandstone-sand-gold)] text-[var(--sandstone-navy)] shadow-[0_12px_22px_-16px_rgba(183,150,120,0.8)] hover:text-[var(--sandstone-navy)]",
                          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--sandstone-sand-gold)]"
                        )}
                      >
                        {item.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            </>
          ) : (
            <>
              <nav aria-label="Primary left">
                <ul
                  className={cn(
                    "flex items-center gap-6",
                    isLeadHeader && "gap-2.5",
                    isHeroHeader ? "pt-1" : "pt-0"
                  )}
                >
                  {desktopLeftNav.map((item) => (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        className={cn(
                          isLeadHeader
                            ? "inline-flex items-center rounded-full border border-[var(--sandstone-sand-gold)]/45 bg-[var(--sandstone-sand-gold)]/8 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.12em] text-[var(--sandstone-sand-gold)] shadow-[inset_0_1px_0_rgba(255,255,255,0.04)] transition duration-200 hover:-translate-y-px hover:border-[var(--sandstone-sand-gold)]/70 hover:bg-[var(--sandstone-sand-gold)]/18 hover:text-white hover:shadow-[0_10px_18px_-14px_rgba(183,150,120,0.65)]"
                            : "text-sm font-medium tracking-wide text-[var(--sandstone-off-white)] transition hover:text-[var(--sandstone-sand-gold)] drop-shadow-[0_2px_3px_rgba(0,0,0,0.45)]",
                          isLeadHeader &&
                            isActiveNavItem(item.href) &&
                            "border-[var(--sandstone-sand-gold)] bg-[var(--sandstone-sand-gold)] text-[var(--sandstone-navy)] shadow-[0_12px_22px_-16px_rgba(183,150,120,0.8)] hover:text-[var(--sandstone-navy)]",
                          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--sandstone-sand-gold)]"
                        )}
                      >
                        {item.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>

              {showDesktopCenterLogo ? (
                <Link
                  href="/"
                  className={cn(
                    "flex items-center gap-2 text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.4)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--sandstone-sand-gold)]",
                    isLeadHeader && "relative justify-center px-2"
                  )}
                  aria-label="Sandstone Real Estate Group - Home"
                >
                  {isLeadHeader ? (
                    <span
                      aria-hidden
                      className="absolute inset-x-4 top-1/2 h-9 -translate-y-1/2 rounded-full bg-[var(--sandstone-sand-gold)]/10 blur-2xl"
                    />
                  ) : null}
                  <div
                    className={cn(
                      "relative shrink-0",
                      isHeroHeader
                        ? "h-[168px] w-[228px]"
                        : isLeadHeader
                          ? "h-[118px] w-[184px]"
                          : "h-[86px] w-[144px]"
                    )}
                  >
                    <Image
                      src={desktopLogoSrc}
                      alt="Sandstone Real Estate Group"
                      fill
                      className={cn(
                        "object-contain",
                        isHeroHeader
                          ? ""
                          : isLeadHeader
                            ? "drop-shadow-[0_4px_10px_rgba(183,150,120,0.15)]"
                            : "brightness-110"
                      )}
                      sizes={isHeroHeader ? "228px" : isLeadHeader ? "184px" : "144px"}
                      priority
                    />
                  </div>
                </Link>
              ) : (
                <div
                  aria-hidden
                  className={cn(
                    "shrink-0",
                    isHeroHeader
                      ? "h-[168px] w-[228px]"
                      : isLeadHeader
                        ? "h-[118px] w-[184px]"
                        : "h-[86px] w-[144px]"
                  )}
                />
              )}

              <nav aria-label="Primary right">
                <ul
                  className={cn(
                    "flex items-center gap-6",
                    isLeadHeader && "gap-2.5",
                    isHeroHeader ? "pt-1" : "pt-0"
                  )}
                >
                  {desktopRightNav.map((item) => (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        className={cn(
                          isLeadHeader
                            ? "inline-flex items-center rounded-full border border-[var(--sandstone-sand-gold)]/45 bg-[var(--sandstone-sand-gold)]/8 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.12em] text-[var(--sandstone-sand-gold)] shadow-[inset_0_1px_0_rgba(255,255,255,0.04)] transition duration-200 hover:-translate-y-px hover:border-[var(--sandstone-sand-gold)]/70 hover:bg-[var(--sandstone-sand-gold)]/18 hover:text-white hover:shadow-[0_10px_18px_-14px_rgba(183,150,120,0.65)]"
                            : "text-sm font-medium tracking-wide text-[var(--sandstone-off-white)] transition hover:text-[var(--sandstone-sand-gold)] drop-shadow-[0_2px_3px_rgba(0,0,0,0.45)]",
                          isLeadHeader &&
                            isActiveNavItem(item.href) &&
                            "border-[var(--sandstone-sand-gold)] bg-[var(--sandstone-sand-gold)] text-[var(--sandstone-navy)] shadow-[0_12px_22px_-16px_rgba(183,150,120,0.8)] hover:text-[var(--sandstone-navy)]",
                          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--sandstone-sand-gold)]"
                        )}
                      >
                        {item.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            </>
          )}
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
