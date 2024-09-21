import React from "react";
import RevenueChart from "@/components/supplier/Chart";
import StatsCard from "@/components/supplier/StatsCard";
import OrderStatusTable from "@/components/supplier/OderStatusTable";
import RFQNotification from "@/components/supplier/RFQNotification";
import Link from "next/link";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import LogoutButton from "@/components/LogoutButton";

async function Dashboard() {
  const session = await getServerSession(authOptions);

  // If no session exists, redirect to the login page
  if (!session) {
    redirect("/auth/login");
  }

  const { first_name, last_name } = session.user;
  return (
    <div className="px-8 mt-8 flex gap-8 flex-col md:flex-row">
      {/* LEFT */}
      <div className="w-full lg:w-2/3 flex flex-col gap-8">
        {/* STATS CARDS */}
        <Link href="/supplier/products">Product</Link>
        <LogoutButton />
        <h3>{first_name}</h3>

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
      <div className="w-full lg:w-1/3 flex flex-col gap-8 ">
        <section>
          <div className=" bg-white rounded-2xl">
            <RFQNotification />
          </div>
        </section>
        <section>
          <div>Messages</div>
        </section>
      </div>
    </div>
  );
}

export default Dashboard;
