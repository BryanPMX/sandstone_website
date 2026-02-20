"use client";

import Link from "next/link";
import Image from "next/image";

const TILES = [
  {
    label: "Sell My House",
    href: "/sell",
    icon: "/icon1.webp",
  },
  {
    label: "Rent My House",
    href: "/rent",
    icon: "/icon2.webp",
  },
  {
    label: "Join the Team",
    href: "/join",
    icon: "/icon3.webp",
  },
] as const;

export function PrimaryActionTiles() {
  return (
    <section className="bg-gradient-to-b from-white to-[#f8f5ef] py-10 md:py-0">
      <div className="container mx-auto max-w-6xl px-4">
        <div className="grid grid-cols-1 gap-4 md:hidden">
          {TILES.map((tile) => (
            <Link
              key={tile.href}
              href={tile.href}
              className="group flex flex-col items-center justify-center gap-4 rounded-2xl border border-white/65 bg-white/72 p-8 shadow-[0_16px_32px_-24px_rgba(37,52,113,0.42)] backdrop-blur-sm transition hover:border-[var(--sandstone-sand-gold)]/40 hover:bg-[var(--sandstone-off-white)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--sandstone-sand-gold)] focus-visible:ring-offset-2"
            >
              <div className="relative h-14 w-14 shrink-0">
                <Image
                  src={tile.icon}
                  alt=""
                  fill
                  className="object-contain transition group-hover:opacity-90"
                />
              </div>
              <span className="text-center font-heading text-lg font-bold text-[var(--sandstone-charcoal)] group-hover:text-[var(--sandstone-navy)]">
                {tile.label}
              </span>
            </Link>
          ))}
        </div>
      </div>

      <div className="mt-2 hidden border-y border-[var(--sandstone-navy)]/15 bg-[var(--sandstone-sand-gold)]/45 md:block">
        <div className="container mx-auto max-w-6xl px-6">
          <ul className="grid grid-cols-3">
            {TILES.map((tile, index) => (
              <li key={tile.href} className="relative">
                {index < TILES.length - 1 && (
                  <span
                    className="absolute right-0 top-1/2 h-12 w-px -translate-y-1/2 bg-[var(--sandstone-navy)]/30"
                    aria-hidden
                  />
                )}
                <Link
                  href={tile.href}
                  className="group flex flex-col items-center justify-center gap-2 py-4 text-[var(--sandstone-charcoal)] transition hover:bg-white/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--sandstone-navy)]"
                >
                  <div className="relative h-10 w-10 shrink-0">
                    <Image
                      src={tile.icon}
                      alt=""
                      fill
                      className="object-contain"
                    />
                  </div>
                  <span className="text-sm font-semibold tracking-wide">
                    {tile.label}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
