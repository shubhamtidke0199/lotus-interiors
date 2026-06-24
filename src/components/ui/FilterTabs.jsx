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
      className={`flex flex-wrap gap-4 ${className}`}
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
            className={`border-b-2 px-6 pb-2.5 pt-2 font-helvetica text-base uppercase tracking-[1px] transition-colors ${
              isActive
                ? "border-primary text-primary"
                : "border-transparent text-muted"
            }`}
          >
            {tab}
          </button>
        );
      })}
    </div>
  );
}
