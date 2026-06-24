export default function HeroStatItem({ number, label }) {
  return (
    <div className="flex min-w-0 flex-1 items-center gap-3">
      <div className="size-[38px] shrink-0 bg-white sm:size-[46px]" aria-hidden="true" />
      <div className="flex min-w-0 flex-col gap-1">
        <span className="font-fraunces text-base font-normal leading-[18px] text-white sm:text-lg">
          {number}
        </span>
        <span className="font-fraunces text-[9px] font-normal leading-[14px] text-white sm:text-[10px]">
          {label}
        </span>
      </div>
    </div>
  );
}
