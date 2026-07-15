import SectionHeader from "@/components/ui/SectionHeader";
import ProcessStepCard from "@/components/ui/ProcessStepCard";
import { designProcessSteps } from "@/data/designProcessSteps";

const titleId = "design-process-heading";

export default function DesignProcessSection() {
  return (
    <section
      aria-labelledby={titleId}
      className="bg-white px-4 pb-12 pt-10 sm:px-6 lg:px-8 lg:pb-12 lg:pt-14"
    >
      <div className="container-site">
        <SectionHeader
          eyebrow="DESIGN PROCESS"
          title="How We Bring Your Space to Life"
          titleId={titleId}
        />

        <ol className="mt-8 grid grid-cols-1 gap-y-12 md:grid-cols-2 md:gap-x-10 xl:mt-10 xl:grid-cols-4 xl:gap-y-0 ">
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
                  index === designProcessSteps.length - 2 ? "w-60" : "w-56"
                }
              />
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
