import Link from "next/link";
import ArrowIcon from "@/components/icons/ArrowIcon";
import LocationCard from "@/components/ui/LocationCard";
import SectionIntro from "@/components/ui/SectionIntro";
import { locations } from "@/data/landingContent";

function PresencePromoCard() {
  return (
    <article className="relative h-[360px] w-full min-w-[300px] shrink-0 overflow-hidden bg-[#faf9fc] sm:h-[460px] sm:w-[560px]">
      <img
        src="/images/presence/background.webp"
        alt=""
        aria-hidden="true"
        className="absolute right-0 top-0 h-full w-[72%] max-w-none object-contain object-right sm:h-[454px] sm:w-[786px]"
        loading="lazy"
      />

      <div className="relative z-10 flex h-full max-w-[310px] flex-col px-6 py-10 sm:px-10 sm:py-0">
        <p className="font-fraunces text-xl font-light italic leading-10 text-muted sm:absolute sm:left-10 sm:top-[49px] sm:text-[28px] sm:leading-10">
          Looks Beautiful in Design!
        </p>

        <h3 className="mt-3 font-fraunces text-xl leading-8 tracking-[1.2px] text-nav sm:absolute sm:left-10 sm:top-[110px] sm:mt-0 sm:text-2xl sm:leading-8">
          But how will it feel in your Space?
        </h3>

        <Link
          href="/contact"
          className="mt-6 inline-flex w-fit items-center gap-4 bg-primary px-8 py-5 transition-colors hover:bg-primary/90 sm:absolute sm:left-10 sm:top-[212px] sm:mt-0"
        >
          <span className="font-fraunces text-xs uppercase leading-6 tracking-[var(--tracking-cta)] text-white">
            Book a Consultation
          </span>
          <ArrowIcon className="text-white" />
        </Link>

        <p className="mt-auto font-fraunces text-sm italic leading-[26px] tracking-[1.2px] text-services-eyebrow sm:absolute sm:bottom-[42px] sm:left-10 sm:mt-0 sm:text-base">
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
      aria-labelledby="presence-title"
      className="bg-white px-4 py-16 sm:px-8 lg:px-8 lg:py-[70px]"
    >
      <div className="mx-auto flex max-w-[1440px] flex-col gap-10 lg:gap-[41px]">
        <SectionIntro
          eyebrow="Presence"
          title="Design Excellence in Your City"
          titleId="presence-title"
          description="Designing elegant spaces with complete solutions from planning to execution."
        />

        <div className="-mx-4 flex gap-4 overflow-x-auto px-4 pb-2 sm:-mx-8 sm:px-8 lg:mx-0 lg:px-0">
          <PresencePromoCard />
          {locations.map((location) => (
            <LocationCard key={location.city} {...location} />
          ))}
        </div>
      </div>
    </section>
  );
}
