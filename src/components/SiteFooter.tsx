"use client";

import Image from "next/image";
import { Phone, Mail, Facebook, Instagram, Linkedin } from "lucide-react";
import {
  SITE_CONTACT,
  FOOTER_CREDIT,
  FOOTER_BRAND,
  SOCIAL_LINKS,
} from "@/constants/site";

const iconMap = {
  facebook: Facebook,
  instagram: Instagram,
  linkedin: Linkedin,
} as const;

export function SiteFooter() {
  return (
    <footer
      id="footer"
      className="bg-sandstone-navy text-white/90 py-8 md:py-10 scroll-mt-20"
    >
      <div className="container mx-auto max-w-6xl px-4">
        <div className="grid gap-8 grid-cols-1 md:grid-cols-4 items-start">
          {/* Logo + ethos */}
          <div className="space-y-3 md:col-span-2">
            <div className="relative h-12 w-40">
              <Image
                src="/logo.jpg"
                alt="Sandstone Real Estate Team logo"
                fill
                className="object-contain"
                sizes="160px"
                priority
              />
            </div>
            <p className="text-sm text-white/75 leading-relaxed">
              Luxury. Lifestyle. Legacy. Every showing, story, and closing is crafted to feel cinematic and effortless.
            </p>
          </div>

          {/* Social media links */}
          <div>
            <h3 className="text-[10px] font-semibold uppercase tracking-wider text-sandstone-base mb-1.5">
              Social Media
            </h3>
            <ul className="flex gap-3">
              {SOCIAL_LINKS.map((link) => {
                const Icon = iconMap[link.icon];
                return (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-white/90 hover:text-sandstone-base transition-colors"
                      aria-label={link.label}
                    >
                      {Icon ? <Icon className="h-4 w-4" /> : link.label}
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Phone */}
          <div>
            <h3 className="text-[10px] font-semibold uppercase tracking-wider text-sandstone-base mb-1.5">
              Phone
            </h3>
            <a
              href={`tel:${SITE_CONTACT.phoneRaw}`}
              className="flex items-center gap-1.5 text-xs hover:text-sandstone-base transition-colors"
            >
              <Phone className="h-3.5 w-3.5 shrink-0" />
              {SITE_CONTACT.phone}
            </a>
          </div>

          {/* Email */}
          <div>
            <h3 className="text-[10px] font-semibold uppercase tracking-wider text-sandstone-base mb-1.5">
              Email
            </h3>
            <a
              href={`mailto:${SITE_CONTACT.email}`}
              className="flex items-center gap-1.5 text-xs hover:text-sandstone-base transition-colors break-all"
            >
              <Mail className="h-3.5 w-3.5 shrink-0" />
              {SITE_CONTACT.email}
            </a>
          </div>
        </div>

        <div className="mt-8 pt-5 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-white/70">
          <span>
            © {new Date().getFullYear()} {FOOTER_BRAND}
          </span>
          <span>{FOOTER_CREDIT}</span>
        </div>
      </div>
    </footer>
  );
}
