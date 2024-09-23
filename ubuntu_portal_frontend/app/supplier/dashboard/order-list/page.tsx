import React from "react";

import OrderFilter from "@/components/supplier/OrderList/OrderFilter";
import OrderTable from "@/components/supplier/OrderList/OrderTable";

export default function OrderList() {
  return (
    <div className="p-8 m-4 flex flex-col gap-8">
      {/* Parent container with fixed width for both components */}
      <div className="w-full max-w-7xl mx-auto">
        {/* Order Filter */}
        <div className="w-full">
          <OrderFilter />
        </div>
        {/* Order Table */}
        <div className="mt-8 w-full">
          <OrderTable />
        </div>
      </div>
    </div>
  );
}
