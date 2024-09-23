import Footer from "@/components/buyer/Footer";
import Header from "@/components/supplier/Dashboard/Layouts/Header";
import Sidebar from "@/components/supplier/Dashboard/Layouts/Sidebar";

export default function SupplierLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="bg-gray-50">
      <div className=" h-screen flex">
        <Sidebar />
        <div className="w-[86%] md:w-[92%] lg:w-[84%] xl:w-[86%] overflow-scroll flex-1 flex-col">
          <Header />
          <section> {children}</section>
        </div>
      </div>
      <Footer />
    </main>
  );
}
