export default function ProductsPageHero() {
  return (
    <section aria-label="Products hero" className="px-4 sm:px-8">
      <div className="relative mx-auto max-w-[1440px] overflow-hidden">
        <div
          className="flex min-h-[200px] items-center justify-center bg-cover bg-center px-6 py-16 sm:min-h-[260px] lg:min-h-[320px]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(8,8,8,0.32), rgba(8,8,8,0.32)), url('/images/products-page/main-lotus-design.png')",
          }}
        >
          <h1 className="text-center font-fraunces text-[clamp(40px,10vw,96px)] font-normal uppercase leading-none tracking-[0.12em] text-white">
            Lotus Design Studio
          </h1>
        </div>
      </div>
    </section>
  );
}
