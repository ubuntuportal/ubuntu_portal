import { AddProduct } from "@/components/supplier/AddProduct";
import { Tables } from "@/components/supplier/Table";
import React from "react";

function ProductsPage() {
  return (
    <div>
      <AddProduct />
      <Tables />
    </div>
  );
}

export default ProductsPage;
