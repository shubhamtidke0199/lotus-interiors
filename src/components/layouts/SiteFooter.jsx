import Link from "next/link";
import {
  footerColumns,
  footerLegalLinks,
  footerSocialLinks,
} from "@/data/landingContent";

export default function SiteFooter() {
  return (
    <footer className="font-fraunces">
      <div className="bg-white px-4 pb-6 pt-10 sm:px-6 lg:px-8 lg:pb-8 lg:pt-12">
        <div className="container-site mx-auto max-w-6xl">
          <div className="border-t border-footer-border pt-4 md:pt-8">
            <img
              src="/images/footer/footer-text.webp"
              alt="LOTUS DESIGN"
              className="h-auto w-full max-w-6xl mx-auto "
              loading="lazy"
            />
          </div>
        </div>
      </div>

      <div className="bg-footer-dark px-4 py-12 text-white sm:px-6 lg:px-8 lg:py-16">
        <div className="container-site">
          <div className="flex flex-col gap-12 lg:flex-row lg:items-start lg:justify-between lg:gap-16">
            <div className="flex max-w-xl flex-col gap-8">
              <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:gap-6">
                <Link
                  href="/"
                  className="flex size-[7.5rem] shrink-0 items-center justify-center overflow-hidden bg-white p-2 sm:size-[9.5rem] sm:p-3"
                  aria-label="Lotus Interior Design Studio home"
                >
                  <img
                    src="/images/brand/lotus-logo.png"
                    alt="Lotus Interior Design Studio"
                    className="size-full object-contain"
                    loading="lazy"
                  />
                </Link>

                <div className="flex flex-col gap-3">
                  <p className="max-w-[15rem] text-sm leading-6 text-white/75">
                    Curating the structural soul of the contemporary home
                    across Nagpur, Mumbai, and Pune.
                  </p>
                </div>
              </div>

              <div className="flex w-[9.5rem] flex-col gap-5">
                <Link
                  href="/contact"
                  className="inline-flex w-full items-center justify-center bg-white px-5 py-2 font-fraunces text-xs italic capitalize leading-none tracking-wide text-footer-dark transition-opacity hover:opacity-90"
                >
                  Connect Now
                </Link>
                <img
                  src="/images/footer/qr.png"
                  alt="Scan to connect with Lotus Design Studio"
                  className="w-full bg-white object-cover"
                  loading="lazy"
                />
              </div>
            </div>

            <div className="flex flex-col gap-12 lg:min-w-0 lg:flex-1 lg:items-end">
              <nav
                aria-label="Footer"
                className="grid w-full gap-8 sm:grid-cols-3 sm:gap-10 lg:max-w-3xl lg:gap-12"
              >
                {footerColumns.map((column, index) => (
                  <div key={`${column.title}-${index}`} className="min-w-0">
                    <h3 className="text-sm uppercase leading-4 tracking-[0.08em]">
                      {column.title}
                    </h3>
                    <ul className="mt-6 flex flex-col gap-5 sm:mt-7 sm:gap-7">
                      {column.links.map((link) => (
                        <li key={`${link.label}-${link.href}`}>
                          <Link
                            href={link.href}
                            className="text-xs uppercase leading-4 tracking-[0.08em] text-white/90 transition-colors hover:text-white"
                          >
                            {link.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </nav>

              <div className="flex w-full flex-col gap-5 sm:items-end lg:max-w-3xl">
                <p className="text-xs uppercase tracking-[0.08em] text-white/85 sm:text-sm">
                  Connect with us on
                </p>
                <div className="flex flex-wrap items-center gap-4 sm:gap-5">
                  {footerSocialLinks.map((social) => (
                    <a
                      key={social.label}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={social.label}
                      className={`inline-flex size-11 items-center justify-center rounded-full p-2.5 transition-opacity hover:opacity-90 sm:size-[3.25rem] ${social.className}`}
                    >
                      <img
                        src={social.icon}
                        alt=""
                        aria-hidden="true"
                        className="size-full"
                        loading="lazy"
                      />
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="mt-12 flex flex-col gap-5 border-t border-[rgba(212,194,194,0.12)] pt-7 sm:mt-14 sm:flex-row sm:items-center sm:justify-between lg:mt-16">
            <p className="text-sm leading-6 text-white/80">
              © {new Date().getFullYear()} Lotus Design Studio. All rights
              reserved.
            </p>
            <div className="flex flex-wrap gap-6 sm:gap-8">
              {footerLegalLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-xs uppercase leading-4 tracking-[0.08em] text-white/90 transition-colors hover:text-white sm:text-sm"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
