import PrimaryButton from "@/components/ui/PrimaryButton";
import { blogsHero } from "@/data/blogsPageContent";

export default function BlogsPageHero() {
  return (
    <section aria-label="Blogs hero" className="px-4 pb-4 sm:px-6 lg:px-8">
      <div className="container-site relative min-h-[28rem] overflow-hidden rounded-3xl sm:rounded-[2.5rem] lg:min-h-[36rem]">
        <img
          src={blogsHero.image}
          alt=""
          aria-hidden="true"
          className="absolute inset-0 size-full object-cover"
          loading="eager"
        />

        <div className="relative z-10 flex min-h-[28rem] flex-col justify-end p-5 sm:p-7 lg:min-h-[36rem] lg:px-12 lg:pb-12">
          <div className="hero-content-panel w-full max-w-xl rounded-2xl p-5 backdrop-blur-[20px] sm:rounded-3xl sm:p-7 lg:p-8">
            <h1 className="type-hero-heading text-white">{blogsHero.title}</h1>
            <p className="mt-3 max-w-lg font-helvetica text-sm font-normal leading-6 text-white sm:mt-4 sm:text-[0.9375rem] lg:text-base">
              {blogsHero.description}
            </p>
            <PrimaryButton
              href="/contact"
              variant="hero"
              className="mt-5 w-full sm:mt-6 sm:w-auto"
            >
              Book a Free Consultation
            </PrimaryButton>
          </div>
        </div>
      </div>
    </section>
  );
}
