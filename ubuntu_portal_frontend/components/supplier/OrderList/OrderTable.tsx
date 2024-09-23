import React from "react";
import { Button } from "@/components/ui/button";

import { FiArrowRight } from "react-icons/fi";

// Sample RFQ data (you can replace this with dynamic data later)
const OrderData = [
  {
    contact: "08022293496",
    product: "Addidas Yeezy",
    quantity: "40 Qty",
    cost: "300",
    status: "Loading",
  },
  {
    contact: "08022293496",
    product: "Addidas Yeezy",
    quantity: "40 Qty",
    cost: "300",
    status: "Loading",
  },
  {
    contact: "08022293496",
    product: "Addidas Yeezy",
    quantity: "40 Qty",
    cost: "300",
    status: "Loading",
  },
  {
    contact: "08022293496",
    product: "Addidas Yeezy",
    quantity: "40 Qty",
    cost: "300",
    status: "Loading",
  },
  {
    contact: "08022293496",
    product: "Addidas Yeezy",
    quantity: "40 Qty",
    cost: "300",
    status: "Loading",
  },
  {
    contact: "08022293496",
    product: "Addidas Yeezy",
    quantity: "40 Qty",
    cost: "300",
    status: "Loading",
  },
  {
    contact: "08022293496",
    product: "Addidas Yeezy",
    quantity: "40 Qty",
    cost: "300",
    status: "Loading",
  },
  {
    contact: "08022293496",
    product: "Addidas Yeezy",
    quantity: "40 Qty",
    cost: "300",
    status: "Loading",
  },
  {
    contact: "08022293496",
    product: "Addidas Yeezy",
    quantity: "40 Qty",
    cost: "300",
    status: "Loading",
  },
  {
    contact: "08022293496",
    product: "Addidas Yeezy",
    quantity: "40 Qty",
    cost: "300",
    status: "Loading",
  },
  {
    contact: "08022293496",
    product: "Addidas Yeezy",
    quantity: "40 Qty",
    cost: "300",
    status: "Loading",
  },
  {
    contact: "08022293496",
    product: "Addidas Yeezy",
    quantity: "40 Qty",
    cost: "300",
    status: "Loading",
  },
  {
    contact: "08022293496",
    product: "Addidas Yeezy",
    quantity: "40 Qty",
    cost: "300",
    status: "Loading",
  },
  {
    contact: "08022293496",
    product: "Addidas Yeezy",
    quantity: "40 Qty",
    cost: "300",
    status: "Loading",
  },
];

const OrderTable = () => {
  return (
    <div className="p-4 flex flex-col gap-y-12 bg-white rounded-lg mb-8">
      {/* Data Rows */}
      {OrderData.map((OrderData, index) => (
        <div key={index} className="flex justify-between items-center">
          {/* Smart RFQ ID */}
          <div className="w-1/4 text-left">
            <div className="text-gray-400">Contact No</div>
            <div className="text-[#0E538C] text-xl font-semibold ">
              {OrderData.contact}
            </div>
          </div>

          <div className="w-1/4 text-left">
            <div className="text-gray-400">Products</div>
            <div className="text-[#0E538C] text-xl font-semibold ">
              {OrderData.product}
            </div>
          </div>

          <div className="w-1/4 text-left">
            <div className="text-gray-400">Quantity</div>
            <div className="text-[#0E538C] text-xl font-semibold ">
              {OrderData.quantity}
            </div>
          </div>

          <div className="w-1/4 text-left">
            <div className="text-gray-400">Cost</div>
            <div className="text-[#0E538C] text-xl font-semibold ">
              ${OrderData.cost}
            </div>
          </div>
          <div className="w-1/4 text-left">
            <div className="text-gray-400">Status</div>
            <div className="text-green-500 text-xl font-semibold ">
              {OrderData.status}
            </div>
          </div>
          {/* View Proposal Button */}
          <div className="ml-4">
            <Button className="bg-green-500 text-white flex items-center gap-2">
              Action
              <FiArrowRight className="h-5 w-10" /> {/* Arrow Icon */}
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default OrderTable;
