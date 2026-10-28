import Link from "next/link";
import AdminPageHeader from "@/components/admin/AdminPageHeader";
import AdminPagination from "@/components/admin/AdminPagination";
import AdminEmptyState from "@/components/admin/AdminEmptyState";
import { adminTableHeadClass } from "@/components/admin/AdminTableShell";
import { adminBtnPrimary, statusBadgeClass } from "@/components/admin/adminUi";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
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
        <AdminEmptyState
          title="No products yet"
          description="Add the first piece, assign a category, then fill in its specifications."
        >
          <Button className={adminBtnPrimary} render={<Link href="/admin/products/new" />}>
            Add product
          </Button>
        </AdminEmptyState>
      ) : (
        <Card className="overflow-hidden">
          <Table className="min-w-[52rem]">
            <TableHeader>
              <TableRow>
                <TableHead className={adminTableHeadClass}>Product</TableHead>
                <TableHead className={adminTableHeadClass}>Category</TableHead>
                <TableHead className={adminTableHeadClass}>Price</TableHead>
                <TableHead className={adminTableHeadClass}>Status</TableHead>
                <TableHead className={`${adminTableHeadClass} text-right`}>
                  {" "}
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {pagination.items.map((product) => (
                <TableRow key={product.id}>
                  <TableCell>
                    <div className="flex items-center gap-3.5">
                      <img
                        src={product.image}
                        alt=""
                        className="size-12 shrink-0 rounded-md object-cover bg-muted"
                      />
                      <div className="min-w-0">
                        <p className="truncate font-helvetica text-sm font-medium text-foreground">
                          {product.name}
                        </p>
                        <p className="mt-0.5 truncate font-helvetica text-xs text-muted-foreground">
                          /{product.slug}
                        </p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="font-helvetica text-muted-foreground">
                    {product.categoryName}
                  </TableCell>
                  <TableCell className="font-helvetica">{product.priceLabel || "—"}</TableCell>
                  <TableCell>
                    <Badge
                      className={statusBadgeClass(
                        product.published ? "published" : "draft",
                      )}
                    >
                      {product.published ? "Published" : "Draft"}
                    </Badge>
                    {product.onSale ? (
                      <Badge className={`${statusBadgeClass("new")} ml-2`}>Sale</Badge>
                    ) : null}
                  </TableCell>
                  <TableCell className="text-right">
                    <Button
                      variant="link"
                      className="h-auto p-0 font-helvetica text-sm"
                      render={<Link href={`/admin/products/${product.id}`} />}
                    >
                      Edit
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <AdminPagination
            {...pagination}
            noun="products"
            basePath="/admin/products"
          />
        </Card>
      )}
    </main>
  );
}
