import ServiceCard from "@/components/ui/ServiceCard";
import ServicesSectionHeader from "@/components/ui/ServicesSectionHeader";
import { servicesById } from "@/data/servicesContent";

const titleId = "services-heading";

export default function ServicesSection() {
  const residence = servicesById.residence;
  const commercial = servicesById.commercial;
  const hospital = servicesById.hospital;
  const consultancy = servicesById.consultancy;
  const furniture = servicesById.furniture;
  const projectManagement = servicesById["project-management"];

  return (
    <section
      aria-labelledby={titleId}
      className="overflow-x-hidden bg-white px-4 pb-16 pt-8 sm:px-6 lg:px-8 lg:pb-20"
    >
      <div className="mx-auto max-w-[1440px]">
        <ServicesSectionHeader titleId={titleId} />

        <div className="flex flex-col gap-4 sm:gap-5">
          <div className="grid grid-cols-1 gap-4 sm:gap-5 xl:grid-cols-[minmax(0,872fr)_minmax(0,496fr)] xl:grid-rows-[400px_330px] xl:gap-x-2">
            <ServiceCard
              {...residence}
              className="h-[260px] sm:h-[360px] xl:col-start-1 xl:row-start-1 xl:h-[400px]"
            />
            <ServiceCard
              {...commercial}
              className="h-[280px] sm:h-[400px] xl:col-start-2 xl:row-span-2 xl:row-start-1 xl:h-[750px]"
            />
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-[14px] xl:col-start-1 xl:row-start-2">
              <ServiceCard {...hospital} className="h-[240px] sm:h-[280px] xl:h-[330px]" />
              <ServiceCard {...consultancy} className="h-[240px] sm:h-[280px] xl:h-[330px]" />
            </div>
          </div>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-[12px]">
            <ServiceCard {...furniture} className="h-[260px] sm:h-[280px] xl:h-[330px]" />
            <ServiceCard
              {...projectManagement}
              className="h-[260px] sm:h-[280px] xl:h-[330px]"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
