"use client";
import { SearchIcon } from "@heroicons/react/outline";
import React, { useState } from "react";

interface HomeInputProps {
  setFilteredProducts: (products: any[]) => void;
}

export default function HomeInput({ setFilteredProducts }: HomeInputProps) {
  const [filterTerm, setFilterTerm] = useState<string>("");

  const handleFilter = async (e: React.FormEvent) => {
    e.preventDefault();
    if (filterTerm.trim() === "") return;

    try {
      const response = await fetch(
        `https://ubuntu-portal.onrender.com/api/products/filter/?category=${filterTerm}`
      );
      const data = await response.json();
      setFilteredProducts(data.results); // Pass the filtered products to the parent component
    } catch (error) {
      console.error("Error filtering products:", error);
    }
  };

  return (
    <div className="relative flex items-center w-full">
      <input
        type="text"
        placeholder="Filter by category..."
        className="w-full py-2 pl-4 pr-4 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:border-blue-500"
        value={filterTerm}
        onChange={(e) => setFilterTerm(e.target.value)}
      />
      <button className="absolute right-3 h-5 w-5 text-gray-500" onClick={handleFilter}>
        <SearchIcon />
      </button>
    </div>
  );
}
