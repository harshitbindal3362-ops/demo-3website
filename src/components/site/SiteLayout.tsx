import { Marquee } from "./Marquee";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { AuthProvider } from "@/context/AuthContext";
import { CartProvider } from "@/context/CartContext";
import { AuthDialog } from "./AuthDialog";
import { CartDrawer } from "./CartDrawer";
import { Toaster } from "@/components/ui/sonner";

export function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      <CartProvider>
        <div className="min-h-screen flex flex-col bg-bone text-ink">
          <Marquee />
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </div>
        <AuthDialog />
        <CartDrawer />
        <Toaster richColors position="top-center" />
      </CartProvider>
    </AuthProvider>
  );
}
