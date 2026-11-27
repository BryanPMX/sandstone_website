"use server";

import { z } from "zod";

import {
  createRecoveryClient,
  getAuthorizedRecoveryClient,
  clearRecoveryStorage,
  RECOVERY_ORIGIN,
} from "@/lib/supabase/recovery";

import { clearRecoveryAuthorization } from "@/lib/supabase/recovery-authorization";

type RecoveryState = {
  success: boolean;
  message: string;
} | null;

const emailSchema = z.string().trim().email().max(254);

const passwordSchema = z
  .object({
    password: z
      .string()
      .min(12)
      .max(128)
      .regex(/[a-z]/)
      .regex(/[A-Z]/)
      .regex(/[0-9]/),

    confirmPassword: z.string().max(128),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords must match.",
    path: ["confirmPassword"],
  });

const GENERIC_RECOVERY_MESSAGE =
  "If an account exists for that email address, you will receive instructions to reset your password.";

export async function requestPasswordResetAction(
  _previousState: RecoveryState,
  formData: FormData,
): Promise<RecoveryState> {
  const parsed = emailSchema.safeParse(formData.get("email"));

  if (!parsed.success) {
    return {
      success: false,
      message: "Enter a valid email address.",
    };
  }

  try {
    await clearRecoveryAuthorization();
    await clearRecoveryStorage();

    const supabase = await createRecoveryClient();

    const { error } = await supabase.auth.resetPasswordForEmail(
      parsed.data.toLowerCase(),
      {
        redirectTo: `${RECOVERY_ORIGIN}/auth/recovery`,
      },
    );

    if (error) {
      await clearRecoveryStorage();
    }
  } catch {
    // Keep the public response generic.
  }

  return {
    success: true,
    message: GENERIC_RECOVERY_MESSAGE,
  };
}

export async function resetPasswordAction(
  _previousState: RecoveryState,
  formData: FormData,
): Promise<RecoveryState> {
  const parsed = passwordSchema.safeParse({
    password: formData.get("password"),
    confirmPassword: formData.get("confirmPassword"),
  });

  if (!parsed.success) {
    return {
      success: false,
      message:
        "Passwords must match and contain at least 12 characters, one lowercase letter, one uppercase letter, and one number.",
    };
  }

  const supabase = await getAuthorizedRecoveryClient();

  if (!supabase) {
    return {
      success: false,
      message:
        "Your recovery session is invalid or expired. Please request a new password reset link.",
    };
  }

  try {
    const { error } = await supabase.auth.updateUser({
      password: parsed.data.password,
    });

    if (error) {
      return {
        success: false,
        message:
          "Unable to reset your password. Try a different password or request a new recovery link.",
      };
    }
  } catch {
    return {
      success: false,
      message:
        "Unable to confirm the password update. Try signing in or request a new recovery link.",
    };
  }

  await clearRecoveryAuthorization();

  let sessionsRevoked = false;

  try {
    const { error } = await supabase.auth.signOut({
      scope: "global",
    });

    sessionsRevoked = !error;
  } catch {
    sessionsRevoked = false;
  } finally {
    await clearRecoveryStorage();
  }

  return {
    success: true,
    message: sessionsRevoked
      ? "Your password has been successfully reset. Please sign in with your new password."
      : "Your password has been reset, but we could not confirm that all existing sessions were revoked. Please sign in and contact Sandstone support if needed.",
  };
}
