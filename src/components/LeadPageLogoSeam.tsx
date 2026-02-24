import Image from "next/image";

export function LeadPageLogoSeam() {
  return (
    <div
      aria-hidden
      className="relative isolate overflow-hidden bg-[var(--sandstone-navy)]"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-[var(--sandstone-navy)] via-[var(--sandstone-navy-deep)] to-[var(--sandstone-off-white)]" />
      <div className="absolute inset-x-0 bottom-0 h-10 bg-gradient-to-b from-transparent to-[var(--sandstone-off-white)] md:h-14" />

      <div className="relative mx-auto flex h-[92px] max-w-6xl items-start justify-center px-4 md:h-[108px] lg:h-[124px]">
        <div className="absolute top-6 h-10 w-40 rounded-full bg-[var(--sandstone-sand-gold)]/20 blur-2xl md:top-7 md:h-12 md:w-52" />
        <div className="relative mt-2 h-[78px] w-[106px] md:mt-2 md:h-[90px] md:w-[124px] lg:mt-1 lg:h-[110px] lg:w-[150px]">
          <Image
            src="/desktop-hero-logo.webp"
            alt=""
            fill
            className="object-contain drop-shadow-[0_6px_18px_rgba(183,150,120,0.16)]"
            sizes="(min-width: 1024px) 150px, (min-width: 768px) 124px, 106px"
            priority
          />
        </div>
      </div>
    </div>
  );
}
