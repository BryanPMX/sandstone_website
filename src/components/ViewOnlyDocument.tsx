"use client";

interface ViewOnlyDocumentProps {
  html: string;
  title: string;
}

/**
 * Renders document HTML with view-only measures: no right-click (context menu)
 * and no text selection, so content is view-only in the browser.
 */
export function ViewOnlyDocument({ html, title }: ViewOnlyDocumentProps) {
  return (
    <section className="relative mx-auto max-w-5xl px-4 pb-14 pt-24 md:pb-16 md:pt-28">
      <div
        className="relative overflow-hidden rounded-2xl border border-[var(--sandstone-navy)]/10 bg-white p-5 shadow-lg sm:p-7 md:p-9"
        onContextMenu={(event) => event.preventDefault()}
        onCopy={(event) => event.preventDefault()}
        onCut={(event) => event.preventDefault()}
        onDragStart={(event) => event.preventDefault()}
        style={{ WebkitUserSelect: "none", userSelect: "none" }}
      >
        <div className="relative">
          <span className="inline-block rounded-full bg-[var(--sandstone-navy)] px-3 py-1.5 text-xs font-semibold text-white">
            View-only legal document
          </span>
          <p className="mt-3 text-sm text-[var(--sandstone-charcoal)]/80">
            {title} is available for on-screen review only.
          </p>
          <article
            aria-label={`${title} content`}
            className="mt-6 border-t border-[var(--sandstone-charcoal)]/15 pt-6 text-[15px] leading-7 text-[var(--sandstone-charcoal)] [&_a]:font-medium [&_a]:text-[var(--sandstone-navy)] [&_a]:underline [&_h1]:mt-8 [&_h1]:font-heading [&_h1]:text-2xl [&_h1]:font-bold [&_h1]:text-[var(--sandstone-navy)] [&_h2]:mt-7 [&_h2]:font-heading [&_h2]:text-xl [&_h2]:font-bold [&_h2]:text-[var(--sandstone-navy)] [&_h3]:mt-6 [&_h3]:font-heading [&_h3]:text-lg [&_h3]:font-semibold [&_h3]:text-[var(--sandstone-navy)] [&_li]:mb-2 [&_ol]:mb-4 [&_ol]:pl-6 [&_p]:mb-4 [&_strong]:font-semibold [&_ul]:mb-4 [&_ul]:list-disc [&_ul]:pl-6"
            dangerouslySetInnerHTML={{ __html: html }}
          />
        </div>
      </div>
    </section>
  );
}
