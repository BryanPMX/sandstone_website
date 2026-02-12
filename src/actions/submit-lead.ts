"use server";

import { LeadSchema } from "@/schemas";
import { getRoluWebhookUrl } from "@/config";
import { leadSubmissionService } from "@/services";
import type { SubmitLeadState } from "@/types";
import { zodIssuesToFieldErrors } from "@/lib/zod";

/**
 * Server Action: validate lead form, then submit to CRM (Rolu webhook).
 * Single responsibility: orchestrate validation + submission; delegates to schema and service.
 */
export async function submitLead(
  _prevState: SubmitLeadState | null,
  formData: FormData
): Promise<SubmitLeadState> {
  const raw = {
    firstName: formData.get("firstName") ?? "",
    lastName: formData.get("lastName") ?? "",
    email: formData.get("email") ?? "",
    phone: formData.get("phone") ?? "",
    message: formData.get("message") ?? "",
  };

  const parsed = LeadSchema.safeParse(raw);

  if (!parsed.success) {
    return {
      success: false,
      error: "Please fix the errors below.",
      fieldErrors: zodIssuesToFieldErrors(parsed.error.issues),
    };
  }

  const webhookUrl = getRoluWebhookUrl();

  if (!webhookUrl) {
    console.error("ROLU_WEBHOOK_URL is not set");
    return {
      success: false,
      error:
        "Lead submission is not configured. Please try again later.",
    };
  }

  const result = await leadSubmissionService.submit(parsed.data, webhookUrl);

  if (!result.ok) {
    return {
      success: false,
      error: result.error ?? "Something went wrong. Please try again later.",
    };
  }

  return { success: true, message: "Thank you. We'll be in touch soon." };
}
