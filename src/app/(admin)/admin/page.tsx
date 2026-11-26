
import type { Metadata } from "next";

import { requireAdminDevelopmentAccess } from "@/lib/admin-access";
import AdminClient from "./AdminClient";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Site Administration | Sandstone",
  robots: {
    index: false,
    follow: false,
    nocache: true,
  },
  referrer: "no-referrer",
};

export default function AdminPage() {
  requireAdminDevelopmentAccess();

  return <AdminClient />;
}
