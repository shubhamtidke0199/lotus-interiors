import PrimaryButton from "@/components/ui/PrimaryButton";

export default function HeroContentCard() {
  return (
    <div className="hero-content-panel animate-[fadeUp_0.9s_ease_both] w-full max-w-xl rounded-2xl p-5 backdrop-blur-[20px] sm:rounded-3xl sm:p-7 lg:p-8">
      <p className="mb-3 font-fraunces text-xs uppercase tracking-[0.18em] text-white/80">
        Lotus Design Studio
      </p>
      <h1 className="type-hero-heading text-white">
        Crafting Beautiful Interiors with Expertise
      </h1>
      <p className="mt-3 max-w-lg font-helvetica text-sm font-normal leading-6 text-white sm:mt-4 sm:text-[0.9375rem] lg:text-base">
        Lotus Design Studio specializes in creating elegant, functional, and
        modern spaces. We work on residential, commercial, and hospitality
        projects with complete design and execution services.
      </p>
      <PrimaryButton
        href="/contact"
        variant="hero"
        className="mt-5 w-full sm:mt-6 sm:w-auto"
      >
        BOOK A FREE CONSULTATION
      </PrimaryButton>
    </div>
  );
}
