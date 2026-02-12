"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { NEWS_ITEMS } from "@/constants/site";

export function NewsSection() {
  return (
    <section
      id="news"
      className="relative overflow-hidden bg-gradient-to-br from-sandstone-maroon via-sandstone-navy to-sandstone-bronze/80 py-[56px] md:py-[70px] scroll-mt-20"
    >
      <div className="pointer-events-none absolute inset-0 bg-black/35" aria-hidden />
      <div className="pointer-events-none absolute -top-24 right-8 h-64 w-64 rounded-full bg-sandstone-bronze/28 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-28 left-8 h-56 w-56 rounded-full bg-white/14 blur-3xl" />
      <div className="container relative z-10 mx-auto max-w-5xl px-4">
        <div className="section-frame p-[28px] md:p-[35px]">
          <motion.h2
            className="font-heading text-2xl font-bold text-sandstone-gold mb-[35px] text-center md:text-3xl"
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            News
          </motion.h2>
          <div className="grid gap-[28px] sm:grid-cols-3">
            {NEWS_ITEMS.map((item, i) => (
              <motion.article
                key={i}
                className="flex flex-col rounded-xl border border-white/70 bg-white/70 p-[14px] shadow-[0_15px_30px_-25px_rgba(37,52,113,0.38)] backdrop-blur-md"
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
              >
                <div className="relative aspect-[4/3] w-full overflow-hidden rounded-lg bg-sandstone-base/30">
                  <Image
                    src={`/news/${i + 1}.jpg`}
                    alt=""
                    fill
                    className="object-cover"
                    sizes="(max-width: 640px) 100vw, 33vw"
                    unoptimized
                    onError={(e) => {
                      e.currentTarget.style.display = "none";
                    }}
                  />
                </div>
                <h3 className="mt-[14px] font-heading text-lg font-bold text-sandstone-gold">
                  {item.title}
                </h3>
                <p className="mt-[7px] text-sm text-sandstone-text/80 leading-relaxed line-clamp-3">
                  {item.description}
                </p>
              </motion.article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
