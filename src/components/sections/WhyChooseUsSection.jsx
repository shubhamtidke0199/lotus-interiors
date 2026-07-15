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
      className="bg-white  py-12 md:px-6 sm:py-14 lg:px-8 lg:py-16"
    >
      <div className="container-site flex flex-col  lg:flex-row lg:items-stretch lg:gap-2">
        <figure className="relative h-80 w-full shrink-0 overflow-hidden  bg-why-choose-lavender shadow-[0px_4px_20px_rgba(0,0,0,0.08)] sm:h-[28rem] lg:h-auto lg:min-h-[36rem] lg:w-[45%]">
          <img
            src="/images/why-choose/illus.webp"
            alt="Isometric interior design illustration"
            className="absolute inset-0 size-full object-cover"
            loading="lazy"
          />
        </figure>

        <div className="relative min-h-[32rem] w-full overflow-hidden lg:min-h-[36rem] lg:flex-1">
          <div
            aria-hidden="true"
            className="why-choose-content-panel absolute inset-0"
          />
          <div aria-hidden="true" className="why-choose-noise absolute inset-0" />
          <img
            src="/images/why-choose/decorative-d.webp"
            alt=""
            aria-hidden="true"
            className="pointer-events-none absolute bottom-0 right-0 h-[80%] w-auto max-w-[90%] opacity-100"
            loading="lazy"
          />

          <div className="relative z-10 flex h-full flex-col gap-10 px-5 py-10 sm:px-8 lg:gap-12 lg:px-10 lg:py-14">
            <h2
              id="why-choose-us-title"
              className="type-display-heading max-w-lg text-white"
            >
              Designed for Comfort, Built with Excellence
            </h2>

            <div className="flex flex-col gap-10 lg:gap-12">
              {valuePropRows.map((row) => (
                <div
                  key={row[0].number}
                  className="grid gap-8 sm:grid-cols-2 sm:gap-x-12"
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
