"use client";

import { useState } from "react";

export default function ConsultationCTASection() {
  const [status, setStatus] = useState("idle");
  const [error, setError] = useState("");

  async function handleSubmit(event) {
    event.preventDefault();
    setStatus("loading");
    setError("");

    const formData = new FormData(event.currentTarget);
    const email = String(formData.get("email") ?? "").trim();

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          source: "consultation",
          message: "Consultation request from homepage CTA.",
        }),
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || "Something went wrong.");
      }
      setStatus("success");
      event.currentTarget.reset();
    } catch (err) {
      setStatus("error");
      setError(err.message || "Unable to send right now.");
    }
  }

  return (
    <section
      aria-labelledby="consultation-cta-title"
      className="bg-white py-4 md:px-6 lg:px-8"
    >
      <div className="consultation-cta-card container-site overflow-hidden md:rounded-xl lg:grid lg:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)]">
        <div className="flex flex-col justify-center bg-primary px-6 py-12 sm:px-10 lg:min-h-[28rem] lg:px-16 lg:py-16">
          <h2
            id="consultation-cta-title"
            className="type-display-heading max-w-md font-semibold text-white"
          >
            Book a Design Consultation!
          </h2>

          <p className="mt-6 max-w-md font-fraunces text-sm leading-6 text-white/75 sm:text-base">
            Book a private consultation with our principal designers in Nagpur,
            Mumbai, or Pune.
          </p>

          {status === "success" ? (
            <p className="mt-6 max-w-sm font-fraunces text-sm leading-6 text-white" role="status">
              Thank you — we&apos;ll be in touch shortly to schedule your
              consultation.
            </p>
          ) : (
            <form
              className="mt-6 flex w-full max-w-sm flex-col gap-5"
              onSubmit={handleSubmit}
            >
              <label htmlFor="consultation-email" className="sr-only">
                Email address
              </label>
              <input
                id="consultation-email"
                name="email"
                type="email"
                required
                placeholder="YOUR EMAIL ADDRESS"
                className="h-12 bg-consultation-input px-4 font-fraunces text-sm uppercase leading-5 tracking-wide text-white placeholder:text-white/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white/40"
              />
              {error && (
                <p className="font-fraunces text-sm text-accent-peach" role="alert">
                  {error}
                </p>
              )}
              <button
                type="submit"
                disabled={status === "loading"}
                className="inline-flex h-12 w-full items-center justify-center bg-white px-8 font-fraunces text-sm font-semibold uppercase leading-5 tracking-[var(--tracking-cta)] text-primary transition-opacity hover:opacity-90 disabled:opacity-60"
              >
                {status === "loading" ? "Sending..." : "Request Consultation"}
              </button>
            </form>
          )}
        </div>

        <figure className="relative min-h-72 sm:min-h-80 lg:min-h-[28rem]">
          <img
            src="/images/cta/studio-space.webp"
            alt="Luxury purple-toned interior living room"
            className="absolute inset-0 size-full object-cover"
            loading="lazy"
          />
        </figure>
      </div>
    </section>
  );
}
