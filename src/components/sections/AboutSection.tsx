import { ABOUT_HEADLINE, ABOUT_WHAT_WE_DO } from "@/constants/site";

export function AboutSection() {
  return (
    <section
      id="about"
      className="scroll-mt-20 bg-white py-14 md:py-18"
    >
      <div className="container mx-auto max-w-2xl px-4 text-center">
        <h2 className="font-heading text-2xl font-bold text-[var(--sandstone-charcoal)] md:text-3xl">
          {ABOUT_HEADLINE}
        </h2>
        <p className="mt-4 text-[var(--sandstone-charcoal)]/85 leading-relaxed">
          {ABOUT_WHAT_WE_DO}
        </p>
      </div>
    </section>
  );
}
