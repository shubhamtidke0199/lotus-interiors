"use client";

import { useSearchParams } from "next/navigation";
import ContactForm from "@/components/ui/ContactForm";

export default function ContactPageForm() {
  const searchParams = useSearchParams();
  const interest = searchParams.get("interest") ?? "";
  const productId = searchParams.get("product") ?? "";

  return (
    <ContactForm
      source="contact-page"
      interest={interest}
      productId={productId}
      defaultMessage={
        interest
          ? `I would like to enquire about ${interest}.`
          : undefined
      }
    />
  );
}
