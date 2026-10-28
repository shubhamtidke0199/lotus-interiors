"use client";

import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { LoaderCircle } from "lucide-react";
import AdminBusyOverlay from "@/components/admin/AdminBusyOverlay";
import { AdminField } from "@/components/admin/AdminField";
import {
  adminBtnPrimary,
  adminInput,
  adminSuccess,
  adminTextarea,
} from "@/components/admin/adminUi";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ENQUIRY_STATUSES } from "@/lib/cms/format";

export default function OrderStatusForm({ order }) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [status, setStatus] = useState(order.status);
  const [notes, setNotes] = useState(order.notes ?? "");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  const [saved, setSaved] = useState(false);
  const showBusy = busy || isPending;

  async function handleSubmit(event) {
    event.preventDefault();
    setBusy(true);
    setError("");
    setSaved(false);

    try {
      const response = await fetch(`/api/admin/orders/${order.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status, notes }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Unable to update order.");
      setSaved(true);
      startTransition(() => {
        router.refresh();
      });
    } catch (err) {
      setError(err.message);
    } finally {
      setBusy(false);
    }
  }

  return (
    <form className="relative flex flex-col gap-5" onSubmit={handleSubmit}>
      <AdminBusyOverlay
        show={showBusy}
        label={busy ? "Saving follow-up…" : "Updating…"}
      />

      <AdminField label="Status">
        <select
          value={status}
          onChange={(event) => setStatus(event.target.value)}
          className={adminInput}
          disabled={showBusy}
        >
          {ENQUIRY_STATUSES.map((item) => (
            <option key={item.id} value={item.id}>
              {item.label}
            </option>
          ))}
        </select>
      </AdminField>

      <AdminField label="Internal notes">
        <Textarea
          rows={5}
          value={notes}
          onChange={(event) => setNotes(event.target.value)}
          placeholder="Site visit, budget, BHK, follow-up date…"
          className={adminTextarea}
          disabled={showBusy}
        />
      </AdminField>

      {error ? (
        <Alert variant="destructive">
          <AlertDescription className="font-helvetica text-sm">{error}</AlertDescription>
        </Alert>
      ) : null}
      {saved && !showBusy ? (
        <p className={adminSuccess} role="status">
          Changes saved
        </p>
      ) : null}

      <Button type="submit" disabled={showBusy} className={`${adminBtnPrimary} w-fit`}>
        {showBusy ? (
          <>
            <LoaderCircle className="size-3.5 animate-spin" aria-hidden="true" />
            Saving…
          </>
        ) : (
          "Save follow-up"
        )}
      </Button>
    </form>
  );
}
