import type { z } from "zod";

/**
 * Maps Zod error issues to a record of field names → error messages.
 * Single responsibility: transform validation errors for UI consumption.
 */
export function zodIssuesToFieldErrors(
  issues: z.ZodIssue[]
): Record<string, string[]> {
  const fieldErrors: Record<string, string[]> = {};
  for (const issue of issues) {
    const path = issue.path[0] as string;
    if (!fieldErrors[path]) fieldErrors[path] = [];
    fieldErrors[path].push(issue.message);
  }
  return fieldErrors;
}
