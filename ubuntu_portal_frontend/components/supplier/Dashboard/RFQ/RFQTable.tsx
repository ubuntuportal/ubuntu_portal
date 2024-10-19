import React from "react";
import { Button } from "@/components/ui/button";

// Sample RFQ data (you can replace this with dynamic data later)
const rfqData = [
  {
    id: "RFQ23455",
    name: "Addidas Yeezy",
    quantity: "40 Qty",
    date: "23, Sep 2024",
  },
  {
    id: "RFQ56478",
    name: "Nike Air Max",
    quantity: "50 Qty",
    date: "22, Sep 2024",
  },
  {
    id: "RFQ84759",
    name: "Puma Sneakers",
    quantity: "35 Qty",
    date: "21, Sep 2024",
  },
  {
    id: "RFQ84759",
    name: "Puma Sneakers",
    quantity: "35 Qty",
    date: "21, Sep 2024",
  },
  {
    id: "RFQ84759",
    name: "Puma Sneakers",
    quantity: "35 Qty",
    date: "21, Sep 2024",
  },
  {
    id: "RFQ84759",
    name: "Puma Sneakers",
    quantity: "35 Qty",
    date: "21, Sep 2024",
  },
  {
    id: "RFQ84759",
    name: "Puma Sneakers",
    quantity: "35 Qty",
    date: "21, Sep 2024",
  },
];

const RFQTable = () => {
  return (
    <div className="p-4 flex flex-col gap-y-12">
      {/* Data Rows */}
      {rfqData.map((rfq, index) => (
        <div key={index} className="flex justify-between items-center">
          {/* Smart RFQ ID */}
          <div className="w-1/4 text-left">
            <div className="text-gray-400">Smart RFQ ID</div>
            <div className="text-black text-lg font-semibold ">{rfq.id}</div>
          </div>

          <div className="w-1/4 text-left">
            <div className="text-gray-400">Name</div>
            <div className="text-black text-lg font-semibold ">{rfq.name}</div>
          </div>

          <div className="w-1/4 text-left">
            <div className="text-gray-400">Quantity</div>
            <div className="text-black text-lg font-semibold ">
              {rfq.quantity}
            </div>
          </div>

          <div className="w-1/4 text-left">
            <div className="text-gray-400">Date</div>
            <div className="text-black text-lg font-semibold ">{rfq.date}</div>
          </div>

          {/* View Proposal Button */}
          <div className="ml-4">
            <Button className="bg-green-500 text-white">View Proposal</Button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default RFQTable;
