import { requireAdminApi } from "@/lib/admin/auth";
import { getEnquiryById, updateEnquiry } from "@/lib/cms/store";

export async function GET(_request, { params }) {
  const unauthorized = await requireAdminApi();
  if (unauthorized) return unauthorized;

  const { id } = await params;
  const order = await getEnquiryById(id);
  if (!order) {
    return Response.json({ error: "Order not found." }, { status: 404 });
  }
  return Response.json({ order });
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
    const order = await updateEnquiry(id, body);
    return Response.json({ order });
  } catch (error) {
    return Response.json(
      { error: error.message || "Unable to update order." },
      { status: 400 },
    );
  }
}
