import CategoryManager from "@/components/admin/CategoryManager";
import { getCatalog } from "@/lib/cms/store";

export const metadata = {
  title: "Categories",
};

export default async function AdminCategoriesPage() {
  const { categories } = await getCatalog();

  return (
    <main>
      <p className="type-eyebrow text-eyebrow">Catalog</p>
      <h1 className="mt-2 font-fraunces text-3xl text-heading">Categories</h1>
      <p className="mt-3 max-w-xl font-fraunces text-sm leading-6 text-muted">
        These appear as filters on the public products page. Hide a category to
        remove it from the storefront without deleting it.
      </p>
      <div className="mt-8 bg-white px-6 py-8 sm:px-8">
        <CategoryManager categories={categories} />
      </div>
    </main>
  );
}
