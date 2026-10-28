import { adminLabel } from "@/components/admin/adminUi";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

export function AdminField({ id, label, hint, children, className }) {
  return (
    <div className={cn("flex flex-col gap-2", className)}>
      {label ? (
        <Label htmlFor={id} className={adminLabel}>
          {label}
        </Label>
      ) : null}
      {children}
      {hint ? (
        <p className="font-helvetica text-xs text-muted-foreground">{hint}</p>
      ) : null}
    </div>
  );
}

export function AdminSectionTitle({ title, description }) {
  return (
    <div className="space-y-1">
      <h2 className="font-helvetica text-sm font-medium text-foreground">{title}</h2>
      {description ? (
        <p className="font-helvetica text-xs text-muted-foreground">{description}</p>
      ) : null}
    </div>
  );
}
