import Link from "next/link";
import ArrowIcon from "@/components/icons/ArrowIcon";

const variants = {
  filled:
    "bg-primary text-white px-12 py-5 gap-4 hover:bg-primary/90 border border-transparent",
  hero: "bg-primary text-white px-12 py-5 gap-4 hover:bg-primary/90 border border-white/50 shadow-[0px_4px_4px_rgba(0,0,0,0.12)]",
  outline:
    "h-[52px] gap-4 border border-primary bg-transparent p-5 hover:bg-primary/5",
};

const labelStyles = {
  filled:
    "font-fraunces text-base font-normal leading-6 tracking-[var(--tracking-cta)] uppercase text-white",
  hero: "font-helvetica text-base font-medium leading-6 tracking-[var(--tracking-cta)] uppercase text-white",
  outline:
    "font-helvetica text-sm font-medium leading-6 uppercase text-primary",
};

export default function PrimaryButton({
  children,
  href,
  variant = "filled",
  className = "",
  ...props
}) {
  const classes = [
    "inline-flex items-center justify-center transition-colors",
    variants[variant],
    className,
  ]
    .filter(Boolean)
    .join(" ");

  const iconClass =
    variant === "filled" || variant === "hero" ? "text-white" : "text-primary";

  if (href) {
    return (
      <Link href={href} className={classes} {...props}>
        <span className={labelStyles[variant]}>{children}</span>
        <ArrowIcon className={iconClass} />
      </Link>
    );
  }

  return (
    <button type="button" className={classes} {...props}>
      <span className={labelStyles[variant]}>{children}</span>
      <ArrowIcon className={iconClass} />
    </button>
  );
}
