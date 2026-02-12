"use client";

import { motion } from "framer-motion";
import type { PropertyCard } from "@/types";
import { PropertyCard as PropertyCardComponent } from "./PropertyCard";

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.08 },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

interface BentoGridProps {
  /** Listings to display. Injected by page or data layer (Dependency Inversion). */
  properties: PropertyCard[];
  /** Optional section heading */
  title?: string;
  /** Optional section subtitle */
  subtitle?: string;
  /** Show intro block when used as standalone section */
  showHeader?: boolean;
}

/**
 * Presentational grid: renders a list of property cards.
 * Single responsibility: layout and animation; does not own data source.
 */
export function BentoGrid({
  properties,
  title = "Featured Properties",
  subtitle = "Curated luxury listings for the discerning buyer",
  showHeader = true,
}: BentoGridProps) {
  return (
    <div className="container mx-auto max-w-7xl px-4">
      {showHeader ? (
        <motion.div
          className="mb-12 text-center"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="font-heading text-3xl font-bold text-sandstone-gold md:text-4xl">
            {title}
          </h2>
          <p className="mt-2 text-sandstone-text/80">{subtitle}</p>
        </motion.div>
      ) : null}

      <motion.div
        className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3"
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-60px" }}
      >
        {properties.map((property) => (
          <motion.div key={property.id} variants={item}>
            <PropertyCardComponent property={property} />
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
