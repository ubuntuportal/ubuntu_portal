import Header from "@/components/buyer/Header";
import Footer from "@/components/buyer/Footer";
import { Inter } from "next/font/google";

export default function BuyerLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <body className="inter.className min-h-screen">
      <Header />
      <main>{children}</main>
      <Footer />
    </body>
  );
}
