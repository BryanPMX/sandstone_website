"use client";

import Link from "next/link";
import { useActionState } from "react";

import {
  Mail,
  ArrowRight,
  CheckCircle2,
  AlertCircle,
  Loader2,
} from "lucide-react";

import { requestPasswordResetAction } from "@/actions/recovery";

type ForgotPasswordFormProps = {
  recoveryError: boolean;
};

export default function ForgotPasswordForm({
  recoveryError,
}: ForgotPasswordFormProps) {
  const [state, formAction, pending] = useActionState(
    requestPasswordResetAction,
    null,
  );

  return (
    <div>
      {recoveryError && !state && (
        <div
          role="alert"
          className="mb-6 flex gap-3 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-800"
        >
          <AlertCircle className="h-5 w-5 shrink-0" />

          <p>
            Your recovery link is invalid, expired, or could not be verified.
            Please request a new password reset link.
          </p>
        </div>
      )}

      {state?.success ? (
        <div
          role="status"
          className="rounded-xl border border-green-200 bg-green-50 p-5"
        >
          <div className="flex items-center gap-2 font-semibold text-green-800">
            <CheckCircle2 className="h-5 w-5" />
            Check your email
          </div>

          <p className="mt-3 text-sm leading-relaxed text-green-800">
            {state.message}
          </p>

          <p className="mt-3 text-sm leading-relaxed text-green-800">
            Open the recovery link using the same browser you used to request
            it. Check your spam folder if the email does not arrive.
          </p>

          <Link
            href="/login"
            className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-green-900 hover:underline"
          >
            Return to sign in
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      ) : (
        <form action={formAction} className="space-y-5">
          <div>
            <label
              htmlFor="email"
              className="mb-2 block text-sm font-medium text-[#14283F]"
            >
              Email address
            </label>

            <div className="relative">
              <Mail className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />

              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                maxLength={254}
                required
                disabled={pending}
                placeholder="you@example.com"
                className="w-full rounded-xl border border-slate-300 py-3.5 pl-12 pr-4 text-sm outline-none transition focus:border-[#A3834D] focus:ring-2 focus:ring-[#C9A66B]/20"
              />
            </div>
          </div>

          {state && !state.success && (
            <div
              role="alert"
              className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-800"
            >
              {state.message}
            </div>
          )}

          <button
            type="submit"
            disabled={pending}
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#14283F] px-5 py-4 text-sm font-semibold text-white transition hover:bg-[#203B57] disabled:cursor-not-allowed disabled:opacity-60"
          >
            {pending ? (
              <>
                <Loader2 className="h-5 w-5 animate-spin" />
                Sending reset link...
              </>
            ) : (
              <>
                Send reset link
                <ArrowRight className="h-4 w-4" />
              </>
            )}
          </button>
        </form>
      )}

      <p className="mt-6 text-center text-sm text-slate-600">
        Remember your password?{" "}
        <Link
          href="/login"
          className="font-semibold text-[#14283F] hover:underline"
        >
          Sign in
        </Link>
      </p>
    </div>
  );
}
