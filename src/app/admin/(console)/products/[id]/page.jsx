import { notFound } from "next/navigation";
import AdminPageHeader from "@/components/admin/AdminPageHeader";
import ProductForm from "@/components/admin/ProductForm";
import { statusBadgeClass } from "@/components/admin/adminUi";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
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
          <Badge
            className={statusBadgeClass(product.published ? "published" : "draft")}
          >
            {product.published ? "Published" : "Draft"}
          </Badge>
        }
      />
      <Card className="max-w-4xl shadow-sm">
        <CardContent className="p-5 sm:p-6">
          <ProductForm
            product={product}
            categories={categories}
            attributeDefinitions={attributeDefinitions}
          />
        </CardContent>
      </Card>
    </main>
  );
}
