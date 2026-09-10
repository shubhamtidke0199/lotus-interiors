import { revalidatePath } from "next/cache";
import { requireAdminApi } from "@/lib/admin/auth";
import { deleteCategory, saveCategory } from "@/lib/cms/store";

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
    const category = await saveCategory({ ...body, id });
    revalidatePath("/products");
    revalidatePath("/admin/categories");
    return Response.json({ category });
  } catch (error) {
    return Response.json(
      { error: error.message || "Unable to update category." },
      { status: 400 },
    );
  }
}

export async function DELETE(_request, { params }) {
  const unauthorized = await requireAdminApi();
  if (unauthorized) return unauthorized;

  const { id } = await params;
  try {
    await deleteCategory(id);
    revalidatePath("/products");
    revalidatePath("/admin/categories");
    return Response.json({ ok: true });
  } catch (error) {
    return Response.json(
      { error: error.message || "Unable to delete category." },
      { status: 400 },
    );
  }
}
