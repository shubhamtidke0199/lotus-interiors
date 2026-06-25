import FormField, { SelectField, SubmitButton } from "@/components/ui/FormField";

export default function AppointmentSection() {
  return (
    <section
      aria-labelledby="appointment-title"
      className="bg-appointment-bg px-4 py-16 sm:px-8 lg:py-20"
    >
      <div className="mx-auto grid max-w-[1376px] gap-10 lg:grid-cols-[756px_578px] lg:gap-[42px]">
        <div className="bg-white px-6 py-12 sm:px-12 lg:px-12 lg:py-[60px]">
          <header className="mb-12 flex flex-col gap-4">
            <h2
              id="appointment-title"
              className="font-fraunces text-[28px] font-normal leading-8 text-heading sm:text-[32px]"
            >
              Book an Appointment
            </h2>
            <p className="font-fraunces text-xl italic leading-10 text-appointment-accent sm:text-2xl">
              Looks Beautiful in Design!
            </p>
          </header>

          <form className="flex flex-col gap-14">
            <div className="grid gap-14 sm:grid-cols-2 sm:gap-8">
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

        <aside className="relative min-h-[420px] lg:min-h-[719px]">
          <figure className="relative size-full min-h-[420px] overflow-hidden lg:min-h-[707px]">
            <img
              src="/images/appointment/consultation.webp"
              alt="Modern interior design render with arched doorway"
              className="absolute inset-0 size-full object-cover"
              loading="lazy"
            />
          </figure>

          <div className="appointment-contact-card absolute bottom-0 left-2 right-2 mx-auto max-w-[562px] px-6 py-6 lg:bottom-8 lg:left-4 lg:right-4">
            <h3 className="font-helvetica text-[15px] uppercase leading-4 tracking-[1px] text-nav">
              General Inquiries
            </h3>
            <address className="mt-4 not-italic">
              <p className="font-fraunces text-base leading-5 text-nav">
                <a
                  href="mailto:studio@antares.design"
                  className="transition-colors hover:text-primary"
                >
                  studio@antares.design
                </a>
              </p>
              <p className="mt-1 font-fraunces text-base leading-5 text-nav">
                <a href="tel:+9198XXXXXXXX" className="transition-colors hover:text-primary">
                  +91 98XXX XXXXX
                </a>
              </p>
            </address>
          </div>
        </aside>
      </div>
    </section>
  );
}
