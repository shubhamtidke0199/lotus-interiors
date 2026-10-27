"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { LoaderCircle } from "lucide-react";
import AdminBusyOverlay from "@/components/admin/AdminBusyOverlay";
import {
  adminBtnGhost,
  adminBtnPrimary,
  adminError,
  adminInput,
  adminLabel,
} from "@/components/admin/adminUi";

export default function AdminLoginForm() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  const showBusy = busy || isPending;

  async function handleSubmit(event) {
    event.preventDefault();
    setBusy(true);
    setError("");

    try {
      const response = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || "Unable to sign in.");
      }
      startTransition(() => {
        router.replace("/admin");
        router.refresh();
      });
      setBusy(false);
    } catch (err) {
      setError(err.message);
      setBusy(false);
    }
  }

  return (
    <form className="relative flex flex-col gap-5" onSubmit={handleSubmit}>
      <AdminBusyOverlay
        show={showBusy}
        label={busy ? "Signing in…" : "Opening console…"}
      />

      <label className="flex flex-col gap-2">
        <span className={adminLabel}>Password</span>
        <input
          type="password"
          name="password"
          autoComplete="current-password"
          required
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          className={adminInput}
          placeholder="••••••••"
          disabled={showBusy}
        />
      </label>

      {error ? (
        <p className={adminError} role="alert">
          {error}
        </p>
      ) : null}

      <button type="submit" disabled={showBusy} className={adminBtnPrimary}>
        {showBusy ? (
          <>
            <LoaderCircle className="size-3.5 animate-spin" aria-hidden="true" />
            Signing in…
          </>
        ) : (
          "Continue"
        )}
      </button>

      <Link href="/" className={`${adminBtnGhost} justify-center`}>
        Back to website
      </Link>
    </form>
  );
}
