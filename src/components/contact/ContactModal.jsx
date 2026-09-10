"use client";

import { useEffect, useId, useRef } from "react";
import ContactForm from "@/components/ui/ContactForm";
import { studioContact } from "@/data/landingContent";

function CloseIcon({ className = "" }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="none"
      className={`size-5 ${className}`}
    >
      <path
        d="M6 6L18 18M18 6L6 18"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

export default function ContactModal({ isOpen, options, onClose }) {
  const dialogRef = useRef(null);
  const closeButtonRef = useRef(null);
  const titleId = useId();
  const descriptionId = useId();

  useEffect(() => {
    if (!isOpen) return undefined;
    closeButtonRef.current?.focus();
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[120] flex items-end justify-center p-0 sm:items-center sm:p-6">
      <button
        type="button"
        aria-label="Close contact form"
        className="absolute inset-0 bg-[#2a213c]/55 backdrop-blur-[3px]"
        onClick={onClose}
      />

      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        aria-describedby={descriptionId}
        className="contact-modal-panel relative z-10 flex max-h-[92dvh] w-full max-w-xl flex-col overflow-hidden rounded-t-3xl bg-white shadow-[0_24px_80px_rgba(83,70,108,0.28)] sm:rounded-3xl"
      >
        <div className="relative overflow-hidden bg-primary px-6 py-7 text-white sm:px-8 sm:py-8">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -right-10 -top-10 size-40 rounded-full bg-accent-lavender/25 blur-2xl"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -bottom-16 left-8 size-32 rounded-full bg-accent-peach/20 blur-2xl"
          />

          <div className="relative flex items-start justify-between gap-4">
            <div>
              <p className="type-eyebrow text-accent-peach/90">Lotus Studio</p>
              <h2
                id={titleId}
                className="mt-2 font-fraunces text-2xl leading-8 tracking-wide sm:text-[1.75rem] sm:leading-9"
              >
                {options.title}
              </h2>
              <p
                id={descriptionId}
                className="mt-3 max-w-md font-fraunces text-sm leading-6 text-white/80"
              >
                {options.description}
              </p>
            </div>

            <button
              ref={closeButtonRef}
              type="button"
              aria-label="Close"
              onClick={onClose}
              className="inline-flex size-10 shrink-0 items-center justify-center rounded-full border border-white/25 bg-white/10 text-white transition-colors hover:bg-white/20"
            >
              <CloseIcon />
            </button>
          </div>
        </div>

        <div className="overflow-y-auto bg-product-bg/40 px-6 py-7 sm:px-8 sm:py-8">
          <ContactForm
            key={`${options.source}-${options.defaultMessage}-${options.productId}-${isOpen}`}
            source={options.source}
            defaultMessage={options.defaultMessage}
            submitLabel={options.submitLabel}
            productId={options.productId}
            idPrefix="modal-"
            className="gap-7"
          />

          <p className="mt-6 font-fraunces text-[0.6875rem] leading-5 text-muted">
            Or reach us at{" "}
            <a
              href={`mailto:${studioContact.email}`}
              className="text-primary underline-offset-2 hover:underline"
            >
              {studioContact.email}
            </a>
            {" · "}
            <a
              href={studioContact.phoneHref}
              className="text-primary underline-offset-2 hover:underline"
            >
              {studioContact.phoneDisplay}
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
