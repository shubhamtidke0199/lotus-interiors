import Navbar from "@/components/layouts/Navbar";
import SiteFooter from "@/components/layouts/SiteFooter";
import { ContactModalProvider } from "@/components/contact/ContactModalContext";

export default function SiteLayout({ children }) {
  return (
    <ContactModalProvider>
      <Navbar />
      <div id="main-content" className="flex flex-1 flex-col">
        {children}
      </div>
      <SiteFooter />
    </ContactModalProvider>
  );
}
