"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";
import { useRef, useState } from "react";

const SEARCH_PLACEHOLDER = "Enter an address, neighborhood in EP";

export function HeroSection() {
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);
  const [query, setQuery] = useState("");

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
      <div className="relative aspect-[16/10] w-full min-h-[70vh] sm:aspect-[16/9] sm:min-h-[75vh]">
        <Image
          src="/hero.webp"
          alt=""
          fill
          className="object-cover"
          sizes="100vw"
          priority
        />
        <div
          className="absolute inset-0 bg-gradient-to-t from-[var(--sandstone-navy)]/90 via-[var(--sandstone-navy)]/50 to-[var(--sandstone-navy)]/30"
          aria-hidden
        />
      </div>

      <div className="absolute inset-0 flex flex-col items-center justify-center px-4 py-20 text-center">
        <div className="relative z-10 w-full max-w-2xl">
          <div className="mb-6 flex justify-center">
            <Image
              src="/logo-hero.webp"
              alt="Sandstone Real Estate Group"
              width={280}
              height={80}
              className="h-14 w-auto object-contain sm:h-16 md:h-20"
              priority
            />
          </div>
          <p className="mt-2 font-heading text-lg font-bold tracking-wide text-[var(--sandstone-sand-gold)] sm:text-xl">
            Luxury. Lifestyle. Legacy.
          </p>
        </div>

        <form
          onSubmit={handleSearch}
          className="relative z-10 mt-8 flex w-full max-w-xl flex-col gap-3 sm:flex-row sm:items-center sm:rounded-full sm:bg-white/95 sm:py-1 sm:pr-1 sm:shadow-lg"
        >
          <input
            ref={inputRef}
            type="search"
            name="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={SEARCH_PLACEHOLDER}
            className="w-full rounded-full border border-white/30 bg-white/90 px-5 py-3.5 text-[var(--sandstone-charcoal)] placeholder:text-[var(--sandstone-charcoal)]/60 focus:border-[var(--sandstone-sand-gold)] focus:outline-none focus:ring-2 focus:ring-[var(--sandstone-sand-gold)]/30 sm:border-0 sm:bg-transparent sm:py-3 sm:focus:ring-0"
            aria-label="Search by address or neighborhood"
          />
          <button
            type="submit"
            className="shrink-0 rounded-full bg-[var(--sandstone-sand-gold)] px-6 py-3.5 font-semibold text-white transition hover:opacity-95 focus:outline-none focus:ring-2 focus:ring-[var(--sandstone-sand-gold)] focus:ring-offset-2 focus:ring-offset-[var(--sandstone-navy)] sm:px-8"
          >
            Search
          </button>
        </form>
      </div>
    </section>
  );
}
