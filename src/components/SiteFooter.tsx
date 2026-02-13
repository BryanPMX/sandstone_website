"use client";

import Image from "next/image";
import { Phone, Mail, Facebook, Instagram, Linkedin } from "lucide-react";
import { SITE_CONTACT, FOOTER_BRAND, SOCIAL_LINKS, SITE_NAV } from "@/constants/site";

const iconMap = {
  facebook: Facebook,
  instagram: Instagram,
  linkedin: Linkedin,
} as const;

export function SiteFooter() {
  return (
    <footer
      id="footer"
      className="bg-gradient-to-r from-sandstone-maroon via-sandstone-navy to-sandstone-gold text-white/90 py-[35px] md:py-[42px] scroll-mt-20"
    >
      <div className="container mx-auto max-w-6xl px-4">
        <div className="grid grid-cols-1 items-start justify-items-center gap-y-5 gap-x-7 lg:grid-cols-[1fr_auto_1fr] lg:gap-x-[35px]">
          {/* Logo + ethos */}
          <div className="w-full max-w-sm justify-self-center text-center lg:justify-self-start lg:text-left">
            <div className="flex items-center justify-center gap-[7px] lg:justify-start">
              <Image
                src="/logo.jpg"
                alt="Sandstone Real Estate Team logo"
                width={140}
                height={48}
                className="h-12 w-auto object-contain"
                priority
              />
              <div className="text-base text-white/85 leading-snug">
                <p className="font-heading text-lg text-sandstone-base">Sandstone Real Estate</p>
                <p className="text-sm text-white/80">Luxury · Lifestyle · Legacy</p>
              </div>
            </div>
          </div>

          {/* Center navigation */}
          <div className="w-full max-w-xl justify-self-center text-center">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-sandstone-base mb-[7px]">
              Navigation
            </h3>
            <ul className="flex flex-wrap justify-center gap-x-3 gap-y-1.5 text-base text-white/90 sm:text-lg sm:gap-[14px]">
              {SITE_NAV.map((item) => (
                <li key={item.href}>
                  <a href={item.href} className="hover:text-sandstone-base transition-colors">
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Social + Contact */}
          <div className="w-full max-w-sm justify-self-center space-y-3 text-center lg:justify-self-end lg:text-right">
            <div>
              <h3 className="text-xs font-semibold uppercase tracking-wider text-sandstone-base">
                Social Media
              </h3>
              <ul className="mt-[7px] flex flex-wrap justify-center gap-[14px] text-base lg:justify-end">
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
            <div className="space-y-[7px]">
              <h3 className="text-xs font-semibold uppercase tracking-wider text-sandstone-base">
                Contact
              </h3>
              <div className="flex flex-col items-center gap-[7px] lg:items-end">
                <a
                  href={`tel:${SITE_CONTACT.phoneRaw}`}
                  className="inline-flex items-center gap-[7px] text-sm hover:text-sandstone-base transition-colors"
                >
                  <Phone className="h-3.5 w-3.5 shrink-0" />
                  {SITE_CONTACT.phone}
                </a>
                <a
                  href={`mailto:${SITE_CONTACT.email}`}
                  className="inline-flex items-center gap-[7px] text-sm hover:text-sandstone-base transition-colors break-all"
                >
                  <Mail className="h-3.5 w-3.5 shrink-0" />
                  {SITE_CONTACT.email}
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-[21px] border-t border-white/15 pt-[14px]">
          <div className="mx-auto w-full max-w-xl text-center text-sm text-white/80">
            <span>© {new Date().getFullYear()} {FOOTER_BRAND}</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
