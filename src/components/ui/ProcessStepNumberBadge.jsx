export default function ProcessStepNumberBadge({ step }) {
  return (
    <div
      aria-hidden="true"
      className="flex h-32 w-16 shrink-0 items-center justify-center border-2 border-white bg-accent-cream"
    >
      <span className="font-fraunces text-4xl font-normal leading-none text-primary xl:text-5xl">
        {step}
      </span>
    </div>
  );
}
