// "use client";
import React from "react";
import { ProductCard } from "./ProductCard"; // Ensure the correct import path
import Searchbox from "./Searchbox";

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
      id: 1,
      image: "/img/image.png",
      name: "Addidas Sneakers",
      description: "This is a brief description of Addidas Sneakers.",
      price: "$99.99",
    },
    {
      id: 1,
      image: "/img/image.png",
      name: "Addidas Sneakers",
      description: "This is a brief description of Addidas Sneakers.",
      price: "$99.99",
    },
    {
      id: 1,
      image: "/img/image.png",
      name: "Addidas Sneakers",
      description: "This is a brief description of Addidas Sneakers.",
      price: "$99.99",
    },
    {
      id: 1,
      image: "/img/image.png",
      name: "Addidas Sneakers",
      description: "This is a brief description of Addidas Sneakers.",
      price: "$99.99",
    },
    {
      id: 1,
      image: "/img/image.png",
      name: "Addidas Sneakers",
      description: "This is a brief description of Addidas Sneakers.",
      price: "$99.99",
    },
    {
      id: 1,
      image: "/img/image.png",
      name: "Addidas Sneakers",
      description: "This is a brief description of Addidas Sneakers.",
      price: "$99.99",
    },
    {
      id: 1,
      image: "/img/image.png",
      name: "Addidas Sneakers",
      description: "This is a brief description of Addidas Sneakers.",
      price: "$99.99",
    },
    {
      id: 1,
      image: "/img/image.png",
      name: "Addidas Sneakers",
      description: "This is a brief description of Addidas Sneakers.",
      price: "$99.99",
    },
    {
      id: 1,
      image: "/img/image.png",
      name: "Addidas Sneakers",
      description: "This is a brief description of Addidas Sneakers.",
      price: "$99.99",
    },
    {
      id: 1,
      image: "/img/image.png",
      name: "Addidas Sneakers",
      description: "This is a brief description of Addidas Sneakers.",
      price: "$99.99",
    },
    {
      id: 1,
      image: "/img/image.png",
      name: "Addidas Sneakers",
      description: "This is a brief description of Addidas Sneakers.",
      price: "$99.99",
    },
    // Add more product objects as needed
  ];

  return (
    <div className="container mx-auto">
      <div className="w-5/12 pt-4 pb-4">
        {" "}
        <Searchbox />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            image={product.image}
            name={product.name}
            description={product.description}
            price={product.price}
          />
        ))}
      </div>
    </div>
  );
}
