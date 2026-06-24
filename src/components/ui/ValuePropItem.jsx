export default function ValuePropItem({ number, title, description }) {
  return (
    <article className="flex w-full max-w-[274px] flex-col items-start">
      <p
        aria-hidden="true"
        className="mb-[-42px] flex h-[71px] w-[145px] items-center font-display text-[64px] font-black leading-8 text-white/12"
      >
        {number}
      </p>
      <div className="flex flex-col gap-2 text-white">
        <h3 className="max-w-[274px] font-fraunces text-[22px] font-normal leading-8">
          {title}
        </h3>
        <p className="max-w-[233px] font-fraunces text-base font-normal leading-6">
          {description}
        </p>
      </div>
    </article>
  );
}
