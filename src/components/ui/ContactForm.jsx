"use client";

import { useState } from "react";
import FormField, { SelectField, SubmitButton } from "@/components/ui/FormField";

const CITY_OPTIONS = ["Select City", "Nagpur", "Mumbai", "Pune", "Other"];

export default function ContactForm({
  source = "contact",
  className = "",
  showName = true,
  showPhone = true,
  showLocation = true,
  showBrief = true,
  submitLabel = "Submit Request",
  defaultMessage,
}) {
  const [status, setStatus] = useState("idle");
  const [error, setError] = useState("");

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
    <form className={`flex flex-col gap-10 ${className}`} onSubmit={handleSubmit}>
      {(showName || showPhone) && (
        <div className="grid gap-10 sm:grid-cols-2 sm:gap-6">
          {showName && (
            <FormField
              id="full-name"
              name="name"
              label="Full Name"
              placeholder="e.g. Julianne Smith"
              required
            />
          )}
          {showPhone && (
            <FormField
              id="contact-number"
              name="phone"
              label="Contact Number"
              type="tel"
              placeholder="+91 98765 43210"
              required
            />
          )}
        </div>
      )}

      {showLocation && (
        <SelectField
          id="project-location"
          name="location"
          label="Project Location"
          options={CITY_OPTIONS}
          required
        />
      )}

      {showBrief && (
        <FormField
          id="requirement-brief"
          name="message"
          label="Requirement Brief"
          as="textarea"
          placeholder="Describe your vision, approximate area, and style preferences..."
          required
          defaultValue={defaultMessage}
        />
      )}

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
