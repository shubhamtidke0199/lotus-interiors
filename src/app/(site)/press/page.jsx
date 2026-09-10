import Link from "next/link";
import { studioContact } from "@/data/landingContent";

export const metadata = {
  title: "Press Kit",
  description:
    "Brand and press information for Lotus Design Studio media enquiries.",
};

export default function PressPage() {
  return (
    <main className="bg-white px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
      <article className="container-site max-w-3xl">
        <p className="type-eyebrow text-eyebrow">Press</p>
        <h1 className="type-display-heading mt-3 text-heading">Press Kit</h1>
        <p className="mt-6 font-fraunces text-base leading-7 text-muted">
          For editorial features, collaborations, or brand asset requests,
          contact our studio team. We can share logo files, project imagery
          (with credit), and founder bios upon request.
        </p>
        <dl className="mt-10 grid gap-6 sm:grid-cols-2">
          <div>
            <dt className="font-helvetica text-xs uppercase tracking-wide text-muted">
              Press email
            </dt>
            <dd className="mt-2 font-fraunces text-base text-nav">
              <a
                href={`mailto:${studioContact.email}`}
                className="transition-colors hover:text-primary"
              >
                {studioContact.email}
              </a>
            </dd>
          </div>
          <div>
            <dt className="font-helvetica text-xs uppercase tracking-wide text-muted">
              Studios
            </dt>
            <dd className="mt-2 font-fraunces text-base text-nav">
              {studioContact.address}
            </dd>
          </div>
        </dl>
        <div className="mt-10 flex flex-wrap gap-4">
          <Link
            href="/portfolio"
            className="inline-flex h-11 items-center bg-primary px-6 font-fraunces text-sm uppercase tracking-[var(--tracking-cta)] text-white transition-colors hover:bg-primary/90"
          >
            View Portfolio
          </Link>
          <Link
            href="/about-us"
            className="inline-flex h-11 items-center border border-primary px-6 font-fraunces text-sm uppercase tracking-[var(--tracking-cta)] text-primary transition-colors hover:bg-primary/5"
          >
            About the Studio
          </Link>
        </div>
      </article>
    </main>
  );
}
