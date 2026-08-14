"use client";

import Link from "next/link";
import ArrowIcon from "@/components/icons/ArrowIcon";
import {
  getContactModalOptionsFromHref,
  isContactHref,
  useContactModal,
} from "@/components/contact/ContactModalContext";

const variants = {
  filled:
    "bg-primary text-white px-8 py-3.5 gap-3 hover:bg-primary/90 border border-transparent",
  hero: "bg-primary text-white px-8 py-3.5 gap-3 hover:bg-primary/90 border border-white/50 shadow-[0px_4px_4px_rgba(0,0,0,0.12)]",
  outline:
    "h-11 gap-3 border border-primary bg-transparent px-5 py-3 hover:bg-primary/5",
};

const labelStyles = {
  filled:
    "font-fraunces text-sm font-normal leading-5 tracking-[var(--tracking-cta)] uppercase text-white",
  hero: "font-helvetica text-sm font-medium leading-5 tracking-[var(--tracking-cta)] uppercase text-white",
  outline:
    "font-helvetica text-sm font-medium leading-5 uppercase text-primary",
};

export default function PrimaryButton({
  children,
  href,
  variant = "filled",
  className = "",
  onClick,
  ...props
}) {
  const { openContactModal } = useContactModal();
  const classes = [
    "inline-flex items-center justify-center transition-colors",
    variants[variant],
    className,
  ]
    .filter(Boolean)
    .join(" ");

  const iconClass =
    variant === "filled" || variant === "hero" ? "text-white" : "text-primary";

  const openFromHref = (event) => {
    if (!isContactHref(href)) return false;
    event.preventDefault();
    event.stopPropagation();
    openContactModal(getContactModalOptionsFromHref(href));
    return true;
  };

  if (href) {
    if (isContactHref(href)) {
      return (
        <button
          type="button"
          className={classes}
          onClick={(event) => {
            openFromHref(event);
            onClick?.(event);
          }}
          {...props}
        >
          <span className={labelStyles[variant]}>{children}</span>
          <ArrowIcon className={iconClass} />
        </button>
      );
    }

    return (
      <Link
        href={href}
        className={classes}
        onClick={onClick}
        {...props}
      >
        <span className={labelStyles[variant]}>{children}</span>
        <ArrowIcon className={iconClass} />
      </Link>
    );
  }

  return (
    <button type="button" className={classes} onClick={onClick} {...props}>
      <span className={labelStyles[variant]}>{children}</span>
      <ArrowIcon className={iconClass} />
    </button>
  );
}
