"use client";
import React, { useEffect } from "react";
import RevenueChart from "@/components/supplier/Chart";
import StatsCard from "@/components/supplier/StatsCard";
import OrderStatusTable from "@/components/supplier/OderStatusTable";
import { useRouter } from "next/navigation";
import Link from "next/link";

function Dashboard() {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      router.push("/login"); // Redirect to login if token is missing
    }

    // Optionally, verify token with the server to check if it's still valid
    // Example: fetch('/api/verify-token', { headers: { 'Authorization': `Bearer ${token}` } });
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    router.push("/login");
  };
  return (
    <div className="px-8 mt-8 flex gap-8 flex-col md:flex-row">
      {/* LEFT */}
      <div className="w-full lg:w-2/3 flex flex-col gap-8">
        {/* STATS CARDS */}
        <Link href="/supplier/products">Product</Link>
        <button
          onClick={handleLogout}
          className="bg-red-500 text-white px-4 py-2 rounded"
        >
          Logout
        </button>

        <div className="flex gap-2 justify-between flex-wrap">
          <StatsCard icon="/Icon_Order.png" value="75" label="Total order" />
          <StatsCard
            icon="/Icon_Delivered.png"
            value="50"
            label="Total delivered"
          />
          <StatsCard
            icon="/Icon_Revenue.png"
            value="$500"
            label="Total revenue"
          />
        </div>
        {/* ORDER STATUS TABLE*/}
        <div className="flex gap-4 flex-col lg:flex-row">
          {" "}
          <div>
            <OrderStatusTable />
          </div>
        </div>
        {/* CHART */}
        <div className="w-full h-[500px]">
          <RevenueChart />
        </div>
      </div>

      {/* RIGHT */}
      <div className="w-full lg:w-1/3 flex flex-col gap-8">
        <section>
          <div>RFQ</div>
        </section>
        <section>
          <div>Messages</div>
        </section>
      </div>
    </div>
  );
}

export default Dashboard;
