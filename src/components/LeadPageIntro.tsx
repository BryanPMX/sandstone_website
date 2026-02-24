interface LeadPageIntroProps {
  eyebrow: string;
  title: string;
  description: string;
  highlights?: readonly string[];
}

export function LeadPageIntro({
  eyebrow,
  title,
  description,
  highlights = [],
}: LeadPageIntroProps) {
  return (
    <section className="px-4 pb-6 pt-16 md:pb-8">
      <div className="container mx-auto max-w-4xl">
        <div className="relative overflow-hidden rounded-3xl border border-[var(--sandstone-navy)]/10 bg-white/80 px-6 py-8 text-center shadow-[0_24px_50px_-36px_rgba(37,52,113,0.35)] ring-1 ring-white/75 backdrop-blur-sm md:px-10 md:py-10">
          <div
            aria-hidden
            className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-transparent via-[var(--sandstone-sand-gold)] to-transparent"
          />
          <div
            aria-hidden
            className="absolute -left-10 top-10 h-24 w-24 rounded-full bg-[var(--sandstone-sand-gold)]/10 blur-2xl"
          />
          <div
            aria-hidden
            className="absolute -right-8 bottom-8 h-28 w-28 rounded-full bg-[var(--sandstone-navy)]/8 blur-2xl"
          />

          <p className="relative text-xs font-semibold uppercase tracking-[0.16em] text-[var(--sandstone-bronze)]">
            {eyebrow}
          </p>
          <h1 className="relative mt-3 font-heading text-3xl font-bold text-[var(--sandstone-navy)] md:text-4xl">
            {title}
          </h1>
          <p className="relative mx-auto mt-4 max-w-2xl text-[var(--sandstone-charcoal)]/80 md:text-[15px]">
            {description}
          </p>

          {highlights.length > 0 ? (
            <div className="relative mx-auto mt-6 flex max-w-3xl flex-wrap items-center justify-center gap-2.5">
              {highlights.map((item) => (
                <span
                  key={item}
                  className="inline-flex items-center rounded-full border border-[var(--sandstone-navy)]/10 bg-[var(--sandstone-off-white)]/90 px-3.5 py-1.5 text-xs font-medium tracking-[0.05em] text-[var(--sandstone-navy)] shadow-sm"
                >
                  {item}
                </span>
              ))}
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
}
