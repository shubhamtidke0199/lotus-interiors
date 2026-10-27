"use client";

import { useEffect, useState } from "react";
import FormField, { SubmitButton } from "@/components/ui/FormField";
import {
  loadEnquiryContactDraft,
  saveEnquiryContactDraft,
} from "@/lib/enquiryContactDraft";
import {
  digitsOnly,
  isValidIndiaPhoneLocal,
  parseIndiaPhone,
} from "@/lib/cms/format";

const phoneInputBase =
  "min-w-0 flex-1 border-0 bg-transparent pb-2 pt-2.5 font-fraunces text-sm leading-5 text-nav placeholder:text-muted focus-visible:outline-none";

export default function ContactForm({
  source = "contact",
  className = "",
  submitLabel = "Submit Request",
  defaultMessage,
  interest = "",
  productId = "",
  productSnapshot = null,
  idPrefix = "",
  autoFocusEmail = false,
}) {
  const [status, setStatus] = useState("idle");
  const [error, setError] = useState("");
  const [email, setEmail] = useState("");
  const [phoneLocal, setPhoneLocal] = useState("");
  const [phoneTouched, setPhoneTouched] = useState(false);
  const emailId = `${idPrefix}email`;
  const phoneId = `${idPrefix}phone`;
  const messageId = `${idPrefix}message`;

  useEffect(() => {
    const draft = loadEnquiryContactDraft();
    if (!draft) return;
    if (draft.email) setEmail(draft.email);
    if (draft.phoneLocal) setPhoneLocal(draft.phoneLocal);
  }, []);

  const phoneValid = isValidIndiaPhoneLocal(phoneLocal);
  const phoneShowError =
    phoneTouched && phoneLocal.length > 0 && !phoneValid;
  const phoneShowSuccess = phoneValid;

  async function handleSubmit(event) {
    event.preventDefault();
    setStatus("loading");
    setError("");

    const form = event.currentTarget;
    const formData = new FormData(form);
    const payload = Object.fromEntries(formData.entries());
    setPhoneTouched(true);
    const phone = parseIndiaPhone(phoneLocal);
    if (!phone) {
      setStatus("idle");
      setError("Enter a valid 10-digit mobile number (starts with 6–9).");
      return;
    }

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...payload,
          phone,
          source,
          interest: interest || payload.interest || "",
          productId: productId || payload.productId || "",
          productSnapshot: productSnapshot || undefined,
        }),
      });
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Something went wrong.");
      }

      saveEnquiryContactDraft({
        email: String(payload.email ?? email).trim(),
        phoneLocal,
        phone,
      });

      form.reset();
      setStatus("success");
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
      {productId ? <input type="hidden" name="productId" value={productId} /> : null}
      {interest ? <input type="hidden" name="interest" value={interest} /> : null}
      {productSnapshot ? (
        <input
          type="hidden"
          name="productSnapshot"
          value={JSON.stringify(productSnapshot)}
        />
      ) : null}
      <div className="grid gap-8 sm:grid-cols-2 sm:gap-6">
        <FormField
          id={emailId}
          name="email"
          label="Email"
          type="email"
          placeholder="you@example.com"
          required
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          autoFocus={autoFocusEmail}
        />
        <div className="relative">
          <label
            htmlFor={phoneId}
            className="mb-1 block font-helvetica text-sm uppercase leading-4 tracking-wide text-muted"
          >
            Phone
          </label>
          <div
            className={`flex items-baseline gap-2 border-b pb-0 transition-colors ${
              phoneShowError
                ? "border-red-600"
                : phoneShowSuccess
                  ? "border-primary"
                  : "border-appointment-line focus-within:border-primary"
            }`}
          >
            <span
              className="shrink-0 pb-2 pt-2.5 font-fraunces text-sm leading-5 text-nav"
              aria-hidden="true"
            >
              +91
            </span>
            <input
              id={phoneId}
              name="phoneLocal"
              type="tel"
              inputMode="numeric"
              autoComplete="tel-national"
              placeholder="9876543210"
              required
              maxLength={10}
              value={phoneLocal}
              onChange={(event) =>
                setPhoneLocal(digitsOnly(event.target.value).slice(0, 10))
              }
              onBlur={() => setPhoneTouched(true)}
              aria-invalid={phoneShowError}
              className={`${phoneInputBase} focus-visible:border-primary ${
                phoneShowError ? "text-red-800" : ""
              }`}
              aria-describedby={`${phoneId}-hint ${phoneId}-status`}
            />
            <span
              id={`${phoneId}-status`}
              className="shrink-0 pb-2 pt-2.5 font-helvetica text-[11px] tabular-nums tracking-wide text-muted"
              aria-live="polite"
            >
              {phoneShowSuccess ? (
                <span className="text-primary" aria-label="Valid number">
                  ✓
                </span>
              ) : (
                `${phoneLocal.length}/10`
              )}
            </span>
          </div>
          <p id={`${phoneId}-hint`} className="mt-1.5 font-fraunces text-xs leading-5 text-muted">
            {phoneShowError
              ? "Use 10 digits; mobile numbers start with 6, 7, 8, or 9."
              : "Enter your 10-digit mobile number without the country code."}
          </p>
        </div>
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
