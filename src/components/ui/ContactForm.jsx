"use client";

import { useState } from "react";
import FormField, { SubmitButton } from "@/components/ui/FormField";

export default function ContactForm({
  source = "contact",
  className = "",
  submitLabel = "Submit Request",
  defaultMessage,
  idPrefix = "",
}) {
  const [status, setStatus] = useState("idle");
  const [error, setError] = useState("");
  const emailId = `${idPrefix}email`;
  const phoneId = `${idPrefix}phone`;
  const messageId = `${idPrefix}message`;

  async function handleSubmit(event) {
    event.preventDefault();
    setStatus("loading");
    setError("");

    const formData = new FormData(event.currentTarget);
    const payload = Object.fromEntries(formData.entries());

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...payload, source }),
      });
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Something went wrong.");
      }

      setStatus("success");
      event.currentTarget.reset();
    } catch (err) {
      setStatus("error");
      setError(err.message || "Unable to send right now. Please try again.");
    }
  }

  if (status === "success") {
    return (
      <div
        className={`rounded-sm border border-primary/20 bg-accent-cream px-6 py-8 ${className}`}
        role="status"
      >
        <p className="font-fraunces text-lg text-heading">Request received</p>
        <p className="mt-2 font-fraunces text-sm leading-6 text-muted">
          Thank you. A Lotus designer will contact you within one business day.
        </p>
        <button
          type="button"
          className="mt-5 font-fraunces text-sm uppercase tracking-[var(--tracking-cta)] text-primary underline-offset-2 hover:underline"
          onClick={() => setStatus("idle")}
        >
          Send another request
        </button>
      </div>
    );
  }

  return (
    <form className={`flex flex-col gap-8 ${className}`} onSubmit={handleSubmit}>
      <div className="grid gap-8 sm:grid-cols-2 sm:gap-6">
        <FormField
          id={emailId}
          name="email"
          label="Email"
          type="email"
          placeholder="you@example.com"
          required
        />
        <FormField
          id={phoneId}
          name="phone"
          label="Phone"
          type="tel"
          placeholder="+91 98765 43210"
          required
        />
      </div>

      <FormField
        id={messageId}
        name="message"
        label="Requirement / Query"
        as="textarea"
        placeholder="Tell us about your project, space, or question..."
        required
        defaultValue={defaultMessage}
      />

      {error && (
        <p className="font-fraunces text-sm text-red-700" role="alert">
          {error}
        </p>
      )}

      <SubmitButton disabled={status === "loading"}>
        {status === "loading" ? "Sending..." : submitLabel}
      </SubmitButton>
    </form>
  );
}
