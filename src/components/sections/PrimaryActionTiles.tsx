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
    <section className="bg-white py-14 md:py-20">
      <div className="container mx-auto max-w-6xl px-4">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          {TILES.map((tile) => (
            <Link
              key={tile.href}
              href={tile.href}
              className="group flex flex-col items-center justify-center gap-4 rounded-2xl border-2 border-[var(--sandstone-navy)]/10 bg-[var(--sandstone-off-white)]/50 p-8 transition hover:border-[var(--sandstone-sand-gold)]/40 hover:bg-[var(--sandstone-off-white)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--sandstone-sand-gold)] focus-visible:ring-offset-2"
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
    </section>
  );
}
