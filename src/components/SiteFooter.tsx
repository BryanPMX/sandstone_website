"use client";

import Image from "next/image";
import Link from "next/link";
import {
  SITE_NAV,
  FOOTER_BRAND,
  FOOTER_TAGLINE,
  FOOTER_ABOUT,
  FOOTER_BRAND_IMAGES,
  PRIVACY_POLICY_HREF,
  TERMS_AND_CONDITIONS_HREF,
} from "@/constants/site";

export function SiteFooter() {
  return (
    <footer
      id="footer"
      className="scroll-mt-20 bg-[var(--sandstone-navy)] py-10 text-[var(--sandstone-off-white)]"
    >
      <div className="container mx-auto max-w-6xl px-4">
        <div className="grid gap-8 md:grid-cols-[1.1fr_0.8fr_0.9fr] md:items-start">
          <div className="text-center md:text-left">
            <div className="mx-auto flex w-fit items-center gap-3 md:mx-0">
              <Image
                src="/logo-mark.webp"
                alt="Sandstone logo"
                width={48}
                height={48}
                className="h-12 w-12 object-contain"
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
            <p className="mx-auto mt-4 max-w-md text-sm leading-relaxed text-white/78 md:mx-0">
              {FOOTER_ABOUT}
            </p>
          </div>

          <div className="flex items-center justify-center gap-6 md:justify-center">
            {FOOTER_BRAND_IMAGES.map((img) => (
              <div key={img.name} className="relative h-10 w-24 opacity-90">
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  className="object-contain object-center"
                />
              </div>
            ))}
          </div>

          <nav aria-label="Footer" className="text-center md:text-right">
            <p className="mb-2 text-xs uppercase tracking-[0.18em] text-white/60">
              Menu
            </p>
            <ul className="space-y-1.5 text-sm">
              {SITE_NAV.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-white/85 transition hover:text-[var(--sandstone-sand-gold)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--sandstone-sand-gold)]"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className="mt-8 border-t border-white/15 pt-4 text-center text-xs text-white/65 md:flex md:items-center md:justify-between">
          <div className="flex justify-center gap-4 md:justify-start">
            <Link
              href={PRIVACY_POLICY_HREF}
              className="hover:text-[var(--sandstone-sand-gold)]"
            >
              Privacy Policy
            </Link>
            <Link
              href={TERMS_AND_CONDITIONS_HREF}
              className="hover:text-[var(--sandstone-sand-gold)]"
            >
              Terms &amp; Conditions
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
