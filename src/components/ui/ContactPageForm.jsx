"use client";

import { useSearchParams } from "next/navigation";
import ContactForm from "@/components/ui/ContactForm";

export default function ContactPageForm() {
  const searchParams = useSearchParams();
  const interest = searchParams.get("interest");

  return (
    <ContactForm
      source="contact-page"
      defaultMessage={
        interest
          ? `I would like to enquire about ${interest}.`
          : undefined
      }
    />
  );
}
