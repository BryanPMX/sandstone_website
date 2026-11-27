import { Bell } from "lucide-react";

type PortalHeaderProps = {
  fullName: string;
  email: string;
  initials: string;
};

export default function PortalHeader({
  fullName,
  email,
  initials,
}: PortalHeaderProps) {
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
      <div className="flex min-w-0 items-center gap-3 sm:gap-5">
        {/* NOTIFICATIONS */}
        <button
          type="button"
          disabled
          aria-label="Notifications — coming soon"
          title="Notifications coming soon"
          className="flex h-10 w-10 shrink-0 cursor-not-allowed items-center justify-center rounded-xl border border-gray-200 text-sandstone-navy opacity-60"
        >
          <Bell className="h-5 w-5" />
        </button>

        <div className="hidden h-9 w-px bg-gray-200 sm:block" />

        {/* CLIENT PROFILE */}
        <div className="flex min-w-0 items-center gap-3">
          <div
            aria-label={fullName}
            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#eee4d9] text-sm font-bold text-sandstone-navy"
          >
            {initials}
          </div>

          <div className="hidden min-w-0 max-w-[240px] sm:block">
            <p
              title={fullName}
              className="truncate text-sm font-semibold text-sandstone-navy"
            >
              {fullName}
            </p>

            <p title={email} className="mt-0.5 truncate text-xs text-gray-500">
              {email || "Client account"}
            </p>
          </div>
        </div>
      </div>
    </header>
  );
}
