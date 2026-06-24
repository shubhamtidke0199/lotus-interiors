export default function FooterNavColumn({ title, links }) {
  return (
    <div className="w-[140px]">
      <h3 className="text-[15px] uppercase leading-4 tracking-[1px]">
        {title}
      </h3>
      <ul className="mt-6 flex flex-col">
        {links.map((link, index) => (
          <li key={link} className={index > 0 ? "mt-5" : undefined}>
            <a
              href="#"
              className="text-[15px] uppercase leading-4 tracking-[1px] transition-colors hover:text-primary"
            >
              {link}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
