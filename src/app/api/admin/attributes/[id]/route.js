import { revalidatePath } from "next/cache";
import { requireAdminApi } from "@/lib/admin/auth";
import {
  deleteAttributeDefinition,
  getAttributeDefinitionById,
  saveAttributeDefinition,
} from "@/lib/cms/store";

function revalidateAttributePaths() {
  revalidatePath("/admin/attributes");
  revalidatePath("/admin/categories");
  revalidatePath("/admin/products");
  revalidatePath("/products");
  revalidatePath("/products/[slug]", "page");
}

export async function GET(_request, { params }) {
  const unauthorized = await requireAdminApi();
  if (unauthorized) return unauthorized;

  const { id } = await params;
  const attribute = await getAttributeDefinitionById(id);
  if (!attribute) {
    return Response.json({ error: "Attribute not found." }, { status: 404 });
  }
  return Response.json({ attribute });
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
    const attribute = await saveAttributeDefinition({ ...body, id });
    revalidateAttributePaths();
    return Response.json({ attribute });
  } catch (error) {
    return Response.json(
      { error: error.message || "Unable to save attribute." },
      { status: 400 },
    );
  }
}

export async function DELETE(_request, { params }) {
  const unauthorized = await requireAdminApi();
  if (unauthorized) return unauthorized;

  const { id } = await params;
  try {
    await deleteAttributeDefinition(id);
    revalidateAttributePaths();
    return Response.json({ ok: true });
  } catch (error) {
    return Response.json(
      { error: error.message || "Unable to delete attribute." },
      { status: 400 },
    );
  }
}
