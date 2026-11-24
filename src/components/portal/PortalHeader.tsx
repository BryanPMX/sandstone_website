import { Bell, ChevronDown } from "lucide-react";

export default function PortalHeader() {
  return (
    <header className="sticky top-0 z-30 flex min-h-[76px] items-center justify-between gap-4 border-b border-gray-200 bg-white px-5 pl-20 sm:px-8 sm:pl-20 lg:pl-8">
      {/* PAGE TITLE */}
      <div>
        <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-sandstone-bronze">
          Client Portal
        </p>

        <h1 className="mt-1 text-lg font-bold text-sandstone-navy">Overview</h1>
      </div>

      {/* ACCOUNT CONTROLS */}
      <div className="flex items-center gap-3 sm:gap-5">
        {/* NOTIFICATIONS */}
        <button
          type="button"
          disabled
          aria-label="Notifications — coming soon"
          className="relative flex h-10 w-10 cursor-not-allowed items-center justify-center rounded-xl border border-gray-200 text-sandstone-navy"
        >
          <Bell className="h-5 w-5" />

          <span className="absolute right-2 top-2 h-2 w-2 rounded-full border border-white bg-sandstone-gold" />
        </button>

        <div className="hidden h-9 w-px bg-gray-200 sm:block" />

        {/* CLIENT PROFILE */}
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#eee4d9] text-sm font-bold text-sandstone-navy">
            JD
          </div>

          <div className="hidden sm:block">
            <p className="text-sm font-semibold text-sandstone-navy">
              Jordan Davis
            </p>

            <p className="mt-0.5 text-xs text-gray-500">Preview account</p>
          </div>

          <ChevronDown className="hidden h-4 w-4 text-gray-400 sm:block" />
        </div>
      </div>
    </header>
  );
}
