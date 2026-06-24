export default function ProcessStepNumberBadge({ step }) {
  return (
    <div
      aria-hidden="true"
      className="flex h-[155px] w-[82px] shrink-0 items-center justify-center border-2 border-white bg-accent-cream"
    >
      <span className="font-fraunces text-[48px] font-normal leading-[1.36] text-primary xl:text-[58px]">
        {step}
      </span>
    </div>
  );
}
