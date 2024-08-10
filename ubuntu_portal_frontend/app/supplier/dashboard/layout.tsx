import Header from '@/components/supplier/Header';
import Sidebar from '@/components/supplier/Sidebar';

export default function SupplierLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main>
      <div className="flex">
        <Sidebar />
        <div className="flex flex-col">
          <Header />
          {children}
        </div>
      </div>
    </main>
  );
}
