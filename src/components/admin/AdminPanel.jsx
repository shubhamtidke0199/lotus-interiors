import { cn } from "@/lib/utils";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function AdminPanel({
  title,
  description,
  children,
  className,
  contentClassName,
  headerAction,
}) {
  return (
    <Card className={cn(className)}>
      {title || description || headerAction ? (
        <CardHeader
          className={cn(
            headerAction &&
              "flex flex-row flex-wrap items-start justify-between gap-3 space-y-0",
          )}
        >
          <div className="space-y-1">
            {title ? (
              <CardTitle className="font-helvetica text-sm font-medium">
                {title}
              </CardTitle>
            ) : null}
            {description ? (
              <CardDescription className="font-helvetica text-xs">
                {description}
              </CardDescription>
            ) : null}
          </div>
          {headerAction}
        </CardHeader>
      ) : null}
      <CardContent className={cn(title || description ? "pt-0" : "", contentClassName)}>
        {children}
      </CardContent>
    </Card>
  );
}
