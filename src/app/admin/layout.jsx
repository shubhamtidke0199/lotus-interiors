export const dynamic = "force-dynamic";

export const metadata = {
  title: {
    default: "Admin",
    template: "%s · Lotus Admin",
  },
  robots: {
    index: false,
    follow: false,
  },
};

export default function AdminRootLayout({ children }) {
  return <div className="admin-app">{children}</div>;
}
