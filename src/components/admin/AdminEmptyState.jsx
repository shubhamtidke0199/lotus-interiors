import { cn } from "@/lib/utils";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function AdminEmptyState({
  title,
  description,
  children,
  className,
}) {
  return (
    <Card className={cn("border-dashed", className)}>
      <CardHeader className="pb-2">
        <CardTitle className="font-helvetica text-sm font-medium">{title}</CardTitle>
        {description ? (
          <CardDescription className="max-w-md font-helvetica text-sm">
            {description}
          </CardDescription>
        ) : null}
      </CardHeader>
      {children ? <CardContent className="pt-0">{children}</CardContent> : null}
    </Card>
  );
}
