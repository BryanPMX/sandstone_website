import Link from "next/link";

import { cn } from "@/lib/utils";

interface FinancingBannerProps {
  /**
   * Adds rounded corners for placements that sit inside a padded
   * container (e.g. the listing detail page) instead of a full-bleed
   * section. This variant also keeps the banner at its natural
   * (taller) aspect ratio — the compact fixed-height treatment below
   * is only used on full-bleed placements (home, /pcs).
   */
  rounded?: boolean;
}

/**
 * Promotional banner for Sandstone's preferred lending partner
 * (Lisa Wren / American Pacific Mortgage). Links to /financing/apmortgage.
 */
export function FinancingBanner({ rounded = false }: FinancingBannerProps) {
  return (
    <section
      className={cn("relative w-full overflow-hidden", rounded && "rounded-[1.5rem]")}
    >
      <Link
        href="/financing/apmortgage"
        className="group relative block w-full"
        aria-label="VA and PCS Financing in El Paso — Start your pre-approval"
      >
        <img
          src="/uploads/apmortgage-financing-banner.webp"
          alt="VA and PCS Financing in El Paso — Start your pre-approval"
          className={cn(
            "block w-full",
            rounded ? "h-auto" : "h-[150px] object-cover object-[50%_38%]"
          )}
        />

        <div className="absolute inset-0 flex items-center">
          <div className="mx-auto w-full max-w-6xl px-6 lg:px-10">
            <div className="max-w-[15rem] sm:max-w-sm lg:max-w-md">
              <h2
                className={cn(
                  "font-heading font-bold leading-tight text-white",
                  rounded ? "text-base sm:text-2xl lg:text-3xl" : "text-sm sm:text-lg lg:text-2xl"
                )}
              >
                VA &amp; PCS Financing in El Paso
              </h2>

              <p
                className={cn(
                  "mt-1 hidden text-white/80 sm:block",
                  rounded ? "text-xs sm:text-sm" : "text-[10px] sm:text-xs"
                )}
              >
                Talk to a trusted local lender about your pre-approval.
              </p>

              <span
                className={cn(
                  "inline-flex items-center rounded-full bg-[var(--sandstone-sand-gold)] font-bold uppercase tracking-[0.1em] text-[var(--sandstone-navy)] transition group-hover:bg-white",
                  rounded
                    ? "mt-2 px-3.5 py-1.5 text-[9px] sm:mt-3 sm:px-5 sm:py-2 sm:text-[11px]"
                    : "mt-1.5 px-3 py-1 text-[8px] sm:mt-2 sm:px-4 sm:py-1.5 sm:text-[10px]"
                )}
              >
                Start Your Pre-Approval
              </span>
            </div>
          </div>
        </div>
      </Link>
    </section>
  );
}
