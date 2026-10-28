import AdminPageHeader from "@/components/admin/AdminPageHeader";
import CategoryManager from "@/components/admin/CategoryManager";
import { getCatalog } from "@/lib/cms/store";

export const metadata = {
  title: "Categories",
};

export default async function AdminCategoriesPage() {
  const { categories, attributeDefinitions } = await getCatalog();

  return (
    <main className="flex flex-col gap-8">
      <AdminPageHeader
        eyebrow="Catalog"
        title="Categories"
        description="Storefront filters and which specification fields appear on products in each group."
      />
      <CategoryManager
        categories={categories}
        attributeDefinitions={attributeDefinitions}
      />
    </main>
  );
}
