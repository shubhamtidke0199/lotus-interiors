import FooterNavColumn from "@/components/ui/FooterNavColumn";
import { footerColumns, footerLegalLinks } from "@/data/landingContent";

export default function SiteFooter() {
  return (
    <footer className="bg-white px-4 pb-10 pt-16 font-fraunces text-nav sm:px-8">
      <div className="mx-auto max-w-[1440px]">
        <div className="flex flex-col gap-12 lg:flex-row lg:items-start lg:justify-between">
          <div className="flex max-w-[616px] gap-6">
            <div className="relative size-[151px] shrink-0 overflow-hidden">
              <img
                src="/images/navbar/logo.webp"
                alt=""
                aria-hidden="true"
                className="absolute left-[-8.15%] top-[-4.41%] size-[116.08%] max-w-none object-cover"
                loading="lazy"
              />
            </div>
            <div className="flex flex-col justify-center gap-4 pt-2">
              <p className="text-[22px] uppercase leading-7 tracking-[1px] sm:text-2xl">
                LOTUS DESIGN STUDIO
              </p>
              <p className="max-w-[231px] text-base leading-[23px]">
                Curating the structural soul of the contemporary home since
              </p>
            </div>
          </div>

          <nav
            aria-label="Footer"
            className="grid gap-10 sm:grid-cols-3 sm:gap-16"
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

        <div className="mt-10 border-t border-footer-border pt-10">
          <img
            src="/images/footer/footer-text.webp"
            alt="LOTUS DESIGN"
            className="h-auto w-full max-w-[1349px]"
            loading="lazy"
          />
        </div>

        <div className="mt-10 flex flex-col gap-6 border-t border-footer-border pt-8 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-base leading-6 text-[#C46705]">
            © 2026 Antares Architectural Suite. All rights reserved.
          </p>
          <div className="flex flex-wrap gap-10">
            {footerLegalLinks.map((link) => (
              <a
                key={link}
                href="#"
                className="text-[15px] uppercase leading-4 tracking-[1px] transition-colors hover:text-primary"
              >
                {link}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
