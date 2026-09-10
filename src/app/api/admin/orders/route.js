import { requireAdminApi } from "@/lib/admin/auth";
import { getEnquiries } from "@/lib/cms/store";

export async function GET() {
  const unauthorized = await requireAdminApi();
  if (unauthorized) return unauthorized;
  const orders = await getEnquiries();
  return Response.json({ orders });
}
