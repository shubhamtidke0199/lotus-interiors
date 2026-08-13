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
      id="services"
      aria-labelledby={titleId}
      className="overflow-x-hidden bg-white px-4 pb-12 pt-6 sm:px-6 lg:px-8 lg:pb-16"
    >
      <div className="container-site">
        <ServicesSectionHeader titleId={titleId} />

        <div className="flex flex-col gap-3 sm:gap-4">
          <div className="grid grid-cols-1 gap-3 sm:gap-4 xl:grid-cols-[minmax(0,1.75fr)_minmax(0,1fr)] xl:grid-rows-[minmax(0,20rem)_minmax(0,16rem)] xl:gap-x-2">
            <ServiceCard
              {...residence}
              href="/services#residence"
              className="h-56 sm:h-72 xl:col-start-1 xl:row-start-1 xl:h-full"
            />
            <ServiceCard
              {...commercial}
              href="/services#commercial"
              className="h-64 sm:h-80 xl:col-start-2 xl:row-span-2 xl:row-start-1 xl:h-full"
            />
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-3 xl:col-start-1 xl:row-start-2">
              <ServiceCard
                {...hospital}
                href="/services#hospital"
                className="h-52 sm:h-60 xl:h-full"
              />
              <ServiceCard
                {...consultancy}
                href="/services#consultancy"
                className="h-52 sm:h-60 xl:h-full"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-3">
            <ServiceCard
              {...furniture}
              href="/services#furniture"
              className="h-56 sm:h-60 xl:h-72"
            />
            <ServiceCard
              {...projectManagement}
              href="/services#project-management"
              className="h-56 sm:h-60 xl:h-72"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
