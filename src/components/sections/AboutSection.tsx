import { ABOUT_HEADLINE, ABOUT_WHAT_WE_DO } from "@/constants/site";

export function AboutSection() {
  return (
    <section
      id="about"
      className="scroll-mt-20 bg-gradient-to-br from-[var(--sandstone-navy)] via-[var(--sandstone-navy-deep)] to-[#202d62] py-14 md:py-18"
    >
      <div className="container mx-auto max-w-3xl px-4 text-center">
        <div className="rounded-3xl border border-white/20 bg-white/10 p-8 backdrop-blur-md md:p-10">
          <h2 className="font-heading text-2xl font-bold text-white md:text-3xl">
            {ABOUT_HEADLINE}
          </h2>
          <p className="mt-4 leading-relaxed text-white/82">
            {ABOUT_WHAT_WE_DO}
          </p>
        </div>
      </div>
    </section>
  );
}
