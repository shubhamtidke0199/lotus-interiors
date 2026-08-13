import Link from "next/link";
import ArrowIcon from "@/components/icons/ArrowIcon";
import LocationsCarousel from "@/components/ui/LocationsCarousel";
import SectionIntro from "@/components/ui/SectionIntro";
import { locations } from "@/data/landingContent";

function PresencePromoCard() {
  return (
    <article className="relative flex h-80 w-full shrink-0 flex-col overflow-hidden bg-[#faf9fc] sm:h-[26rem] md:w-[28rem] md:min-w-[28rem] lg:w-[30rem] lg:min-w-[30rem]">
      <img
        src="/images/presence/background.webp"
        alt=""
        aria-hidden="true"
        className="absolute right-0 top-0 h-full w-[72%] max-w-none object-contain object-right"
        loading="lazy"
      />

      <div className="relative z-10 flex h-full max-w-[18rem] flex-col justify-between px-5 py-8 sm:px-8 sm:py-10">
        <div>
          <p className="font-fraunces text-lg font-light italic leading-8 text-muted sm:text-2xl sm:leading-9">
            Looks Beautiful in Design!
          </p>

          <h3 className="mt-3 font-fraunces text-lg leading-7 tracking-wide text-nav sm:mt-4 sm:text-xl sm:leading-7">
            But how will it feel in your Space?
          </h3>

          <Link
            href="/contact"
            className="mt-5 inline-flex w-fit items-center gap-3 bg-primary px-6 py-3.5 transition-colors hover:bg-primary/90 sm:mt-6"
          >
            <span className="font-fraunces text-xs uppercase leading-5 tracking-[var(--tracking-cta)] text-white">
              Book a Consultation
            </span>
            <ArrowIcon className="text-white" />
          </Link>
        </div>

        <p className="font-fraunces text-sm italic leading-6 tracking-wide text-services-eyebrow">
          Discover Custom Interiors
          <br />
          Made for You
        </p>
      </div>
    </article>
  );
}

export default function PresenceSection() {
  return (
    <section
      id="presence"
      aria-labelledby="presence-title"
      className="scroll-mt-28 bg-white px-4 py-12 sm:px-6 lg:px-8 lg:py-14"
    >
      <div className="container-site flex flex-col gap-8 lg:gap-10">
        <SectionIntro
          eyebrow="Presence"
          title="Design Excellence in Your City"
          titleId="presence-title"
          description="Designing elegant spaces with complete solutions from planning to execution."
        />

        <div className="flex flex-col gap-3 sm:gap-4 md:flex-row md:items-stretch">
          <PresencePromoCard />
          <LocationsCarousel locations={locations} />
        </div>
      </div>
    </section>
  );
}
