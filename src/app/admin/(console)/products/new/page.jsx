import Link from "next/link";
import AdminEmptyState from "@/components/admin/AdminEmptyState";
import AdminPageHeader from "@/components/admin/AdminPageHeader";
import ProductForm from "@/components/admin/ProductForm";
import { adminBtnPrimary } from "@/components/admin/adminUi";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { getCatalog } from "@/lib/cms/store";

export const metadata = {
  title: "Add product",
};

export default async function NewProductPage() {
  const { categories, attributeDefinitions } = await getCatalog();

  return (
    <main className="flex flex-col gap-8">
      <AdminPageHeader
        backHref="/admin/products"
        backLabel="Products"
        eyebrow="Catalog"
        title="Add product"
        description="Fixed fields first, then the specifications for the selected category."
      />
      <Card className="max-w-4xl shadow-sm">
        <CardContent className="p-5 sm:p-6">
          {categories.length === 0 ? (
            <AdminEmptyState
              title="Create a category first"
              description="Products need a category before they can be published."
              className="border-0 bg-transparent shadow-none"
            >
              <Button className={adminBtnPrimary} render={<Link href="/admin/categories" />}>
                Go to categories
              </Button>
            </AdminEmptyState>
          ) : (
            <ProductForm
              categories={categories}
              attributeDefinitions={attributeDefinitions}
            />
          )}
        </CardContent>
      </Card>
    </main>
  );
}
