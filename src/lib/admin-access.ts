
import "server-only";

import { notFound } from "next/navigation";

/**
 * Temporarily restrict administrator application pages
 * until permanent server-side authorization is implemented.
 *
 * Administrator pages remain available during local
 * development but are unavailable in production.
 */
export function requireAdminDevelopmentAccess(): void {
  if (process.env.NODE_ENV !== "development") {
    notFound();
  }
}
