"use client";
import React, { useState } from "react";
import { AddProduct } from "@/components/supplier/Dashboard/AddProducts/AddProduct";
import ModifyStoreProduct from "@/components/supplier/Dashboard/StoreFront/ModifyStoreProduct";
import StoreProductCard from "@/components/supplier/Dashboard/StoreFront/StoreProductCard";

// Demo products data
const products = [
  { id: 1, name: "Broad Beans", price: "$200", imageUrl: "/cocoa.png" },
  { id: 2, name: "Cocoa Beans", price: "$150", imageUrl: "/cocoa.png" },
  { id: 3, name: "Chickpeas", price: "$100", imageUrl: "/cocoa.png" },
  { id: 4, name: "Peas", price: "$80", imageUrl: "/cocoa.png" },
  { id: 1, name: "Broad Beans", price: "$200", imageUrl: "/cocoa.png" },
  { id: 2, name: "Cocoa Beans", price: "$150", imageUrl: "/cocoa.png" },
  { id: 3, name: "Chickpeas", price: "$100", imageUrl: "/cocoa.png" },
  { id: 4, name: "Peas", price: "$80", imageUrl: "/cocoa.png" },
  { id: 1, name: "Broad Beans", price: "$200", imageUrl: "/cocoa.png" },
  { id: 2, name: "Cocoa Beans", price: "$150", imageUrl: "/cocoa.png" },
  { id: 3, name: "Chickpeas", price: "$100", imageUrl: "/cocoa.png" },
  { id: 4, name: "Peas", price: "$80", imageUrl: "/cocoa.png" },
];

export default function ProductsPage() {
  const [selectedProductId, setSelectedProductId] = useState<number | null>(
    null
  );

  // Handler to toggle between store product card and modify product view
  const handleProductClick = (id: number) => {
    setSelectedProductId(id === selectedProductId ? null : id);
  };

  return (
    <div className="p-6">
      {/* Add Product Button */}
      <div className="flex justify-end mb-4">
        <AddProduct />
      </div>

      {/* Store Products Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <div
            key={product.id}
            onClick={() => handleProductClick(product.id)}
            className="cursor-pointer"
          >
            {selectedProductId === product.id ? (
              <ModifyStoreProduct />
            ) : (
              <StoreProductCard
                name={product.name}
                price={product.price}
                imageUrl={product.imageUrl}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
