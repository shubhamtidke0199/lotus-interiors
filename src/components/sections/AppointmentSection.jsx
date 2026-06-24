import FormField, { SubmitButton } from "@/components/ui/FormField";

export default function AppointmentSection() {
  return (
    <section
      aria-labelledby="appointment-title"
      className="bg-white px-4 py-16 sm:px-6 lg:px-8 lg:py-20"
    >
      <div className="mx-auto grid max-w-[1440px] gap-10 lg:grid-cols-[756px_minmax(0,1fr)] lg:gap-[42px]">
        <div className="bg-accent-lavender/10 px-6 py-12 sm:px-12 lg:px-12 lg:py-[60px]">
          <header className="mb-12 flex flex-col gap-4">
            <p className="font-fraunces text-base font-normal uppercase leading-8 tracking-[var(--tracking-eyebrow)] text-services-eyebrow">
              Book an Appointment
            </p>
            <h2
              id="appointment-title"
              className="font-fraunces text-[28px] font-semibold leading-10 tracking-[var(--tracking-heading)] text-heading sm:text-[32px]"
            >
              Looks Beautiful in Design!
            </h2>
          </header>

          <form className="flex flex-col gap-8">
            <div className="grid gap-8 sm:grid-cols-2">
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
            <FormField
              id="project-location"
              label="Project Location"
              placeholder="Select City"
            />
            <FormField
              id="requirement-brief"
              label="Requirement Brief"
              as="textarea"
              placeholder="Describe your vision, approximate area, and style preferences..."
            />
            <SubmitButton />
          </form>
        </div>

        <aside className="relative flex flex-col">
          <figure className="relative min-h-[420px] flex-1 overflow-hidden lg:min-h-[707px]">
            <img
              src="/images/appointment/consultation.webp"
              alt="Design consultation at Lotus Design Studio"
              className="absolute inset-0 size-full object-cover"
              loading="lazy"
            />
          </figure>

          <div className="relative z-10 -mt-16 mx-2 bg-white/95 px-6 py-6 backdrop-blur-sm">
            <h3 className="font-helvetica text-[15px] uppercase leading-4 tracking-[1px] text-muted">
              General Inquiries
            </h3>
            <address className="mt-4 not-italic">
              <p className="font-helvetica text-base leading-5 text-nav">
                <a
                  href="mailto:studio@antares.design"
                  className="transition-colors hover:text-primary"
                >
                  studio@antares.design
                </a>
              </p>
              <p className="mt-1 font-helvetica text-base leading-5 text-nav">
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
