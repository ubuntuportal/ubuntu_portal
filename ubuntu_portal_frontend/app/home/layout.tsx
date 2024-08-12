import Header from "@/components/buyer/Header";
import Footer from "@/components/buyer/Footer";

export default function BuyerLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <body className="h-screen">
      <Header />
      <main>
        {/* <div className="flex">
          <div className="flex-1 flex-col">
            <Header />
            {children}
          </div>
        </div> */}
        {children}
      </main>
      <Footer />
    </body>
  );
}
