export default function FooterNavColumn({ title, links }) {
  return (
    <div className="w-32">
      <h3 className="text-sm uppercase leading-4 tracking-wide">{title}</h3>
      <ul className="mt-4 flex flex-col">
        {links.map((link, index) => (
          <li key={link} className={index > 0 ? "mt-4" : undefined}>
            <a
              href="#"
              className="text-xs uppercase leading-4 tracking-wide transition-colors hover:text-primary"
            >
              {link}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
