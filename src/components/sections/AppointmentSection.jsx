import FormField, { SelectField, SubmitButton } from "@/components/ui/FormField";

export default function AppointmentSection() {
  return (
    <section
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

          <form className="flex flex-col gap-10">
            <div className="grid gap-10 sm:grid-cols-2 sm:gap-6">
              <FormField
                id="full-name"
                label="Full Name"
                placeholder="e.g. Julianne Smith"
              />
              <FormField
                id="contact-number"
                label="Contact Number"
                type="tel"
                placeholder="+91 00000 00000"
              />
            </div>
            <SelectField id="project-location" label="Project Location" />
            <FormField
              id="requirement-brief"
              label="Requirement Brief"
              as="textarea"
              placeholder="Describe your vision, approximate area, and style preferences..."
            />
            <SubmitButton />
          </form>
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

          <div className="bg-transparent font-fraunces backdrop-blur-sm border-white/60 border absolute bottom-0 left-2 right-2 mx-auto max-w-full px-5 py-5 lg:bottom-6 lg:left-3 lg:right-3 rounded-3xl">
            <h3 className=" text-sm font-semibold uppercase leading-4 tracking-wide text-nav">
              General Inquiries
            </h3>
            <address className="mt-3 not-italic">
              <p className="font-fraunces text-sm leading-5 text-nav">
                <a
                  href="mailto:studio@antares.design"
                  className="transition-colors hover:text-primary"
                >
                  studio@antares.design
                </a>
              </p>
              <p className="mt-1 font-fraunces text-sm leading-5 text-nav">
                <a
                  href="tel:+9198XXXXXXXX"
                  className="transition-colors hover:text-primary"
                >
                  +91 9834567890
                </a>
              </p>
            </address>
          </div>
        </aside>
      </div>
    </section>
  );
}
