"use client";

import { useActionState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { submitLead } from "@/actions/submit-lead";
import type { SubmitLeadState } from "@/types";
import { CONTACT_HEADLINE, CONTACT_SUBHEADLINE, CONTACT_CTA } from "@/constants/site";

const initialState: SubmitLeadState | null = null;

export function ContactForm() {
  const [state, formAction, isPending] = useActionState(
    submitLead,
    initialState
  );

  return (
    <section id="contact" className="py-16 md:py-24 scroll-mt-20">
      <div className="container mx-auto max-w-3xl px-4">
        <div className="section-frame p-6 sm:p-8 md:p-10">
          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="font-heading text-3xl font-bold text-sandstone-navy md:text-4xl">
              {CONTACT_HEADLINE}
            </h2>
            <p className="mt-2 text-sandstone-text/80">
              {CONTACT_SUBHEADLINE}
            </p>
          </motion.div>

          <motion.div
            className="panel-glass mt-8 p-6 sm:p-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <form action={formAction} className="space-y-6">
            {state?.success === true && (
              <p className="rounded-lg bg-green-100 px-4 py-3 text-sm font-medium text-green-800">
                {state.message}
              </p>
            )}
            {state?.success === false && state.error && (
              <p className="rounded-lg bg-red-50 px-4 py-3 text-sm font-medium text-red-800">
                {state.error}
              </p>
            )}

            <div className="grid gap-6 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="firstName">First name</Label>
                <Input
                  id="firstName"
                  name="firstName"
                  placeholder="Jane"
                  required
                  disabled={isPending}
                  className={state?.success === false && state.fieldErrors?.firstName ? "border-red-500" : ""}
                />
                {state?.success === false && state.fieldErrors?.firstName && (
                  <p className="text-xs text-red-600">
                    {state.fieldErrors.firstName[0]}
                  </p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName">Last name</Label>
                <Input
                  id="lastName"
                  name="lastName"
                  placeholder="Smith"
                  required
                  disabled={isPending}
                  className={state?.success === false && state.fieldErrors?.lastName ? "border-red-500" : ""}
                />
                {state?.success === false && state.fieldErrors?.lastName && (
                  <p className="text-xs text-red-600">
                    {state.fieldErrors.lastName[0]}
                  </p>
                )}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="jane@example.com"
                required
                disabled={isPending}
                className={state?.success === false && state.fieldErrors?.email ? "border-red-500" : ""}
              />
              {state?.success === false && state.fieldErrors?.email && (
                <p className="text-xs text-red-600">
                  {state.fieldErrors.email[0]}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone">Phone</Label>
              <Input
                id="phone"
                name="phone"
                type="tel"
                placeholder="(555) 123-4567"
                required
                disabled={isPending}
                className={state?.success === false && state.fieldErrors?.phone ? "border-red-500" : ""}
              />
              {state?.success === false && state.fieldErrors?.phone && (
                <p className="text-xs text-red-600">
                  {state.fieldErrors.phone[0]}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="message">Message</Label>
              <Textarea
                id="message"
                name="message"
                placeholder="Tell us about your real estate goals..."
                rows={4}
                disabled={isPending}
                className={state?.success === false && state.fieldErrors?.message ? "border-red-500" : ""}
              />
              {state?.success === false && state.fieldErrors?.message && (
                <p className="text-xs text-red-600">
                  {state.fieldErrors.message[0]}
                </p>
              )}
            </div>

              <Button
                type="submit"
                size="lg"
                className="w-full sm:w-auto uppercase tracking-wider"
                disabled={isPending}
              >
                {isPending ? "Sending..." : CONTACT_CTA}
              </Button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
