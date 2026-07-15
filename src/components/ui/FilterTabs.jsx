"use client";

import { useState } from "react";

export default function FilterTabs({
  tabs,
  activeIndex = 0,
  onChange,
  className = "",
}) {
  const [internalActive, setInternalActive] = useState(activeIndex);
  const current = onChange ? activeIndex : internalActive;

  const handleSelect = (index) => {
    if (!onChange) {
      setInternalActive(index);
    }
    onChange?.(index);
  };

  return (
    <div
      role="tablist"
      aria-label="Filter options"
      className={`flex flex-wrap gap-3 ${className}`}
    >
      {tabs.map((tab, index) => {
        const isActive = current === index;

        return (
          <button
            key={tab}
            type="button"
            role="tab"
            aria-selected={isActive}
            onClick={() => handleSelect(index)}
            className={`border-b-2 px-4 pb-1.5 pt-1.5 font-helvetica text-sm uppercase leading-4 tracking-wide transition-colors ${
              isActive
                ? "border-primary text-primary"
                : "border-transparent text-muted hover:text-heading"
            }`}
          >
            {tab}
          </button>
        );
      })}
    </div>
  );
}
