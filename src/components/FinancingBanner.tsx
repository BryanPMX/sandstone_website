import Link from "next/link";

import { cn } from "@/lib/utils";

interface FinancingBannerProps {
  /**
   * Adds rounded corners for placements that sit inside a padded
   * container (e.g. the listing detail page) instead of a full-bleed
   * section.
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
          className="block h-auto w-full"
        />

        <div className="absolute inset-0 flex items-center">
          <div className="mx-auto w-full max-w-6xl px-6 lg:px-10">
            <div className="max-w-[15rem] sm:max-w-sm lg:max-w-md">
              <h2 className="font-heading text-base font-bold leading-snug text-white sm:text-2xl lg:text-3xl">
                VA &amp; PCS Financing in El Paso
              </h2>

              <p className="mt-1 hidden text-xs text-white/80 sm:block sm:text-sm">
                Talk to a trusted local lender about your pre-approval.
              </p>

              <span className="mt-2 inline-flex items-center rounded-full bg-[var(--sandstone-sand-gold)] px-3.5 py-1.5 text-[9px] font-bold uppercase tracking-[0.1em] text-[var(--sandstone-navy)] transition group-hover:bg-white sm:mt-3 sm:px-5 sm:py-2 sm:text-[11px]">
                Start Your Pre-Approval
              </span>
            </div>
          </div>
        </div>
      </Link>
    </section>
  );
}
