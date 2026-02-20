"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Search } from "lucide-react";
import { HERO_SLOGAN } from "@/constants/site";

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
      <div className="relative h-[48vh] min-h-[320px] w-full md:h-[62vh] md:min-h-[520px]">
        <Image
          src="/hero.webp"
          alt=""
          fill
          className="object-cover"
          sizes="100vw"
          priority
        />
        <div
          className="absolute inset-0 bg-gradient-to-t from-[var(--sandstone-navy)]/70 via-[var(--sandstone-navy)]/32 to-[var(--sandstone-navy)]/15"
          aria-hidden
        />
      </div>

      <div className="absolute inset-0 flex flex-col items-center justify-start px-4 pt-20 text-center lg:pt-32">
        <div className="relative z-10 w-full max-w-2xl lg:hidden">
          <div className="mb-6 flex justify-center">
            <Image
              src="/logo-hero.webp"
              alt="Sandstone Real Estate Group"
              width={280}
              height={80}
              className="h-14 w-auto object-contain sm:h-16"
              priority
            />
          </div>
          <p className="mt-2 font-heading text-lg font-bold tracking-wide text-[var(--sandstone-sand-gold)] sm:text-xl">
            {HERO_SLOGAN}
          </p>
        </div>

        <form
          onSubmit={handleSearch}
          className="relative z-10 mt-6 w-full max-w-xl lg:mt-0 lg:max-w-lg"
        >
          <div className="relative">
            <input
              type="search"
              name="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={SEARCH_PLACEHOLDER}
              className="w-full rounded-full border border-white/30 bg-white/95 px-5 py-3.5 pr-14 text-[var(--sandstone-charcoal)] placeholder:text-[var(--sandstone-charcoal)]/60 shadow-lg focus:border-[var(--sandstone-sand-gold)] focus:outline-none focus:ring-2 focus:ring-[var(--sandstone-sand-gold)]/35"
              aria-label="Search by address or neighborhood"
            />

            <button
              type="submit"
              className="absolute right-1.5 top-1/2 hidden h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-[var(--sandstone-navy)] text-white transition hover:bg-[var(--sandstone-navy-deep)] focus:outline-none focus:ring-2 focus:ring-[var(--sandstone-sand-gold)] lg:flex"
              aria-label="Submit search"
            >
              <Search className="h-4 w-4" />
            </button>
          </div>

          <button
            type="submit"
            className="mt-3 w-full rounded-full bg-[var(--sandstone-sand-gold)] px-6 py-3 font-semibold text-white transition hover:opacity-95 focus:outline-none focus:ring-2 focus:ring-[var(--sandstone-sand-gold)] focus:ring-offset-2 focus:ring-offset-[var(--sandstone-navy)] lg:hidden"
          >
            Search
          </button>
        </form>
      </div>
    </section>
  );
}
