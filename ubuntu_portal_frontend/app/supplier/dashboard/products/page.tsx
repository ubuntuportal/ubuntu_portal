import { AddProduct } from "@/components/supplier/AddProduct";
import { Tables } from "@/components/supplier/Table";
import React from "react";

function ProductsPage() {
  return (
    <div className="p-6">
      <div className="flex justify-end mb-4">
        <AddProduct />
      </div>
      <Tables />
    </div>
  );
}

export default ProductsPage;
