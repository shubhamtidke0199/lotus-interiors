import PrimaryButton from "@/components/ui/PrimaryButton";

const variants = {
  overlay: {
    panel: "hero-content-panel backdrop-blur-[20px] text-white",
    eyebrow: "text-white/80",
    heading: "text-white",
    body: "text-white",
    button: "hero",
  },
  standalone: {
    panel:
      "border border-product-bg bg-white shadow-[0_8px_32px_rgba(83,70,108,0.08)] text-heading",
    eyebrow: "text-eyebrow",
    heading: "text-heading",
    body: "text-muted",
    button: "filled",
  },
};

export default function HeroContentCard({ variant = "overlay" }) {
  const styles = variants[variant] ?? variants.overlay;

  return (
    <div
      className={`animate-[fadeUp_0.9s_ease_both] w-full max-w-xl rounded-2xl p-5 sm:rounded-3xl sm:p-7 lg:max-w-xl lg:p-8 ${styles.panel}`}
    >
      <p
        className={`mb-3 font-fraunces text-xs uppercase tracking-[0.18em] ${styles.eyebrow}`}
      >
        Lotus Design Studio
      </p>
      <h1 className={`type-hero-heading ${styles.heading}`}>
        Crafting Beautiful Interiors with Expertise
      </h1>
      <p
        className={`mt-3 max-w-lg font-helvetica text-sm font-normal leading-6 sm:mt-4 sm:text-[0.9375rem] lg:text-base ${styles.body}`}
      >
        Lotus Design Studio specializes in creating elegant, functional, and
        modern spaces. We work on residential, commercial, and hospitality
        projects with complete design and execution services.
      </p>
      <PrimaryButton
        href="/contact"
        variant={styles.button}
        className="mt-5 w-full sm:mt-6 sm:w-auto"
      >
        BOOK A FREE CONSULTATION
      </PrimaryButton>
    </div>
  );
}
