import { Fraunces, Marcellus } from "next/font/google";
import "./globals.css";

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "600", "700"],
  style: ["normal", "italic"],
});

const marcellus = Marcellus({
  variable: "--font-marcellus",
  subsets: ["latin"],
  display: "swap",
  weight: ["400"],
});

export const metadata = {
  metadataBase: new URL("https://lotusdesignstudio.com"),
  title: {
    default: "Lotus Design Studio | Refined Interior Design",
    template: "%s | Lotus Design Studio",
  },
  description:
    "Lotus Design Studio crafts refined residential and commercial interiors with comfort, clarity, and timeless design excellence across Nagpur, Mumbai, and Pune.",
  openGraph: {
    title: "Lotus Design Studio | Refined Interior Design",
    description:
      "Refined residential and commercial interiors across Nagpur, Mumbai, and Pune.",
    type: "website",
    locale: "en_IN",
    siteName: "Lotus Design Studio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Lotus Design Studio",
    description:
      "Refined residential and commercial interiors across Nagpur, Mumbai, and Pune.",
  },
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${fraunces.variable} ${marcellus.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col bg-white font-sans text-nav">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:bg-primary focus:px-4 focus:py-2 focus:text-white"
        >
          Skip to content
        </a>
        {children}
      </body>
    </html>
  );
}
