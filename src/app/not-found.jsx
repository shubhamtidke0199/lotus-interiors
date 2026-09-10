import Link from "next/link";
import Navbar from "@/components/layouts/Navbar";
import SiteFooter from "@/components/layouts/SiteFooter";
import PrimaryButton from "@/components/ui/PrimaryButton";

export const metadata = {
  title: "Page Not Found",
};

export default function NotFound() {
  return (
    <>
      <Navbar />
      <main
        id="main-content"
        className="flex flex-1 items-center bg-white px-4 py-20 sm:px-6 lg:px-8"
      >
        <div className="container-site max-w-xl">
          <p className="type-eyebrow text-eyebrow">404</p>
          <h1 className="type-display-heading mt-3 text-heading">
            This page has been redesigned out of existence.
          </h1>
          <p className="mt-4 font-fraunces text-base leading-7 text-muted">
            The link may be outdated, or the page may have moved. Explore our
            portfolio, products, or get in touch instead.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <PrimaryButton href="/" variant="filled">
              Back Home
            </PrimaryButton>
            <Link
              href="/contact"
              className="inline-flex h-12 items-center border border-primary px-6 font-fraunces text-sm uppercase tracking-[var(--tracking-cta)] text-primary transition-colors hover:bg-primary/5"
            >
              Contact Studio
            </Link>
          </div>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
