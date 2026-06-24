import ValuePropItem from "@/components/ui/ValuePropItem";
import { valueProps } from "@/data/landingContent";

const valuePropRows = [
  valueProps.slice(0, 2),
  valueProps.slice(2, 4),
  valueProps.slice(4, 6),
];

export default function WhyChooseUsSection() {
  return (
    <section
      aria-labelledby="why-choose-us-title"
      className="bg-white px-4 py-16 sm:px-8 sm:py-[60px]"
    >
      <div className="mx-auto flex max-w-[1440px] flex-col gap-8 lg:flex-row lg:items-stretch lg:gap-[25px]">
        <figure className="relative h-[420px] w-full shrink-0 overflow-hidden border-[10px] border-white bg-why-choose-lavender shadow-[0px_4px_24px_rgba(0,0,0,0.08)] sm:h-[560px] lg:h-[929px] lg:w-[671px]">
          <img
            src="/images/why-choose/illus.webp"
            alt="Isometric interior design illustration"
            className="absolute inset-0 size-full object-cover"
            loading="lazy"
          />
        </figure>

        <div className="relative min-h-[640px] w-full overflow-hidden lg:min-h-[929px] lg:w-[695px]">
          <div aria-hidden="true" className="why-choose-content-panel absolute inset-0" />
          <div aria-hidden="true" className="why-choose-noise absolute inset-0" />
          <img
            src="/images/why-choose/decorative-d.webp"
            alt=""
            aria-hidden="true"
            className="pointer-events-none absolute bottom-0 right-0 h-[698px] w-[641px] max-w-none opacity-100"
            loading="lazy"
          />

          <div className="relative z-10 flex h-full flex-col gap-[52px] px-6 py-12 sm:px-10 lg:px-[50px] lg:py-[90px]">
            <h2
              id="why-choose-us-title"
              className="max-w-[580px] font-fraunces text-[32px] font-normal leading-[44px] tracking-[0.48px] text-white sm:text-[40px] sm:leading-[52px] lg:text-[48px] lg:leading-[60px]"
            >
              Designed for Comfort, Built with Excellence
            </h2>

            <div className="flex flex-col gap-[52px]">
              {valuePropRows.map((row) => (
                <div
                  key={row[0].number}
                  className="grid gap-10 sm:grid-cols-2 sm:gap-x-16"
                >
                  {row.map((item) => (
                    <ValuePropItem key={item.number} {...item} />
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
