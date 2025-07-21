import type { Metadata } from "next";
import localFont from "next/font/local";
import Script from "next/script"; // 👈 import Script
import "./globals.css";
import Navbar from "@/components/Navbar";
import TopHeader from "@/components/Top";
import Providers from "./providers";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "ZakGifts",
  description: "ZakGifts!",
  other: {
    "google-site-verification": "ky6hdrAwe7DwiiKUCcUjrsx8HhcuCzixbZjjmcoaRTE",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        {/* ✅ Google Ads gtag.js */}
        <Script
          async
          src="https://www.googletagmanager.com/gtag/js?id=AW-17380949882"
          strategy="beforeInteractive"
        />
        <Script id="google-ads-gtag" strategy="beforeInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'AW-17380949882');
          `}
        </Script>
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <Providers>
          <TopHeader />
          <Navbar />
          <main>{children}</main>
        </Providers>
      </body>
    </html>
  );
}
