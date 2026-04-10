import Link from "next/link";

export function PcsEntrySection() {
  return (
    <section className="bg-[var(--sandstone-off-white)] py-10 sm:py-12">
      <div className="container mx-auto max-w-6xl px-4">
        <div className="rounded-3xl border border-[var(--sandstone-navy)]/12 bg-white/90 p-6 shadow-[0_20px_44px_-28px_rgba(17,24,61,0.45)] ring-1 ring-white/70 sm:p-8">
          <div className="grid gap-6 lg:grid-cols-[1fr_auto] lg:items-center">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--sandstone-navy)]/60">
                Military Relocation
              </p>
              <h2 className="mt-2 font-heading text-2xl font-bold text-[var(--sandstone-charcoal)] sm:text-3xl">
                PCSing to El Paso?
              </h2>
              <p className="mt-2 max-w-2xl text-sm leading-6 text-[var(--sandstone-charcoal)]/80 sm:text-base">
                Explore our dedicated PCS experience built for military families relocating to the Fort Bliss area.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <Link
                href="/pcs"
                className="inline-flex h-11 items-center justify-center rounded-full bg-[var(--sandstone-navy)] px-6 text-sm font-semibold text-white transition hover:bg-[var(--sandstone-navy-deep)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--sandstone-navy)] focus-visible:ring-offset-2"
              >
                PCS to El Paso?
              </Link>
              <Link
                href="/pcs#pcs-contact"
                className="inline-flex h-11 items-center justify-center rounded-full border border-[var(--sandstone-navy)]/25 bg-white px-6 text-sm font-semibold text-[var(--sandstone-navy)] transition hover:border-[var(--sandstone-navy)]/45 hover:bg-[var(--sandstone-off-white)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--sandstone-navy)] focus-visible:ring-offset-2"
              >
                Military Relocation Help
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
