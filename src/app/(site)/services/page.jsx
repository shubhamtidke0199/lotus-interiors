import Link from "next/link";
import Reveal from "@/components/ui/Reveal";
import PrimaryButton from "@/components/ui/PrimaryButton";
import ServiceCard from "@/components/ui/ServiceCard";
import { services } from "@/data/servicesContent";

export const metadata = {
  title: "Services",
  description:
    "Residence, commercial, hospitality, furniture, consultancy, and project management services from Lotus Design Studio.",
};

const serviceCopy = {
  residence:
    "Full-home interiors that balance atmosphere, storage, and everyday ease.",
  commercial:
    "Workplaces and retail environments designed for clarity, brand, and flow.",
  hospital:
    "Healthcare spaces planned for hygiene, wayfinding, and patient calm.",
  consultancy:
    "Concept direction, material boards, and design guidance for selective projects.",
  furniture:
    "Bespoke and curated pieces finished to match your architectural narrative.",
  "project-management":
    "Coordinated execution from procurement to installation with clear milestones.",
};

export default function ServicesPage() {
  return (
    <main className="bg-white">
      <section className="px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
        <div className="container-site">
          <Reveal>
            <p className="type-eyebrow text-eyebrow">Services</p>
            <h1 className="type-display-heading mt-3 max-w-3xl text-heading">
              End-to-end design for homes, workplaces, and hospitality.
            </h1>
            <p className="mt-5 max-w-2xl font-fraunces text-base leading-7 text-muted">
              From the first conversation to the final styling pass, Lotus
              manages concept, detailing, furniture, and delivery as one
              continuous craft.
            </p>
          </Reveal>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
            {services.map((service, index) => (
              <Reveal key={service.id} delay={index * 60}>
                <div className="flex flex-col gap-4">
                  <ServiceCard {...service} className="h-64 sm:h-72" href={`/services#${service.id}`} />
                  <div id={service.id} className="scroll-mt-28 px-1">
                    <h2 className="font-fraunces text-lg text-heading">
                      {service.title}
                    </h2>
                    <p className="mt-2 font-fraunces text-sm leading-6 text-muted">
                      {serviceCopy[service.id]}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>

          <div className="mt-14 flex flex-wrap items-center gap-4 border-t border-product-bg pt-10">
            <PrimaryButton href="/contact" variant="filled">
              GET Appointment
            </PrimaryButton>
            <Link
              href="/portfolio"
              className="font-fraunces text-sm uppercase tracking-[var(--tracking-cta)] text-primary underline-offset-4 hover:underline"
            >
              See selected work
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
