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
    <div
      className="mx-auto max-w-3xl px-4 py-8 text-sandstone-text [&_p]:mb-3 [&_h2]:mt-6 [&_h2]:font-heading [&_h2]:font-bold [&_h3]:mt-4 [&_h3]:font-heading [&_a]:text-sandstone-navy [&_a]:underline"
      onContextMenu={(e) => e.preventDefault()}
      style={{ userSelect: "none" }}
    >
      <h1 className="font-heading text-2xl font-bold text-sandstone-gold md:text-3xl">
        {title}
      </h1>
      <div
        className="[&_p]:mb-3 [&_h2]:mt-6 [&_h2]:font-heading [&_h2]:font-bold [&_a]:text-sandstone-navy [&_a]:underline"
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </div>
  );
}
