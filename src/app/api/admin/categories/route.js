import { revalidatePath } from "next/cache";
import { requireAdminApi } from "@/lib/admin/auth";
import { getCatalog, saveCategory } from "@/lib/cms/store";

export async function GET() {
  const unauthorized = await requireAdminApi();
  if (unauthorized) return unauthorized;
  const { categories } = await getCatalog();
  return Response.json({ categories });
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
    const category = await saveCategory(body);
    revalidatePath("/products");
    revalidatePath("/admin/categories");
    revalidatePath("/admin/products");
    return Response.json({ category }, { status: 201 });
  } catch (error) {
    return Response.json(
      { error: error.message || "Unable to save category." },
      { status: 400 },
    );
  }
}
