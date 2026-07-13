import Image from "next/image";
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

            <div
              className={`${SECTION_MAX} relative z-10 flex h-full items-end pb-10 sm:pb-14`}
            >
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
              <span
                aria-hidden
                className="h-px min-w-8 flex-1 bg-[var(--sandstone-charcoal)]/45"
              />

              <h2 className="text-center font-heading text-2xl font-extrabold uppercase tracking-[0.06em] text-[var(--sandstone-navy)] sm:text-3xl">
                THE 4 PILLARS OF YOUR VA LOAN BENEFIT
              </h2>

              <span
                aria-hidden
                className="h-px min-w-8 flex-1 bg-[var(--sandstone-charcoal)]/45"
              />
            </div>

            <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {pillars.map((pillar) => (
                <article
                  key={pillar.title}
                  className="flex min-h-[320px] flex-col justify-between rounded-2xl border border-[var(--sandstone-navy)]/12 bg-white px-4 py-6 text-center shadow-[0_20px_48px_-36px_rgba(37,52,113,0.5)]"
                >
                  <div className="relative mx-auto h-32 w-full max-w-[150px]">
                    <Image
                      src={pillar.image}
                      alt={pillar.alt}
                      fill
                      sizes="180px"
                      className="object-contain"
                    />
                  </div>

                  <span className="mx-auto mt-3 block h-[2px] w-16 min-w-16 rounded-full bg-[var(--sandstone-sand-gold)]" />

                  <p className="mt-4 font-heading text-lg font-bold text-[var(--sandstone-navy)]">
                    {pillar.title}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="border-y border-[var(--sandstone-navy)]/10 bg-white py-14 sm:py-16">
          <div className={SECTION_MAX}>
            <div className="flex items-center gap-3 sm:gap-4">
              <span
                aria-hidden
                className="h-px min-w-8 flex-1 bg-[var(--sandstone-charcoal)]/45"
              />

              <h2 className="text-center font-heading text-2xl font-extrabold uppercase tracking-[0.06em] text-[var(--sandstone-navy)] sm:text-3xl">
                YOUR MISSION PATH
              </h2>

              <span
                aria-hidden
                className="h-px min-w-8 flex-1 bg-[var(--sandstone-charcoal)]/45"
              />
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
                    <Image
                      src={step.image}
                      alt={step.title}
                      fill
                      sizes="190px"
                      className="object-contain"
                    />
                  </div>

                  <h3 className="mt-4 font-heading text-lg font-bold text-[var(--sandstone-navy)]">
                    {step.title}
                  </h3>

                  <p className="mt-2 text-sm text-[var(--sandstone-charcoal)]/72">
                    {step.subtitle}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="py-14 sm:py-16">
          <div className={SECTION_MAX}>
            <div className="flex items-center gap-3 sm:gap-4">
              <span
                aria-hidden
                className="h-px min-w-8 flex-1 bg-[var(--sandstone-charcoal)]/45"
              />

              <h2 className="text-center font-heading text-2xl font-extrabold uppercase tracking-[0.06em] text-[var(--sandstone-navy)] sm:text-3xl">
                MYTH VS REALITY
              </h2>

              <span
                aria-hidden
                className="h-px min-w-8 flex-1 bg-[var(--sandstone-charcoal)]/45"
              />
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
                    <span>Complex Paperwork</span>
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

            <div className="mx-auto mt-10 w-full max-w-7xl">
              <div className="grid gap-8 lg:grid-cols-2">
                <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
                  <h3 className="mb-6 font-heading text-3xl font-bold tracking-normal text-[var(--sandstone-navy)]">
                    Before You Receive Orders
                  </h3>

                  <ul className="space-y-5 text-lg leading-relaxed tracking-normal text-[var(--sandstone-charcoal)]">
                    <li className="flex gap-4">
                      <span className="mt-3 h-2 w-2 shrink-0 rounded-full bg-[var(--sandstone-sand-gold)]" />
                      <span>Create a moving budget.</span>
                    </li>

                    <li className="flex gap-4">
                      <span className="mt-3 h-2 w-2 shrink-0 rounded-full bg-[var(--sandstone-sand-gold)]" />
                      <span>
                        Research your new duty station and Fort Bliss commute options.
                      </span>
                    </li>

                    <li className="flex gap-4">
                      <span className="mt-3 h-2 w-2 shrink-0 rounded-full bg-[var(--sandstone-sand-gold)]" />
                      <span>
                        Organize important documents for your move and home purchase.
                      </span>
                    </li>

                    <li className="flex gap-4">
                      <span className="mt-3 h-2 w-2 shrink-0 rounded-full bg-[var(--sandstone-sand-gold)]" />
                      <span>Review your current lease or mortgage timeline.</span>
                    </li>
                  </ul>
                </div>

                <div className="rounded-3xl bg-slate-100 p-8 shadow-sm">
                  <h3 className="mb-6 font-heading text-3xl font-bold tracking-normal text-[var(--sandstone-navy)]">
                    Once You Receive Orders
                  </h3>

                  <ul className="space-y-5 text-lg leading-relaxed tracking-normal text-[var(--sandstone-charcoal)]">
                    <li className="flex gap-4">
                      <span className="mt-3 h-2 w-2 shrink-0 rounded-full bg-[var(--sandstone-sand-gold)]" />
                      <span>
                        Keep copies of your PCS orders for lenders and housing offices.
                      </span>
                    </li>

                    <li className="flex gap-4">
                      <span className="mt-3 h-2 w-2 shrink-0 rounded-full bg-[var(--sandstone-sand-gold)]" />
                      <span>Schedule your household goods shipment.</span>
                    </li>

                    <li className="flex gap-4">
                      <span className="mt-3 h-2 w-2 shrink-0 rounded-full bg-[var(--sandstone-sand-gold)]" />
                      <span>
                        Contact your transportation office and confirm move dates.
                      </span>
                    </li>

                    <li className="flex gap-4">
                      <span className="mt-3 h-2 w-2 shrink-0 rounded-full bg-[var(--sandstone-sand-gold)]" />
                      <span>Start your El Paso home search early.</span>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="mt-8 grid gap-8 lg:grid-cols-2">
                <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
                  <h3 className="mb-6 font-heading text-3xl font-bold tracking-normal text-[var(--sandstone-navy)]">
                    VA Loan Documents
                  </h3>

                  <ul className="space-y-5 text-lg leading-relaxed tracking-normal text-[var(--sandstone-charcoal)]">
                    <li className="flex gap-4">
                      <span className="mt-3 h-2 w-2 shrink-0 rounded-full bg-[var(--sandstone-sand-gold)]" />
                      <span>Government-issued ID.</span>
                    </li>

                    <li className="flex gap-4">
                      <span className="mt-3 h-2 w-2 shrink-0 rounded-full bg-[var(--sandstone-sand-gold)]" />
                      <span>Certificate of Eligibility, also called COE.</span>
                    </li>

                    <li className="flex gap-4">
                      <span className="mt-3 h-2 w-2 shrink-0 rounded-full bg-[var(--sandstone-sand-gold)]" />
                      <span>PCS orders and Leave &amp; Earnings Statement.</span>
                    </li>

                    <li className="flex gap-4">
                      <span className="mt-3 h-2 w-2 shrink-0 rounded-full bg-[var(--sandstone-sand-gold)]" />
                      <span>Recent pay stubs, W-2s, and bank statements.</span>
                    </li>
                  </ul>
                </div>

                <div className="rounded-3xl bg-slate-100 p-8 shadow-sm">
                  <h3 className="mb-6 font-heading text-3xl font-bold tracking-normal text-[var(--sandstone-navy)]">
                    Before Closing
                  </h3>

                  <ul className="space-y-5 text-lg leading-relaxed tracking-normal text-[var(--sandstone-charcoal)]">
                    <li className="flex gap-4">
                      <span className="mt-3 h-2 w-2 shrink-0 rounded-full bg-[var(--sandstone-sand-gold)]" />
                      <span>Complete the VA appraisal.</span>
                    </li>

                    <li className="flex gap-4">
                      <span className="mt-3 h-2 w-2 shrink-0 rounded-full bg-[var(--sandstone-sand-gold)]" />
                      <span>Schedule the home inspection.</span>
                    </li>

                    <li className="flex gap-4">
                      <span className="mt-3 h-2 w-2 shrink-0 rounded-full bg-[var(--sandstone-sand-gold)]" />
                      <span>Arrange homeowners insurance.</span>
                    </li>

                    <li className="flex gap-4">
                      <span className="mt-3 h-2 w-2 shrink-0 rounded-full bg-[var(--sandstone-sand-gold)]" />
                      <span>Review your Closing Disclosure before signing.</span>
                    </li>
                  </ul>
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