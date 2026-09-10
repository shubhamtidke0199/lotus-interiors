import { revalidatePath } from "next/cache";
import { requireAdminApi } from "@/lib/admin/auth";
import { getAdminProductList } from "@/lib/cms/catalog";
import { saveProduct } from "@/lib/cms/store";

function revalidateCatalog(slug) {
  revalidatePath("/products");
  revalidatePath("/products/[slug]", "page");
  if (slug) {
    revalidatePath(`/products/${slug}`);
  }
  revalidatePath("/admin");
  revalidatePath("/admin/products");
}

export async function GET() {
  const unauthorized = await requireAdminApi();
  if (unauthorized) return unauthorized;

  const products = await getAdminProductList();
  return Response.json({ products });
}

export async function POST(request) {
  const unauthorized = await requireAdminApi();
  if (unauthorized) return unauthorized;

  let body;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Invalid request body." }, { status: 400 });
  }

  try {
    const product = await saveProduct(body);
    revalidateCatalog(product.slug);
    return Response.json({ product }, { status: 201 });
  } catch (error) {
    return Response.json(
      { error: error.message || "Unable to save product." },
      { status: 400 },
    );
  }
}
