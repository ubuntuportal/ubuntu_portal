"use client";
import React, { useState } from "react";
import Footer from "@/components/buyer/Footer";
import Header from "@/components/supplier/Dashboard/Layouts/Header";
import Sidebar from "@/components/supplier/Dashboard/Layouts/Sidebar";

export default function SupplierLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => setSidebarOpen(!isSidebarOpen);

  return (
    <main className="bg-gray-50">
      <div className="h-screen flex">
        <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
        <div className="w-[86%] md:w-[92%] lg:w-[84%] xl:w-[86%] overflow-scroll flex-1 flex-col mb-2">
          <Header toggleSidebar={toggleSidebar} />
          <section>{children}</section>
        </div>
      </div>
      <Footer />
    </main>
  );
}
