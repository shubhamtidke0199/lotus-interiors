import AdminPageHeader from "@/components/admin/AdminPageHeader";
import AttributeManager from "@/components/admin/AttributeManager";
import { statusBadgeClass } from "@/components/admin/adminUi";
import { Badge } from "@/components/ui/badge";
import { getCatalog, getCatalogBackend } from "@/lib/cms/store";

export const metadata = {
  title: "Attributes",
};

export default async function AdminAttributesPage() {
  const { attributeDefinitions } = await getCatalog();
  const backend = getCatalogBackend();

  return (
    <main className="flex flex-col gap-8">
      <AdminPageHeader
        eyebrow="Catalog"
        title="Attributes"
        description="Reusable product fields — selects, colour swatches, text, numbers, and dimension lists. Bind them to categories, then fill values on each product."
        actions={
          <Badge className={statusBadgeClass("default")}>
            Storage · {backend}
          </Badge>
        }
      />
      <AttributeManager attributes={attributeDefinitions} />
    </main>
  );
}
