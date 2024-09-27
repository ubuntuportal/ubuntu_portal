import React from "react";
import { Button } from "@/components/ui/button";

export default function ModifyStoreProduct() {
  return (
    <div className="bg-white rounded-lg p-4 shadow-md w-full">
      {/* Product Image */}
      <div className="mb-4">
        <img
          src="/cocoa.png"
          alt="product"
          className="w-full h-auto rounded-lg object-cover"
        />
      </div>

      {/* Edit Button - Full Width */}
      <div className="mb-4">
        <Button className="w-full">Edit</Button>
      </div>

      {/* Delete and Hide Buttons - Aligned */}
      <div className="flex justify-between gap-4">
        <Button className="w-full bg-[#CF1B2B] hover:bg-red-600">Delete</Button>
        <Button className="w-full bg-[#F7A928] hover:bg-amber-600">Hide</Button>
      </div>
    </div>
  );
}
