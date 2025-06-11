"use client";

import { ReactNode } from "react";
import { CookiesProvider } from "react-cookie";
import { CartProvider } from "@/contexts/CartContext";

export default function Providers({ children }: { children: ReactNode }) {
  return (
    <CookiesProvider>
      <CartProvider>
        {children}
      </CartProvider>
    </CookiesProvider>
  );
}
