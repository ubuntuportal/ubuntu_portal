"use client";
import React, { useState } from "react";

export default function Sidebar() {
  const [showMore, setShowMore] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedPrice, setSelectedPrice] = useState("");

  const categories = [
    "Electronics",
    "Fashion",
    "Home & Kitchen",
    "Beauty & Health",
    "Sports",
    "Books",
    "Toys",
    "Automotive",
    "Groceries",
    "Office Supplies",
    // Add more categories as needed
  ];

  const priceRanges = [
    "Under $25",
    "$25 to $50",
    "$50 to $100",
    "$100 to $200",
    "Over $200",
  ];

  const visibleCategories = showMore ? categories : categories.slice(0, 9);

  const handleShowMore = () => setShowMore(!showMore);
  const handleCategoryChange = (category: string) =>
    setSelectedCategory(category);
  const handlePriceChange = (priceRange: string) =>
    setSelectedPrice(priceRange);

  return (
    <div className="bg-white text-black w-64 p-4 border-r border-gray-200">
      {/* Categories Section */}
      <div className="mb-6">
        <h2 className="text-lg font-semibold text-gray-700">Categories</h2>
        <ul className="mt-4 space-y-2">
          {visibleCategories.map((category) => (
            <li key={category}>
              <label className="flex items-center space-x-2 text-gray-700 hover:text-gray-900 cursor-pointer">
                <input
                  type="radio"
                  name="category"
                  value={category}
                  checked={selectedCategory === category}
                  onChange={() => handleCategoryChange(category)}
                  className="form-radio h-4 w-4 text-green-700"
                />
                <span>{category}</span>
              </label>
            </li>
          ))}
        </ul>
        <button
          onClick={handleShowMore}
          className="mt-4 text-sm text-blue-500 hover:underline"
        >
          {showMore ? "Show Less" : "Show More"}
        </button>
      </div>

      {/* Price Filter Section */}
      <div>
        <h2 className="text-lg font-semibold text-gray-700">Filter by Price</h2>
        <div className="mt-4 flex space-x-2">
          <div>
            <label htmlFor="min-price" className="text-gray-600">
              Min Price
            </label>
            <input
              id="min-price"
              type="number"
              className="mt-1 w-full p-2 border border-gray-300 rounded-md"
              placeholder="Min"
            />
          </div>
          <div>
            <label htmlFor="max-price" className="text-gray-600">
              Max Price
            </label>
            <input
              id="max-price"
              type="number"
              className="mt-1 w-full p-2 border border-gray-300 rounded-md"
              placeholder="Max"
            />
          </div>
        </div>
        <ul className="mt-4 space-y-2">
          {priceRanges.map((priceRange) => (
            <li key={priceRange}>
              <label className="flex items-center space-x-2 text-gray-700 hover:text-gray-900 cursor-pointer">
                <input
                  color="green"
                  type="radio"
                  name="price"
                  value={priceRange}
                  checked={selectedPrice === priceRange}
                  onChange={() => handlePriceChange(priceRange)}
                  className="form-radio h-4 w-4 text-green-700"
                />
                <span>{priceRange}</span>
              </label>
            </li>
          ))}
        </ul>

        <button className="mt-6 w-full bg-amber-500 text-white py-2 rounded-md hover:bg-yellow-600">
          Apply Filters
        </button>
      </div>
    </div>
  );
}
