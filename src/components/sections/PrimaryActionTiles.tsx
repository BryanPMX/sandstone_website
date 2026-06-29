"use client";

import Link from "next/link";
import { ArrowRight, Home, House, UsersRound } from "lucide-react";

const TILES = [
  {
    title: "Sell your home",
    description: "Get a free home valuation and expert guidance.",
    href: "/sell",
    icon: Home,
  },
  {
    title: "Rent your home",
    description: "List your home and find the right tenants.",
    href: "/rent",
    icon: House,
  },
  {
    title: "Join our team",
    description: "Build your career and make an impact.",
    href: "/join",
    icon: UsersRound,
  },
] as const;

export function PrimaryActionTiles() {
  return (
    <section className="bg-[#F7F3EC] py-8 md:py-10">
      <div className="container mx-auto max-w-6xl px-4">
        <div className="overflow-hidden rounded-2xl border border-white/60 bg-[#F7F3EC] shadow-[0_8px_24px_rgba(0,0,0,0.04)]">
          <ul className="grid grid-cols-1 md:grid-cols-3">
            {TILES.map((tile, index) => {
              const Icon = tile.icon;

              return (
                <li key={tile.href} className="relative">
                  {index < TILES.length - 1 && (
                    <span
                      className="absolute right-0 top-1/2 hidden h-16 w-px -translate-y-1/2 bg-[var(--sandstone-sand-gold)]/40 md:block"
                      aria-hidden="true"
                    />
                  )}

                  <Link
                    href={tile.href}
                    className="group flex min-h-[8.5rem] items-center gap-6 px-8 py-6 transition hover:bg-white/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--sandstone-sand-gold)]"
                  >
                    <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-white text-[var(--sandstone-sand-gold)] shadow-md">
                      <Icon className="h-8 w-8 stroke-[1.8]" />
                    </div>

                    <div className="flex-1">
                      <h3 className="font-heading text-lg font-bold text-[var(--sandstone-charcoal)]">
                        {tile.title}
                      </h3>

                      <p className="mt-1 text-sm leading-6 text-[var(--sandstone-charcoal)]/80">
                        {tile.description}
                      </p>
                    </div>

                    <ArrowRight className="h-6 w-6 shrink-0 text-[var(--sandstone-charcoal)] transition group-hover:translate-x-1" />
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}