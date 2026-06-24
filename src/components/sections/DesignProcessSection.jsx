import SectionHeader from "@/components/ui/SectionHeader";
import ProcessStepCard from "@/components/ui/ProcessStepCard";
import { designProcessSteps } from "@/data/designProcessSteps";

const titleId = "design-process-heading";

export default function DesignProcessSection() {
  return (
    <section
      aria-labelledby={titleId}
      className="bg-white px-4 pb-16 pt-12 sm:px-6 lg:px-8 lg:pb-[47px] lg:pt-[70px]"
    >
      <div className="mx-auto max-w-[1440px]">
        <SectionHeader
          eyebrow="DESIGN PROCESS"
          title="How We Bring Your Space to Life"
          titleId={titleId}
        />

        <ol className="mt-10 grid grid-cols-1 gap-y-16 md:grid-cols-2 md:gap-x-[45px] xl:mt-[40px] xl:grid-cols-4 xl:gap-y-0">
          {designProcessSteps.map((item, index) => (
            <li key={item.step} className="list-none">
              <ProcessStepCard
                {...item}
                isLast={index === designProcessSteps.length - 1}
                connectorSrc={
                  index === designProcessSteps.length - 2
                    ? "/images/design-process/connector-last.svg"
                    : "/images/design-process/connector.svg"
                }
                connectorWidthClass={
                  index === designProcessSteps.length - 2
                    ? "w-[284px]"
                    : "w-[268px]"
                }
              />
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
