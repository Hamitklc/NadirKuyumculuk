import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Nadir Kuyumculuk | Timeless Elegance",
  description: "Discover the finest handcrafted jewelry at Nadir Kuyumculuk. Gold, diamonds, and luxury timepieces.",
};

import { CartProvider } from "./context/CartContext";
import { WishlistProvider } from "./context/WishlistContext";
import { SpotlightProvider } from "./context/SpotlightContext";
import CartSidebar from "./components/CartSidebar";
import WhatsAppButton from "./components/WhatsAppButton";
import Spotlight from "./components/Spotlight";
import Footer from "./components/Footer";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr">
      <body>
        <CartProvider>
          <WishlistProvider>
            <SpotlightProvider>
              {children}
              <CartSidebar />
              <WhatsAppButton />
              <Spotlight />
              <Footer />
            </SpotlightProvider>
          </WishlistProvider>
        </CartProvider>
      </body>
    </html>
  );
}
