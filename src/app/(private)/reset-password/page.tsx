import { redirect } from "next/navigation";

import RecoveryShell from "@/components/auth/RecoveryShell";

import {
  getAuthorizedRecoveryClient,
} from "@/lib/supabase/recovery";

import ResetPasswordForm from "./ResetPasswordForm";

export const dynamic = "force-dynamic";

export default async function ResetPasswordPage() {
  const supabase =
    await getAuthorizedRecoveryClient();

  if (!supabase) {
    redirect("/forgot-password?error=recovery");
  }

  return (
    <RecoveryShell
      title="Create a new password"
      description="Choose a strong password to secure your Sandstone Client Portal account."
    >
      <ResetPasswordForm />
    </RecoveryShell>
  );
}