import type { ReactNode } from "react";

interface LegalDocumentLayoutProps {
  title: string;
  summary: string;
  lastUpdated: string;
  children: ReactNode;
}

export function LegalDocumentLayout({
  title,
  summary,
  lastUpdated,
  children,
}: LegalDocumentLayoutProps) {
  return (
    <section className="mx-auto max-w-4xl px-4 pb-14 pt-24 md:pb-16 md:pt-28">
      <div className="overflow-hidden rounded-2xl border border-[var(--sandstone-navy)]/10 bg-white shadow-lg">
        <div className="border-b border-[var(--sandstone-navy)]/10 bg-[var(--sandstone-off-white)] px-6 py-6 sm:px-8">
          <span className="inline-flex rounded-full bg-[var(--sandstone-navy)] px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.12em] text-white">
            Public legal page
          </span>
          <h1 className="mt-4 font-heading text-3xl font-bold text-[var(--sandstone-navy)] md:text-4xl">
            {title}
          </h1>
          <p className="mt-3 max-w-3xl text-sm leading-6 text-[var(--sandstone-charcoal)]/80">
            {summary}
          </p>
          <p className="mt-4 text-xs uppercase tracking-[0.14em] text-[var(--sandstone-charcoal)]/60">
            Last updated {lastUpdated}
          </p>
        </div>

        <article className="px-6 py-6 text-[15px] leading-7 text-[var(--sandstone-charcoal)] sm:px-8 [&_a]:font-medium [&_a]:text-[var(--sandstone-navy)] [&_a]:underline [&_a]:underline-offset-2 [&_h2]:mt-8 [&_h2]:font-heading [&_h2]:text-2xl [&_h2]:font-bold [&_h2]:leading-tight [&_h2]:text-[var(--sandstone-navy)] [&_h3]:mt-6 [&_h3]:font-heading [&_h3]:text-lg [&_h3]:font-semibold [&_h3]:text-[var(--sandstone-navy)] [&_li]:mb-2 [&_p]:mt-3 [&_ul]:mt-3 [&_ul]:list-disc [&_ul]:pl-6">
          {children}
        </article>
      </div>
    </section>
  );
}
