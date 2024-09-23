import React from "react";
import RevenueChart from "@/components/supplier/Dashboard/Main/Chart";
import StatsCard from "@/components/supplier/Dashboard/Main/StatsCard";
import OrderStatusTable from "@/components/supplier/Dashboard/Main/OderStatusTable";
import RFQNotification from "@/components/supplier/Dashboard/Main/RFQNotification";
import ServiceMessages from "@/components/supplier/Dashboard/Main/ServiceMessages";
import Link from "next/link";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import LogoutButton from "@/components/LogoutButton";
import RFQLabelCard from "@/components/supplier/Dashboard/RFQ/RFQLabelCard";
import RFQFilter from "@/components/supplier/Dashboard/RFQ/RFQFilter";
import RFQTable from "@/components/supplier/Dashboard/RFQ/RFQTable";

export default function RFQList() {
  return (
    <div className="p-8 m-4 flex flex-col gap-8">
      <div>
        <RFQLabelCard />
      </div>
      <div>
        <RFQFilter />
      </div>
      <div>
        <RFQTable />
      </div>
    </div>
  );
}
