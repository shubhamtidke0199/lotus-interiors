import { Suspense } from "react";
import Link from "next/link";
import Reveal from "@/components/ui/Reveal";
import ContactPageForm from "@/components/ui/ContactPageForm";
import { studioContact } from "@/data/landingContent";

export const metadata = {
  title: "Contact",
  description:
    "Book a design consultation with Lotus Design Studio in Nagpur, Mumbai, or Pune.",
};

export default function ContactPage() {
  return (
    <main className="bg-white">
      <section className="border-b border-product-bg px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
        <div className="container-site grid gap-10 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] lg:gap-16">
          <Reveal>
            <div className="flex flex-col gap-6">
              <p className="type-eyebrow text-eyebrow">Get in Touch</p>
              <h1 className="type-display-heading max-w-xl text-heading">
                Let&apos;s shape a space that feels unmistakably yours.
              </h1>
              <p className="max-w-lg font-fraunces text-base leading-7 text-muted">
                Share a few details about your project. A Lotus designer will
                respond within one business day with next steps for a private
                consultation.
              </p>

              <div className="mt-2 grid gap-6 sm:grid-cols-2">
                <div>
                  <p className="font-helvetica text-xs uppercase tracking-wide text-muted">
                    Email
                  </p>
                  <a
                    href={`mailto:${studioContact.email}`}
                    className="mt-2 block font-fraunces text-base text-nav transition-colors hover:text-primary"
                  >
                    {studioContact.email}
                  </a>
                </div>
                <div>
                  <p className="font-helvetica text-xs uppercase tracking-wide text-muted">
                    Phone
                  </p>
                  <a
                    href={studioContact.phoneHref}
                    className="mt-2 block font-fraunces text-base text-nav transition-colors hover:text-primary"
                  >
                    {studioContact.phoneDisplay}
                  </a>
                </div>
                <div>
                  <p className="font-helvetica text-xs uppercase tracking-wide text-muted">
                    Studios
                  </p>
                  <p className="mt-2 font-fraunces text-base text-nav">
                    {studioContact.address}
                  </p>
                </div>
                <div>
                  <p className="font-helvetica text-xs uppercase tracking-wide text-muted">
                    Explore
                  </p>
                  <Link
                    href="/faq"
                    className="mt-2 block font-fraunces text-base text-nav transition-colors hover:text-primary"
                  >
                    Frequently asked questions
                  </Link>
                </div>
              </div>
            </div>
          </Reveal>

          <Reveal delay={120}>
            <div className="bg-appointment-bg px-5 py-8 sm:px-8 sm:py-10">
              <h2 className="type-section-heading text-heading">
                Book an Appointment
              </h2>
              <p className="mt-3 font-fraunces text-sm leading-6 text-muted">
                Tell us about your home, office, or hospitality project.
              </p>
              <div className="mt-8">
                <Suspense fallback={<p className="font-fraunces text-sm text-muted">Loading form…</p>}>
                  <ContactPageForm />
                </Suspense>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </main>
  );
}
