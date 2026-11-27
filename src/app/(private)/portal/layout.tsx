import type { Metadata } from "next";
import type { ReactNode } from "react";
import { getPortalProfile } from "@/lib/supabase/profile";
import PortalSidebar from "@/components/portal/PortalSidebar";
import PortalHeader from "@/components/portal/PortalHeader";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Client Portal | Sandstone Real Estate Group",
  description: "Your personalized Sandstone real estate dashboard.",
  robots: {
    index: false,
    follow: false,
  },
};

export default async function PortalLayout({
  children,
}: {
  children: ReactNode;
}) {
  const profile = await getPortalProfile();

  return (
    <div className="flex min-h-screen bg-sandstone-off-white">
      <PortalSidebar />

      <div className="flex min-w-0 flex-1 flex-col">
        <PortalHeader
          fullName={profile.fullName}
          email={profile.email}
          initials={profile.initials}
        />

        <main className="flex-1 p-4 sm:p-6 lg:p-8">
          <div className="mx-auto max-w-[1600px]">{children}</div>
        </main>

        <footer className="border-t border-gray-200 px-6 py-5 text-center text-xs text-gray-500">
          Sandstone Real Estate Group &mdash; Luxury. Lifestyle. Legacy.
        </footer>
      </div>
    </div>
  );
}
