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
  "w-full border-0 border-b border-appointment-line bg-transparent pb-2 pt-2.5 font-fraunces text-sm leading-5 text-nav placeholder:text-muted focus-visible:outline-none focus-visible:border-primary";

export default function FormField({
  id,
  name,
  label,
  type = "text",
  placeholder,
  as = "input",
  rows = 4,
  required = false,
  defaultValue,
}) {
  const fieldName = name ?? id;

  return (
    <div className="relative">
      <label
        htmlFor={id}
        className="mb-1 block font-helvetica text-sm uppercase leading-4 tracking-wide text-muted"
      >
        {label}
      </label>
      {as === "textarea" ? (
        <textarea
          id={id}
          name={fieldName}
          rows={rows}
          placeholder={placeholder}
          required={required}
          defaultValue={defaultValue}
          className={`${fieldClassName} min-h-24 resize-y`}
        />
      ) : (
        <input
          id={id}
          name={fieldName}
          type={type}
          placeholder={placeholder}
          required={required}
          defaultValue={defaultValue}
          className={fieldClassName}
        />
      )}
    </div>
  );
}

export function SelectField({
  id,
  name,
  label,
  options = ["Select City"],
  required = false,
}) {
  const fieldName = name ?? id;

  return (
    <div className="relative">
      <label
        htmlFor={id}
        className="mb-1 block font-helvetica text-sm uppercase leading-4 tracking-wide text-muted"
      >
        {label}
      </label>
      <div className="relative">
        <select
          id={id}
          name={fieldName}
          defaultValue=""
          required={required}
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

export function SubmitButton({
  children = "Submit Request",
  classNames = "",
  disabled = false,
}) {
  return (
    <button
      type="submit"
      disabled={disabled}
      className={`inline-flex h-11 items-center justify-center gap-3 bg-appointment-button px-8 font-helvetica text-sm uppercase leading-4 tracking-[var(--tracking-cta)] text-white transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60 ${classNames}`}
    >
      {children}
      <ArrowIcon className="text-white" />
    </button>
  );
}
