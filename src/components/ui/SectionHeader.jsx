import PrimaryButton from "@/components/ui/PrimaryButton";

export default function SectionHeader({
  eyebrow,
  title,
  titleId,
  actionLabel = "GET Appointment",
  actionHref = "/contact",
}) {
  return (
    <header className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
      <div className="flex max-w-xl flex-col gap-1.5">
        <p className="type-eyebrow text-eyebrow">{eyebrow}</p>
        <h2 id={titleId} className="type-section-heading text-heading">
          {title}
        </h2>
      </div>
      <PrimaryButton
        href={actionHref}
        variant="filled"
        className="w-full shrink-0 sm:w-auto"
      >
        {actionLabel}
      </PrimaryButton>
    </header>
  );
}
