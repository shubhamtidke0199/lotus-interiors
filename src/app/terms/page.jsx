import Link from "next/link";

export const metadata = {
  title: "Terms of Service",
  description: "Terms governing use of the Lotus Design Studio website.",
};

export default function TermsPage() {
  return (
    <main className="bg-white px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
      <article className="container-site max-w-3xl">
        <p className="type-eyebrow text-eyebrow">Legal</p>
        <h1 className="type-display-heading mt-3 text-heading">
          Terms of Service
        </h1>
        <p className="mt-4 font-fraunces text-sm text-muted">
          Last updated: August 2026
        </p>
        <div className="mt-8 space-y-6 font-fraunces text-base leading-7 text-muted">
          <p>
            This website provides information about Lotus Design Studio
            services, portfolio, products, and content. Product pricing and
            availability shown online are indicative and confirmed during
            consultation.
          </p>
          <p>
            Project engagements are governed by a separate design agreement.
            Website content may not be copied or redistributed without written
            permission.
          </p>
          <p>
            By submitting a form, you agree that we may contact you about your
            enquiry using the details you provide.
          </p>
        </div>
        <Link
          href="/privacy"
          className="mt-10 inline-block font-fraunces text-sm uppercase tracking-[var(--tracking-cta)] text-primary underline-offset-4 hover:underline"
        >
          Read our privacy policy
        </Link>
      </article>
    </main>
  );
}
