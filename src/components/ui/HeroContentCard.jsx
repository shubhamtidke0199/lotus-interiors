import PrimaryButton from "@/components/ui/PrimaryButton";

export default function HeroContentCard() {
  return (
    <div className="hero-content-panel w-full max-w-[710px] rounded-[28px] p-6 backdrop-blur-[27px] sm:rounded-[42px] sm:p-8 lg:p-10">
      <h1 className="font-helvetica text-[24px] font-normal leading-10 text-white sm:text-[28px] lg:text-[32px]">
        Crafting Beautiful Interiors with Expertise
      </h1>
      <p className="mt-4 max-w-[569px] font-helvetica text-[15px] font-normal leading-[26px] text-white sm:mt-6 sm:text-base lg:text-lg">
        Antares Interior Design Studio specializes in creating elegant,
        functional, and modern spaces. We work on residential, commercial, and
        hospitality projects with complete design and execution services.
      </p>
      <PrimaryButton
        href="/contact"
        variant="hero"
        className="mt-6 w-full sm:mt-8 sm:w-auto"
      >
        BOOK A FREE CONSULTATION
      </PrimaryButton>
    </div>
  );
}
