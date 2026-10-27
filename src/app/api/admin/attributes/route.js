import { revalidatePath } from "next/cache";
import { requireAdminApi } from "@/lib/admin/auth";
import { getCatalog, saveAttributeDefinition } from "@/lib/cms/store";

function revalidateAttributePaths() {
  revalidatePath("/admin/attributes");
  revalidatePath("/admin/categories");
  revalidatePath("/admin/products");
  revalidatePath("/products");
  revalidatePath("/products/[slug]", "page");
}

export async function GET() {
  const unauthorized = await requireAdminApi();
  if (unauthorized) return unauthorized;

  const { attributeDefinitions } = await getCatalog();
  return Response.json({ attributes: attributeDefinitions });
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
    const attribute = await saveAttributeDefinition(body);
    revalidateAttributePaths();
    return Response.json({ attribute }, { status: 201 });
  } catch (error) {
    return Response.json(
      { error: error.message || "Unable to save attribute." },
      { status: 400 },
    );
  }
}
