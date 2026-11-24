export default function ListingsMapLoading() {
  return (
    <main className="min-h-screen bg-[var(--sandstone-off-white)] px-4 py-10 lg:px-6">
      <section className="mx-auto max-w-[1360px]">
        <div className="rounded-[1.8rem] border border-[var(--sandstone-navy)]/12 bg-white/90 px-6 py-7 shadow-[0_24px_60px_-34px_rgba(37,52,113,0.45)]">
          <div className="flex flex-col items-center text-center">
            <span
              aria-hidden
              className="h-12 w-12 animate-spin rounded-full border-[3px] border-[var(--sandstone-sand-gold)]/26 border-t-[var(--sandstone-sand-gold)]"
            />
            <p className="mt-4 font-heading text-2xl font-bold text-[var(--sandstone-navy)]">
              Loading map search
            </p>
            <p className="mt-1 text-sm text-[var(--sandstone-charcoal)]/72">
              Pulling the latest listings and placing pins.
            </p>
          </div>
        </div>

        <div className="mt-5 grid gap-5 lg:grid-cols-[minmax(0,1.5fr)_minmax(340px,0.95fr)]">
          <div className="h-[56vh] min-h-[420px] animate-pulse rounded-[1.65rem] border border-[var(--sandstone-navy)]/12 bg-[linear-gradient(135deg,rgba(37,52,113,0.11),rgba(183,150,120,0.16))] lg:h-[calc(100vh-9.25rem)]" />

          <aside className="rounded-[1.65rem] border border-[var(--sandstone-navy)]/12 bg-white/85 p-4 shadow-[0_24px_64px_-34px_rgba(37,52,113,0.45)] lg:max-h-[calc(100vh-9.25rem)]">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-1 2xl:grid-cols-2">
              {Array.from({ length: 4 }).map((_, index) => (
                <div
                  key={index}
                  className="overflow-hidden rounded-2xl border border-[var(--sandstone-navy)]/10 bg-[var(--sandstone-off-white)]/65"
                >
                  <div className="aspect-[4/3] animate-pulse bg-[var(--sandstone-navy)]/12" />
                  <div className="space-y-2 p-4">
                    <div className="h-4 w-3/4 animate-pulse rounded-full bg-[var(--sandstone-navy)]/16" />
                    <div className="h-3 w-2/3 animate-pulse rounded-full bg-[var(--sandstone-navy)]/12" />
                  </div>
                </div>
              ))}
            </div>
          </aside>
        </div>
      </section>
    </main>
  );
}
