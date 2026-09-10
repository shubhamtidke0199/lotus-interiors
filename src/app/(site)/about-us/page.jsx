import Link from "next/link";
import Reveal from "@/components/ui/Reveal";
import PrimaryButton from "@/components/ui/PrimaryButton";

export const metadata = {
  title: "About Us",
  description:
    "Lotus Design Studio crafts refined residential and commercial interiors with comfort, clarity, and timeless design excellence.",
};

const pillars = [
  {
    id: "curation",
    title: "Curation",
    body: "Every material, proportion, and finish is chosen with intention — never trend for trend’s sake.",
  },
  {
    id: "integrity",
    title: "Integrity",
    body: "Clear timelines, honest budgets, and craftsmanship you can inspect at every stage of the build.",
  },
  {
    id: "sustainability",
    title: "Sustainability",
    body: "Durable materials and responsible sourcing so spaces age gracefully instead of aging out.",
  },
];

export default function AboutPage() {
  return (
    <main className="bg-white">
      <section className="px-4 py-12 sm:px-6 lg:px-8 lg:py-20">
        <div className="container-site grid gap-10 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,0.8fr)] lg:items-end lg:gap-16">
          <Reveal>
            <div>
              <p className="type-eyebrow text-eyebrow">About Lotus</p>
              <h1 className="type-display-heading mt-3 max-w-2xl text-heading">
                A studio dedicated to interiors with quiet confidence.
              </h1>
              <p className="mt-6 max-w-xl font-fraunces text-base leading-7 text-muted sm:text-lg">
                Founded in Central India and now present in Nagpur, Mumbai, and
                Pune, Lotus Design Studio creates residential and commercial
                spaces that feel collected, calm, and unmistakably personal.
              </p>
            </div>
          </Reveal>
          <Reveal delay={100}>
            <figure className="relative min-h-64 overflow-hidden bg-product-bg sm:min-h-80">
              <img
                src="/images/cta/studio-space.webp"
                alt="Lotus Design Studio interior"
                className="absolute inset-0 size-full object-cover"
              />
            </figure>
          </Reveal>
        </div>
      </section>

      <section className="border-y border-product-bg bg-appointment-bg px-4 py-14 sm:px-6 lg:px-8 lg:py-20">
        <div className="container-site">
          <Reveal>
            <h2 className="type-section-heading text-heading">Our philosophy</h2>
            <p className="mt-4 max-w-2xl font-fraunces text-base leading-7 text-muted">
              We believe refined interiors are built through restraint,
              craftsmanship, and a deep reading of how people actually live.
            </p>
          </Reveal>

          <div className="mt-10 grid gap-8 md:grid-cols-3">
            {pillars.map((pillar, index) => (
              <Reveal key={pillar.id} delay={index * 80}>
                <article id={pillar.id} className="scroll-mt-28">
                  <p className="font-fraunces text-sm uppercase tracking-[var(--tracking-cta)] text-services-eyebrow">
                    0{index + 1}
                  </p>
                  <h3 className="mt-3 font-fraunces text-xl text-heading">
                    {pillar.title}
                  </h3>
                  <p className="mt-3 font-fraunces text-sm leading-6 text-muted">
                    {pillar.body}
                  </p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 py-14 sm:px-6 lg:px-8 lg:py-16">
        <div className="container-site flex flex-col items-start gap-6 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="type-section-heading text-heading">
              Ready to begin?
            </h2>
            <p className="mt-3 max-w-md font-fraunces text-sm leading-6 text-muted">
              Book a private consultation or explore the spaces we&apos;ve
              shaped across the region.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <PrimaryButton href="/contact" variant="filled">
              GET Appointment
            </PrimaryButton>
            <Link
              href="/portfolio"
              className="inline-flex h-12 items-center border border-primary px-6 font-fraunces text-sm uppercase tracking-[var(--tracking-cta)] text-primary transition-colors hover:bg-primary/5"
            >
              View Portfolio
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
