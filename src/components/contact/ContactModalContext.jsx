"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import ContactModal from "@/components/contact/ContactModal";

const ContactModalContext = createContext(null);

export function useContactModal() {
  const context = useContext(ContactModalContext);
  if (!context) {
    throw new Error("useContactModal must be used within ContactModalProvider");
  }
  return context;
}

export function isContactHref(href) {
  if (!href || typeof href !== "string") return false;
  return (
    href === "/contact" ||
    href.startsWith("/contact?") ||
    href.startsWith("/contact#")
  );
}

export function getContactModalOptionsFromHref(href) {
  let interest = "";
  let productId = "";
  try {
    const url = new URL(href, "https://lotusdesignstudio.com");
    interest = url.searchParams.get("interest") || "";
    productId = url.searchParams.get("product") || "";
  } catch {
    interest = "";
    productId = "";
  }

  return {
    source: interest ? "enquire" : "modal",
    title: interest ? "Enquire Now" : "Book a Consultation",
    defaultMessage: interest ? `I'm interested in ${interest}.` : "",
    submitLabel: interest ? "Send Enquiry" : "Submit Request",
    productId,
  };
}

export function ContactModalProvider({ children }) {
  const [isOpen, setIsOpen] = useState(false);
  const [options, setOptions] = useState({
    source: "modal",
    title: "Book a Consultation",
    description:
      "Share a few details and a Lotus designer will get back to you within one business day.",
    defaultMessage: "",
    submitLabel: "Submit Request",
    productId: "",
  });

  const openContactModal = useCallback((nextOptions = {}) => {
    setOptions({
      source: "modal",
      title: "Book a Consultation",
      description:
        "Share a few details and a Lotus designer will get back to you within one business day.",
      defaultMessage: "",
      submitLabel: "Submit Request",
      productId: "",
      ...nextOptions,
    });
    setIsOpen(true);
  }, []);

  const closeContactModal = useCallback(() => {
    setIsOpen(false);
  }, []);

  useEffect(() => {
    const handleClick = (event) => {
      if (
        event.button !== 0 ||
        event.metaKey ||
        event.ctrlKey ||
        event.shiftKey ||
        event.altKey
      ) {
        return;
      }

      const target = event.target;
      if (!(target instanceof Element)) return;

      const anchor = target.closest("a[href]");
      if (!anchor || anchor.dataset.contactModal === "skip") return;

      const href = anchor.getAttribute("href");
      if (!isContactHref(href)) return;

      event.preventDefault();
      event.stopPropagation();
      event.stopImmediatePropagation();

      openContactModal(getContactModalOptionsFromHref(href));
    };

    document.addEventListener("click", handleClick, true);
    return () => document.removeEventListener("click", handleClick, true);
  }, [openContactModal]);

  useEffect(() => {
    if (!isOpen) return undefined;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKeyDown = (event) => {
      if (event.key === "Escape") closeContactModal();
    };

    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [closeContactModal, isOpen]);

  const value = useMemo(
    () => ({
      isOpen,
      options,
      openContactModal,
      closeContactModal,
    }),
    [closeContactModal, isOpen, openContactModal, options],
  );

  return (
    <ContactModalContext.Provider value={value}>
      {children}
      <ContactModal
        isOpen={isOpen}
        options={options}
        onClose={closeContactModal}
      />
    </ContactModalContext.Provider>
  );
}
