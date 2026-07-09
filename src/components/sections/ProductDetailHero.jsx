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
      className="border-t border-product-bg px-4 py-8 sm:px-8 lg:py-12"
    >
      <div className="mx-auto grid max-w-[1440px] gap-12 lg:grid-cols-[minmax(0,855px)_minmax(0,521px)] lg:gap-16">
        <div className="flex flex-col gap-4">
          <img
            src={gallery.top}
            alt=""
            aria-hidden="true"
            className="w-full max-w-[420px] object-cover"
            loading="eager"
          />
          <figure className="relative aspect-square w-full max-w-[420px] overflow-hidden bg-white">
            <img
              src={gallery.main}
              alt={title}
              className="absolute inset-0 size-full object-cover px-4 py-2"
              loading="eager"
            />
          </figure>
          <img
            src={gallery.bottom}
            alt=""
            aria-hidden="true"
            className="w-full max-w-[420px] object-cover"
            loading="lazy"
          />
        </div>

        <div className="flex flex-col gap-10">
          <div className="flex flex-col gap-4">
            <h1
              id="product-detail-title"
              className="font-fraunces text-[clamp(28px,4vw,48px)] leading-tight text-nav"
            >
              {title}
            </h1>
            <p className="font-fraunces text-base leading-[29px] text-[#504444] sm:text-lg">
              {summary}{" "}
              <button
                type="button"
                className="font-fraunces text-primary underline-offset-2 hover:underline"
              >
                Read More
              </button>
            </p>
          </div>

          <p className="font-fraunces text-[clamp(22px,3vw,38px)] leading-none text-services-eyebrow">
            {price}
          </p>

          <div className="flex flex-col gap-8">
            <div className="flex flex-col gap-6">
              <div className="flex items-end justify-between gap-4">
                <p className="font-fraunces text-base uppercase tracking-[var(--tracking-cta)] text-nav">
                  Material Selection
                </p>
                <p className="font-fraunces text-xs text-[#504444]">
                  {selectedMaterial}
                </p>
              </div>
              <div className="flex flex-wrap gap-4">
                {materialSwatches.map((swatch) => (
                  <button
                    key={swatch.id}
                    type="button"
                    aria-label={`Select ${swatch.id} material`}
                    aria-pressed={swatch.selected}
                    className={`size-16 shrink-0 border-4 border-white ${
                      swatch.selected ? "ring-1 ring-primary" : ""
                    }`}
                    style={{ backgroundColor: swatch.color }}
                  />
                ))}
              </div>
            </div>

            <div className="flex flex-col gap-6">
              <label
                htmlFor="frame-finish"
                className="font-fraunces text-base uppercase tracking-[var(--tracking-cta)] text-nav"
              >
                Frame Finish
              </label>
              <input
                id="frame-finish"
                readOnly
                value={frameFinish.toUpperCase()}
                className="w-full max-w-[304px] bg-product-bg px-6 py-4 font-fraunces text-xs uppercase tracking-[1.2px] text-nav"
              />
            </div>

            <div className="bg-accent-cream px-6 sm:px-10">
              {productSpecs.map((spec, index) => (
                <div
                  key={spec.label}
                  className={`flex items-start justify-between gap-6 border-white py-6 ${
                    index < productSpecs.length - 1 ? "border-b" : ""
                  }`}
                >
                  <span className="font-fraunces text-base uppercase tracking-[var(--tracking-cta)] text-eyebrow">
                    {spec.label}
                  </span>
                  <span className="font-fraunces text-lg text-nav">
                    {spec.value}
                  </span>
                </div>
              ))}
            </div>

            <div className="flex flex-col gap-8 border-t border-[rgba(212,194,194,0.2)] pt-6">
              <div className="grid gap-8 sm:grid-cols-3">
                {productHighlights.map((item) => (
                  <div
                    key={item.label}
                    className="flex flex-col items-center gap-4 text-center"
                  >
                    <img
                      src="/images/product-view/column/column-graphic.svg"
                      alt=""
                      aria-hidden="true"
                      className="size-14"
                    />
                    <p className="whitespace-pre-line font-fraunces text-lg leading-7 text-nav">
                      {item.label}
                    </p>
                  </div>
                ))}
              </div>

              <button
                type="button"
                className="inline-flex w-full items-center justify-center gap-3 bg-primary px-8 py-6 font-fraunces text-base uppercase tracking-[var(--tracking-cta)] text-white transition-colors hover:bg-primary/90"
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
