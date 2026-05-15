import Image from "next/image";
import Link from "next/link";
import { Check, X } from "lucide-react";
import { PcsHeader } from "../PcsHeader.client";
import { SiteFooter } from "@/components/SiteFooter";

export const metadata = {
  title: "VA Loan Guide | PCS",
  description:
    "Learn how to use your VA benefit with confidence on your PCS move with Sandstone's VA Loan Guide.",
};

const SECTION_MAX = "mx-auto w-full max-w-6xl px-4 lg:px-6";

const pillars = [
  {
    image: "/VA_Loan_Guide_Imgs/Hundred_VA.png",
    title: "Most Qualify",
    alt: "Most VA buyers qualify",
  },
  {
    image: "/VA_Loan_Guide_Imgs/Lower_Interest_VA.png",
    title: "Lower Interest Rates",
    alt: "Lower interest rates",
  },
  {
    image: "/VA_Loan_Guide_Imgs/PMI_VA.png",
    title: "No monthly PMI",
    alt: "No monthly PMI",
  },
  {
    image: "/VA_Loan_Guide_Imgs/Flex_Credit_VA.png",
    title: "Flexible Credit Requirements",
    alt: "Flexible credit requirements",
  },
] as const;

const missionPath = [
  {
    number: "1",
    image: "/VA_Loan_Guide_Imgs/COE_VA.png",
    title: "Obtain COE",
    subtitle: "We help you secure your Certificate of Eligibility",
  },
  {
    number: "2",
    image: "/VA_Loan_Guide_Imgs/Pre_Approval_VA.png",
    title: "Tactical Pre-Approval",
    subtitle: "Get pre-approved with a VA-savvy lender",
  },
  {
    number: "3",
    image: "/VA_Loan_Guide_Imgs/PCS_Focused_VA.png",
    title: "PCS-Focused Search",
    subtitle: "Find the right home in the right location",
  },
  {
    number: "4",
    image: "/VA_Loan_Guide_Imgs/Closing_VA.png",
    title: "Streamlined Closing",
    subtitle: "We coordinate everyone for a smooth closing",
  },
] as const;

