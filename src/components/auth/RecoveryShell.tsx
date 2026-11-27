import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";

import { ArrowLeft, ShieldCheck, KeyRound, LockKeyhole } from "lucide-react";

type RecoveryShellProps = {
  title: string;
  description: string;
  children: ReactNode;
};

export default function RecoveryShell({
  title,
  description,
  children,
}: RecoveryShellProps) {
  return (
    <main className="min-h-screen bg-white lg:grid lg:grid-cols-2">
      <section className="relative hidden min-h-screen overflow-hidden bg-[#14283F] text-white lg:flex lg:flex-col">
        <Image
          src="/hero-home.webp"
          alt=""
          fill
          priority
          sizes="50vw"
          className="object-cover"
        />

        <div className="absolute inset-0 bg-gradient-to-br from-[#14283F]/95 via-[#14283F]/85 to-[#14283F]/60" />

        <div className="relative z-10 flex min-h-screen flex-col justify-between p-12 xl:p-16">
          <Link href="/">
            <Image
              src="/desktop-hero-logo.webp"
              alt="Sandstone Real Estate Group"
              width={240}
              height={100}
              className="h-auto w-60 brightness-0 invert"
            />
          </Link>

          <div className="max-w-xl">
            <p className="mb-5 text-xs font-semibold uppercase tracking-[0.25em] text-[#C9A66B]">
              Your account. Your peace of mind.
            </p>

            <h1 className="text-5xl font-semibold leading-tight xl:text-6xl">
              Let&apos;s get you back on track.
            </h1>

            <p className="mt-6 text-base leading-relaxed text-white/75">
              Your real estate journey doesn&apos;t have to wait. Recover access
              to your Sandstone account and pick up right where you left off.
            </p>

            <div className="mt-10 space-y-6">
              <div className="flex items-center gap-4">
                <ShieldCheck className="h-6 w-6 text-[#C9A66B]" />
                <span>Secure account recovery</span>
              </div>

              <div className="flex items-center gap-4">
                <KeyRound className="h-6 w-6 text-[#C9A66B]" />
                <span>Password reset through your email</span>
              </div>

              <div className="flex items-center gap-4">
                <LockKeyhole className="h-6 w-6 text-[#C9A66B]" />
                <span>Your personal information stays protected</span>
              </div>
            </div>
          </div>

          <p className="text-xs uppercase tracking-[0.25em] text-white/60">
            Luxury. Lifestyle. Legacy.
          </p>
        </div>
      </section>

      <section className="flex min-h-screen flex-col px-6 py-8 sm:px-12 lg:px-16">
        <Link
          href="/login"
          className="flex w-fit items-center gap-2 text-sm font-medium text-[#14283F] hover:underline"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to sign in
        </Link>

        <div className="mx-auto flex w-full max-w-md flex-1 flex-col justify-center py-12">
          <Image
            src="/mobile-header-logo-navy.webp"
            alt="Sandstone Real Estate Group"
            width={70}
            height={70}
            className="mb-8 h-auto lg:hidden"
          />

          <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-xl border border-[#C9A66B]/40 bg-[#C9A66B]/10">
            <KeyRound className="h-7 w-7 text-[#14283F]" />
          </div>

          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-[#A3834D]">
            Sandstone Client Portal
          </p>

          <h2 className="text-3xl font-semibold tracking-tight text-[#14283F] sm:text-4xl">
            {title}
          </h2>

          <p className="mb-8 mt-4 text-sm leading-relaxed text-slate-600">
            {description}
          </p>

          {children}

          <div className="mt-8 flex gap-3 rounded-xl border border-slate-200 bg-slate-50 p-4">
            <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-[#14283F]" />

            <div>
              <p className="text-sm font-semibold text-[#14283F]">
                Your security matters
              </p>

              <p className="mt-1 text-xs leading-relaxed text-slate-600">
                Never share your password or password reset link with anyone.
                Sandstone will never ask you to provide your password directly.
              </p>
            </div>
          </div>
        </div>

        <footer className="flex flex-wrap items-center justify-center gap-4 text-xs text-slate-500">
          <span>Â© {new Date().getFullYear()} Sandstone Real Estate Group</span>

          <Link href="/privacy-policy" className="hover:underline">
            Privacy
          </Link>

          <Link href="/terms-and-conditions" className="hover:underline">
            Terms
          </Link>
        </footer>
      </section>
    </main>
  );
}
