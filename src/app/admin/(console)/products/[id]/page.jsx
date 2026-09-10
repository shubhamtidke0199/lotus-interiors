import Link from "next/link";
import { notFound } from "next/navigation";
import ProductForm from "@/components/admin/ProductForm";
import { getCatalog, getProductById } from "@/lib/cms/store";

export async function generateMetadata({ params }) {
  const { id } = await params;
  const product = await getProductById(id);
  return { title: product ? `Edit ${product.name}` : "Product" };
}

export default async function EditProductPage({ params }) {
  const { id } = await params;
  const [{ categories }, product] = await Promise.all([
    getCatalog(),
    getProductById(id),
  ]);

  if (!product) notFound();

  return (
    <main>
      <Link
        href="/admin/products"
        className="font-fraunces text-sm text-muted hover:text-primary"
      >
        ← Products
      </Link>
      <h1 className="mt-4 font-fraunces text-3xl text-heading">Edit product</h1>
      <div className="mt-8 max-w-4xl bg-white px-6 py-8 sm:px-8">
        <ProductForm product={product} categories={categories} />
      </div>
    </main>
  );
}
