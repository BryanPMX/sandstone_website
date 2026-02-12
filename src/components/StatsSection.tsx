"use client";

import { motion } from "framer-motion";
import { STATS } from "@/constants/site";
import { RollingStatValue } from "@/components/ui/rolling-number";

export function StatsSection() {
  return (
    <section className="bg-sandstone-navy py-16 md:py-20">
      <div className="container mx-auto max-w-6xl px-4">
        <motion.div
          className="grid grid-cols-2 gap-8 sm:grid-cols-3 lg:grid-cols-6"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.4, staggerChildren: 0.06 }}
        >
          {STATS.map((stat, i) => (
            <motion.div
              key={stat.label}
              className="text-center"
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.4 }}
            >
              <p className="font-heading text-2xl font-bold text-sandstone-base md:text-3xl min-h-[1.5em] flex items-center justify-center">
                <RollingStatValue
                  rollDigits={stat.rollDigits}
                  commaAfterIndex={stat.commaAfterIndex}
                  suffix={stat.suffix}
                  delay={i * 0.06}
                  duration={0.7}
                />
              </p>
              <p className="mt-1 text-xs font-medium uppercase tracking-wider text-white/80">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
