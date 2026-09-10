import Link from "next/link";
import ProductForm from "@/components/admin/ProductForm";
import { getCatalog } from "@/lib/cms/store";

export const metadata = {
  title: "Add product",
};

export default async function NewProductPage() {
  const { categories } = await getCatalog();

  return (
    <main>
      <Link
        href="/admin/products"
        className="font-fraunces text-sm text-muted hover:text-primary"
      >
        ← Products
      </Link>
      <h1 className="mt-4 font-fraunces text-3xl text-heading">Add product</h1>
      <div className="mt-8 max-w-4xl bg-white px-6 py-8 sm:px-8">
        {categories.length === 0 ? (
          <p className="font-fraunces text-sm text-muted">
            Create a category first, then add products.
          </p>
        ) : (
          <ProductForm categories={categories} />
        )}
      </div>
    </main>
  );
}
