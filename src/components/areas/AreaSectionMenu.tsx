"use client";

import { useEffect, useRef, useState } from "react";

const GUIDE_SECTIONS = [
  { id: "market", label: "Market" },
  { id: "listings", label: "Listings" },
  { id: "schools", label: "Schools" },
  { id: "nearby", label: "Nearby" },
  { id: "lifestyle", label: "Lifestyle" },
  { id: "utilities", label: "Utilities" },
  { id: "faqs", label: "FAQs" },
];

const NEW_BUILD_SECTIONS = [
  { id: "models", label: "Models" },
  ...GUIDE_SECTIONS.slice(2),
];

export function AreaSectionMenu({ newBuilds = false }: { newBuilds?: boolean }) {
  const sections = newBuilds ? NEW_BUILD_SECTIONS : GUIDE_SECTIONS;
  const [activeId, setActiveId] = useState<string>("");
  const menuRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const menu = menuRef.current;
    const main = menu?.closest("main");
    const header = main?.previousElementSibling;
    if (!menu || !main) return;

    let frame = 0;
    const targets = sections.flatMap(({ id }) => {
      const target = document.getElementById(id);
      return target ? [target] : [];
    });

    const updateActiveSection = () => {
      frame = 0;
      const readingLine = menu.getBoundingClientRect().bottom + 24;
      let current = "";
      for (const target of targets) {
        if (target.getBoundingClientRect().top <= readingLine) current = target.id;
      }
      setActiveId(current);
    };

    const scheduleUpdate = () => {
      if (!frame) frame = window.requestAnimationFrame(updateActiveSection);
    };

    // Keep both the sticky menu and anchor headings clear of the responsive header.
    const measure = () => {
      const headerHeight = header?.getBoundingClientRect().height ?? 0;
      main.style.setProperty("--area-header-height", `${headerHeight}px`);
      main.style.setProperty("--area-menu-height", `${menu.getBoundingClientRect().height}px`);
      scheduleUpdate();
    };

    const observer = new ResizeObserver(measure);
    if (header) observer.observe(header);
    observer.observe(menu);
    // Listing results and photos can change section positions after initial load.
    observer.observe(main);
    measure();
    window.addEventListener("scroll", scheduleUpdate, { passive: true });
    window.addEventListener("resize", measure);

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", scheduleUpdate);
      window.removeEventListener("resize", measure);
      window.cancelAnimationFrame(frame);
      main.style.removeProperty("--area-header-height");
      main.style.removeProperty("--area-menu-height");
    };
  }, [sections]);

  useEffect(() => {
    const menu = menuRef.current;
    const link = menu?.querySelector<HTMLElement>('[aria-current="location"]');
    const scroller = link?.closest("ul");
    if (!link || !scroller) return;
    // Scroll only the menu horizontally; never move the reader's page position.
    const left = link.getBoundingClientRect().left - scroller.getBoundingClientRect().left + scroller.scrollLeft;
    if (left < scroller.scrollLeft) scroller.scrollLeft = left;
    else if (left + link.offsetWidth > scroller.scrollLeft + scroller.clientWidth) {
      scroller.scrollLeft = left + link.offsetWidth - scroller.clientWidth;
    }
  }, [activeId]);

  return (
    <nav
      ref={menuRef}
      aria-label="Neighborhood sections"
      className="sticky z-40 border-y border-[var(--sandstone-sand-gold)]/30 bg-white shadow-sm"
      style={{ top: "var(--area-header-height, 0px)" }}
    >
      <div className="mx-auto flex max-w-7xl items-center gap-4 px-4 lg:px-6">
        <span className="hidden shrink-0 text-xs font-semibold uppercase tracking-widest text-[var(--sandstone-bronze)] lg:block">
          On this page
        </span>
        <ul className="relative flex min-w-0 flex-1 gap-1 overflow-x-auto py-2">
          {sections.map(({ id, label }) => (
            <li key={id} className="shrink-0">
              <a
                href={`#${id}`}
                aria-current={activeId === id ? "location" : undefined}
                className={`flex min-h-11 items-center rounded-full px-4 text-sm font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[var(--sandstone-navy)] ${
                  activeId === id
                    ? "bg-[var(--sandstone-navy)] text-white"
                    : "text-[var(--sandstone-navy)] hover:bg-[var(--sandstone-off-white)]"
                }`}
              >
                {label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
