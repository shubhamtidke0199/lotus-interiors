import Link from "next/link";

export const metadata = {
  title: "Privacy Policy",
  description: "How Lotus Design Studio collects and uses contact information.",
};

export default function PrivacyPage() {
  return (
    <main className="bg-white px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
      <article className="container-site max-w-3xl">
        <p className="type-eyebrow text-eyebrow">Legal</p>
        <h1 className="type-display-heading mt-3 text-heading">Privacy Policy</h1>
        <p className="mt-4 font-fraunces text-sm text-muted">
          Last updated: August 2026
        </p>
        <div className="mt-8 space-y-6 font-fraunces text-base leading-7 text-muted">
          <p>
            Lotus Design Studio collects the information you voluntarily share
            through consultation and appointment forms — typically your name,
            email, phone number, project location, and project brief.
          </p>
          <p>
            We use this information only to respond to enquiries, schedule
            consultations, and improve our services. We do not sell personal
            data.
          </p>
          <p>
            Form submissions may be processed by trusted infrastructure
            providers acting on our behalf. You may request access or deletion
            of your enquiry data by emailing{" "}
            <a
              href="mailto:hello@lotusdesignstudio.com"
              className="text-primary underline-offset-2 hover:underline"
            >
              hello@lotusdesignstudio.com
            </a>
            .
          </p>
        </div>
        <Link
          href="/contact"
          className="mt-10 inline-block font-fraunces text-sm uppercase tracking-[var(--tracking-cta)] text-primary underline-offset-4 hover:underline"
        >
          Contact the studio
        </Link>
      </article>
    </main>
  );
}
