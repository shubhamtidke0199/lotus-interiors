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
  title: "Lotus Design Studio | Refined Interior Design",
  description:
    "Lotus Design Studio crafts refined residential and commercial interiors with comfort, clarity, and timeless design excellence.",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${fraunces.variable} ${marcellus.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-sans">{children}</body>
    </html>
  );
}
