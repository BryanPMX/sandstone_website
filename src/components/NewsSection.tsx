"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { NEWS_ITEMS } from "@/constants/site";

export function NewsSection() {
  return (
    <section
      id="news"
      className="py-12 md:py-16 scroll-mt-20"
    >
      <div className="container mx-auto max-w-5xl px-4">
        <div className="section-frame p-6 md:p-8">
          <motion.h2
            className="font-heading text-2xl font-bold text-sandstone-navy mb-8 text-center md:text-3xl"
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            News
          </motion.h2>
          <div className="grid gap-6 sm:grid-cols-3">
            {NEWS_ITEMS.map((item, i) => (
              <motion.article
                key={i}
                className="flex flex-col rounded-xl border border-white/70 bg-white/70 p-3 shadow-[0_15px_30px_-25px_rgba(90,34,50,0.4)] backdrop-blur-md"
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
                <h3 className="mt-3 font-heading text-lg font-bold text-sandstone-navy">
                  {item.title}
                </h3>
                <p className="mt-1 text-sm text-sandstone-text/80 line-clamp-3">
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
