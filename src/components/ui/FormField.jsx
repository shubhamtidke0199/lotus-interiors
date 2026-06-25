import ArrowIcon from "@/components/icons/ArrowIcon";

function ChevronDownIcon({ className = "" }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="none"
      className={`size-5 ${className}`}
    >
      <path
        d="M6 9L12 15L18 9"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

const fieldClassName =
  "w-full border-0 border-b border-appointment-line bg-transparent pb-2 pt-3 font-fraunces text-base leading-5 text-nav placeholder:text-muted focus-visible:outline-none focus-visible:border-primary";

export default function FormField({
  id,
  label,
  type = "text",
  placeholder,
  as = "input",
  rows = 4,
}) {
  return (
    <div className="relative">
      <label
        htmlFor={id}
        className="mb-1 block font-helvetica text-[15px] uppercase leading-4 tracking-[1px] text-muted"
      >
        {label}
      </label>
      {as === "textarea" ? (
        <textarea
          id={id}
          name={id}
          rows={rows}
          placeholder={placeholder}
          className={`${fieldClassName} min-h-[113px] resize-y`}
        />
      ) : (
        <input
          id={id}
          name={id}
          type={type}
          placeholder={placeholder}
          className={fieldClassName}
        />
      )}
    </div>
  );
}

export function SelectField({ id, label, options = ["Select City"] }) {
  return (
    <div className="relative">
      <label
        htmlFor={id}
        className="mb-1 block font-helvetica text-[15px] uppercase leading-4 tracking-[1px] text-muted"
      >
        {label}
      </label>
      <div className="relative">
        <select
          id={id}
          name={id}
          defaultValue=""
          className={`${fieldClassName} appearance-none pr-8`}
        >
          <option value="" disabled>
            {options[0]}
          </option>
          {options.slice(1).map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
        <ChevronDownIcon className="pointer-events-none absolute right-0 top-1/2 -translate-y-1/2 text-muted" />
      </div>
    </div>
  );
}

export function SubmitButton({ children = "Submit Request" }) {
  return (
    <button
      type="submit"
      className="inline-flex h-[52px] w-[254px] items-center justify-center gap-4 bg-appointment-button px-10 font-helvetica text-base uppercase leading-4 tracking-[var(--tracking-cta)] text-white transition-opacity hover:opacity-90"
    >
      {children}
      <ArrowIcon className="text-white" />
    </button>
  );
}
