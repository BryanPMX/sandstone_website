"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import {
  LayoutDashboard,
  Heart,
  Search,
  CalendarDays,
  Route,
  FolderClosed,
  MessageSquare,
  Bell,
  Settings,
  ArrowLeft,
  LogOut,
  Menu,
  X,
} from "lucide-react";

const navigation = [
  { label: "Overview", icon: LayoutDashboard, href: "/portal" },
  { label: "Saved Properties", icon: Heart },
  { label: "Find Properties", icon: Search, href: "/listings" },
  { label: "My Showings", icon: CalendarDays },
  { label: "My Journey", icon: Route },
  { label: "Documents", icon: FolderClosed },
  { label: "Messages", icon: MessageSquare },
  { label: "Notifications", icon: Bell },
  { label: "Settings", icon: Settings },
];

export default function PortalSidebar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      {/* MOBILE MENU BUTTON */}
      <button
        type="button"
        onClick={() => setMobileOpen(!mobileOpen)}
        aria-label={mobileOpen ? "Close portal menu" : "Open portal menu"}
        aria-expanded={mobileOpen}
        className="fixed left-4 top-4 z-[60] flex h-11 w-11 items-center justify-center rounded-xl bg-sandstone-navy text-white shadow-lg lg:hidden"
      >
        {mobileOpen ? <X size={22} /> : <Menu size={22} />}
      </button>

      {/* MOBILE OVERLAY */}
      {mobileOpen && (
        <button
          type="button"
          aria-label="Close navigation"
          onClick={() => setMobileOpen(false)}
          className="fixed inset-0 z-40 bg-black/40 lg:hidden"
        />
      )}

      {/* SIDEBAR */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 flex w-64 flex-col overflow-y-auto bg-sandstone-navy text-white transition-transform duration-300 lg:sticky lg:top-0 lg:h-screen lg:shrink-0 lg:translate-x-0 ${
          mobileOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* LOGO */}
        <div className="border-b border-white/10 px-6 pb-7 pt-16 lg:pt-8">
          <Link
            href="/portal"
            onClick={() => setMobileOpen(false)}
            className="flex justify-center"
          >
            <Image
              src="/desktop-hero-logo.webp"
              alt="Sandstone Real Estate Group"
              width={190}
              height={125}
              className="h-auto w-44 brightness-0 invert"
              priority
            />
          </Link>

          <p className="mt-5 text-center text-[10px] font-semibold uppercase tracking-[0.3em] text-sandstone-sand-gold">
            Client Portal
          </p>
        </div>

        {/* NAVIGATION */}
        <nav aria-label="Client portal navigation" className="flex-1 px-4 py-7">
          <p className="mb-4 px-3 text-[10px] font-semibold uppercase tracking-[0.2em] text-white/50">
            Workspace
          </p>

          <div className="space-y-1.5">
            {navigation.map(({ label, icon: Icon, href }) => {
              const active = href === "/portal";

              const className = `relative flex w-full items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium transition ${
                active
                  ? "bg-white/15 text-white"
                  : "text-white/70 hover:bg-white/10 hover:text-white"
              }`;

              return href ? (
                <Link
                  key={label}
                  href={href}
                  aria-current={active ? "page" : undefined}
                  onClick={() => setMobileOpen(false)}
                  className={className}
                >
                  {active && (
                    <span className="absolute bottom-2 left-0 top-2 w-1 rounded-r-full bg-sandstone-sand-gold" />
                  )}

                  <Icon
                    className={`h-[18px] w-[18px] ${
                      active ? "text-sandstone-sand-gold" : ""
                    }`}
                  />

                  {label}
                </Link>
              ) : (
                <button
                  key={label}
                  type="button"
                  disabled
                  title="Coming soon"
                  className="flex w-full cursor-not-allowed items-center gap-3 rounded-lg px-4 py-3 text-left text-sm font-medium text-white/50"
                >
                  <Icon className="h-[18px] w-[18px] shrink-0" />
                  {label}
                </button>
              );
            })}
          </div>
        </nav>

        {/* BOTTOM NAVIGATION */}
        <div className="space-y-2 border-t border-white/10 p-4">
          <Link
            href="/"
            className="flex items-center gap-3 rounded-lg px-4 py-3 text-sm text-white/70 transition hover:bg-white/10 hover:text-white"
          >
            <ArrowLeft className="h-[18px] w-[18px]" />
            Back to website
          </Link>

          <button
            type="button"
            disabled
            title="Authentication is not enabled yet"
            className="flex w-full cursor-not-allowed items-center gap-3 rounded-lg px-4 py-3 text-sm text-white/50"
          >
            <LogOut className="h-[18px] w-[18px]" />
            Sign out
          </button>

          <p className="px-4 pb-2 pt-3 text-[10px] leading-relaxed text-white/40">
            © {new Date().getFullYear()} Sandstone Real Estate Group
          </p>
        </div>
      </aside>
    </>
  );
}
