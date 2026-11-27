"use client";

import Link from "next/link";
import { useActionState, useState } from "react";

import {
  Eye,
  EyeOff,
  LockKeyhole,
  CheckCircle2,
  Circle,
  ArrowRight,
  AlertCircle,
  Loader2,
} from "lucide-react";

import { resetPasswordAction } from "@/actions/recovery";

export default function ResetPasswordForm() {
  const [state, formAction, pending] = useActionState(
    resetPasswordAction,
    null,
  );

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);

  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const requirements = [
    {
      label: "At least 12 characters",
      met: password.length >= 12,
    },
    {
      label: "One lowercase letter",
      met: /[a-z]/.test(password),
    },
    {
      label: "One uppercase letter",
      met: /[A-Z]/.test(password),
    },
    {
      label: "One number",
      met: /[0-9]/.test(password),
    },
    {
      label: "Passwords match",
      met: password.length > 0 && password === confirmPassword,
    },
  ];

  const valid =
    password.length <= 128 &&
    requirements.every((requirement) => requirement.met);

  if (state?.success) {
    return (
      <div
        role="status"
        className="rounded-xl border border-green-200 bg-green-50 p-5"
      >
        <div className="flex items-center gap-2 font-semibold text-green-800">
          <CheckCircle2 className="h-6 w-6" />
          Password successfully reset!
        </div>

        <p className="mt-3 text-sm leading-relaxed text-green-800">
          {state.message}
        </p>

        <Link
          href="/login"
          className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-[#14283F] px-5 py-4 text-sm font-semibold text-white hover:bg-[#203B57]"
        >
          Sign in to your account
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    );
  }

  return (
    <form action={formAction} className="space-y-5">
      <div>
        <label
          htmlFor="password"
          className="mb-2 block text-sm font-medium text-[#14283F]"
        >
          New password
        </label>

        <div className="relative">
          <LockKeyhole className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />

          <input
            id="password"
            name="password"
            type={showPassword ? "text" : "password"}
            autoComplete="new-password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            minLength={12}
            maxLength={128}
            required
            disabled={pending}
            placeholder="Create a strong password"
            className="w-full rounded-xl border border-slate-300 py-3.5 pl-12 pr-12 text-sm outline-none focus:border-[#A3834D] focus:ring-2 focus:ring-[#C9A66B]/20"
          />

          <button
            type="button"
            aria-label={showPassword ? "Hide password" : "Show password"}
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500"
          >
            {showPassword ? (
              <EyeOff className="h-5 w-5" />
            ) : (
              <Eye className="h-5 w-5" />
            )}
          </button>
        </div>
      </div>

      <div>
        <label
          htmlFor="confirmPassword"
          className="mb-2 block text-sm font-medium text-[#14283F]"
        >
          Confirm new password
        </label>

        <div className="relative">
          <LockKeyhole className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />

          <input
            id="confirmPassword"
            name="confirmPassword"
            type={showConfirmPassword ? "text" : "password"}
            autoComplete="new-password"
            value={confirmPassword}
            onChange={(event) => setConfirmPassword(event.target.value)}
            maxLength={128}
            required
            disabled={pending}
            placeholder="Confirm your password"
            className="w-full rounded-xl border border-slate-300 py-3.5 pl-12 pr-12 text-sm outline-none focus:border-[#A3834D] focus:ring-2 focus:ring-[#C9A66B]/20"
          />

          <button
            type="button"
            aria-label={
              showConfirmPassword
                ? "Hide confirmation password"
                : "Show confirmation password"
            }
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500"
          >
            {showConfirmPassword ? (
              <EyeOff className="h-5 w-5" />
            ) : (
              <Eye className="h-5 w-5" />
            )}
          </button>
        </div>
      </div>

      <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
        <p className="mb-3 text-sm font-semibold text-[#14283F]">
          Password requirements
        </p>

        <div className="space-y-2">
          {requirements.map((requirement) => (
            <div
              key={requirement.label}
              className={`flex items-center gap-2 text-xs ${
                requirement.met ? "text-green-700" : "text-slate-500"
              }`}
            >
              {requirement.met ? (
                <CheckCircle2 className="h-4 w-4" />
              ) : (
                <Circle className="h-4 w-4" />
              )}

              {requirement.label}
            </div>
          ))}
        </div>
      </div>

      {state && !state.success && (
        <div
          role="alert"
          className="flex gap-2 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-800"
        >
          <AlertCircle className="h-5 w-5 shrink-0" />
          {state.message}
        </div>
      )}

      <button
        type="submit"
        disabled={!valid || pending}
        className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#14283F] px-5 py-4 text-sm font-semibold text-white transition hover:bg-[#203B57] disabled:cursor-not-allowed disabled:opacity-50"
      >
        {pending ? (
          <>
            <Loader2 className="h-5 w-5 animate-spin" />
            Resetting password...
          </>
        ) : (
          <>
            Reset password
            <ArrowRight className="h-4 w-4" />
          </>
        )}
      </button>

      <p className="text-center text-xs leading-relaxed text-slate-500">
        Your recovery authorization expires 10 minutes after verification.
      </p>

      <Link
        href="/forgot-password"
        className="block text-center text-sm font-medium text-[#14283F] hover:underline"
      >
        Request a new recovery link
      </Link>
    </form>
  );
}
