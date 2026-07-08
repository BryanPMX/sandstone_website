"use client";

import { useMemo, useState } from "react";

const bahRates = {
  E1: { with: 1530, without: 1245 },
  E2: { with: 1530, without: 1245 },
  E3: { with: 1530, without: 1245 },
  E4: { with: 1686, without: 1377 },
  E5: { with: 1890, without: 1578 },
  E6: { with: 2139, without: 1782 },
  E7: { with: 2286, without: 1911 },
  E8: { with: 2445, without: 2037 },
  E9: { with: 2601, without: 2184 },
  O1: { with: 1803, without: 1530 },
  O2: { with: 2016, without: 1713 },
  O3: { with: 2295, without: 1920 },
  O4: { with: 2652, without: 2205 },
  O5: { with: 2850, without: 2376 },
};

function formatMoney(value: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(value);
}

export function BahCalculator() {
  const [purchasePrice, setPurchasePrice] = useState(450000);
  const [downPayment, setDownPayment] = useState(0);
  const [interestRate, setInterestRate] = useState(5.75);
  const [loanTerm, setLoanTerm] = useState(30);
  const [payGrade, setPayGrade] = useState<keyof typeof bahRates>("E5");
  const [dependents, setDependents] = useState<"with" | "without">("with");

  const results = useMemo(() => {
    const loanAmount = Math.max(purchasePrice - downPayment, 0);
    const monthlyRate = interestRate / 100 / 12;
    const totalPayments = loanTerm * 12;

    const monthlyPayment =
      monthlyRate === 0
        ? loanAmount / totalPayments
        : (loanAmount *
            monthlyRate *
            Math.pow(1 + monthlyRate, totalPayments)) /
          (Math.pow(1 + monthlyRate, totalPayments) - 1);

    const bah = bahRates[payGrade][dependents];
    const difference = bah - monthlyPayment;

    return {
      loanAmount,
      monthlyPayment: Number.isFinite(monthlyPayment) ? monthlyPayment : 0,
      bah,
      difference,
    };
  }, [purchasePrice, downPayment, interestRate, loanTerm, payGrade, dependents]);

  const covered = results.difference >= 0;

  return (
    <section className="py-16">
      <div className="mx-auto w-full max-w-7xl px-4 lg:px-6">
        <div className="grid gap-12 lg:grid-cols-[1fr_600px] lg:items-start">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.28em] text-[var(--sandstone-sand-gold)]">
              Estimate with Confidence
            </p>

            <h1 className="mt-4 font-heading text-5xl font-extrabold leading-tight text-[var(--sandstone-navy)] lg:text-6xl">
              Fort Bliss BAH Calculator
            </h1>

            <p className="mt-6 max-w-2xl text-lg leading-8 text-[var(--sandstone-charcoal)]/80">
              Estimate your monthly housing budget, compare it to your Fort
              Bliss BAH, and see what payment may fit your VA loan home search.
            </p>

            <div className="mt-16 grid gap-6 md:grid-cols-3">
              {[
                {
                  label: "Monthly Mortgage",
                  value: formatMoney(results.monthlyPayment),
                  text: "Estimated monthly principal and interest.",
                },
                {
                  label: "Fort Bliss BAH",
                  value: formatMoney(results.bah),
                  text: "Estimated housing allowance.",
                },
                {
                  label: "Monthly Difference",
                  value: `${covered ? "+" : ""}${formatMoney(
                    results.difference
                  )}`,
                  text: covered
                    ? "Estimated amount remaining after payment."
                    : "Estimated amount above BAH.",
                },
              ].map((card) => (
                <div
                  key={card.label}
                  className="rounded-3xl border border-[var(--sandstone-navy)]/10 bg-white p-8 shadow-sm"
                >
                  <p className="text-xs font-bold uppercase tracking-[0.18em] text-[var(--sandstone-sand-gold)]">
                    {card.label}
                  </p>

                  <h3 className="mt-3 text-4xl font-extrabold text-[var(--sandstone-navy)]">
                    {card.value}
                  </h3>

                  <p className="mt-3 text-sm text-[var(--sandstone-charcoal)]/70">
                    {card.text}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-[2.25rem] border border-[var(--sandstone-navy)]/10 bg-white p-8 shadow-[0_28px_70px_-45px_rgba(37,52,113,0.45)]">
            <h2 className="text-2xl font-bold text-[var(--sandstone-navy)]">
              Home Affordability Calculator
            </h2>

            <p className="mt-2 text-sm text-[var(--sandstone-charcoal)]/70">
              Estimate your payment and compare it with your Fort Bliss BAH.
            </p>

            <div className="mt-8 space-y-6">
              <div>
                <label className="mb-2 block text-sm font-medium">
                  Duty Station
                </label>
                <input
                  value="Fort Bliss"
                  disabled
                  className="w-full rounded-xl border border-[var(--sandstone-navy)]/10 bg-[var(--sandstone-off-white)] px-4 py-3"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="mb-2 block text-sm font-medium">
                    Pay Grade
                  </label>
                  <select
                    value={payGrade}
                    onChange={(e) =>
                      setPayGrade(e.target.value as keyof typeof bahRates)
                    }
                    className="w-full rounded-xl border border-[var(--sandstone-navy)]/10 px-4 py-3"
                  >
                    {Object.keys(bahRates).map((grade) => (
                      <option key={grade} value={grade}>
                        {grade}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium">
                    Dependents
                  </label>
                  <select
                    value={dependents}
                    onChange={(e) =>
                      setDependents(e.target.value as "with" | "without")
                    }
                    className="w-full rounded-xl border border-[var(--sandstone-navy)]/10 px-4 py-3"
                  >
                    <option value="with">With Dependents</option>
                    <option value="without">Without Dependents</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium">
                  Purchase Price
                </label>
                <input
                  type="number"
                  value={purchasePrice}
                  onChange={(e) => setPurchasePrice(Number(e.target.value))}
                  className="w-full rounded-xl border border-[var(--sandstone-navy)]/10 px-4 py-3"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium">
                  Down Payment
                </label>
                <input
                  type="number"
                  value={downPayment}
                  onChange={(e) => setDownPayment(Number(e.target.value))}
                  className="w-full rounded-xl border border-[var(--sandstone-navy)]/10 px-4 py-3"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="mb-2 block text-sm font-medium">
                    Interest Rate
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    value={interestRate}
                    onChange={(e) => setInterestRate(Number(e.target.value))}
                    className="w-full rounded-xl border border-[var(--sandstone-navy)]/10 px-4 py-3"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium">
                    Loan Term
                  </label>
                  <input
                    type="number"
                    value={loanTerm}
                    onChange={(e) => setLoanTerm(Number(e.target.value))}
                    className="w-full rounded-xl border border-[var(--sandstone-navy)]/10 px-4 py-3"
                  />
                </div>
              </div>

              <div className="rounded-3xl bg-[var(--sandstone-off-white)] p-6">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-sm">Estimated Monthly Payment</p>

                    <h2 className="mt-2 text-5xl font-extrabold text-[var(--sandstone-navy)]">
                      {formatMoney(results.monthlyPayment)}
                    </h2>

                    <span
                      className={`mt-4 inline-flex rounded-full px-4 py-2 text-xs font-bold uppercase tracking-[0.14em] ${
                        covered
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {covered ? "Covered by BAH" : "Above BAH"}
                    </span>
                  </div>
                </div>

                <div className="mt-6 grid grid-cols-2 gap-4">
                  <div className="rounded-2xl bg-white p-4">
                    <p className="text-xs uppercase tracking-[0.2em] text-[var(--sandstone-sand-gold)]">
                      BAH
                    </p>
                    <p className="mt-2 text-2xl font-bold text-[var(--sandstone-navy)]">
                      {formatMoney(results.bah)}
                    </p>
                  </div>

                  <div className="rounded-2xl bg-white p-4">
                    <p className="text-xs uppercase tracking-[0.2em] text-[var(--sandstone-sand-gold)]">
                      Difference
                    </p>
                    <p className="mt-2 text-2xl font-bold text-[var(--sandstone-navy)]">
                      {covered ? "+" : ""}
                      {formatMoney(results.difference)}
                    </p>
                  </div>
                </div>
              </div>

              <p className="text-xs leading-5 text-[var(--sandstone-charcoal)]/60">
                Estimates are for planning only and may not include taxes,
                insurance, HOA dues, VA funding fee, or lender-specific costs.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}