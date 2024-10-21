"use client";
import { AddProduct } from "@/components/supplier/AddProduct";
import { Tables } from "@/components/supplier/Table";
import React, { useEffect, useState } from "react";

export default function ProductsPage() {
  const [products, setProducts] = useState([]);

  useEffect(function () {
    async function getProducts() {
      try {
        const req = await fetch(
          "https://ubuntu-portal.onrender.com/api/products/"
        );
        const data = await req.json();
        setProducts(data);
        console.log(data);
        console.log(data.results);
      } catch (error) {
        console.error("Error fetching products", error);
      }
    }

    getProducts();
  }, []);

  return (
    <div className="p-6">
      <div className="flex justify-end mb-4">
        <AddProduct />
      </div>
      <Tables />
    </div>
  );
}

// export default ProductsPage;
