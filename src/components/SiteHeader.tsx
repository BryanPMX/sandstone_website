"use client";

import Link from "next/link";
import Image from "next/image";
import { Phone, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SITE_NAV, SITE_CONTACT, HERO_CTA } from "@/constants/site";
import { cn } from "@/lib/utils";

export function SiteHeader() {
  return (
    <header
      className={cn(
        "fixed left-0 right-0 top-0 z-50 flex items-center justify-between px-4 py-4 md:px-8",
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

      {/* Nav + CTA */}
      <nav className="flex items-center gap-4 md:gap-6" aria-label="Main">
        <ul className="hidden items-center gap-6 md:flex">
          {SITE_NAV.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className="group relative isolate inline-flex items-center px-1 py-1 text-sm font-medium text-white/90 transition-all duration-[420ms] ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-px hover:text-sandstone-base focus-visible:-translate-y-px focus-visible:text-sandstone-base focus-visible:outline-none"
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
        <a
          href={`tel:${SITE_CONTACT.phoneRaw}`}
          className="group hidden items-center gap-1.5 text-sm text-white/90 transition-all duration-500 hover:-translate-y-px hover:text-sandstone-base lg:flex"
          aria-label={`Call ${SITE_CONTACT.phone}`}
        >
          <Phone
            className="h-4 w-4 transition-transform duration-500 group-hover:-rotate-6 group-hover:scale-[1.03]"
            aria-hidden
          />
          <span>{SITE_CONTACT.phone}</span>
        </a>
        <Button
          asChild
          variant="outline"
          size="sm"
          className="group relative hidden overflow-hidden border-sandstone-bronze/85 text-sandstone-base shadow-[0_8px_20px_-14px_rgba(0,0,0,0.65)] transition-all duration-[460ms] ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-1 hover:border-sandstone-base hover:bg-sandstone-bronze/25 hover:text-white hover:shadow-[0_20px_34px_-18px_rgba(184,135,70,0.82)] sm:inline-flex"
        >
          <Link href="/#about-us">
            <span
              aria-hidden
              className="pointer-events-none absolute inset-y-0 -left-2/3 w-[55%] -skew-x-12 bg-gradient-to-r from-white/0 via-white/45 to-white/0 opacity-0 transition-all duration-700 group-hover:left-[130%] group-hover:opacity-100"
            />
            <span className="relative z-10">{HERO_CTA}</span>
          </Link>
        </Button>
        <button
          type="button"
          className="p-2 text-white/90 transition-colors duration-300 hover:text-white md:hidden"
          aria-label="Open menu"
        >
          <Menu className="h-6 w-6" />
        </button>
      </nav>
    </header>
  );
}
