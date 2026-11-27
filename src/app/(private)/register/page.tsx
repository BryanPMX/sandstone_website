
"use client";

import Image from "next/image";
import Link from "next/link";
import { useActionState, useState } from "react";
import { registerAction } from "@/actions/auth";
import {
  ArrowLeft,
  ArrowRight,
  Eye,
  EyeOff,
  Heart,
  CalendarDays,
  MessageSquare,
  CheckCircle2,
} from "lucide-react";

export default function RegisterPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [state, formAction, pending] = useActionState(
    registerAction,
    null
  );

  const requirements = [
    {
      label: "At least 12 characters",
      valid: password.length >= 12,
    },
    {
      label: "One lowercase letter",
      valid: /[a-z]/.test(password),
    },
    {
      label: "One uppercase letter",
      valid: /[A-Z]/.test(password),
    },
    {
      label: "One number",
      valid: /[0-9]/.test(password),
    },
    {
      label: "Passwords match",
      valid: password.length > 0 && password === confirmPassword,
    },
  ];

  const passwordValid = requirements.every(
    (requirement) => requirement.valid
  );

  const inputClass =
    "h-12 w-full rounded-xl border border-gray-200 bg-white px-4 text-sm outline-none transition focus:border-sandstone-sand-gold focus:ring-2 focus:ring-sandstone-sand-gold/20 disabled:opacity-60";

  const labelClass =
    "mb-2 block text-sm font-semibold text-sandstone-charcoal";

  return (
    <main className="min-h-screen bg-sandstone-off-white">
      <div className="grid min-h-screen lg:grid-cols-2">
        {/* LEFT SIDE — BRANDING */}
        <section className="relative hidden overflow-hidden bg-sandstone-navy lg:flex lg:flex-col lg:justify-between">
          <Image
            src="/hero-home.webp"
            alt="Beautiful residential property"
            fill
            sizes="(min-width: 1024px) 50vw, 100vw"
            priority
            className="object-cover"
          />

          <div className="absolute inset-0 bg-gradient-to-br from-[#1d2858]/95 via-[#253471]/85 to-[#1d2858]/70" />

          <div className="relative z-10 p-12 xl:p-16">
            <Link href="/" aria-label="Sandstone home">
              <Image
                src="/desktop-hero-logo.webp"
                alt="Sandstone Real Estate Group"
                width={210}
                height={140}
                className="h-auto w-48 brightness-0 invert"
                priority
              />
            </Link>
          </div>

          <div className="relative z-10 px-12 pb-12 xl:px-16">
            <div className="mb-6 h-1 w-14 bg-sandstone-sand-gold" />

            <p className="mb-5 text-xs font-semibold uppercase tracking-[0.3em] text-sandstone-sand-gold">
              Begin your real estate journey
            </p>

            <h1 className="max-w-xl text-4xl font-bold leading-tight text-white xl:text-6xl">
              A better way to find home.
            </h1>

            <p className="mt-6 max-w-md text-base leading-relaxed text-white/80">
              Create your personal Sandstone account and discover a more
              connected, personalized real estate experience.
            </p>

            <div className="mt-10 space-y-5">
              {[
                {
                  icon: Heart,
                  label: "Discover and save your favorite homes",
                },
                {
                  icon: CalendarDays,
                  label: "Request and manage property showings",
                },
                {
                  icon: MessageSquare,
                  label: "Connect with your Sandstone agent",
                },
              ].map(({ icon: Icon, label }) => (
                <div
                  key={label}
                  className="flex items-center gap-4 text-sm text-white/90"
                >
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-white/15 bg-white/10">
                    <Icon className="h-5 w-5 text-sandstone-sand-gold" />
                  </div>

                  {label}
                </div>
              ))}
            </div>
          </div>

          <div className="relative z-10 border-t border-white/10 px-12 py-6 xl:px-16">
            <p className="text-xs uppercase tracking-[0.2em] text-white/60">
              Luxury. Lifestyle. Legacy.
            </p>
          </div>
        </section>

        {/* RIGHT SIDE — REGISTRATION */}
        <section className="relative flex min-h-screen flex-col px-6 py-8 sm:px-12 lg:px-16">
          <Link
            href="/login"
            className="inline-flex w-fit items-center gap-2 text-sm font-semibold text-sandstone-navy transition hover:opacity-70"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to sign in
          </Link>

          <div className="mx-auto flex w-full max-w-md flex-1 flex-col justify-center py-8">
            {/* MOBILE LOGO */}
            <div className="mb-6 lg:hidden">
              <Image
                src="/mobile-header-logo-navy.webp"
                alt="Sandstone Real Estate Group"
                width={70}
                height={70}
                className="object-contain"
              />
            </div>

            <p className="mb-3 text-xs font-bold uppercase tracking-[0.25em] text-sandstone-bronze">
              Sandstone Client Portal
            </p>

            <h2 className="text-3xl font-bold tracking-tight text-sandstone-navy sm:text-4xl">
              Create your account.
            </h2>

            <p className="mt-3 text-sm leading-relaxed text-gray-500">
              Your personalized real estate experience begins here.
            </p>

            {state?.success ? (
              <div
                role="status"
                className="mt-8 rounded-2xl border border-green-200 bg-green-50 p-6"
              >
                <CheckCircle2 className="mb-4 h-10 w-10 text-green-700" />

                <h3 className="text-xl font-bold text-green-900">
                  Check your email
                </h3>

                <p className="mt-3 text-sm leading-relaxed text-green-800">
                  {state.message}
                </p>

                <p className="mt-3 text-sm leading-relaxed text-green-800">
                  If you receive a confirmation email, follow the
                  instructions to verify your account. Remember to check
                  your spam or junk folder.
                </p>

                <Link
                  href="/login"
                  className="mt-6 flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-sandstone-navy text-sm font-semibold text-white transition hover:opacity-90"
                >
                  Continue to sign in
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            ) : (
              <form
                action={formAction}
                className="mt-7 space-y-5"
                aria-busy={pending}
              >
                {/* NAME */}
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div>
                    <label htmlFor="firstName" className={labelClass}>
                      First name
                    </label>

                    <input
                      id="firstName"
                      name="firstName"
                      type="text"
                      autoComplete="given-name"
                      placeholder="First name"
                      required
                      maxLength={100}
                      disabled={pending}
                      className={inputClass}
                    />
                  </div>

                  <div>
                    <label htmlFor="lastName" className={labelClass}>
                      Last name
                    </label>

                    <input
                      id="lastName"
                      name="lastName"
                      type="text"
                      autoComplete="family-name"
                      placeholder="Last name"
                      required
                      maxLength={100}
                      disabled={pending}
                      className={inputClass}
                    />
                  </div>
                </div>

                {/* EMAIL */}
                <div>
                  <label htmlFor="email" className={labelClass}>
                    Email address
                  </label>

                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    placeholder="you@example.com"
                    required
                    maxLength={254}
                    disabled={pending}
                    className={inputClass}
                  />
                </div>

                {/* REAL ESTATE INTEREST */}
                <div>
                  <label htmlFor="interest" className={labelClass}>
                    I&apos;m interested in
                  </label>

                  <select
                    id="interest"
                    name="interest"
                    defaultValue=""
                    required
                    disabled={pending}
                    className={inputClass}
                  >
                    <option value="" disabled>
                      Select your real estate goals
                    </option>
                    <option value="buying">Buying a home</option>
                    <option value="selling">Selling a home</option>
                    <option value="both">Buying and selling</option>
                    <option value="browsing">Just browsing</option>
                  </select>
                </div>

                {/* PASSWORD */}
                <div>
                  <label htmlFor="password" className={labelClass}>
                    Password
                  </label>

                  <div className="relative">
                    <input
                      id="password"
                      name="password"
                      type={showPassword ? "text" : "password"}
                      autoComplete="new-password"
                      placeholder="Create a password"
                      value={password}
                      onChange={(event) =>
                        setPassword(event.target.value)
                      }
                      required
                      minLength={12}
                      maxLength={128}
                      disabled={pending}
                      className={`${inputClass} pr-12`}
                    />

                    <button
                      type="button"
                      aria-label={
                        showPassword ? "Hide password" : "Show password"
                      }
                      aria-pressed={showPassword}
                      disabled={pending}
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-sandstone-navy"
                    >
                      {showPassword ? (
                        <EyeOff className="h-5 w-5" />
                      ) : (
                        <Eye className="h-5 w-5" />
                      )}
                    </button>
                  </div>
                </div>

                {/* CONFIRM PASSWORD */}
                <div>
                  <label htmlFor="confirmPassword" className={labelClass}>
                    Confirm password
                  </label>

                  <div className="relative">
                    <input
                      id="confirmPassword"
                      name="confirmPassword"
                      type={showConfirmPassword ? "text" : "password"}
                      autoComplete="new-password"
                      placeholder="Confirm your password"
                      value={confirmPassword}
                      onChange={(event) =>
                        setConfirmPassword(event.target.value)
                      }
                      required
                      maxLength={128}
                      disabled={pending}
                      className={`${inputClass} pr-12`}
                    />

                    <button
                      type="button"
                      aria-label={
                        showConfirmPassword
                          ? "Hide confirmed password"
                          : "Show confirmed password"
                      }
                      aria-pressed={showConfirmPassword}
                      disabled={pending}
                      onClick={() =>
                        setShowConfirmPassword(!showConfirmPassword)
                      }
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-sandstone-navy"
                    >
                      {showConfirmPassword ? (
                        <EyeOff className="h-5 w-5" />
                      ) : (
                        <Eye className="h-5 w-5" />
                      )}
                    </button>
                  </div>
                </div>

                {/* PASSWORD REQUIREMENTS */}
                <div className="rounded-xl border border-gray-200 bg-white/60 p-4">
                  <p className="mb-3 text-xs font-semibold text-sandstone-navy">
                    Password requirements
                  </p>

                  <div
                    className="grid grid-cols-1 gap-2 sm:grid-cols-2"
                    aria-live="polite"
                  >
                    {requirements.map((requirement) => (
                      <div
                        key={requirement.label}
                        className={`flex items-center gap-2 text-xs ${
                          requirement.valid
                            ? "text-green-700"
                            : "text-gray-500"
                        }`}
                      >
                        <CheckCircle2 className="h-4 w-4 shrink-0" />

                        <span>
                          {requirement.label}
                          {requirement.valid ? " ✓" : ""}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* TERMS */}
                <div className="flex items-start gap-3">
                  <input
                    id="terms"
                    name="terms"
                    type="checkbox"
                    value="on"
                    required
                    disabled={pending}
                    className="mt-1 h-4 w-4 shrink-0 accent-[#253471]"
                  />

                  <div className="text-xs leading-relaxed text-gray-500">
                    <label htmlFor="terms">
                      I agree to Sandstone&apos;s
                    </label>{" "}
                    <Link
                      href="/terms-and-conditions"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-semibold text-sandstone-navy hover:underline"
                    >
                      Terms & Conditions
                    </Link>{" "}
                    and{" "}
                    <Link
                      href="/privacy-policy"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-semibold text-sandstone-navy hover:underline"
                    >
                      Privacy Policy
                    </Link>
                    .
                  </div>
                </div>

                {/* REGISTRATION ERROR */}
                {state && !state.success && (
                  <div
                    role="alert"
                    className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
                  >
                    {state.message}
                  </div>
                )}

                {/* CREATE ACCOUNT */}
                <button
                  type="submit"
                  disabled={pending || !passwordValid}
                  className="flex h-14 w-full items-center justify-center gap-3 rounded-xl bg-sandstone-navy text-sm font-semibold text-white transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {pending ? "Creating account..." : "Create account"}

                  {pending ? (
                    <span
                      aria-hidden="true"
                      className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white"
                    />
                  ) : (
                    <ArrowRight className="h-4 w-4" />
                  )}
                </button>

                <p className="text-center text-xs text-gray-500">
                  Email verification is required to activate your account.
                </p>
              </form>
            )}

            <div className="mt-7 text-center text-sm text-gray-500">
              Already have an account?{" "}
              <Link
                href="/login"
                className="font-semibold text-sandstone-navy hover:underline"
              >
                Sign in
              </Link>
            </div>
          </div>

          <footer className="border-t border-gray-200 pt-6 text-center">
            <p className="text-xs text-gray-500">
              © {new Date().getFullYear()} Sandstone Real Estate Group.
            </p>

            <div className="mt-3 flex justify-center gap-5 text-xs text-gray-500">
              <Link
                href="/privacy-policy"
                className="hover:text-sandstone-navy"
              >
                Privacy Policy
              </Link>

              <Link
                href="/terms-and-conditions"
                className="hover:text-sandstone-navy"
              >
                Terms & Conditions
              </Link>
            </div>
          </footer>
        </section>
      </div>
    </main>
  );
}
