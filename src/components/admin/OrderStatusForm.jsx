"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { ENQUIRY_STATUSES } from "@/lib/cms/format";

export default function OrderStatusForm({ order }) {
  const router = useRouter();
  const [status, setStatus] = useState(order.status);
  const [notes, setNotes] = useState(order.notes ?? "");
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();
    setSaving(true);
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
      router.refresh();
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  }

  return (
    <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
      <label className="flex flex-col gap-2">
        <span className="font-helvetica text-xs uppercase tracking-wide text-muted">
          Status
        </span>
        <select
          value={status}
          onChange={(event) => setStatus(event.target.value)}
          className="h-11 w-full max-w-xs border-0 border-b border-appointment-line bg-transparent font-fraunces text-sm outline-none focus:border-primary"
        >
          {ENQUIRY_STATUSES.map((item) => (
            <option key={item.id} value={item.id}>
              {item.label}
            </option>
          ))}
        </select>
      </label>

      <label className="flex flex-col gap-2">
        <span className="font-helvetica text-xs uppercase tracking-wide text-muted">
          Internal notes
        </span>
        <textarea
          rows={5}
          value={notes}
          onChange={(event) => setNotes(event.target.value)}
          placeholder="Site visit, budget, BHK, follow-up date…"
          className="min-h-32 w-full resize-y border-0 border-b border-appointment-line bg-transparent py-2 font-fraunces text-sm outline-none focus:border-primary"
        />
      </label>

      {error ? (
        <p className="font-fraunces text-sm text-red-700" role="alert">
          {error}
        </p>
      ) : null}
      {saved ? (
        <p className="font-fraunces text-sm text-primary" role="status">
          Saved.
        </p>
      ) : null}

      <button
        type="submit"
        disabled={saving}
        className="inline-flex h-11 w-fit items-center bg-primary px-8 font-fraunces text-sm uppercase tracking-[var(--tracking-cta)] text-white hover:bg-primary/90 disabled:opacity-60"
      >
        {saving ? "Saving…" : "Update order"}
      </button>
    </form>
  );
}
