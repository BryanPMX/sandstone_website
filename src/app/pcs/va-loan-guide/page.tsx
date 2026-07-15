import Image from "next/image";
import { ContactForm } from "@/components/ContactForm";
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
    title: "No Monthly PMI",
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
    subtitle: "We help you secure your Certificate of Eligibility.",
  },
  {
    number: "2",
    image: "/VA_Loan_Guide_Imgs/Pre_Approval_VA.png",
    title: "Tactical Pre-Approval",
    subtitle: "Get pre-approved with a VA-savvy lender.",
  },
  {
    number: "3",
    image: "/VA_Loan_Guide_Imgs/PCS_Focused_VA.png",
    title: "PCS-Focused Search",
    subtitle: "Find the right home in the right Fort Bliss location.",
  },
  {
    number: "4",
    image: "/VA_Loan_Guide_Imgs/Closing_VA.png",
    title: "Streamlined Closing",
    subtitle: "We coordinate everyone for a smooth closing.",
  },
] as const;

const checklistGroups = [
  {
    title: "Before You Receive Orders",
    items: [
      "Create a moving budget.",
      "Research your new duty station and Fort Bliss commute options.",
      "Organize important documents for your move and home purchase.",
      "Review your current lease or mortgage timeline.",
    ],
  },
  {
    title: "Once You Receive Orders",
    items: [
      "Keep copies of your PCS orders for lenders and housing offices.",
      "Schedule your household goods shipment.",
      "Contact your transportation office and confirm move dates.",
      "Start your El Paso home search early.",
    ],
  },
  {
    title: "VA Loan Documents",
    items: [
      "Government-issued ID.",
      "Certificate of Eligibility, also called COE.",
      "PCS orders and Leave & Earnings Statement.",
      "Recent pay stubs, W-2s, and bank statements.",
    ],
  },
  {
    title: "Before Closing",
    items: [
      "Complete the VA appraisal.",
      "Schedule the home inspection.",
      "Arrange homeowners insurance.",
      "Review your Closing Disclosure before signing.",
    ],
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

            <div className="absolute inset-0 bg-[linear-gradient(120deg,rgba(20,31,75,0.88),rgba(20,31,75,0.28))]" />

            <div
              className={`${SECTION_MAX} relative z-10 flex h-full items-end pb-10 sm:pb-14`}
            >
              <div className="max-w-3xl text-white">
                <p className="mb-4 text-xs font-bold uppercase tracking-[0.3em] text-[var(--sandstone-sand-gold)]">
                  Fort Bliss Military Home Buying
                </p>

                <h1 className="font-heading text-4xl font-extrabold uppercase tracking-[0.08em] sm:text-5xl md:text-6xl">
                  VA Loan Guide
                </h1>

                <p className="mt-4 max-w-2xl text-base leading-relaxed text-white/90 sm:text-lg">
                  Learn how to use your VA benefit with confidence during your
                  PCS move to El Paso.
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
                className="h-px min-w-8 flex-1 bg-[var(--sandstone-charcoal)]/35"
              />

              <h2 className="text-center font-heading text-2xl font-extrabold uppercase tracking-[0.06em] text-[var(--sandstone-navy)] sm:text-3xl">
                The 4 Pillars of Your VA Loan Benefit
              </h2>

              <span
                aria-hidden
                className="h-px min-w-8 flex-1 bg-[var(--sandstone-charcoal)]/35"
              />
            </div>

            <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {pillars.map((pillar) => (
                <article
                  key={pillar.title}
                  className="flex min-h-[300px] flex-col justify-between rounded-3xl border border-[var(--sandstone-navy)]/10 bg-white px-5 py-7 text-center shadow-[0_20px_48px_-36px_rgba(37,52,113,0.5)] transition duration-300 hover:-translate-y-1 hover:shadow-xl"
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

                  <span className="mx-auto mt-4 block h-[2px] w-16 rounded-full bg-[var(--sandstone-sand-gold)]" />

                  <p className="mt-5 font-heading text-lg font-bold text-[var(--sandstone-navy)]">
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
                className="h-px min-w-8 flex-1 bg-[var(--sandstone-charcoal)]/35"
              />

              <h2 className="text-center font-heading text-2xl font-extrabold uppercase tracking-[0.06em] text-[var(--sandstone-navy)] sm:text-3xl">
                Your Mission Path
              </h2>

              <span
                aria-hidden
                className="h-px min-w-8 flex-1 bg-[var(--sandstone-charcoal)]/35"
              />
            </div>

            <p className="mt-2 text-center text-sm font-semibold uppercase tracking-[0.14em] text-[var(--sandstone-charcoal)]/65">
              A simple, step-by-step process
            </p>

            <div className="relative mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              {missionPath.map((step, index) => (
                <article
                  key={step.number}
                  className="relative rounded-3xl border border-slate-200 bg-[#f7f5ef] p-6 text-center"
                >
                  <div className="mx-auto inline-flex h-11 w-11 items-center justify-center rounded-full bg-[var(--sandstone-sand-gold)] text-sm font-extrabold text-white">
                    {step.number}
                  </div>

                  {index < missionPath.length - 1 ? (
                    <div
                      aria-hidden
                      className="absolute left-[calc(50%+1.4rem)] top-11 hidden h-[2px] w-[calc(100%-2.8rem)] bg-[var(--sandstone-sand-gold)] lg:block"
                    >
                      <span className="absolute -right-1.5 -top-[5px] h-3 w-3 rounded-full bg-[var(--sandstone-sand-gold)]" />
                    </div>
                  ) : null}

                  <div className="relative mx-auto mt-5 h-20 w-full max-w-[140px]">
                    <Image
                      src={step.image}
                      alt={step.title}
                      fill
                      sizes="190px"
                      className="object-contain"
                    />
                  </div>

                  <h3 className="mt-5 font-heading text-lg font-bold text-[var(--sandstone-navy)]">
                    {step.title}
                  </h3>

                  <p className="mt-2 text-sm leading-6 text-[var(--sandstone-charcoal)]/75">
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
                className="h-px min-w-8 flex-1 bg-[var(--sandstone-charcoal)]/35"
              />

              <h2 className="text-center font-heading text-2xl font-extrabold uppercase tracking-[0.06em] text-[var(--sandstone-navy)] sm:text-3xl">
                Myth vs. Reality
              </h2>

              <span
                aria-hidden
                className="h-px min-w-8 flex-1 bg-[var(--sandstone-charcoal)]/35"
              />
            </div>

            <div className="mx-auto mt-8 grid max-w-5xl gap-4 md:grid-cols-2">
              {[
                {
                  type: "Myth",
                  icon: "×",
                  title: "VA loans are buried in paperwork.",
                  text: "The process can feel confusing when buyers do not know what lenders and agents need up front.",
                  dark: true,
                },
                {
                  type: "Reality",
                  icon: "✓",
                  title: "A prepared team makes it manageable.",
                  text: "We help you understand the COE, lender requests, appraisal, inspection, and closing timeline.",
                  dark: false,
                },
                {
                  type: "Myth",
                  icon: "×",
                  title: "VA purchases always close slowly.",
                  text: "Delays usually come from missing documents, weak timelines, or agents unfamiliar with VA offers.",
                  dark: true,
                },
                {
                  type: "Reality",
                  icon: "✓",
                  title: "VA offers can move quickly.",
                  text: "With pre-approval and organized documents, many purchases can stay on a strong closing schedule.",
                  dark: false,
                },
              ].map((item) => (
                <article
                  key={item.title}
                  className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm"
                >
                  <p className="text-xs font-bold uppercase tracking-[0.24em] text-[var(--sandstone-sand-gold)]">
                    {item.type}
                  </p>

                  <div className="mt-4 flex gap-4">
                    <span
                      className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-lg font-bold text-white ${
                        item.dark
                          ? "bg-[var(--sandstone-navy)]"
                          : "bg-[var(--sandstone-sand-gold)]"
                      }`}
                    >
                      {item.icon}
                    </span>

                    <div>
                      <h3 className="font-heading text-xl font-bold leading-snug text-[var(--sandstone-navy)]">
                        {item.title}
                      </h3>

                      <p className="mt-2 text-sm leading-6 text-[var(--sandstone-charcoal)]/75">
                        {item.text}
                      </p>
                    </div>
                  </div>
                </article>
              ))}
            </div>

            <div className="mx-auto mt-12 max-w-6xl">
              <div className="mb-8 text-center">
                <p className="text-xs font-bold uppercase tracking-[0.3em] text-[var(--sandstone-sand-gold)]">
                  PCS Checklist
                </p>

                <h2 className="mt-3 font-heading text-3xl font-bold text-[var(--sandstone-navy)] md:text-4xl">
                  What to Prepare for Your VA Loan
                </h2>

                <p className="mx-auto mt-4 max-w-3xl text-base leading-7 text-[var(--sandstone-charcoal)]/75">
                  Use this checklist to organize your move, documents, lender
                  prep, and closing steps before you arrive in El Paso.
                </p>
              </div>

              <div className="grid gap-5 md:grid-cols-2">
                {checklistGroups.map((group, groupIndex) => (
                  <article
                    key={group.title}
                    className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm"
                  >
                    <div className="flex items-start gap-4">
                      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[var(--sandstone-sand-gold)] text-sm font-bold text-white">
                        {groupIndex + 1}
                      </span>

                      <div>
                        <h3 className="font-heading text-2xl font-bold tracking-normal text-[var(--sandstone-navy)]">
                          {group.title}
                        </h3>

                        <ul className="mt-5 space-y-3 text-base leading-7 tracking-normal text-[var(--sandstone-charcoal)]">
                          {group.items.map((item) => (
                            <li key={item} className="flex gap-3">
                              <span className="mt-3 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--sandstone-sand-gold)]" />
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section id="contact" className="bg-[#f7f5ef] px-6 py-24 md:py-32">
          <div className="mx-auto max-w-6xl">
            <div className="rounded-[2rem] border border-slate-200 bg-white px-8 py-12 text-center shadow-lg md:px-14 md:py-16">
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#c6a46a]">
                VA Buyer Guidance
              </p>

              <h2 className="mx-auto mt-5 max-w-4xl text-3xl font-light leading-tight tracking-wide text-[#26356f] md:text-5xl">
                Ready to Use Your VA Benefit in El Paso?
              </h2>

              <div className="mx-auto mt-6 h-px w-20 bg-[#c6a46a]" />

              <p className="mx-auto mt-6 max-w-3xl text-base font-light leading-8 text-slate-600 md:text-lg">
                Sandstone helps military families prepare for VA purchases near
                Fort Bliss. Tell us where you are in the process and we will help
                you understand your timeline, documents, financing options, and
                El Paso home search.
              </p>

              <div className="mx-auto mt-10 grid max-w-4xl gap-4 text-left md:grid-cols-3">
                {[
                  "$0 down VA loan guidance",
                  "Fort Bliss neighborhood help",
                  "Remote PCS home search support",
                ].map((item) => (
                  <div
                    key={item}
                    className="rounded-2xl border border-slate-200 bg-[#f7f5ef] px-5 py-4"
                  >
                    <div className="flex items-start gap-3">
                      <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-[#c6a46a]" />
                      <span className="text-sm font-light leading-6 text-slate-700">
                        {item}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-10 rounded-[2rem] border border-slate-200 bg-white p-4 shadow-xl md:p-8">
              <ContactForm
                heading="Have Questions About VA Loans?"
                subheading="Tell us where you are in the VA loan process and we'll help you understand eligibility, benefits, financing options, and homes in El Paso that may work with VA financing."
              />
            </div>

            <p className="mx-auto mt-8 max-w-4xl text-center text-sm leading-6 text-slate-500">
              All financial figures are estimates and should be verified with a
              licensed lender. VA entitlement limits and lending rules are
              subject to change.
            </p>
          </div>
        </section>
      </main>

      <SiteFooter />
    </>
  );
}