import { cookies } from "next/headers";
import LoginForm from "./LoginForm";

export const dynamic = "force-dynamic";

type LoginPageProps = {
  searchParams: Promise<{
    status?: string | string[];
    error?: string | string[];
  }>;
};

export default async function LoginPage({ searchParams }: LoginPageProps) {
  const params = await searchParams;
  const cookieStore = await cookies();

  const confirmed =
    params.status === "confirmed" &&
    cookieStore.get("sandstone_signup_confirmed")?.value === "1" &&
    !params.error;

  const errorMessages: Record<string, string> = {
    missing_code:
      "This confirmation link is incomplete or expired. If your email is already verified, please sign in.",
    auth_callback:
      "We could not complete the confirmation process. If your email is already verified, please sign in.",
    session_cleanup:
      "Your confirmation session could not be closed correctly. Please try signing in again.",
  };

  const callbackError =
    typeof params.error === "string"
      ? (errorMessages[params.error] ?? null)
      : null;

  return <LoginForm confirmed={confirmed} callbackError={callbackError} />;
}
