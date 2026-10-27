import Link from "next/link";
import AdminPageHeader from "@/components/admin/AdminPageHeader";
import ProductForm from "@/components/admin/ProductForm";
import { adminBtnPrimary, adminPanelPad } from "@/components/admin/adminUi";
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
      <div className={`${adminPanelPad} max-w-4xl`}>
        {categories.length === 0 ? (
          <div className="admin-empty border-0 bg-transparent p-0">
            <p className="font-helvetica text-sm font-medium text-[color:var(--admin-ink)]">
              Create a category first
            </p>
            <p className="font-helvetica text-sm text-[color:var(--admin-muted)]">
              Products need a category before they can be published.
            </p>
            <Link href="/admin/categories" className={adminBtnPrimary}>
              Go to categories
            </Link>
          </div>
        ) : (
          <ProductForm
            categories={categories}
            attributeDefinitions={attributeDefinitions}
          />
        )}
      </div>
    </main>
  );
}
