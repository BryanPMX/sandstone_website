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
      <div className="w-full pl-[28px] pr-[35px] md:pl-[35px] md:pr-[42px] lg:pl-[42px] lg:pr-[56px]">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-[auto_1fr_auto_auto] gap-y-[21px] lg:gap-y-[28px] gap-x-[28px] lg:gap-x-[35px] items-start">
          {/* Logo + ethos */}
          <div className="justify-self-start">
            <div className="flex items-center gap-[7px]">
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
          <div className="justify-self-center text-center w-full">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-sandstone-base mb-[7px]">
              Navigation
            </h3>
            <ul className="flex flex-wrap justify-center gap-[14px] text-lg text-white/90">
              {SITE_NAV.map((item) => (
                <li key={item.href}>
                  <a href={item.href} className="hover:text-sandstone-base transition-colors">
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Social */}
          <div className="justify-self-center lg:justify-self-start text-center w-full">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-sandstone-base">
              Social Media
            </h3>
            <ul className="mt-[7px] flex flex-wrap gap-[14px] justify-center text-base">
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

          {/* Contact */}
          <div className="justify-self-center lg:justify-self-start text-center w-full space-y-[7px]">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-sandstone-base">
              Contact
            </h3>
            <div className="flex flex-col items-center gap-[7px]">
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

        <div className="mt-[21px] pt-[14px] border-t border-white/15 flex flex-col items-center justify-center gap-[7px] text-sm text-white/80 text-center">
          <span>© {new Date().getFullYear()} {FOOTER_BRAND}</span>
        </div>
      </div>
    </footer>
  );
}
