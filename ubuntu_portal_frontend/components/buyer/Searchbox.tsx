"use client";
import { SearchIcon } from "@heroicons/react/outline";
import React, { useState } from "react";

interface SearchboxProps {
  setSearchResults: (results: any[]) => void;
}

export default function Searchbox({ setSearchResults }: SearchboxProps) {
  const [searchTerm, setSearchTerm] = useState<string>("");

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim() === "") return;

    try {
      const response = await fetch(`https://ubuntu-portal.onrender.com/api/products/search/?query=${searchTerm}`);
      const data = await response.json();
      setSearchResults(data.results); // Pass the search results to the parent component
    } catch (error) {
      console.error("Error searching products:", error);
    }
  };

  return (
    <div className="relative flex items-center w-full">
      <input
        type="text"
        placeholder="Search Anything..."
        className="w-full py-2 pl-4 pr-4 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:border-blue-500"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <button className="absolute right-3 h-5 w-5 text-gray-500" onClick={handleSearch}>
        <SearchIcon />
      </button>
    </div>
  );
}
