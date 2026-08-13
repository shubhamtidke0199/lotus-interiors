import Link from "next/link";

export default function FooterNavColumn({ title, links }) {
  return (
    <div className="min-w-[7.5rem]">
      <h3 className="text-sm uppercase leading-4 tracking-wide">{title}</h3>
      <ul className="mt-4 flex flex-col">
        {links.map((link, index) => {
          const label = typeof link === "string" ? link : link.label;
          const href = typeof link === "string" ? "#" : link.href;

          return (
            <li key={`${label}-${href}`} className={index > 0 ? "mt-4" : undefined}>
              <Link
                href={href}
                className="text-xs uppercase leading-4 tracking-wide transition-colors hover:text-primary"
              >
                {label}
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
