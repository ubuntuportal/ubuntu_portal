// "use client";
import React from "react";
import { ProductCard } from "./ProductCard"; // Ensure the correct import path

export default function Container() {
  const products = [
    {
      id: 1,
      image: "/public/img/image.png",
      name: "Product 1",
      description: "This is a brief description of product 1.",
      price: "$29.99",
    },
    {
      id: 2,
      image: "image.png",
      name: "Product 2",
      description: "This is a brief description of product 2.",
      price: "$59.99",
    },
    {
      id: 1,
      image: "image.png",
      name: "Product 1",
      description: "This is a brief description of product 1.",
      price: "$29.99",
    },
    {
      id: 2,
      image: "image.png",
      name: "Product 2",
      description: "This is a brief description of product 2.",
      price: "$59.99",
    },
    {
      id: 1,
      image: "image.png",
      name: "Product 1",
      description: "This is a brief description of product 1.",
      price: "$29.99",
    },
    {
      id: 2,
      image: "image.png",
      name: "Product 2",
      description: "This is a brief description of product 2.",
      price: "$59.99",
    },
    {
      id: 1,
      image: "image.png",
      name: "Product 1",
      description: "This is a brief description of product 1.",
      price: "$29.99",
    },
    {
      id: 2,
      image: "image.png",
      name: "Product 2",
      description: "This is a brief description of product 2.",
      price: "$59.99",
    },
    {
      id: 1,
      image: "image.png",
      name: "Product 1",
      description: "This is a brief description of product 1.",
      price: "$29.99",
    },
    {
      id: 2,
      image: "image.png",
      name: "Product 2",
      description: "This is a brief description of product 2.",
      price: "$59.99",
    },
    {
      id: 1,
      image: "image.png",
      name: "Product 1",
      description: "This is a brief description of product 1.",
      price: "$29.99",
    },
    {
      id: 2,
      image: "image.png",
      name: "Product 2",
      description: "This is a brief description of product 2.",
      price: "$59.99",
    },
    {
      id: 1,
      image: "image.png",
      name: "Product 1",
      description: "This is a brief description of product 1.",
      price: "$29.99",
    },
    {
      id: 2,
      image: "image.png",
      name: "Product 2",
      description: "This is a brief description of product 2.",
      price: "$59.99",
    },
    {
      id: 1,
      image: "image.png",
      name: "Product 1",
      description: "This is a brief description of product 1.",
      price: "$29.99",
    },
    {
      id: 2,
      image: "image.png",
      name: "Product 2",
      description: "This is a brief description of product 2.",
      price: "$59.99",
    },
    {
      id: 1,
      image: "image.png",
      name: "Sneakers",
      description: "This is a brief description of product 1.",
      price: "$29.99",
    },
    {
      id: 2,
      image: "image.png",
      name: "Product 2",
      description: "This is a brief description of product 2.",
      price: "$59.99",
    },
    {
      id: 1,
      image: "image.png",
      name: "Product 1",
      description: "This is a brief description of product 1.",
      price: "$29.99",
    },
    {
      id: 2,
      image: "image.png",
      name: "Product 2",
      description: "This is a brief description of product 2.",
      price: "$59.99",
    },
    {
      id: 5,
      image: "image.png",
      name: "Product 1",
      description: "This is a brief description of product 1.",
      price: "$29.99",
    },
    {
      id: 6,
      image: "image.png",
      name: "Product 2",
      description: "This is a brief description of product 2.",
      price: "$59.99",
    },
    {
      id: 7,
      image: "image.png",
      name: "Product 1",
      description: "This is a brief description of product 1.",
      price: "$29.99",
    },
    {
      id: 8,
      image: "image.png",
      name: "Product 2",
      description: "This is a brief description of product 2.",
      price: "$59.99",
    },
    // Add more product objects as needed
  ];

  return (
    <div className="container mx-auto">
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
