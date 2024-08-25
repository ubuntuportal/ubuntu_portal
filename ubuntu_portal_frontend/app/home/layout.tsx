import Header from "@/components/buyer/Header";
import Footer from "@/components/buyer/Footer";

import { Breadcrumb } from "@/components/ui/breadcrumb";

export default function BuyerLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <body>
      <Header />

      <main>{children}</main>

      <Footer />
    </body>
  );
}
