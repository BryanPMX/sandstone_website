"use server";

import { z } from "zod";
import { redirect } from "next/navigation";
import {
  registerAccount,
  loginAccount,
  logoutAccount,
} from "@/lib/supabase/auth";

const TRUSTED_ORIGIN =
  process.env.NODE_ENV === "development"
    ? "http://localhost:3000"
    : "https://www.sandstone.homes";

type AuthState = {
  success: boolean;
  message: string;
} | null;

const loginSchema = z.object({
  email: z.string().trim().email().max(254),
  password: z.string().min(1).max(128),
});

const registerSchema = z
  .object({
    firstName: z.string().trim().min(1).max(100),
    lastName: z.string().trim().min(1).max(100),
    email: z.string().trim().email().max(254),
    password: z
      .string()
      .min(12)
      .max(128)
      .regex(/[a-z]/, "Password must contain a lowercase letter.")
      .regex(/[A-Z]/, "Password must contain an uppercase letter.")
      .regex(/[0-9]/, "Password must contain a number."),
    confirmPassword: z.string().max(128),
    interest: z.enum(["buying", "selling", "both", "browsing"]),
    terms: z.literal("on"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords must match.",
    path: ["confirmPassword"],
  });

export async function registerAction(
  _previousState: AuthState,
  formData: FormData,
): Promise<AuthState> {
  const parsed = registerSchema.safeParse({
    firstName: formData.get("firstName"),
    lastName: formData.get("lastName"),
    email: formData.get("email"),
    password: formData.get("password"),
    confirmPassword: formData.get("confirmPassword"),
    interest: formData.get("interest"),
    terms: formData.get("terms"),
  });

  if (!parsed.success) {
    return {
      success: false,
      message:
        "Check all fields, accept the terms, and ensure your passwords match and contain at least 12 characters, one lowercase letter, one uppercase letter, and one number.",
    };
  }

  const { error } = await registerAccount({
    firstName: parsed.data.firstName,
    lastName: parsed.data.lastName,
    email: parsed.data.email,
    password: parsed.data.password,
    interest: parsed.data.interest,
    callbackUrl: `${TRUSTED_ORIGIN}/auth/callback`,
  });

  if (error) {
    return {
      success: false,
      message: "Unable to complete registration. Please try again later.",
    };
  }

  return {
    success: true,
    message:
      "If registration is successful, check your email for confirmation instructions.",
  };
}

export async function loginAction(
  _previousState: AuthState,
  formData: FormData,
): Promise<AuthState> {
  const parsed = loginSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  });

  if (!parsed.success) {
    return {
      success: false,
      message: "Enter a valid email and password.",
    };
  }

  const { data, error } = await loginAccount(
    parsed.data.email,
    parsed.data.password,
  );

  if (
    error ||
    !data.user ||
    !data.session ||
    data.user.is_anonymous ||
    !data.user.email_confirmed_at
  ) {
    return {
      success: false,
      message:
        "Unable to sign in. Check your credentials and email verification.",
    };
  }

  redirect("/portal");
}

export async function logoutAction() {
  const { error } = await logoutAccount();

  if (error) {
    throw new Error("Unable to sign out.");
  }

  redirect("/login");
}
