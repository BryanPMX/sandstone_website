"use client";

import Script from "next/script";

export function GoogleReviews() {
  return (
    <section className="border-t border-[var(--sandstone-charcoal)]/10 bg-white py-16">
      <div className="mx-auto w-full max-w-6xl px-4 lg:px-6">
        <div className="text-center">
          <h2 className="font-heading text-2xl font-bold text-[var(--sandstone-navy)] sm:text-3xl">
            Google Reviews
          </h2>
          <p className="mt-2 text-sm text-[var(--sandstone-charcoal)]/80">
            See what military families are saying about Sandstone.
          </p>
        </div>

        <div className="mt-8">
          <Script src="https://elfsightcdn.com/platform.js" strategy="afterInteractive" />

          <div
            className="elfsight-app-616713c5-bf72-43dd-9066-6d872efe0ce9"
            data-elfsight-app-lazy
          />
        </div>

        <div className="mt-8 text-center">
          <a
            href="https://www.google.com/search?q=Sandstone+Real+Estate+Team+by+Alejandro+Gamboa+Reviews"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center rounded-full border border-[var(--sandstone-sand-gold)] px-6 py-3 text-xs font-bold uppercase tracking-[0.14em] text-[var(--sandstone-sand-gold)] transition hover:bg-[var(--sandstone-sand-gold)] hover:text-[var(--sandstone-navy)]"
          >
            Leave a Google Review →
          </a>
        </div>
      </div>
    </section>
  );
}