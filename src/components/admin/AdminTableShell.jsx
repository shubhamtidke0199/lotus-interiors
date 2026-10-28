import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

export default function AdminTableShell({ children, className }) {
  return (
    <Card className={cn("overflow-hidden", className)}>
      <div className="overflow-x-auto">{children}</div>
    </Card>
  );
}

export const adminTableHeadClass =
  "font-helvetica text-[11px] uppercase tracking-[0.12em] text-muted-foreground";
