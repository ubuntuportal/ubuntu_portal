import React from "react";

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
