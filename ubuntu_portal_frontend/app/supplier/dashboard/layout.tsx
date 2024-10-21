"use client";
import React, { useState } from "react";
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
    <main className="bg-gray-100 justify-center item-center">
      <div className="h-screen flex">
        {/* Sidebar should be static on larger screens */}
        <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
        <div className="w-full md:w-[80%] lg:w-[85%] xl:w-[86%] overflow-scroll flex-1 flex-col mb-2">
          <Header toggleSidebar={toggleSidebar} />
          <section className="mt-8 p-4">{children}</section>
        </div>
      </div>
    </main>
  );
}
