"use client";

import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  Mail,
  ShieldCheck,
  KeyRound,
  LockKeyhole,
} from "lucide-react";

export default function ForgotPasswordPage() {
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
              Your account. Your peace of mind.
            </p>

            <h1 className="max-w-xl text-4xl font-bold leading-tight text-white xl:text-6xl">
              Let&apos;s get you back on track.
            </h1>

            <p className="mt-6 max-w-md text-base leading-relaxed text-white/80">
              Your real estate journey doesn&apos;t have to wait. Recover access
              to your Sandstone account and pick up right where you left off.
            </p>

            <div className="mt-10 space-y-5">
              {[
                {
                  icon: ShieldCheck,
                  label: "Secure account recovery",
                },
                {
                  icon: Mail,
                  label: "Password reset through your email",
                },
                {
                  icon: LockKeyhole,
                  label: "Your personal information stays protected",
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

        {/* RIGHT SIDE — PASSWORD RECOVERY */}
        <section className="relative flex min-h-screen flex-col px-6 py-8 sm:px-12 lg:px-16">
          <Link
            href="/login"
            className="inline-flex w-fit items-center gap-2 text-sm font-semibold text-sandstone-navy transition hover:opacity-70"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to sign in
          </Link>

          <div className="mx-auto flex w-full max-w-md flex-1 flex-col justify-center py-12">
            {/* MOBILE LOGO */}
            <div className="mb-8 lg:hidden">
              <Image
                src="/mobile-header-logo-navy.webp"
                alt="Sandstone Real Estate Group"
                width={70}
                height={70}
                className="object-contain"
              />
            </div>

            {/* RECOVERY ICON */}
            <div className="mb-7 flex h-16 w-16 items-center justify-center rounded-2xl border border-sandstone-sand-gold/30 bg-sandstone-sand-gold/10">
              <KeyRound className="h-7 w-7 text-sandstone-navy" />
            </div>

            <p className="mb-3 text-xs font-bold uppercase tracking-[0.25em] text-sandstone-bronze">
              Sandstone Client Portal
            </p>

            <h2 className="text-3xl font-bold tracking-tight text-sandstone-navy sm:text-4xl">
              Forgot your password?
            </h2>

            <p className="mt-4 text-sm leading-relaxed text-gray-500">
              No worries. Enter the email address associated with your account
              to request a password reset link.
            </p>

            <form
              className="mt-9 space-y-6"
              onSubmit={(event) => event.preventDefault()}
            >
              {/* EMAIL ADDRESS */}
              <div>
                <label
                  htmlFor="email"
                  className="mb-2 block text-sm font-semibold text-sandstone-charcoal"
                >
                  Email address
                </label>

                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />

                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    placeholder="you@example.com"
                    required
                    className="h-14 w-full rounded-xl border border-gray-200 bg-white pl-12 pr-4 text-sm outline-none transition focus:border-sandstone-sand-gold focus:ring-2 focus:ring-sandstone-sand-gold/20"
                  />
                </div>
              </div>

              {/* RESET BUTTON */}
              <button
                type="submit"
                disabled
                className="flex h-14 w-full cursor-not-allowed items-center justify-center gap-3 rounded-xl bg-sandstone-navy text-sm font-semibold text-white opacity-80"
              >
                Send reset link
                <ArrowRight className="h-4 w-4" />
              </button>

              <p className="text-center text-xs text-gray-500">
                Preview only — password recovery is not enabled yet.
              </p>
            </form>

            {/* SECURITY INFORMATION */}
            <div className="mt-8 flex items-start gap-3 rounded-xl border border-gray-200 bg-white/60 p-4">
              <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-sandstone-bronze" />

              <div>
                <p className="text-xs font-semibold text-sandstone-navy">
                  Your security matters
                </p>

                <p className="mt-1 text-xs leading-relaxed text-gray-500">
                  Never share your password or password reset link with anyone.
                  Sandstone will never ask you to provide your password
                  directly.
                </p>
              </div>
            </div>

            <div className="mt-8 text-center text-sm text-gray-500">
              Remember your password?{" "}
              <Link
                href="/login"
                className="font-semibold text-sandstone-navy hover:underline"
              >
                Sign in
              </Link>
            </div>
          </div>

          {/* FOOTER */}
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
