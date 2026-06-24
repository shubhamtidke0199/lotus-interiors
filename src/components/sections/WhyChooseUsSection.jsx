import ValuePropItem from "@/components/ui/ValuePropItem";
import { valueProps } from "@/data/landingContent";

export default function WhyChooseUsSection() {
  return (
    <section aria-labelledby="why-choose-us-title" className="bg-white px-4 py-16 sm:px-6 lg:px-8 lg:py-[60px]">
      <div className="mx-auto flex max-w-[1440px] flex-col gap-8 lg:flex-row lg:gap-6">
        <figure className="relative min-h-[420px] flex-1 overflow-hidden border-[10px] border-white bg-[#f3f3f3] shadow-[0px_4px_24px_rgba(0,0,0,0.08)] lg:min-h-[929px] lg:max-w-[671px]">
          <img
            src="/images/why-choose/illustration.webp"
            alt="Isometric interior design illustration"
            className="absolute inset-0 size-full object-cover"
            loading="lazy"
          />
        </figure>

        <div className="flex flex-1 flex-col justify-center bg-services-watermark px-6 py-12 sm:px-10 lg:px-[50px] lg:py-[90px]">
          <h2
            id="why-choose-us-title"
            className="mb-12 max-w-[580px] font-fraunces text-[28px] font-semibold leading-10 tracking-[var(--tracking-heading)] text-heading sm:text-[32px] lg:mb-16 lg:text-[36px]"
          >
            Designed for Comfort, Built with Excellence
          </h2>

          <div className="grid gap-10 sm:grid-cols-2 sm:gap-x-[64px] sm:gap-y-12">
            {valueProps.map((item) => (
              <ValuePropItem key={item.number} {...item} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
