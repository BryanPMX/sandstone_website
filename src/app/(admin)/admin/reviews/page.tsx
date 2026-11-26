
import Link from "next/link";
import type { Metadata } from "next";

import { requireAdminDevelopmentAccess } from "@/lib/admin-access";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Review Management | Sandstone",
  robots: {
    index: false,
    follow: false,
    nocache: true,
  },
  referrer: "no-referrer",
};

export default function AdminReviewsPage() {
  requireAdminDevelopmentAccess();

  return (
    <div className="container mx-auto max-w-2xl px-4 py-12">
      <h1 className="text-2xl font-bold">
        Review Management
      </h1>

      <p className="mt-2 text-sm text-gray-600">
        Manage Sandstone customer reviews.
      </p>

      <div
        role="status"
        className="mt-6 rounded-lg border border-amber-200 bg-amber-50 p-5"
      >
        <h2 className="font-semibold text-amber-900">
          Temporarily unavailable
        </h2>

        <p className="mt-2 text-sm text-amber-900">
          Review submissions are disabled while
          administrator security is being upgraded.
        </p>

        <p className="mt-2 text-sm text-amber-900">
          Existing published reviews are unaffected.
        </p>
      </div>

      <div className="mt-6">
        <Link
          href="/admin"
          className="inline-block rounded bg-[var(--sandstone-navy)] px-4 py-2 text-white"
        >
          Return to Site Admin
        </Link>
      </div>
    </div>
  );
}
