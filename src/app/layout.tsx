import type { Metadata } from "next";
import Script from "next/script";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import MetaPixel from "./MetaPixel";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Andy - EcomSimulation",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">
        {/* EcomSimulation hub tracking — every page */}
        <Script
          id="ecomsim-hub"
          src="https://use.ecomsimulation.com/api/hub/v1/cmtai0ehz00ifjj0ar6zzd1h0"
          strategy="afterInteractive"
        />
        <MetaPixel />
        <div className="min-h-full flex-1">{children}</div>
      </body>
    </html>
  );
}
