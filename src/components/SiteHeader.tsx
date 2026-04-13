"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { SITE_NAV } from "@/constants/site";
import { cn } from "@/lib/utils";
import { MobileMenuPortal } from "@/components/MobileMenuPortal";

interface SiteHeaderProps {
  overlayDesktop?: boolean;
  variant?: "default" | "lead";
  showDesktopCenterLogo?: boolean;
  /** When true, only the logo (far left) is shown; no nav links or menu. Used for giveaway. */
  logoOnly?: boolean;
}

export function SiteHeader({
  overlayDesktop = false,
  variant = "default",
  showDesktopCenterLogo = true,
  logoOnly = false,
}: SiteHeaderProps) {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const desktopLeftNav = SITE_NAV.slice(0, 2);
  const desktopRightNav = SITE_NAV.slice(2);
  const isHeroHeader = overlayDesktop;
  const isLeadHeader = !overlayDesktop && variant === "lead";
  const desktopLogoSrc = "/desktop-hero-logo.webp";
  const mobileLogoSrc = "/mobile-header-logo.webp";
  const showLeadCenteredDesktopNav = isLeadHeader && !showDesktopCenterLogo;
  const isActiveNavItem = (href: string) => {
    if (href.includes("#")) return false;
    return pathname === href;
  };

  useEffect(() => {
    if (!isMobileMenuOpen) {
      document.body.style.overflow = "";
      return;
    }

    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileMenuOpen]);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  if (logoOnly) {
    return (
      <header
        className={cn(
          "sticky top-0 left-0 right-0 z-[80] border-b border-white/10 bg-[var(--sandstone-navy)] shadow-[0_10px_24px_-20px_rgba(17,24,61,0.85)]"
        )}
      >
        <Link
          href="/"
          className="absolute left-4 top-1/2 z-[85] hidden -translate-y-1/2 items-center text-[var(--sandstone-sand-gold)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--sandstone-sand-gold)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--sandstone-navy)] lg:inline-flex"
          aria-label="Sandstone Real Estate Group - Home"
        >
          <div className="relative h-9 w-9 shrink-0">
            <Image
              src={mobileLogoSrc}
              alt="Sandstone Real Estate Group"
              fill
              className="object-contain brightness-110 contrast-110"
              sizes="36px"
              priority
            />
          </div>
        </Link>
        <div className="mx-auto flex h-14 w-full max-w-6xl items-center justify-between px-4 lg:h-[92px] lg:px-6">
          <Link
            href="/"
            className="flex items-center gap-2 text-[var(--sandstone-sand-gold)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--sandstone-sand-gold)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--sandstone-navy)] lg:hidden"
            aria-label="Sandstone Real Estate Group - Home"
          >
            <div className="relative h-9 w-9 shrink-0">
              <Image
                src={mobileLogoSrc}
                alt="Sandstone Real Estate Group"
                fill
                className="object-contain brightness-110 contrast-110"
                sizes="36px"
                priority
              />
            </div>
          </Link>
          <div className="lg:hidden" aria-hidden />
        </div>
      </header>
    );
  }

  return (
    <header
      className={cn(
        "left-0 right-0 z-[80]",
        overlayDesktop
          ? "sticky top-0 border-b border-white/10 bg-[var(--sandstone-navy)] lg:absolute lg:top-[40px] lg:border-none lg:bg-transparent"
          : cn(
              "sticky top-0 border-b border-white/10 bg-[var(--sandstone-navy)]",
              isLeadHeader && "shadow-[0_10px_24px_-20px_rgba(17,24,61,0.85)]"
        )
      )}
    >
      {showLeadCenteredDesktopNav ? (
        <Link
          href="/"
          className="absolute left-4 top-1/2 z-[85] hidden -translate-y-1/2 items-center text-[var(--sandstone-sand-gold)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--sandstone-sand-gold)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--sandstone-navy)] lg:inline-flex"
          aria-label="Sandstone Real Estate Group - Home"
        >
          <div className="relative h-9 w-9 shrink-0">
            <Image
              src={mobileLogoSrc}
              alt="Sandstone Real Estate Group"
              fill
              className="object-contain brightness-110 contrast-110"
              sizes="36px"
              priority
            />
          </div>
        </Link>
      ) : null}

      <div
        className={cn(
          "mx-auto flex w-full max-w-6xl flex-col px-4 lg:flex-row lg:px-6",
          isHeroHeader
            ? "py-1 lg:h-28 lg:items-start lg:pt-3"
            : isLeadHeader
              ? "py-1 lg:h-[92px]"
              : "py-1 lg:h-[92px]"
        )}
      >
        <div className="flex w-full items-center gap-3 lg:hidden">
          <Link
            href="/"
            className="flex items-center gap-2 text-[var(--sandstone-sand-gold)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--sandstone-sand-gold)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--sandstone-navy)]"
            aria-label="Sandstone Real Estate Group - Home"
          >
            <div
              className={cn(
                "relative shrink-0",
                "h-9 w-9"
              )}
            >
              <Image
                src={mobileLogoSrc}
                alt="Sandstone Real Estate Group"
                fill
                className="object-contain brightness-110 contrast-110"
                sizes="36px"
                priority
              />
            </div>
          </Link>

          <div className="ml-auto">
            <button
              type="button"
              onClick={() => setIsMobileMenuOpen((previous) => !previous)}
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

        <div
          className={cn(
            "hidden w-full justify-center lg:flex",
            showLeadCenteredDesktopNav ? "gap-0" : isLeadHeader ? "gap-4 xl:gap-6" : "gap-8 xl:gap-12",
            isHeroHeader ? "items-start" : "items-center"
          )}
        >
          {showLeadCenteredDesktopNav ? (
            <>
              <nav aria-label="Primary left" className="flex-1">
                <ul className="flex items-center justify-end gap-2 xl:gap-5">
                  {desktopLeftNav.map((item) => (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        className={cn(
                          "inline-flex items-center px-3 py-2 text-[14px] font-bold uppercase tracking-[0.13em] text-[var(--sandstone-sand-gold)] transition hover:text-[var(--sandstone-off-white)]",
                          isActiveNavItem(item.href) &&
                            "underline decoration-2 underline-offset-8",
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
                  "mx-2 inline-flex items-center px-3 py-2 text-[14px] font-bold uppercase tracking-[0.13em] text-[var(--sandstone-sand-gold)] transition hover:text-[var(--sandstone-off-white)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--sandstone-sand-gold)] xl:mx-5",
                  isActiveNavItem("/") &&
                    "underline decoration-2 underline-offset-8"
                )}
                aria-label="Home"
              >
                HOM
              </Link>

              <nav aria-label="Primary right" className="flex-1">
                <ul className="flex items-center justify-start gap-2 xl:gap-5">
                  {desktopRightNav.map((item) => (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        className={cn(
                          "inline-flex items-center px-3 py-2 text-[14px] font-bold uppercase tracking-[0.13em] text-[var(--sandstone-sand-gold)] transition hover:text-[var(--sandstone-off-white)]",
                          isActiveNavItem(item.href) &&
                            "underline decoration-2 underline-offset-8",
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
                            ? "inline-flex items-center rounded-full border border-[var(--sandstone-sand-gold)]/45 bg-[var(--sandstone-sand-gold)]/8 px-4 py-2 text-[14px] font-bold uppercase tracking-[0.12em] text-[var(--sandstone-sand-gold)] shadow-[inset_0_1px_0_rgba(255,255,255,0.04)] transition duration-200 hover:-translate-y-px hover:border-[var(--sandstone-sand-gold)]/70 hover:bg-[var(--sandstone-sand-gold)]/18 hover:text-white hover:shadow-[0_10px_18px_-14px_rgba(183,150,120,0.65)]"
                            : "text-[14px] font-bold tracking-wide text-[var(--sandstone-off-white)] transition hover:text-[var(--sandstone-sand-gold)] drop-shadow-[0_2px_3px_rgba(0,0,0,0.45)]",
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
                        ? "h-[118px] w-[184px]"
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
                      sizes={isHeroHeader ? "184px" : isLeadHeader ? "184px" : "144px"}
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
                      ? "h-[118px] w-[184px]"
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
                            ? "inline-flex items-center rounded-full border border-[var(--sandstone-sand-gold)]/45 bg-[var(--sandstone-sand-gold)]/8 px-4 py-2 text-[14px] font-bold uppercase tracking-[0.12em] text-[var(--sandstone-sand-gold)] shadow-[inset_0_1px_0_rgba(255,255,255,0.04)] transition duration-200 hover:-translate-y-px hover:border-[var(--sandstone-sand-gold)]/70 hover:bg-[var(--sandstone-sand-gold)]/18 hover:text-white hover:shadow-[0_10px_18px_-14px_rgba(183,150,120,0.65)]"
                            : "text-[14px] font-bold tracking-wide text-[var(--sandstone-off-white)] transition hover:text-[var(--sandstone-sand-gold)] drop-shadow-[0_2px_3px_rgba(0,0,0,0.45)]",
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
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
        navItems={SITE_NAV}
      />

    </header>
  );
}
