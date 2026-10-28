import { LoaderCircle } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export default function AdminConsoleLoading() {
  return (
    <div className="flex flex-1 items-center justify-center py-24">
      <Card>
        <CardContent className="flex items-center gap-3 px-6 py-5">
          <LoaderCircle
            className="size-6 animate-spin text-foreground"
            aria-hidden="true"
          />
          <p className="font-helvetica text-sm text-muted-foreground">
            Loading console…
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
