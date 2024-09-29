"use client";
import { AddProduct } from "@/components/supplier/Dashboard/AddProducts/AddProduct";
import { Tables } from "@/components/supplier/Dashboard/AddProducts/Table";
import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";

interface SupplierProduct {
  id: number;
  title: string;
  description: string;
  stock: number;
  price: string;
}

export default function ProductsPage() {
  const [suppliersProduct, setSuppliersProducts] = useState<SupplierProduct[]>(
    []
  );
  const { data: session } = useSession();

  useEffect(() => {
    const fetchProducts = async () => {
      if (!session?.accessToken) return; // Ensure the token is available

      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/suppliers/products/`, // Use environment variable for the API URL
          {
            method: "GET",

            headers: {
              Authorization: `Bearer ${session.accessToken}`, // Add token to the request headers
            },
          }
        );
        console.log(response);
        // Check if response is OK (status in range of 200-299)
        if (!response.ok) {
          throw new Error(`Failed to fetch: ${response.status}`);
        }

        const data = await response.json();
        console.log(data); // Handle the response data (e.g., set state)
        console.log(data.results); // Handle the response data (e.g., set state)
        setSuppliersProducts(data.results); // Handle the response data (e.g., set state)
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    fetchProducts();
  }, [session]);

  // Callback function to handle adding a new product
  const handleAddProduct = (newProduct: SupplierProduct) => {
    setSuppliersProducts((prevProducts) => [newProduct, ...prevProducts]);
  };

  return (
    <div className="p-6">
      <div className="flex justify-end mb-4">
        <AddProduct onProductAdd={handleAddProduct} />
      </div>
      <Tables suppliersProduct={suppliersProduct} />
    </div>
  );
}
