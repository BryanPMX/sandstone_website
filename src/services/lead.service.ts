import type { LeadInput } from "@/types";

/**
 * Result of submitting a lead to an external endpoint.
 */
export interface LeadSubmissionResult {
  ok: boolean;
  error?: string;
}

/**
 * Abstraction for sending leads to a CRM/webhook.
 * Allows swapping implementation (e.g. Rolu, HubSpot) without changing the action.
 * Dependency Inversion: action depends on this contract, not on fetch directly.
 */
export interface ILeadSubmissionService {
  submit(payload: LeadInput, webhookUrl: string): Promise<LeadSubmissionResult>;
}

/**
 * Default implementation: POST payload to the given webhook URL.
 */
async function submitToWebhook(
  payload: LeadInput,
  webhookUrl: string
): Promise<LeadSubmissionResult> {
  console.log("[LeadService] Submitting webhook for form type:", payload.formType);
  console.log("[LeadService] Payload:", JSON.stringify(payload, null, 2));
  
  const res = await fetch(webhookUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  console.log("[LeadService] Webhook response status:", res.status);

  if (!res.ok) {
    const text = await res.text();
    console.error("[LeadService] webhook error:", res.status, text);
    return {
      ok: false,
      error:
        "We couldn't send your message. Please try again or contact us directly.",
    };
  }

  console.log("[LeadService] Webhook submitted successfully");
  return { ok: true };
}

/**
 * Default lead submission service (Rolu webhook).
 * Can be replaced with a different implementation for testing or another CRM.
 */
export const leadSubmissionService: ILeadSubmissionService = {
  submit: submitToWebhook,
};
