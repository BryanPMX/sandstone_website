/**
 * Lead form and submission contract.
 * Shared between validation (schemas), services, and actions.
 */

/** Shared user-entered fields collected across lead forms */
export type LeadFormFields = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address?: string;
  message?: string;
};

/** Supported lead capture form variants across the site */
export type LeadFormType = "contact" | "sell" | "rent" | "join";

type LeadWebhookPayloadBase = {
  formType: LeadFormType;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
};

export type ContactLeadWebhookPayload = LeadWebhookPayloadBase & {
  formType: "contact";
  message: string;
};

export type SellLeadWebhookPayload = LeadWebhookPayloadBase & {
  formType: "sell";
  address: string;
  message: string;
};

export type RentLeadWebhookPayload = LeadWebhookPayloadBase & {
  formType: "rent";
  address: string;
  message: string;
};

export type JoinLeadWebhookPayload = LeadWebhookPayloadBase & {
  formType: "join";
};

/** Explicit per-form payload contract sent to ROLU webhooks */
export type LeadWebhookPayload =
  | ContactLeadWebhookPayload
  | SellLeadWebhookPayload
  | RentLeadWebhookPayload
  | JoinLeadWebhookPayload;

/** Backward-compatible alias used by services */
export type LeadInput = LeadWebhookPayload;

/** Result of submitLead Server Action */
export type SubmitLeadState =
  | { success: true; message?: string }
  | {
      success: false;
      error: string;
      fieldErrors?: Record<string, string[]>;
    };
