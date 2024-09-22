import { AddProduct } from "@/components/supplier/AddProduct";
import { Tables } from "@/components/supplier/Table";
import React from "react";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";

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

  // Extract userId from session

  return (
    <div className="p-6">
      {/* AddProduct component receives the userId as a prop */}
      <div className="flex justify-end mb-4">
        <AddProduct />
      </div>

      {/* Tables component to display the product table */}
      <Tables />
    </div>
  );
}