export default function VaLoanGuidePage() {
  return (
    <>
      <PcsHeader />
      <main className="min-h-screen bg-[var(--sandstone-off-white)]">
        <section className="relative overflow-hidden bg-[var(--sandstone-navy)]">
          <div className="relative h-[44vh] min-h-[360px] w-full lg:h-[560px]">
            <Image
              src="/VA_Loan_Guide_Imgs/Hero_VA.jpg"
              alt="VA loan guide hero"
              fill
              priority
              sizes="100vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-[linear-gradient(120deg,rgba(20,31,75,0.82),rgba(20,31,75,0.18))]" />
            <div className={`${SECTION_MAX} relative z-10 flex h-full items-end pb-10 sm:pb-14`}>
              <div className="max-w-2xl text-white">
                <h1 className="font-heading text-4xl font-extrabold uppercase tracking-[0.08em] sm:text-5xl">
                  <span className="inline-flex items-center gap-3">
                    <span className="relative inline-block leading-none">
                      <span>VA</span>
                      <span className="absolute left-0 top-[100%] mt-1 block h-[2px] w-12 rounded-full bg-[var(--sandstone-sand-gold)]" />
                    </span>
                    <span>LOAN GUIDE</span>
                  </span>
                </h1>
                <p className="mt-3 text-base leading-relaxed text-white/92 sm:text-lg">
                  Learn how to use your VA Benefit with confidence on your PCS move
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="py-14 sm:py-16">
          <div className={SECTION_MAX}>
            <div className="flex items-center gap-3 sm:gap-4">
              <span aria-hidden className="h-px min-w-8 flex-1 bg-[var(--sandstone-charcoal)]/45" />
              <h2 className="text-center font-heading text-2xl font-extrabold uppercase tracking-[0.06em] text-[var(--sandstone-navy)] sm:text-3xl">
                THE 4 PILLARS OF YOUR VA LOAN BENEFIT
              </h2>
              <span aria-hidden className="h-px min-w-8 flex-1 bg-[var(--sandstone-charcoal)]/45" />
            </div>
            <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {pillars.map((pillar) => (
                <article
                  key={pillar.title}
                  className="flex min-h-[320px] flex-col justify-between rounded-2xl border border-[var(--sandstone-navy)]/12 bg-white px-4 py-6 text-center shadow-[0_20px_48px_-36px_rgba(37,52,113,0.5)]"
                >
                  <div className="relative mx-auto h-32 w-full max-w-[150px]">
                    <Image src={pillar.image} alt={pillar.alt} fill sizes="180px" className="object-contain" />
                  </div>
                  <span className="mx-auto mt-3 block h-[2px] w-16 min-w-16 rounded-full bg-[var(--sandstone-sand-gold)]" />
                  <p className="mt-4 font-heading text-lg font-bold text-[var(--sandstone-navy)]">{pillar.title}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="border-y border-[var(--sandstone-navy)]/10 bg-white py-14 sm:py-16">
          <div className={SECTION_MAX}>
            <div className="flex items-center gap-3 sm:gap-4">
              <span aria-hidden className="h-px min-w-8 flex-1 bg-[var(--sandstone-charcoal)]/45" />
              <h2 className="text-center font-heading text-2xl font-extrabold uppercase tracking-[0.06em] text-[var(--sandstone-navy)] sm:text-3xl">
                YOUR MISSION PATH
              </h2>
              <span aria-hidden className="h-px min-w-8 flex-1 bg-[var(--sandstone-charcoal)]/45" />
            </div>
            <p className="mt-2 text-center text-sm font-semibold uppercase tracking-[0.14em] text-[var(--sandstone-charcoal)]/65">
              A SIMPLE, STEP-BY-STEP PROCESS
            </p>

            <div className="relative mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              {missionPath.map((step, index) => (
                <article key={step.number} className="relative p-3 text-center">
                  <div className="mx-auto inline-flex h-10 w-10 items-center justify-center rounded-full border-2 border-[var(--sandstone-sand-gold)] bg-transparent text-sm font-extrabold text-[var(--sandstone-sand-gold)]">
                    {step.number}
                  </div>
                  {index < missionPath.length - 1 ? (
                    <div
                      aria-hidden
                      className="absolute left-[calc(50%+1.25rem)] top-8 hidden h-[2px] w-[calc(100%-2.5rem)] bg-[var(--sandstone-sand-gold)] lg:block"
                    >
                      <span className="absolute -right-1.5 -top-[5px] h-3 w-3 rounded-full bg-[var(--sandstone-sand-gold)]" />
                    </div>
                  ) : null}
                  <div className="relative mx-auto mt-4 h-20 w-full max-w-[140px]">
                    <Image src={step.image} alt={step.title} fill sizes="190px" className="object-contain" />
                  </div>
                  <h3 className="mt-4 font-heading text-lg font-bold text-[var(--sandstone-navy)]">{step.title}</h3>
                  <p className="mt-2 text-sm text-[var(--sandstone-charcoal)]/72">{step.subtitle}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="py-14 sm:py-16">
          <div className={SECTION_MAX}>
            <div className="flex items-center gap-3 sm:gap-4">
              <span aria-hidden className="h-px min-w-8 flex-1 bg-[var(--sandstone-charcoal)]/45" />
              <h2 className="text-center font-heading text-2xl font-extrabold uppercase tracking-[0.06em] text-[var(--sandstone-navy)] sm:text-3xl">
                MYTH VS REALITY
              </h2>
              <span aria-hidden className="h-px min-w-8 flex-1 bg-[var(--sandstone-charcoal)]/45" />
            </div>

            <div className="mx-auto mt-8 w-full max-w-4xl overflow-hidden rounded-2xl border border-[var(--sandstone-navy)]/15 shadow-[0_20px_48px_-34px_rgba(37,52,113,0.4)]">
              <div className="grid grid-cols-2">
                <div className="bg-[var(--sandstone-navy)] px-5 py-4 text-center text-sm font-extrabold uppercase tracking-[0.12em] text-white">
                  MYTH
                </div>
                <div className="bg-[var(--sandstone-sand-gold)] px-5 py-4 text-center text-sm font-extrabold uppercase tracking-[0.12em] text-white">
                  REALITY
                </div>

                <div className="border-t border-[var(--sandstone-navy)]/18 px-5 py-5 text-base font-semibold text-[var(--sandstone-navy)]">
                  <span className="inline-flex items-center gap-2">
                    <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-[var(--sandstone-navy)] text-white">
                      <X aria-hidden className="h-3.5 w-3.5" />
                    </span>
                    <span>Complex Papework</span>
                  </span>
                </div>
                <div className="border-t border-[var(--sandstone-navy)]/18 px-5 py-5 text-base font-semibold text-[var(--sandstone-navy)]">
                  <span className="inline-flex items-center gap-2">
                    <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-[var(--sandstone-sand-gold)] text-white">
                      <Check aria-hidden className="h-3.5 w-3.5" />
                    </span>
                    <span>We handle the bureaucracy</span>
                  </span>
                </div>

                <div className="border-t border-[var(--sandstone-navy)]/18 px-5 py-5 text-base font-semibold text-[var(--sandstone-navy)]">
                  <span className="inline-flex items-center gap-2">
                    <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-[var(--sandstone-navy)] text-white">
                      <X aria-hidden className="h-3.5 w-3.5" />
                    </span>
                    <span>Slow Closings</span>
                  </span>
                </div>
                <div className="border-t border-[var(--sandstone-navy)]/18 px-5 py-5 text-base font-semibold text-[var(--sandstone-navy)]">
                  <span className="inline-flex items-center gap-2">
                    <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-[var(--sandstone-sand-gold)] text-white">
                      <Check aria-hidden className="h-3.5 w-3.5" />
                    </span>
                    <span>30-Day Average Closing</span>
                  </span>
                </div>
              </div>
            </div>

            <div className="mx-auto mt-10 w-full max-w-5xl rounded-xl border-2 border-[var(--sandstone-sand-gold)] p-5 sm:p-6">
              <div className="flex flex-col items-center gap-5 md:flex-row md:items-center md:justify-between">
                <div className="relative h-24 w-24 shrink-0 sm:h-28 sm:w-28">
                  <Image
                    src="/VA_Loan_Guide_Imgs/Downland_Checklist_VA.png"
                    alt="VA document checklist"
                    fill
                    sizes="112px"
                    className="object-contain"
                  />
                </div>

                <div className="md:flex-1 md:px-4">
                  <h3 className="text-center font-heading text-xl font-bold text-[var(--sandstone-navy)] md:text-left">
                    Download the VA Document Checklist
                  </h3>
                  <p className="mt-2 text-center text-sm text-[var(--sandstone-charcoal)]/68 md:text-left">
                    Know exactly what documents you need for a smooth VA loan process
                  </p>
                </div>

                <div className="shrink-0">
                  <Link
                    href="/VA_Loan_Guide_Imgs/Downland_Checklist_VA.png"
                    download
                    className="inline-flex h-11 items-center justify-center rounded-full bg-[var(--sandstone-sand-gold)] px-6 text-xs font-extrabold uppercase tracking-[0.14em] text-white transition hover:brightness-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--sandstone-sand-gold)]"
                  >
                    Get your VA Documents Checklist
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
