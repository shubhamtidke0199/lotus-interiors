import Link from "next/link";
import AdminPageHeader from "@/components/admin/AdminPageHeader";
import AdminPagination from "@/components/admin/AdminPagination";
import {
  adminBtnPrimary,
  adminTableWrap,
  adminTd,
  adminTh,
  adminRow,
  statusBadgeClass,
} from "@/components/admin/adminUi";
import { getAdminProductList } from "@/lib/cms/catalog";
import { paginate, parsePageParam } from "@/lib/cms/pagination";

export const metadata = {
  title: "Products",
};

export default async function AdminProductsPage({ searchParams }) {
  const params = await searchParams;
  const products = await getAdminProductList();
  const pagination = paginate(products, parsePageParam(params?.page));

  return (
    <main className="flex flex-col gap-8">
      <AdminPageHeader
        eyebrow="Catalog"
        title="Products"
        description={`${pagination.total} piece${pagination.total === 1 ? "" : "s"} in the catalog.`}
        primaryAction={{ href: "/admin/products/new", label: "Add product" }}
      />

      {pagination.total === 0 ? (
        <div className="admin-empty">
          <p className="font-helvetica text-sm font-medium text-[color:var(--admin-ink)]">
            No products yet
          </p>
          <p className="max-w-md font-helvetica text-sm text-[color:var(--admin-muted)]">
            Add the first piece, assign a category, then fill in its
            specifications.
          </p>
          <Link href="/admin/products/new" className={adminBtnPrimary}>
            Add product
          </Link>
        </div>
      ) : (
        <div className={adminTableWrap}>
          <table className="w-full min-w-[52rem] text-left">
            <thead>
              <tr>
                <th className={adminTh}>Product</th>
                <th className={adminTh}>Category</th>
                <th className={adminTh}>Price</th>
                <th className={adminTh}>Status</th>
                <th className={`${adminTh} text-right`}> </th>
              </tr>
            </thead>
            <tbody>
              {pagination.items.map((product) => (
                <tr key={product.id} className={adminRow}>
                  <td className={adminTd}>
                    <div className="flex items-center gap-3.5">
                      <img
                        src={product.image}
                        alt=""
                        className="size-12 shrink-0 object-cover bg-[color:var(--admin-surface)]"
                      />
                      <div className="min-w-0">
                        <p className="truncate font-helvetica text-sm font-medium text-[color:var(--admin-ink)]">
                          {product.name}
                        </p>
                        <p className="mt-0.5 truncate font-helvetica text-xs text-[color:var(--admin-muted)]">
                          /{product.slug}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className={`${adminTd} text-[color:var(--admin-muted)]`}>
                    {product.categoryName}
                  </td>
                  <td className={adminTd}>{product.priceLabel || "—"}</td>
                  <td className={adminTd}>
                    <span
                      className={statusBadgeClass(
                        product.published ? "published" : "draft",
                      )}
                    >
                      {product.published ? "Published" : "Draft"}
                    </span>
                    {product.onSale ? (
                      <span className={`${statusBadgeClass("new")} ml-2`}>
                        Sale
                      </span>
                    ) : null}
                  </td>
                  <td className={`${adminTd} text-right`}>
                    <Link
                      href={`/admin/products/${product.id}`}
                      className="font-helvetica text-sm font-medium text-[color:var(--admin-ink)] underline-offset-4 hover:underline"
                    >
                      Edit
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <AdminPagination
            {...pagination}
            noun="products"
            basePath="/admin/products"
          />
        </div>
      )}
    </main>
  );
}
