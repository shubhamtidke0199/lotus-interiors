import { notFound } from "next/navigation";
import AdminPageHeader from "@/components/admin/AdminPageHeader";
import ProductForm from "@/components/admin/ProductForm";
import { adminPanelPad, statusBadgeClass } from "@/components/admin/adminUi";
import { getCatalog, getProductById } from "@/lib/cms/store";

export async function generateMetadata({ params }) {
  const { id } = await params;
  const product = await getProductById(id);
  return { title: product ? `Edit · ${product.name}` : "Product" };
}

export default async function EditProductPage({ params }) {
  const { id } = await params;
  const [{ categories, attributeDefinitions }, product] = await Promise.all([
    getCatalog(),
    getProductById(id),
  ]);

  if (!product) notFound();

  return (
    <main className="flex flex-col gap-8">
      <AdminPageHeader
        backHref="/admin/products"
        backLabel="Products"
        eyebrow="Catalog"
        title={product.name}
        description={`/${product.slug}`}
        actions={
          <span
            className={statusBadgeClass(
              product.published ? "published" : "draft",
            )}
          >
            {product.published ? "Published" : "Draft"}
          </span>
        }
      />
      <div className={`${adminPanelPad} max-w-4xl`}>
        <ProductForm
          product={product}
          categories={categories}
          attributeDefinitions={attributeDefinitions}
        />
      </div>
    </main>
  );
}
