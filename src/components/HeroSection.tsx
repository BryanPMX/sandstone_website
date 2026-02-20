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
      <div className="relative h-[46vh] min-h-[320px] w-full lg:h-[560px] lg:min-h-[560px]">
        <Image
          src="/hero.webp"
          alt=""
          fill
          className="object-cover opacity-35 blur-[1px]"
          sizes="100vw"
          priority
          aria-hidden
        />

        <div className="relative h-full w-full lg:mx-auto lg:max-w-6xl">
          <Image
            src="/hero.webp"
            alt=""
            fill
            className="object-cover object-center lg:object-[center_55%]"
            sizes="(max-width: 1024px) 100vw, 1200px"
            priority
          />
          <div
            className="absolute inset-0 bg-gradient-to-t from-[var(--sandstone-navy)]/70 via-[var(--sandstone-navy)]/30 to-[var(--sandstone-navy)]/12"
            aria-hidden
          />

          <form
            onSubmit={handleSearch}
            className="absolute left-1/2 top-[34%] z-10 hidden w-[460px] max-w-[calc(100%-2rem)] -translate-x-1/2 lg:block"
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
        </div>
      </div>

      <div className="bg-[var(--sandstone-off-white)] px-4 pb-5 pt-4 lg:hidden">
        <form onSubmit={handleSearch} className="mx-auto w-full max-w-xl">
          <input
            type="search"
            name="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={SEARCH_PLACEHOLDER}
            className="w-full rounded-full border border-[var(--sandstone-navy)]/15 bg-white px-5 py-3 text-[var(--sandstone-charcoal)] placeholder:text-[var(--sandstone-charcoal)]/60 shadow-sm focus:border-[var(--sandstone-sand-gold)] focus:outline-none focus:ring-2 focus:ring-[var(--sandstone-sand-gold)]/35"
            aria-label="Search by address or neighborhood"
          />

          <button
            type="submit"
            className="mt-3 w-full rounded-full bg-[var(--sandstone-sand-gold)] px-6 py-3 font-semibold text-white transition hover:opacity-95 focus:outline-none focus:ring-2 focus:ring-[var(--sandstone-sand-gold)] focus:ring-offset-2 focus:ring-offset-[var(--sandstone-off-white)]"
          >
            Search
          </button>
        </form>
      </div>
    </section>
  );
}
