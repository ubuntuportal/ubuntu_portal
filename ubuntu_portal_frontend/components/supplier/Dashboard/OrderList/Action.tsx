"use client";

import { FiArrowRight } from "react-icons/fi";
import React from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const OrderData = [
  {
    contact: "08022293496",
    product: "Addidas Yeezy",
    quantity: "40 Qty",
    cost: "300",
    status: "Loading",
  },
];

export default function Action() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="bg-green-500 text-white flex items-center gap-2">
          Action
          <FiArrowRight className="h-5 w-5" />
        </Button>
      </DialogTrigger>
      <DialogContent className="w-full max-w-2xl sm:max-w-4xl">
        <DialogHeader>
          <DialogTitle>Action</DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>
        <div className="gap-4 py-4">
          <div className="items-center gap-4">
            <div className="p-4 gap-y-12 bg-white rounded-lg mb-8">
              {OrderData.map((order, index) => (
                <div
                  key={index}
                  className="flex flex-wrap gap-4 sm:flex-nowrap"
                >
                  <div className="w-full sm:w-1/5 text-left">
                    <div className="text-gray-400">Contact No</div>
                    <div className="text-[#0E538C] text-xl font-semibold">
                      {order.contact}
                    </div>
                  </div>

                  <div className="w-full sm:w-1/5 text-left">
                    <div className="text-gray-400">Product</div>
                    <div className="text-[#0E538C] text-xl font-semibold">
                      {order.product}
                    </div>
                  </div>

                  <div className="w-full sm:w-1/5 text-left">
                    <div className="text-gray-400">Quantity</div>
                    <div className="text-[#0E538C] text-xl font-semibold">
                      {order.quantity}
                    </div>
                  </div>

                  <div className="w-full sm:w-1/5 text-left">
                    <div className="text-gray-400">Cost</div>
                    <div className="text-[#0E538C] text-xl font-semibold">
                      ${order.cost}
                    </div>
                  </div>

                  <div className="w-full sm:w-1/5 text-left">
                    <div className="text-gray-400">Status</div>
                    <div className="text-green-500 text-xl font-semibold">
                      {order.status}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="flex flex-row gap-8 justify-center items-center ">
          <Button className="bg-[#0E538C] hover:bg-blue-500">Download</Button>
          <Button className="bg-gray-700 hover:bg-gray-800">
            View and acceept
          </Button>
          <Button className="bg-slate-500 hover:bg-slate-600">
            Talk With Manager
          </Button>
          <Button>Move to order</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
