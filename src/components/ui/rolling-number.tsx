"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const DIGITS = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9] as const;

interface RollingNumberProps {
  /** Digit to show (0-9). Roll animates from 9 down to this value. */
  digit: number;
  /** Optional suffix after the digit (e.g. "+") */
  suffix?: string;
  /** Delay before roll starts (seconds) */
  delay?: number;
  /** Duration of roll (seconds) */
  duration?: number;
  className?: string;
}

/**
 * Single digit with odometer-style roll animation when in view.
 * Uses a vertical strip of 0-9 and translates to show the target digit.
 */
export function RollingNumber({
  digit,
  suffix = "",
  delay = 0,
  duration = 0.6,
  className = "",
}: RollingNumberProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-20px" });

  /* Start with "9" in view (y: -9em), roll to target digit when in view */
  const startY = -9;
  const endY = -digit;

  return (
    <span className={`inline-flex items-baseline ${className}`}>
      <span
        ref={ref}
        className="inline-block overflow-hidden align-bottom leading-none"
        style={{ height: "1em" }}
      >
        <motion.span
          className="inline-flex flex-col"
          initial={{ y: `${startY}em` }}
          animate={isInView ? { y: `${endY}em` } : { y: `${startY}em` }}
          transition={{
            delay,
            duration,
            ease: [0.33, 1, 0.68, 1],
          }}
        >
          {DIGITS.map((d) => (
            <span
              key={d}
              className="inline-block text-center leading-none"
              style={{ height: "1em" }}
            >
              {d}
            </span>
          ))}
        </motion.span>
      </span>
      {suffix ? <span>{suffix}</span> : null}
    </span>
  );
}

/** Props for any rolling value: single digit, multi-digit, with comma and/or suffix */
interface RollingStatValueProps {
  /** Digits to roll (e.g. [1,5,0,0] for 1,500 or [0] for 0) */
  rollDigits: number[];
  /** Insert comma after this many digits (e.g. 1 → "1,500", 2 → "10,000"). Omit for no comma. */
  commaAfterIndex?: number;
  /** Optional suffix after digits (e.g. "+" for "0+") */
  suffix?: string;
  delay?: number;
  duration?: number;
  className?: string;
}

/**
 * Any rolling value: one or more digits, optional comma(s), optional suffix.
 * Examples: [0] + suffix "+" → "0+"; [1,5,0,0] + commaAfterIndex 1 → "1,500"; [1,0,0,0,0] + commaAfterIndex 2 → "10,000".
 */
export function RollingStatValue({
  rollDigits,
  commaAfterIndex,
  suffix = "",
  delay = 0,
  duration = 0.6,
  className = "",
}: RollingStatValueProps) {
  return (
    <span className={`inline-flex items-baseline ${className}`}>
      {rollDigits.map((digit, i) => (
        <span key={i} className="inline-flex items-baseline">
          <RollingNumber
            digit={digit}
            delay={delay + i * 0.06}
            duration={duration}
          />
          {commaAfterIndex != null && i === commaAfterIndex - 1 && i < rollDigits.length - 1 ? (
            <span aria-hidden>,</span>
          ) : null}
        </span>
      ))}
      {suffix ? <span>{suffix}</span> : null}
    </span>
  );
}
