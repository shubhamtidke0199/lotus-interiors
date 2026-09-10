"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function AdminLoginForm() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();
    setLoading(true);
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
      router.replace("/admin");
      router.refresh();
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  }

  return (
    <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
      <label className="flex flex-col gap-2">
        <span className="font-helvetica text-sm uppercase tracking-wide text-muted">
          Password
        </span>
        <input
          type="password"
          name="password"
          autoComplete="current-password"
          required
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          className="h-12 border-0 border-b border-appointment-line bg-transparent font-fraunces text-base text-nav outline-none focus:border-primary"
        />
      </label>

      {error ? (
        <p className="font-fraunces text-sm text-red-700" role="alert">
          {error}
        </p>
      ) : null}

      <button
        type="submit"
        disabled={loading}
        className="inline-flex h-12 items-center justify-center bg-primary px-8 font-fraunces text-sm uppercase tracking-[var(--tracking-cta)] text-white hover:bg-primary/90 disabled:opacity-60"
      >
        {loading ? "Signing in…" : "Sign in"}
      </button>

      <Link
        href="/"
        className="text-center font-fraunces text-sm text-muted hover:text-primary"
      >
        Back to website
      </Link>
    </form>
  );
}
