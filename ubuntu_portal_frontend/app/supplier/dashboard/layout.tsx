import Header from "@/components/supplier/Header";
import Sidebar from "@/components/supplier/Sidebar";

export default function SupplierLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="bg-gray-50">
      <div className="flex">
        <Sidebar />
        <div className="flex-1 flex-col">
          <Header />
          {children}
        </div>
      </div>
    </main>
  );
}
