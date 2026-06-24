import LocationCard from "@/components/ui/LocationCard";
import PrimaryButton from "@/components/ui/PrimaryButton";
import SectionIntro from "@/components/ui/SectionIntro";
import { locations } from "@/data/landingContent";

export default function PresenceSection() {
  return (
    <section
      aria-labelledby="presence-title"
      className="bg-white px-4 py-16 sm:px-6 lg:px-8 lg:py-[70px]"
    >
      <div className="mx-auto flex max-w-[1440px] flex-col gap-12">
        <SectionIntro
          eyebrow="Presence"
          title="Design Excellence in Your City"
          titleId="presence-title"
          description="Designing elegant spaces with complete solutions from planning to execution."
        />

        <div className="grid gap-5 xl:grid-cols-[560px_minmax(0,1fr)]">
          <article className="relative flex min-h-[460px] flex-col justify-between overflow-hidden bg-accent-lavender/20 p-10">
            <img
              src="/images/locations/promo-bg.webp"
              alt=""
              aria-hidden="true"
              className="absolute right-0 top-0 h-full w-[70%] max-w-none object-cover opacity-80"
              loading="lazy"
            />
            <div className="relative z-10 flex max-w-[310px] flex-col gap-6">
              <div className="flex flex-col gap-2">
                <p className="font-fraunces text-base font-normal uppercase leading-6 tracking-[var(--tracking-eyebrow)] text-services-eyebrow">
                  Looks Beautiful in Design!
                </p>
                <h3 className="font-fraunces text-[28px] font-semibold leading-10 tracking-[var(--tracking-heading)] text-heading sm:text-[32px]">
                  But how will it feel in your Space?
                </h3>
              </div>
              <PrimaryButton href="/contact" variant="filled">
                Book a Consultation
              </PrimaryButton>
            </div>
            <p className="relative z-10 max-w-[219px] font-fraunces text-base leading-[26px] text-heading">
              Discover Custom Interiors Made for You
            </p>
          </article>

          <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
            {locations.map((location) => (
              <LocationCard key={location.city} {...location} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
