import ArrowIcon from "@/components/icons/ArrowIcon";
import {
  materialSwatches,
  productHighlights,
  productSpecs,
} from "@/data/productDetailContent";

export default function ProductDetailHero({
  title,
  summary,
  price,
  selectedMaterial,
  frameFinish,
  gallery,
}) {
  return (
    <section
      aria-labelledby="product-detail-title"
      className="border-t border-product-bg px-4 py-8 sm:px-6 lg:px-8 lg:py-12"
    >
      <div className="container-site grid items-start gap-8 lg:grid-cols-[minmax(0,1.55fr)_minmax(0,1fr)] lg:gap-8">
        <div className="grid w-full grid-cols-2 gap-2">
          <figure className="relative col-span-2 aspect-square overflow-hidden bg-white">
            <img
              src={gallery.main}
              alt={title}
              className="absolute inset-0 size-full object-cover"
              loading="eager"
            />
          </figure>
          <figure className="relative aspect-square overflow-hidden bg-white">
            <img
              src={gallery.top}
              alt=""
              aria-hidden="true"
              className="absolute inset-0 size-full object-cover"
              loading="eager"
            />
          </figure>
          <figure className="relative aspect-square overflow-hidden bg-white">
            <img
              src={gallery.bottom}
              alt=""
              aria-hidden="true"
              className="absolute inset-0 size-full object-cover"
              loading="lazy"
            />
          </figure>
        </div>

        <div className="flex min-w-0 flex-col gap-8">
          <div className="flex flex-col gap-4">
            <h1
              id="product-detail-title"
              className="type-display-heading text-nav"
            >
              {title}
            </h1>
            <p className="font-fraunces text-sm leading-6 text-[#504444] sm:text-base">
              {summary}{" "}
              <button
                type="button"
                className="font-fraunces text-primary underline-offset-2 hover:underline"
              >
                Read More
              </button>
            </p>
          </div>

          <p className="font-fraunces text-2xl leading-none text-services-eyebrow sm:text-3xl">
            {price}
          </p>

          <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-4">
              <div className="flex items-end justify-between gap-4">
                <p className="font-fraunces text-sm uppercase tracking-[var(--tracking-cta)] text-nav sm:text-base">
                  Material Selection
                </p>
                <p className="font-fraunces text-xs text-[#504444]">
                  {selectedMaterial}
                </p>
              </div>
              <div className="flex flex-wrap gap-3">
                {materialSwatches.map((swatch) => (
                  <button
                    key={swatch.id}
                    type="button"
                    aria-label={`Select ${swatch.id} material`}
                    aria-pressed={swatch.selected}
                    className={`size-14 shrink-0 border-4 border-white ${
                      swatch.selected ? "ring-1 ring-primary" : ""
                    }`}
                    style={{ backgroundColor: swatch.color }}
                  />
                ))}
              </div>
            </div>

            <div className="flex flex-col gap-4">
              <label
                htmlFor="frame-finish"
                className="font-fraunces text-sm uppercase tracking-[var(--tracking-cta)] text-nav sm:text-base"
              >
                Frame Finish
              </label>
              <input
                id="frame-finish"
                readOnly
                value={frameFinish.toUpperCase()}
                className="w-full max-w-xs bg-product-bg px-5 py-3 font-fraunces text-xs uppercase tracking-[1.2px] text-nav"
              />
            </div>

            <div className="bg-accent-cream px-5 sm:px-8">
              {productSpecs.map((spec, index) => (
                <div
                  key={spec.label}
                  className={`flex items-start justify-between gap-6 border-white py-4 ${
                    index < productSpecs.length - 1 ? "border-b" : ""
                  }`}
                >
                  <span className="type-eyebrow text-eyebrow">{spec.label}</span>
                  <span className="font-fraunces text-base text-nav">
                    {spec.value}
                  </span>
                </div>
              ))}
            </div>

            <div className="flex flex-col gap-6 border-t border-[rgba(212,194,194,0.2)] pt-5">
              <div className="grid gap-6 sm:grid-cols-3">
                {productHighlights.map((item) => (
                  <div
                    key={item.label}
                    className="flex flex-col items-center gap-3 text-center"
                  >
                    <img
                      src="/images/product-view/column/column-graphic.svg"
                      alt=""
                      aria-hidden="true"
                      className="size-12"
                    />
                    <p className="whitespace-pre-line font-fraunces text-base leading-6 text-nav">
                      {item.label}
                    </p>
                  </div>
                ))}
              </div>

              <button
                type="button"
                className="inline-flex h-12 w-full items-center justify-center gap-3 bg-primary px-6 font-fraunces text-sm uppercase tracking-[var(--tracking-cta)] text-white transition-colors hover:bg-primary/90"
              >
                Add to Cart
                <ArrowIcon className="text-white" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
