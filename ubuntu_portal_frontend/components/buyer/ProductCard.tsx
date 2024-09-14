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
    <div className="bg-white h-auto shadow-md rounded-lg  transition-transform transform hover:scale-105">
      <Image
        src={image}
        alt={name}
        className="w-full p-5 "
        width={187}
        height={162}
      />
      <div className="p-4">
        <h3 className="text-lg font-semibold">{name}</h3>
        <p className="text-gray-600 mt-2">{description}</p>
        <div className="mt-4">
          <span className="font-sans text-lg font-bold text-green-700">
            {price}
          </span>
        </div>
      </div>
    </div>
  );
}
