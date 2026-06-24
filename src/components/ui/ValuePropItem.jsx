export default function ValuePropItem({ number, title, description }) {
  return (
    <article className="grid grid-cols-[auto_1fr] gap-x-4 gap-y-2">
      <p
        aria-hidden="true"
        className="font-fraunces text-[56px] font-normal leading-none text-primary/20 lg:text-[71px]"
      >
        {number}
      </p>
      <div className="col-start-2 flex flex-col gap-2 pt-2">
        <h3 className="font-fraunces text-xl font-normal leading-8 text-heading lg:text-2xl">
          {title}
        </h3>
        <p className="font-fraunces text-base leading-6 text-muted">
          {description}
        </p>
      </div>
    </article>
  );
}
