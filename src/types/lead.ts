/**
 * Lead form and submission contract.
 * Shared between validation (schemas), services, and actions.
 */

/** Validated lead payload sent to CRM */
export type LeadInput = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  message: string;
};

/** Result of submitLead Server Action */
export type SubmitLeadState =
  | { success: true; message?: string }
  | {
      success: false;
      error: string;
      fieldErrors?: Record<string, string[]>;
    };
