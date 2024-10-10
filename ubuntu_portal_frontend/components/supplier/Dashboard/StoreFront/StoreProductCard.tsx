import React from "react";
import { Button } from "@/components/ui/button";

interface StoreProductCardProps {
  name: string;
  price: string;
  imageUrl: string;
}

export default function StoreProductCard({
  name,
  price,
  imageUrl,
}: StoreProductCardProps) {
  return (
    <div className="bg-white rounded-lg p-8 shadow-md w-full">
      {/* Product Image */}
      <div className="mb-4">
        <img
          src={imageUrl}
          alt={name}
          className="w-auto h-auto rounded-lg object-cover"
        />
      </div>

      {/* Product Name and Description */}
      <div className="mb-4">
        <h3 className="text-green-600 font-bold text-md">{name}</h3>
        <p>
          Lorem ipsum dolor sit amet consectetur. Hac dictum fusce facilisis
          lacus accumsan. Vel in tortor urna eget vulputate proin sit in. Mi.
        </p>
      </div>

      {/* Price and Pending Button */}
      <div className="flex justify-between gap-4">
        <p className="text-lg font-bold text-green-600">{price}</p>
        <Button className=" bg-amber-50 hover:bg-amber-100 text-green-600 text-md">
          Pending
        </Button>
      </div>
    </div>
  );
}
