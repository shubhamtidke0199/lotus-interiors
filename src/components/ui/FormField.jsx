import ArrowIcon from "@/components/icons/ArrowIcon";

export default function FormField({
  id,
  label,
  type = "text",
  placeholder,
  as = "input",
  rows = 4,
}) {
  const sharedClassName =
    "w-full border border-[#d9d9d9] bg-white px-4 py-2.5 font-helvetica text-base leading-5 text-nav placeholder:text-muted focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary";

  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={id} className="font-helvetica text-[15px] leading-4 text-muted">
        {label}
      </label>
      {as === "textarea" ? (
        <textarea
          id={id}
          name={id}
          rows={rows}
          placeholder={placeholder}
          className={`${sharedClassName} min-h-[113px] resize-y`}
        />
      ) : (
        <input
          id={id}
          name={id}
          type={type}
          placeholder={placeholder}
          className={sharedClassName}
        />
      )}
    </div>
  );
}

export function SubmitButton({ children = "Submit Request" }) {
  return (
    <button
      type="submit"
      className="inline-flex h-[52px] items-center gap-4 bg-primary px-10 font-helvetica text-base uppercase leading-4 text-white transition-colors hover:bg-primary/90"
    >
      {children}
      <ArrowIcon className="text-white" />
    </button>
  );
}
