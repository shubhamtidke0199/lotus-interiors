export const dynamic = "force-dynamic";

export const metadata = {
  title: {
    default: "Admin",
    template: "%s | Lotus Admin",
  },
  robots: {
    index: false,
    follow: false,
  },
};

export default function AdminRootLayout({ children }) {
  return <div className="min-h-full bg-[#f7f3ea]">{children}</div>;
}
