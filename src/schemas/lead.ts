import { z } from "zod";

/**
 * Single source of truth for lead form validation.
 * Used by Server Action and can be reused for client-side validation.
 */
export const LeadSchema = z.object({
  firstName: z.string().min(1, "First name is required").max(100),
  lastName: z.string().min(1, "Last name is required").max(100),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(1, "Phone is required").max(30),
  message: z.string().max(2000).optional().default(""),
});

export type LeadSchemaType = z.infer<typeof LeadSchema>;
