"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Search } from "lucide-react";

const SEARCH_PLACEHOLDER = "Enter an address, neighborhood in EP";

interface HeroSectionProps {
  initialQuery?: string;
}

export function HeroSection({ initialQuery = "" }: HeroSectionProps) {
  const router = useRouter();
  const [query, setQuery] = useState(initialQuery);

  useEffect(() => {
    setQuery(initialQuery);
  }, [initialQuery]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const q = query.trim();
    if (q) {
      router.push(`/?search=${encodeURIComponent(q)}#listings`);
    } else {
      router.push("/#listings");
    }
  };

  return (
    <section className="relative w-full overflow-hidden bg-[var(--sandstone-navy)]">
      <div className="relative h-[46vh] min-h-[320px] w-full lg:h-[640px] lg:min-h-[640px]">
        <div className="relative h-full w-full">
          <picture className="absolute inset-0 block h-full w-full">
            <source
              media="(min-width: 1024px)"
              srcSet="/desktop%20hero.webp"
              type="image/webp"
            />
            <img
              src="/mobile%20hero.webp"
              alt=""
              className="h-full w-full object-cover object-[center_45%] lg:object-[center_40%]"
              fetchPriority="high"
            />
          </picture>
          <div
            className="absolute inset-0 bg-gradient-to-t from-[var(--sandstone-navy)]/62 via-[var(--sandstone-navy)]/26 to-[var(--sandstone-navy)]/10 lg:from-[var(--sandstone-navy)]/70 lg:via-[var(--sandstone-navy)]/30 lg:to-[var(--sandstone-navy)]/12"
            aria-hidden
          />

          <form
            onSubmit={handleSearch}
            className="absolute left-1/2 top-[35%] z-10 hidden w-[548px] max-w-[calc(100%-3rem)] -translate-x-1/2 lg:block xl:top-[36%]"
          >
            <div className="relative">
              <input
                type="search"
                name="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder={SEARCH_PLACEHOLDER}
                className="w-full rounded-full border border-white/40 bg-white/95 px-5 py-3 pr-14 text-[var(--sandstone-charcoal)] placeholder:text-[var(--sandstone-charcoal)]/60 shadow-[0_12px_30px_-16px_rgba(0,0,0,0.55)] focus:border-[var(--sandstone-sand-gold)] focus:outline-none focus:ring-2 focus:ring-[var(--sandstone-sand-gold)]/35"
                aria-label="Search by address or neighborhood"
              />

              <button
                type="submit"
                className="absolute right-1.5 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-[var(--sandstone-navy)] text-white transition hover:bg-[var(--sandstone-navy-deep)] focus:outline-none focus:ring-2 focus:ring-[var(--sandstone-sand-gold)]"
                aria-label="Submit search"
              >
                <Search className="h-4 w-4" />
              </button>
            </div>
          </form>
          <div
            className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-b from-transparent via-[var(--sandstone-navy)]/50 via-60% to-[var(--sandstone-navy)] lg:hidden"
            aria-hidden
          />
          <div className="pointer-events-none absolute bottom-5 left-1/2 z-20 h-[44px] w-[206px] -translate-x-1/2 lg:hidden">
            <Image
              src="/mobile-logo-hero.webp"
              alt="Sandstone Real Estate Group"
              fill
              className="object-contain drop-shadow-[0_2px_3px_rgba(0,0,0,0.45)]"
              sizes="206px"
              priority
            />
          </div>
        </div>
      </div>

      <div className="bg-[var(--sandstone-navy)] px-4 pb-5 pt-4 lg:hidden">
        <form onSubmit={handleSearch} className="mx-auto mt-3 w-full max-w-sm">
          <input
            type="search"
            name="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={SEARCH_PLACEHOLDER}
            className="w-full rounded-full border border-white/35 bg-white/96 px-5 py-3 text-[var(--sandstone-charcoal)] placeholder:text-[var(--sandstone-charcoal)]/58 shadow-[0_12px_30px_-16px_rgba(0,0,0,0.55)] focus:border-[var(--sandstone-sand-gold)] focus:outline-none focus:ring-2 focus:ring-[var(--sandstone-sand-gold)]/35"
            aria-label="Search by address or neighborhood"
          />

          <button
            type="submit"
            className="mx-auto mt-2.5 block w-[72%] max-w-[220px] rounded-full bg-[var(--sandstone-sand-gold)] px-6 py-3 font-semibold text-white transition hover:opacity-95 focus:outline-none focus:ring-2 focus:ring-[var(--sandstone-sand-gold)] focus:ring-offset-2 focus:ring-offset-[var(--sandstone-navy)]"
          >
            Search
          </button>
        </form>
      </div>
    </section>
  );
}
