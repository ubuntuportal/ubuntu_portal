import React from "react";
import { ProductCard } from "./ProductCard"; // Ensure the correct import path
import Searchbox from "./Searchbox";
import Link from "next/link";

export default function Container() {
  //simulating dynamic update from backend
  const products = [
    {
      id: 1,
      image: "/img/image.png",
      name: "Addidas Sneakers",
      description: "This is a brief description of Addidas Sneakers.",
      price: "$99.99",
    },
    {
      id: 2,
      image: "/img/image.png",
      name: "Addidas Sneakers",
      description: "This is a brief description of Addidas Sneakers.",
      price: "$99.99",
    },
    {
      id: 3,
      image: "/img/image.png",
      name: "Addidas Sneakers",
      description: "This is a brief description of Addidas Sneakers.",
      price: "$99.99",
    },
    {
      id: 4,
      image: "/img/image.png",
      name: "Addidas Sneakers",
      description: "This is a brief description of Addidas Sneakers.",
      price: "$99.99",
    },
    {
      id: 5,
      image: "/img/image.png",
      name: "Addidas Sneakers",
      description: "This is a brief description of Addidas Sneakers.",
      price: "$99.99",
    },
    {
      id: 6,
      image: "/img/image.png",
      name: "Addidas Sneakers",
      description: "This is a brief description of Addidas Sneakers.",
      price: "$99.99",
    },
    {
      id: 7,
      image: "/img/image.png",
      name: "Addidas Sneakers",
      description: "This is a brief description of Addidas Sneakers.",
      price: "$99.99",
    },
    {
      id: 8,
      image: "/img/image.png",
      name: "Addidas Sneakers",
      description: "This is a brief description of Addidas Sneakers.",
      price: "$99.99",
    },
    {
      id: 9,
      image: "/img/image.png",
      name: "Addidas Sneakers",
      description: "This is a brief description of Addidas Sneakers.",
      price: "$99.99",
    },
    {
      id: 10,
      image: "/img/image.png",
      name: "Addidas Sneakers",
      description: "This is a brief description of Addidas Sneakers.",
      price: "$99.99",
    },
    {
      id: 11,
      image: "/img/image.png",
      name: "Addidas Sneakers",
      description: "This is a brief description of Addidas Sneakers.",
      price: "$99.99",
    },
    {
      id: 12,
      image: "/img/image.png",
      name: "Addidas Sneakers",
      description: "This is a brief description of Addidas Sneakers.",
      price: "$99.99",
    },
    // Add more product objects as needed
  ];

  return (
    <div className="container mx-auto px-4">
      <div className="w-full sm:w-8/12 pt-4 pb-4">
        <Searchbox />
      </div>
      <div className="grid grid-cols-3 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-5 gap-4">
        {products.map((product) => (
          <Link href={`products-listing/${product.id}`} key={product.id}>
            <ProductCard
              image={product.image}
              name={product.name}
              description={product.description}
              price={product.price}
            />
          </Link>
        ))}
      </div>
    </div>
  );
}
