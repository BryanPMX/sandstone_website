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
      className="bg-[var(--sandstone-navy)] text-[var(--sandstone-off-white)] py-12 md:py-14 scroll-mt-20"
    >
      <div className="container mx-auto max-w-6xl px-4">
        <div className="flex flex-col items-center gap-10 text-center">
          <div className="max-w-md">
            <Image
              src="/logo-mark.webp"
              alt=""
              width={80}
              height={80}
              className="mx-auto h-16 w-auto object-contain"
            />
            <p className="mt-3 font-heading text-xl font-bold text-[var(--sandstone-sand-gold)]">
              {FOOTER_BRAND}
            </p>
            <p className="mt-1 text-sm text-white/80">{FOOTER_TAGLINE}</p>
            <p className="mt-4 text-sm leading-relaxed text-white/75">
              {FOOTER_ABOUT}
            </p>
          </div>

          <nav aria-label="Footer">
            <ul className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm">
              {SITE_NAV.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-white/90 hover:text-[var(--sandstone-sand-gold)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--sandstone-sand-gold)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--sandstone-navy)]"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex flex-wrap items-center justify-center gap-8">
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

          <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 border-t border-white/15 pt-6 text-sm text-white/70">
            <Link
              href={PRIVACY_POLICY_HREF}
              className="hover:text-[var(--sandstone-sand-gold)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--sandstone-sand-gold)]"
            >
              Privacy Policy
            </Link>
            <Link
              href={TERMS_AND_CONDITIONS_HREF}
              className="hover:text-[var(--sandstone-sand-gold)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--sandstone-sand-gold)]"
            >
              Terms &amp; Conditions
            </Link>
          </div>

          <p className="text-xs text-white/60">
            © {new Date().getFullYear()} {FOOTER_BRAND}
          </p>
        </div>
      </div>
    </footer>
  );
}
