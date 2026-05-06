"use client";

import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

function formatCurrency(value: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(value);
}

function formatPercent(value: number) {
  return `${value.toFixed(2)}%`;
}

function calculateMonthlyPayment(
  loanAmount: number,
  annualRate: number,
  years: number
) {
  if (loanAmount <= 0 || years <= 0) {
    return 0;
  }

  const monthlyRate = annualRate / 100 / 12;
  const payments = years * 12;

  if (monthlyRate === 0) {
    return loanAmount / payments;
  }

  return (
    loanAmount *
    (monthlyRate * Math.pow(1 + monthlyRate, payments)) /
    (Math.pow(1 + monthlyRate, payments) - 1)
  );
}

export function MortgageCalculator() {
  const [purchasePrice, setPurchasePrice] = useState(450000);
  const [downPayment, setDownPayment] = useState(90000);
  const [interestRate, setInterestRate] = useState(5.75);
  const [loanTerm, setLoanTerm] = useState(30);

  const loanAmount = Math.max(purchasePrice - downPayment, 0);
  const monthlyPayment = useMemo(
    () => calculateMonthlyPayment(loanAmount, interestRate, loanTerm),
    [loanAmount, interestRate, loanTerm]
  );
  const totalPaid = monthlyPayment * loanTerm * 12;
  const totalInterest = Math.max(totalPaid - loanAmount, 0);

  return (
    <section className="bg-white py-14 sm:py-16 lg:py-20">
      <div className="mx-auto max-w-6xl px-4">
        <div className="grid gap-10 lg:grid-cols-[0.58fr_0.42fr] lg:items-start">
          <div>
            <div className="max-w-2xl">
              <p className="mb-3 text-sm font-semibold uppercase tracking-[0.24em] text-sandstone-gold">
                Estimate with confidence
              </p>
              <h2 className="font-heading text-3xl font-bold text-[var(--sandstone-navy)] sm:text-4xl">
                Mortgage Calculator
              </h2>
              <p className="mt-4 text-base leading-7 text-[var(--sandstone-charcoal)]/85">
                Quickly estimate the monthly payment a buyer may need to cover.
                Use these numbers to understand affordability and the financing
                profile for your listing.
              </p>
            </div>

            <div className="mt-8 grid gap-4 sm:grid-cols-3">
              <div className="rounded-3xl border border-[var(--sandstone-navy)]/10 bg-[var(--sandstone-off-white)] p-5">
                <p className="text-sm uppercase tracking-[0.18em] text-[var(--sandstone-gold)]">
                  Payment
                </p>
                <p className="mt-4 text-3xl font-semibold tracking-tight text-[var(--sandstone-navy)]">
                  {formatCurrency(monthlyPayment)}
                </p>
                <p className="mt-2 text-sm text-[var(--sandstone-charcoal)]/80">
                  Estimated monthly principal + interest.
                </p>
              </div>

              <div className="rounded-3xl border border-[var(--sandstone-navy)]/10 bg-[var(--sandstone-off-white)] p-5">
                <p className="text-sm uppercase tracking-[0.18em] text-[var(--sandstone-gold)]">
                  Total interest
                </p>
                <p className="mt-4 text-3xl font-semibold tracking-tight text-[var(--sandstone-navy)]">
                  {formatCurrency(totalInterest)}
                </p>
                <p className="mt-2 text-sm text-[var(--sandstone-charcoal)]/80">
                  Interest paid over the life of the loan.
                </p>
              </div>

              <div className="rounded-3xl border border-[var(--sandstone-navy)]/10 bg-[var(--sandstone-off-white)] p-5">
                <p className="text-sm uppercase tracking-[0.18em] text-[var(--sandstone-gold)]">
                  Loan amount
                </p>
                <p className="mt-4 text-3xl font-semibold tracking-tight text-[var(--sandstone-navy)]">
                  {formatCurrency(loanAmount)}
                </p>
                <p className="mt-2 text-sm text-[var(--sandstone-charcoal)]/80">
                  Purchase price minus down payment.
                </p>
              </div>
            </div>
          </div>

          <div className="rounded-[2rem] border border-sandstone-bronze/20 bg-[var(--sandstone-off-white)] p-6 shadow-[0_24px_60px_-28px_rgba(37,52,113,0.24)] sm:p-8">
            <div className="space-y-6">
              <div className="grid gap-5">
                <div className="space-y-2">
                  <Label htmlFor="purchase-price">Purchase price</Label>
                  <Input
                    id="purchase-price"
                    type="number"
                    min={0}
                    step={1000}
                    value={purchasePrice}
                    onChange={(event) =>
                      setPurchasePrice(Number(event.target.value))
                    }
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="down-payment">Down payment</Label>
                  <Input
                    id="down-payment"
                    type="number"
                    min={0}
                    step={500}
                    value={downPayment}
                    onChange={(event) =>
                      setDownPayment(Number(event.target.value))
                    }
                  />
                </div>

                <div className="grid gap-5 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="interest-rate">Interest rate</Label>
                    <Input
                      id="interest-rate"
                      type="number"
                      min={0}
                      step={0.01}
                      value={interestRate}
                      onChange={(event) =>
                        setInterestRate(Number(event.target.value))
                      }
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="loan-term">Loan term (years)</Label>
                    <Input
                      id="loan-term"
                      type="number"
                      min={1}
                      step={1}
                      value={loanTerm}
                      onChange={(event) =>
                        setLoanTerm(Number(event.target.value))
                      }
                    />
                  </div>
                </div>
              </div>

              <div className="rounded-3xl bg-white p-5 shadow-sm">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="text-sm text-[var(--sandstone-charcoal)]/85">
                      Estimated payment
                    </p>
                    <p className="mt-2 text-3xl font-semibold text-[var(--sandstone-navy)]">
                      {formatCurrency(monthlyPayment)}
                    </p>
                  </div>
                  <Button type="button" className="whitespace-nowrap">
                    Update estimate
                  </Button>
                </div>
                <div className="mt-4 grid gap-3 sm:grid-cols-2">
                  <div className="rounded-2xl bg-[var(--sandstone-off-white)] p-3">
                    <p className="text-xs uppercase tracking-[0.24em] text-sandstone-gold">
                      Rate
                    </p>
                    <p className="mt-2 font-semibold text-[var(--sandstone-navy)]">
                      {formatPercent(interestRate)}
                    </p>
                  </div>
                  <div className="rounded-2xl bg-[var(--sandstone-off-white)] p-3">
                    <p className="text-xs uppercase tracking-[0.24em] text-sandstone-gold">
                      Term
                    </p>
                    <p className="mt-2 font-semibold text-[var(--sandstone-navy)]">
                      {loanTerm} years
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
