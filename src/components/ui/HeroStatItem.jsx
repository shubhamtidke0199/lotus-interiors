export default function HeroStatItem({ number, label }) {
  return (
    <div className="flex min-w-0 flex-1 items-center gap-2.5">
      <div
        className="size-8 shrink-0 bg-white sm:size-10"
        aria-hidden="true"
      />
      <div className="flex min-w-0 flex-col gap-0.5">
        <span className="font-fraunces text-sm font-normal leading-5 text-white sm:text-base">
          {number}
        </span>
        <span className="font-fraunces text-[9px] font-normal leading-4 text-white sm:text-[10px]">
          {label}
        </span>
      </div>
    </div>
  );
}
