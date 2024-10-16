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
    <div className="bg-white overflow-hidden shadow-md rounded-lg transition-transform transform hover:scale-105 hover:shadow-lg p-4">
      <Image
        src={image}
        alt={name} // Make sure this is descriptive
        className="w-full h-32 object-cover"
        width={187}
        height={162}
        loading="lazy" // Improve performance with lazy loading
      />
      <div className="p-3">
        <h3 className="text-sm font-semibold">{name}</h3>
        <p className="text-gray-600 mt-1">{description}</p>
        <div className="mt-2">
          <span className="font-sans text-lg font-bold text-green-700">
            {price}
          </span>
        </div>
      </div>
    </div>
  );
}
