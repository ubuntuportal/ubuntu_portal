import React from "react";
import RevenueChart from "@/components/supplier/Chart";

function Dashboard() {
  return (
    <div className="px-8 mt-8 flex gap-8 flex-col md:flex-row">
      {/* LEFT */}
      <div className="w-full lg:w-2/3 flex flex-col gap-8">
        {/* STATS CARDS */}
        <div className="flex gap-2 justify-between flex-wrap">
          <div>Card1</div>
          <div>Card2</div>
          <div>Card3</div>
        </div>
        {/* ORDER STATUS LIST*/}
        <div className="flex gap-4 flex-col lg:flex-row">
          {" "}
          Order status table
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
