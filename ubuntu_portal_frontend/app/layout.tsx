import type { Metadata } from "next";
import { Inter } from "next/font/google";

import "./globals.css";
import Toast from "@/components/Toast";
import SessionProviderWrapper from "@/components/SessionProviderWrapper";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "UbuntuPortal",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <SessionProviderWrapper>
          <Toast />

          {children}
        </SessionProviderWrapper>
      </body>
    </html>
  );
}
