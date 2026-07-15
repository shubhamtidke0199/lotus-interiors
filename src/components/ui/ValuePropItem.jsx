export default function ValuePropItem({ number, title, description }) {
  return (
    <article className="flex w-full max-w-[16rem] flex-col items-start">
      <p
        aria-hidden="true"
        className="mb-[-2rem] flex h-14 w-28 items-center font-display text-5xl font-black leading-none text-white/12"
      >
        {number}
      </p>
      <div className="flex flex-col gap-1.5 text-white">
        <h3 className="max-w-[16rem] font-fraunces text-lg font-normal leading-7 sm:text-xl">
          {title}
        </h3>
        <p className="max-w-[14rem] font-fraunces text-sm font-normal leading-5">
          {description}
        </p>
      </div>
    </article>
  );
}
