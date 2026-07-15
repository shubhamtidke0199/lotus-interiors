export default function ProductsPageHero() {
  return (
    <section aria-label="Products hero" className="px-4 sm:px-6 lg:px-8">
      <div className="container-site relative overflow-hidden">
        <div
          className="flex min-h-[12rem] items-center justify-center bg-cover bg-center px-6 py-12 sm:min-h-[16rem] lg:min-h-[20rem]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(8,8,8,0.32), rgba(8,8,8,0.32)), url('/images/products-page/main-lotus-design.png')",
          }}
        >
          <h1 className="text-center font-fraunces text-[clamp(2rem,5vw,3.75rem)] font-normal uppercase leading-none tracking-[0.12em] text-white">
            Lotus Design Studio
          </h1>
        </div>
      </div>
    </section>
  );
}
