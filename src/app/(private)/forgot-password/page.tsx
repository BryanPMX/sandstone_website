import RecoveryShell from "@/components/auth/RecoveryShell";
import ForgotPasswordForm from "./ForgotPasswordForm";

export const dynamic = "force-dynamic";

type ForgotPasswordPageProps = {
  searchParams: Promise<{
    error?: string | string[];
  }>;
};

export default async function ForgotPasswordPage({
  searchParams,
}: ForgotPasswordPageProps) {
  const params = await searchParams;

  const recoveryError = params.error === "recovery";

  return (
    <RecoveryShell
      title="Forgot your password?"
      description="No worries. Enter the email address associated with your account to request a password reset link."
    >
      <ForgotPasswordForm recoveryError={recoveryError} />
    </RecoveryShell>
  );
}
