import PrimaryButton from "@/components/ui/PrimaryButton";

export default function SectionHeader({
  eyebrow,
  title,
  titleId,
  actionLabel = "GET Appointment",
  actionHref = "/contact",
}) {
  return (
    <header className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
      <div className="flex max-w-[569px] flex-col gap-2">
        <p className="font-fraunces text-base font-normal uppercase leading-6 tracking-[var(--tracking-eyebrow)] text-eyebrow">
          {eyebrow}
        </p>
        <h2
          id={titleId}
          className="font-fraunces text-[28px] font-semibold leading-10 tracking-[var(--tracking-heading)] text-heading sm:text-[32px] lg:text-[36px]"
        >
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
