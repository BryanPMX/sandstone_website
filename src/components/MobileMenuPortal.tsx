"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { usePathname } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ChevronDown, X } from "lucide-react";
import { HERO_CTA } from "@/constants/site";

export type NavItem = { label: string; href: string };

type MobileMenuPortalProps = {
  isOpen: boolean;
  onClose: () => void;
  navItems: readonly NavItem[];
  areaItems?: readonly NavItem[];
  contactItems?: readonly NavItem[];
};

export function MobileMenuPortal({
  isOpen, onClose, navItems, areaItems = [], contactItems = [],
}: MobileMenuPortalProps) {
  const [mounted, setMounted] = useState(false);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const pathname = usePathname();
  const mobileNavItems = navItems.some((item) => item.href === "/")
    ? navItems : [{ label: "Home", href: "/" }, ...navItems];

  useEffect(() => setMounted(true), []);
  useEffect(() => {
    const dialog = dialogRef.current;
    if (!mounted || !dialog || !isOpen) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    dialog.showModal();
    return () => {
      dialog.close();
      document.body.style.overflow = previousOverflow;
    };
  }, [mounted, isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    const desktop = window.matchMedia("(min-width: 1024px)");
    const closeOnDesktop = () => { if (desktop.matches) onClose(); };
    closeOnDesktop();
    desktop.addEventListener("change", closeOnDesktop);
    return () => desktop.removeEventListener("change", closeOnDesktop);
  }, [isOpen, onClose]);

  if (!mounted) return null;

  const renderLink = (item: NavItem, compact = false) => (
    <Link href={item.href} onClick={onClose}
      aria-current={pathname === item.href ? "page" : undefined}
      className={`flex min-h-12 items-center rounded-xl px-4 transition hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--sandstone-sand-gold)] aria-[current=page]:bg-white/10 aria-[current=page]:text-[var(--sandstone-sand-gold)] ${compact ? "text-[15px] font-medium text-white/85" : "text-lg font-semibold text-white"}`}>
      {item.label}
    </Link>
  );

  const renderGroup = (label: string, items: readonly NavItem[], browse?: NavItem) => (
    <details className="group border-t border-white/15 py-2">
      <summary className="flex min-h-12 cursor-pointer list-none items-center justify-between rounded-xl px-4 text-lg font-semibold text-white hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--sandstone-sand-gold)] [&::-webkit-details-marker]:hidden">
        {label}
        <ChevronDown aria-hidden className="h-5 w-5 text-white/60 transition-transform group-open:rotate-180" />
      </summary>
      <ul className="ml-4 mt-1 border-l border-white/20 pl-2">
        {browse && <li>{renderLink(browse, true)}</li>}
        {items.map((item) => <li key={item.href}>{renderLink(item, true)}</li>)}
      </ul>
    </details>
  );

  return createPortal(
    <dialog ref={dialogRef} id="mobile-nav" aria-label="Mobile navigation" aria-modal="true"
      onCancel={(event) => { event.preventDefault(); onClose(); }}
      className="fixed inset-0 m-0 h-[100dvh] max-h-none w-full max-w-none border-0 bg-[var(--sandstone-navy)] p-0 text-white outline-none open:flex open:flex-col backdrop:bg-black/40">
      <div className="flex shrink-0 items-center justify-between border-b border-white/15 px-5 py-4"
        style={{ paddingTop: "max(1rem, env(safe-area-inset-top))" }}>
        <Link href="/" onClick={onClose} aria-label="Sandstone Real Estate Group - Home"
          className="rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--sandstone-sand-gold)]">
          <Image src="/mobile-header-logo.webp" alt="Sandstone Real Estate Group" width={40} height={40}
            className="h-10 w-10 object-contain brightness-0 invert" />
        </Link>
        <button type="button" onClick={onClose} autoFocus
          className="inline-flex min-h-11 items-center gap-2 rounded-full border border-white/30 px-4 text-sm font-semibold hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--sandstone-sand-gold)]">
          <span>Close</span><X aria-hidden className="h-5 w-5" />
        </button>
      </div>
      <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-5 py-5">
        <nav aria-label="Main" className="mx-auto max-w-lg">
          <ul className="mb-3 space-y-1">
            {mobileNavItems.map((item) => <li key={item.href}>{renderLink(item)}</li>)}
          </ul>
          {areaItems.length > 0 && renderGroup("Explore Areas", areaItems, { label: "View all areas", href: "/areas" })}
          {contactItems.length > 0 && renderGroup("Contact & Team", contactItems)}
        </nav>
      </div>
      <div className="shrink-0 border-t border-white/15 px-5 pt-4"
        style={{ paddingBottom: "max(1.25rem, env(safe-area-inset-bottom))" }}>
        <div className="mx-auto max-w-lg">
          <Link href="/#contact" onClick={onClose}
            className="flex min-h-12 w-full items-center justify-center rounded-full bg-[var(--sandstone-sand-gold)] px-4 py-3 text-center text-sm font-bold text-[var(--sandstone-navy)] hover:brightness-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white">
            {HERO_CTA}
          </Link>
          <p className="mt-3 text-center text-[11px] tracking-widest text-white/60">Luxury. Lifestyle. Legacy.</p>
        </div>
      </div>
    </dialog>, document.body
  );
}
