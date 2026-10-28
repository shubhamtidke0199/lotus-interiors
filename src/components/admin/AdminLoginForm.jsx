"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { LoaderCircle } from "lucide-react";
import AdminBusyOverlay from "@/components/admin/AdminBusyOverlay";
import { adminBtnGhost, adminBtnPrimary, adminLabel } from "@/components/admin/adminUi";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

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

      <div className="flex flex-col gap-2">
        <Label htmlFor="admin-password" className={adminLabel}>
          Password
        </Label>
        <Input
          id="admin-password"
          type="password"
          name="password"
          autoComplete="current-password"
          required
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          placeholder="••••••••"
          disabled={showBusy}
          className="font-helvetica h-10"
        />
      </div>

      {error ? (
        <Alert variant="destructive">
          <AlertDescription className="font-helvetica text-sm">
            {error}
          </AlertDescription>
        </Alert>
      ) : null}

      <Button type="submit" disabled={showBusy} className={adminBtnPrimary}>
        {showBusy ? (
          <>
            <LoaderCircle className="size-3.5 animate-spin" aria-hidden="true" />
            Signing in…
          </>
        ) : (
          "Continue"
        )}
      </Button>

      <Button
        variant="ghost"
        className={`${adminBtnGhost} justify-center`}
        render={<Link href="/" />}
      >
        Back to website
      </Button>
    </form>
  );
}
