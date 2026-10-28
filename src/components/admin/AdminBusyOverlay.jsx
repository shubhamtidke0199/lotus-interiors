"use client";

import { LoaderCircle } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

export default function AdminBusyOverlay({
  show,
  label = "Working…",
  fullscreen = false,
}) {
  if (!show) return null;

  return (
    <div
      className={cn(
        "z-50 flex items-center justify-center backdrop-blur-[1px]",
        fullscreen
          ? "fixed inset-0 bg-background/70"
          : "absolute inset-0 bg-card/80",
      )}
      role="status"
      aria-live="polite"
      aria-busy="true"
    >
      <Card className="shadow-md">
        <CardContent className="flex items-center gap-3 px-5 py-4">
          <LoaderCircle
            className="size-5 animate-spin text-foreground"
            aria-hidden="true"
          />
          <p className="font-helvetica text-sm text-foreground">{label}</p>
        </CardContent>
      </Card>
    </div>
  );
}
