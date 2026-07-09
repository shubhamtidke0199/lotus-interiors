import PrimaryButton from "@/components/ui/PrimaryButton";
import { blogsHero } from "@/data/blogsPageContent";

export default function BlogsPageHero() {
  return (
    <section aria-label="Blogs hero" className="relative px-5 pb-5 pt-2">
      <div className="relative mx-auto min-h-[520px] max-w-[1440px] overflow-hidden rounded-[40px] sm:min-h-[600px] sm:rounded-[60px] lg:min-h-[700px]">
        <img
          src={blogsHero.image}
          alt=""
          aria-hidden="true"
          className="absolute inset-0 size-full object-cover"
          loading="eager"
        />

        <div className="relative z-10 flex min-h-[520px] items-end p-6 sm:min-h-[600px] sm:p-10 lg:min-h-[700px] lg:px-[60px] lg:pb-[130px] lg:pt-[407px]">
          <div className="hero-content-panel w-full max-w-[710px] rounded-[28px] p-8 backdrop-blur-[27px] sm:rounded-[42px] sm:p-10">
            <h1 className="font-helvetica text-[24px] font-normal leading-10 text-white sm:text-[28px] lg:text-[32px]">
              {blogsHero.title}
            </h1>
            <p className="mt-4 max-w-[569px] font-helvetica text-base leading-[26px] text-white lg:text-lg">
              {blogsHero.description}
            </p>
            <PrimaryButton
              href="/contact"
              variant="hero"
              className="mt-6 w-full sm:mt-8 sm:w-auto"
            >
              Book a Free Consultation
            </PrimaryButton>
          </div>
        </div>
      </div>
    </section>
  );
}
