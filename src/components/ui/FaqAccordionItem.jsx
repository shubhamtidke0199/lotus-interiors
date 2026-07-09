"use client";

import { useState } from "react";

export default function FaqAccordionItem({
  id,
  question,
  answer,
  isOpen,
  onToggle,
  variant = "cream",
}) {
  const backgroundClass =
    variant === "cream" ? "bg-accent-cream" : "bg-product-bg";

  return (
    <div className={`flex flex-col ${backgroundClass}`}>
      <button
        type="button"
        id={`${id}-trigger`}
        aria-expanded={isOpen}
        aria-controls={`${id}-panel`}
        onClick={onToggle}
        className={`flex w-full items-center justify-between gap-6 px-6 py-8 text-left sm:px-8 ${backgroundClass}`}
      >
        <h2 className="font-fraunces text-base leading-8 text-[#1c1c17] sm:text-lg lg:text-2xl">
          {question}
        </h2>
        <img
          src="/images/faq/faq-item-container/faq-item-icon.png"
          alt=""
          aria-hidden="true"
          className={`mt-0.5 size-[11px] shrink-0 transition-transform ${isOpen ? "rotate-180" : ""}`}
        />
      </button>

      {isOpen && (
        <div
          id={`${id}-panel`}
          role="region"
          aria-labelledby={`${id}-trigger`}
          className={`border-t border-[rgba(206,198,183,0.1)] px-6 pb-8 sm:px-8 ${backgroundClass}`}
        >
          <p className="font-fraunces text-sm leading-7 text-[#43474c] sm:text-base">
            {answer}
          </p>
        </div>
      )}

      <div className="h-px border-t border-[rgba(206,198,183,0.1)] bg-[#f7f3ea]" />
    </div>
  );
}

export function FaqAccordionList({ items, idPrefix = "faq" }) {
  const [openId, setOpenId] = useState(null);

  return (
    <div className="flex flex-col gap-4">
      {items.map((item, index) => (
        <FaqAccordionItem
          key={item.id}
          id={`${idPrefix}-${item.id}`}
          question={item.question}
          answer={item.answer}
          isOpen={openId === item.id}
          onToggle={() =>
            setOpenId((current) => (current === item.id ? null : item.id))
          }
          variant={index % 2 === 0 ? "cream" : "muted"}
        />
      ))}
    </div>
  );
}
