import Link from "next/link";
import { getAdminProductList } from "@/lib/cms/catalog";

export const metadata = {
  title: "Products",
};

export default async function AdminProductsPage() {
  const products = await getAdminProductList();

  return (
    <main>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="type-eyebrow text-eyebrow">Catalog</p>
          <h1 className="mt-2 font-fraunces text-3xl text-heading">Products</h1>
        </div>
        <Link
          href="/admin/products/new"
          className="inline-flex h-11 items-center justify-center bg-primary px-6 font-fraunces text-sm uppercase tracking-[var(--tracking-cta)] text-white hover:bg-primary/90"
        >
          Add product
        </Link>
      </div>

      {products.length === 0 ? (
        <p className="mt-10 font-fraunces text-sm text-muted">
          No products yet. Add the first piece to the catalog.
        </p>
      ) : (
        <div className="mt-8 overflow-x-auto bg-white">
          <table className="w-full min-w-[48rem] text-left">
            <thead>
              <tr className="border-b border-product-bg font-helvetica text-xs uppercase tracking-wide text-muted">
                <th className="px-5 py-3 font-normal">Product</th>
                <th className="px-5 py-3 font-normal">Category</th>
                <th className="px-5 py-3 font-normal">Price</th>
                <th className="px-5 py-3 font-normal">Status</th>
                <th className="px-5 py-3 font-normal"> </th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product.id} className="border-b border-product-bg">
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      <img
                        src={product.image}
                        alt=""
                        className="size-14 shrink-0 object-cover bg-product-bg"
                      />
                      <div>
                        <p className="font-fraunces text-sm text-nav">{product.name}</p>
                        <p className="mt-1 font-fraunces text-xs text-muted">
                          /{product.slug}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="px-5 py-4 font-fraunces text-sm text-muted">
                    {product.categoryName}
                  </td>
                  <td className="px-5 py-4 font-fraunces text-sm text-nav">
                    {product.priceLabel || "—"}
                  </td>
                  <td className="px-5 py-4 font-fraunces text-sm">
                    {product.published ? "Published" : "Draft"}
                  </td>
                  <td className="px-5 py-4 text-right">
                    <Link
                      href={`/admin/products/${product.id}`}
                      className="font-fraunces text-sm text-primary hover:underline"
                    >
                      Edit
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </main>
  );
}
