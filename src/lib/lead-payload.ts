import type { LeadFormFields, LeadFormType, LeadWebhookPayload } from "@/types";

function normalizeText(value: string | undefined): string | undefined {
  const normalized = value?.trim();
  return normalized ? normalized : undefined;
}

/**
 * Builds an explicit per-form payload contract for ROLU webhooks.
 * This avoids sending irrelevant fields to workflows that do not use them.
 */
export function buildLeadWebhookPayload(
  formType: LeadFormType,
  fields: LeadFormFields
): LeadWebhookPayload {
  const base = {
    formType,
    firstName: fields.firstName.trim(),
    lastName: fields.lastName.trim(),
    email: fields.email.trim(),
    phone: fields.phone.trim(),
  } as const;

  const address = normalizeText(fields.address);
  const message = normalizeText(fields.message);

  switch (formType) {
    case "contact":
      return {
        ...base,
        formType: "contact",
        message: message ?? "",
      };
    case "sell":
      if (!address) {
        throw new Error("Sell form payload requires address.");
      }
      return {
        ...base,
        formType: "sell",
        address,
        message: message ?? "",
      };
    case "rent":
      if (!address) {
        throw new Error("Rent form payload requires address.");
      }
      return {
        ...base,
        formType: "rent",
        address,
        message: message ?? "",
      };
    case "join":
      return {
        ...base,
        formType: "join",
      };
    default: {
      const exhaustiveCheck: never = formType;
      throw new Error(`Unsupported form type: ${exhaustiveCheck}`);
    }
  }
}
