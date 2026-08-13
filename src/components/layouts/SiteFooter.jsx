import FooterNavColumn from "@/components/ui/FooterNavColumn";
import { footerColumns, footerLegalLinks, studioContact } from "@/data/landingContent";
import Link from "next/link";

export default function SiteFooter() {
  return (
    <footer className="bg-white px-4 pb-8 pt-12 font-fraunces text-nav sm:px-6 lg:px-8">
      <div className="container-site">
        <div className="flex flex-col gap-10 lg:flex-row lg:items-start lg:justify-between">
          <div className="flex max-w-lg gap-5">
            <Link
              href="/"
              className="relative size-28 shrink-0 overflow-hidden sm:size-32"
              aria-label="Lotus Design Studio home"
            >
              <img
                src="/images/navbar/logo.webp"
                alt=""
                aria-hidden="true"
                className="absolute left-[-8.15%] top-[-4.41%] size-[116.08%] max-w-none object-cover"
                loading="lazy"
              />
            </Link>
            <div className="flex flex-col justify-center gap-3 pt-1">
              <p className="text-lg uppercase leading-7 tracking-wide sm:text-xl">
                LOTUS DESIGN STUDIO
              </p>
              <p className="max-w-[16rem] text-sm leading-5 text-muted">
                Curating the structural soul of the contemporary home across
                Nagpur, Mumbai, and Pune.
              </p>
              <p className="text-sm leading-5 text-services-eyebrow">
                <a
                  href={`mailto:${studioContact.email}`}
                  className="transition-colors hover:text-primary"
                >
                  {studioContact.email}
                </a>
              </p>
            </div>
          </div>

          <nav
            aria-label="Footer"
            className="grid gap-8 sm:grid-cols-3 sm:gap-10"
          >
            {footerColumns.map((column, index) => (
              <FooterNavColumn
                key={`${column.title}-${index}`}
                title={column.title}
                links={column.links}
              />
            ))}
          </nav>
        </div>

        <div className="mt-8 border-t border-footer-border pt-8">
          <img
            src="/images/footer/footer-text.webp"
            alt="LOTUS DESIGN"
            className="h-auto w-full max-w-6xl"
            loading="lazy"
          />
        </div>

        <div className="mt-8 flex flex-col gap-5 border-t border-footer-border pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm leading-6 text-[#C46705]">
            © {new Date().getFullYear()} Lotus Design Studio. All rights
            reserved.
          </p>
          <div className="flex flex-wrap gap-6 sm:gap-8">
            {footerLegalLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm uppercase leading-4 tracking-wide transition-colors hover:text-primary"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
