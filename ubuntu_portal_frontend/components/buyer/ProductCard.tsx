import React from "react";
import Image from "next/image";

type ProductCardProps = {
  image: string;
  name: string;
  description: string;
  price: string;
};

export function ProductCard({
  image,
  name,
  description,
  price,
}: ProductCardProps) {
  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden">
      <Image
        src={image}
        alt={name}
        className="w-auto h-48 object-cover"
        width={180}
        height={164}
      />
      <div className="p-4">
        <h3 className="text-lg font-semibold">{name}</h3>
        <p className="text-gray-600 mt-2">{description}</p>
        <div className="mt-4">
          <span className="font-san text-lg font-bold">{price}</span>
        </div>
      </div>
    </div>
  );
}
