"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";
import { Search } from "lucide-react";
import { useEffect, useRef, useState, useTransition } from "react";

const SEARCH_PLACEHOLDER = "Find a property on the map";
const LISTINGS_MAP_PATH = "/listings/map";

function buildListingsMapHref(query: string): string {
  const trimmed = query.trim();

  if (!trimmed) {
    return LISTINGS_MAP_PATH;
  }

  return `${LISTINGS_MAP_PATH}?search=${encodeURIComponent(trimmed)}`;
}

export function HeroSection() {
  const router = useRouter();
  const [isNavigatingToMap, setIsNavigatingToMap] = useState(false);
  const [isPending, startTransition] = useTransition();
  const hasTriggeredRedirectRef = useRef(false);

  useEffect(() => {
    router.prefetch(LISTINGS_MAP_PATH);
  }, [router]);

  useEffect(() => {
    if (!(isNavigatingToMap || isPending)) {
      return;
    }

    const timeout = window.setTimeout(() => {
      hasTriggeredRedirectRef.current = false;
      setIsNavigatingToMap(false);
    }, 10000);

    return () => {
      window.clearTimeout(timeout);
    };
  }, [isNavigatingToMap, isPending]);

  const navigateToMap = (value: string) => {
    if (hasTriggeredRedirectRef.current) {
      return;
    }

    hasTriggeredRedirectRef.current = true;
    setIsNavigatingToMap(true);

    startTransition(() => {
      router.push(buildListingsMapHref(value));
    });
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const form = e.currentTarget as HTMLFormElement;
    const input = form.elements.namedItem("search");
    const value = input instanceof HTMLInputElement ? input.value : "";
    navigateToMap(value);
  };

  const handleInputFocus = (event: React.FocusEvent<HTMLInputElement>) => {
    const value = event.currentTarget.value;
    navigateToMap(value);
  };

  const showTransition = isNavigatingToMap || isPending;

  return (
    <>
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
                  placeholder={SEARCH_PLACEHOLDER}
                  defaultValue=""
                  onFocus={handleInputFocus}
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
              placeholder={SEARCH_PLACEHOLDER}
              defaultValue=""
              onFocus={handleInputFocus}
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

      {showTransition && (
        <div className="fixed inset-0 z-[140] flex items-center justify-center bg-[color:rgba(37,52,113,0.28)] backdrop-blur-md">
          <div className="mx-4 w-full max-w-[430px] rounded-[1.85rem] border border-white/62 bg-white/92 px-8 py-7 text-center shadow-[0_28px_70px_-28px_rgba(17,24,61,0.6)]">
            <span
              aria-hidden
              className="mx-auto block h-12 w-12 animate-spin rounded-full border-[3px] border-[var(--sandstone-sand-gold)]/26 border-t-[var(--sandstone-sand-gold)]"
            />
            <p className="mt-4 font-heading text-xl font-bold text-[var(--sandstone-navy)]">
              Opening map search
            </p>
            <p className="mt-1 text-sm text-[var(--sandstone-charcoal)]/74">
              Loading available homes near El Paso.
            </p>
          </div>
        </div>
      )}
    </>
  );
}
