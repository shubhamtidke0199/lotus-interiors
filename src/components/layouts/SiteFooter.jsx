import { footerColumns } from "@/data/landingContent";

export default function SiteFooter() {
  return (
    <footer className="bg-nav px-4 pb-8 pt-16 text-white sm:px-6 lg:px-8">
      <div className="mx-auto flex max-w-[1440px] flex-col gap-12">
        <div className="flex flex-col gap-10 lg:flex-row lg:items-start lg:justify-between">
          <div className="flex max-w-[616px] gap-6">
            <img
              src="/images/footer/logo-mark.webp"
              alt=""
              aria-hidden="true"
              className="size-[151px] shrink-0 rounded-full object-cover"
              loading="lazy"
            />
            <div className="flex flex-col justify-center gap-4">
              <p className="font-fraunces text-xl font-semibold leading-7 text-white">
                LOTUS DESIGN STUDIO
              </p>
              <p className="max-w-[231px] font-fraunces text-base leading-[23px] text-white/70">
                Curating the structural soul of the contemporary home since
              </p>
            </div>
          </div>

          <nav
            aria-label="Footer"
            className="grid gap-8 sm:grid-cols-3 sm:gap-16"
          >
            {footerColumns.map((column) => (
              <div key={column.title} className="flex flex-col gap-6">
                <h3 className="font-helvetica text-[15px] uppercase leading-4 tracking-[1px] text-white/60">
                  {column.title}
                </h3>
                <ul className="flex flex-col gap-5">
                  {column.links.map((link) => (
                    <li key={link}>
                      <a
                        href="#"
                        className="font-helvetica text-[15px] leading-4 text-white transition-colors hover:text-accent-cream"
                      >
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>
        </div>

        <div className="border-t border-white/10 pt-8">
          <p
            aria-hidden="true"
            className="pointer-events-none select-none font-fraunces text-[clamp(4rem,14vw,12rem)] font-semibold uppercase leading-none tracking-[var(--tracking-heading)] text-white/[0.04]"
          >
            LOTUS DESIGN
          </p>
        </div>

        <div className="flex flex-col gap-4 border-t border-white/10 pt-8 sm:flex-row sm:items-center sm:justify-between">
          <p className="font-helvetica text-base leading-6 text-white/60">
            © 2026 Antares Architectural Suite. All rights reserved.
          </p>
          <div className="flex flex-wrap gap-8">
            <a href="#" className="font-helvetica text-[15px] leading-4 text-white/60 transition-colors hover:text-white">
              Privacy Policy
            </a>
            <a href="#" className="font-helvetica text-[15px] leading-4 text-white/60 transition-colors hover:text-white">
              Terms of Service
            </a>
            <a href="#" className="font-helvetica text-[15px] leading-4 text-white/60 transition-colors hover:text-white">
              Press Kit
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
