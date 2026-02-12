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
  const res = await fetch(webhookUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    const text = await res.text();
    console.error("[LeadService] webhook error:", res.status, text);
    return {
      ok: false,
      error:
        "We couldn't send your message. Please try again or contact us directly.",
    };
  }

  return { ok: true };
}

/**
 * Default lead submission service (Rolu webhook).
 * Can be replaced with a different implementation for testing or another CRM.
 */
export const leadSubmissionService: ILeadSubmissionService = {
  submit: submitToWebhook,
};
