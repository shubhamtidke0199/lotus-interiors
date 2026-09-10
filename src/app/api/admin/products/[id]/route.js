import { revalidatePath } from "next/cache";
import { requireAdminApi } from "@/lib/admin/auth";
import { deleteProduct, getProductById, saveProduct } from "@/lib/cms/store";

function revalidateCatalog(slug) {
  revalidatePath("/products");
  revalidatePath("/products/[slug]", "page");
  if (slug) revalidatePath(`/products/${slug}`);
  revalidatePath("/admin");
  revalidatePath("/admin/products");
}

export async function GET(_request, { params }) {
  const unauthorized = await requireAdminApi();
  if (unauthorized) return unauthorized;

  const { id } = await params;
  const product = await getProductById(id);
  if (!product) {
    return Response.json({ error: "Product not found." }, { status: 404 });
  }
  return Response.json({ product });
}

export async function PATCH(request, { params }) {
  const unauthorized = await requireAdminApi();
  if (unauthorized) return unauthorized;

  const { id } = await params;
  let body;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Invalid request body." }, { status: 400 });
  }

  try {
    const product = await saveProduct({ ...body, id });
    revalidateCatalog(product.slug);
    return Response.json({ product });
  } catch (error) {
    return Response.json(
      { error: error.message || "Unable to update product." },
      { status: 400 },
    );
  }
}

export async function DELETE(_request, { params }) {
  const unauthorized = await requireAdminApi();
  if (unauthorized) return unauthorized;

  const { id } = await params;
  try {
    await deleteProduct(id);
    revalidateCatalog(id);
    return Response.json({ ok: true });
  } catch (error) {
    return Response.json(
      { error: error.message || "Unable to delete product." },
      { status: 400 },
    );
  }
}
