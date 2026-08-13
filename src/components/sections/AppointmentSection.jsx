"use client";

import ContactForm from "@/components/ui/ContactForm";
import { studioContact } from "@/data/landingContent";

export default function AppointmentSection() {
  return (
    <section
      id="appointment"
      aria-labelledby="appointment-title"
      className="bg-appointment-bg py-12 md:px-6 lg:px-8 lg:py-16"
    >
      <div className="container-site grid gap-8 lg:grid-cols-[minmax(0,1.25fr)_minmax(0,1fr)] lg:gap-10">
        <div className="bg-white px-5 py-10 sm:px-10 lg:px-10 lg:py-12">
          <header className="mb-8 flex flex-col gap-3">
            <h2
              id="appointment-title"
              className="type-section-heading font-normal text-heading"
            >
              Book an Appointment
            </h2>
            <p className="font-fraunces text-lg italic leading-8 text-appointment-accent sm:text-xl">
              Looks Beautiful in Design!
            </p>
          </header>

          <ContactForm source="appointment" submitLabel="Submit Request" />
        </div>

        <aside className="relative min-h-80 lg:min-h-full">
          <figure className="relative size-full min-h-80 overflow-hidden lg:min-h-[32rem]">
            <img
              src="/images/appointment/consultation.webp"
              alt="Modern interior design render with arched doorway"
              className="absolute inset-0 size-full object-cover object-center"
              loading="lazy"
            />
          </figure>

          <div className="absolute bottom-4 left-2 right-2 mx-auto max-w-full rounded-3xl border border-white/60 bg-white/40 px-5 py-5 font-fraunces backdrop-blur-sm lg:bottom-6 lg:left-3 lg:right-3">
            <h3 className="text-sm font-semibold uppercase leading-4 tracking-wide text-nav">
              General Inquiries
            </h3>
            <address className="mt-3 not-italic">
              <p className="font-fraunces text-sm leading-5 text-nav">
                <a
                  href={`mailto:${studioContact.email}`}
                  className="transition-colors hover:text-primary"
                >
                  {studioContact.email}
                </a>
              </p>
              <p className="mt-1 font-fraunces text-sm leading-5 text-nav">
                <a
                  href={studioContact.phoneHref}
                  className="transition-colors hover:text-primary"
                >
                  {studioContact.phoneDisplay}
                </a>
              </p>
              <p className="mt-2 font-fraunces text-sm leading-5 text-muted">
                {studioContact.address}
              </p>
            </address>
          </div>
        </aside>
      </div>
    </section>
  );
}
