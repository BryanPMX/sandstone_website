"use client";

import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";
import {
  FOOTER_NAV,
  SITE_CONTACT,
  FOOTER_BRAND,
  FOOTER_TAGLINE,
  FOOTER_ABOUT,
  FOOTER_BRAND_IMAGES,
  PRIVACY_POLICY_LABEL,
  PRIVACY_POLICY_HREF,
  TERMS_AND_CONDITIONS_LABEL,
  TERMS_AND_CONDITIONS_HREF,
} from "@/constants/site";

interface SiteFooterProps {
  /** When false, hides navigation and the contact CTA. Used for giveaway. */
  showNav?: boolean;
}

export function SiteFooter({ showNav = true }: SiteFooterProps) {
  const militaryHrefs = new Set([
    "/pcs",
    "/bah-calculator",
    "/bah-fort-bliss-2026",
    "/pcs-el-paso-checklist",
  ]);
  const navGroups = [
    {
      title: "Explore",
      items: FOOTER_NAV.filter((item) => !militaryHrefs.has(item.href)),
    },
    {
      title: "Military Resources",
      items: FOOTER_NAV.filter((item) => militaryHrefs.has(item.href)),
    },
  ];
  const linkClassName =
    "inline-flex min-h-11 items-center text-sm text-white/85 transition hover:text-[var(--sandstone-sand-gold)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--sandstone-sand-gold)] focus-visible:ring-offset-4 focus-visible:ring-offset-[var(--sandstone-navy)]";

  return (
    <footer
      id="footer"
      className="scroll-mt-20 bg-gradient-to-b from-[var(--sandstone-navy)] to-[var(--sandstone-navy-deep)] py-8 text-[var(--sandstone-off-white)] md:py-10"
    >
      <div className="container mx-auto max-w-6xl px-4">
        <div
          className={cn(
            "grid gap-8 lg:gap-12",
            showNav
              ? "lg:grid-cols-[1.1fr_1.3fr]"
              : "grid-cols-1"
          )}
        >
          <div className="text-left">
            <div className="flex items-center gap-3">
              <Image
                src="/mobile-header-logo.webp"
                alt="Sandstone logo"
                width={48}
                height={48}
                className="h-12 w-12 shrink-0 object-contain"
              />
              <div>
                <p className="font-heading text-lg font-bold text-[var(--sandstone-sand-gold)]">
                  {FOOTER_BRAND}
                </p>
                <p className="text-xs uppercase tracking-[0.18em] text-white/75">
                  {FOOTER_TAGLINE}
                </p>
              </div>
            </div>

            <p className="mt-4 max-w-md text-sm leading-relaxed text-white/80">
              {FOOTER_ABOUT}
            </p>

            <div className="mt-5">
              <p className="text-xs uppercase tracking-[0.18em] text-white/70">
                Call Us
              </p>

              <Link
                href={`tel:${SITE_CONTACT.phoneRaw}`}
                className="inline-flex min-h-11 items-center text-lg font-semibold text-[var(--sandstone-sand-gold)] transition hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--sandstone-sand-gold)]"
              >
                (915) 277-6707
              </Link>
            </div>
            {showNav ? (
              <Link
                href="/#contact"
                className="mt-3 inline-flex min-h-11 items-center justify-center rounded-md bg-[var(--sandstone-sand-gold)] px-5 py-2 text-sm font-semibold text-[var(--sandstone-navy-deep)] transition hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-4 focus-visible:ring-offset-[var(--sandstone-navy)]"
              >
                Contact Our Team
              </Link>
            ) : null}
          </div>

          {showNav ? (
            <nav aria-label="Footer" className="grid gap-8 sm:grid-cols-[1.3fr_1fr]">
              {navGroups.map((group) => (
                <div key={group.title}>
                  <h2 className="mb-2 text-xs font-semibold uppercase tracking-[0.14em] text-[var(--sandstone-sand-gold)]">
                    {group.title}
                  </h2>
                  <ul
                    className={
                      group.title === "Explore"
                        ? "grid grid-cols-2 gap-x-4"
                        : undefined
                    }
                  >
                    {group.items.map((item) => (
                      <li key={item.href}>
                        <Link href={item.href} className={linkClassName}>
                          {item.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </nav>
          ) : null}
        </div>

        <div className="mt-7 flex flex-wrap items-center gap-x-6 gap-y-3 border-t border-white/15 pt-5">
          {FOOTER_BRAND_IMAGES.map((img) => {
            const isMLS = img.name === "MLS";

            return (
              <div
                key={img.name}
                className={`relative opacity-90 ${
                  isMLS ? "h-12 w-28" : "h-10 w-24"
                }`}
              >
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  className={`object-contain object-center ${
                    isMLS ? "[filter:invert(1)_brightness(1.5)]" : ""
                  }`}
                />
              </div>
            );
          })}
        </div>

        <div className="mt-5 border-t border-white/15 pt-4 text-center text-xs text-white/65 md:flex md:items-center md:justify-between">
          <div className="flex flex-wrap justify-center gap-x-4 md:justify-start">
            <Link
              href={PRIVACY_POLICY_HREF}
              className="inline-flex min-h-11 items-center hover:text-[var(--sandstone-sand-gold)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--sandstone-sand-gold)]"
            >
              {PRIVACY_POLICY_LABEL}
            </Link>

            <Link
              href={TERMS_AND_CONDITIONS_HREF}
              className="inline-flex min-h-11 items-center hover:text-[var(--sandstone-sand-gold)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--sandstone-sand-gold)]"
            >
              {TERMS_AND_CONDITIONS_LABEL}
            </Link>
          </div>

          <p className="mt-2 md:mt-0">
            © {new Date().getFullYear()} {FOOTER_BRAND}
          </p>
        </div>
      </div>
    </footer>
  );
}
