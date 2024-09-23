import React, { Component } from "react";
import { Button } from "@/components/ui/button";

const OrderFilter = () => {
  return (
    <div className="flex gap-4 items-center p-4 rounded-lg flex-nowrap w-full">
      {/* Category Filter 1 */}
      <div className="w-auto">
        <select className="border border-gray-300 p-2 rounded-lg focus:outline-none focus:border-green-500">
          <option value="">Category</option>
          <option value="electronics">Electronics</option>
          <option value="clothing">Clothing</option>
          <option value="machinery">Machinery</option>
        </select>
      </div>

      {/* Category Filter 2 */}
      <div className="w-auto">
        <select className="border border-gray-300 p-2 rounded-lg focus:outline-none focus:border-green-500">
          <option value="">Sub Category</option>
          <option value="food">Food</option>
          <option value="furniture">Furniture</option>
          <option value="chemicals">Chemicals</option>
        </select>
      </div>

      {/* Category Filter 3 */}
      <div className="w-auto">
        <select className="border border-gray-300 p-2 rounded-lg focus:outline-none focus:border-green-500">
          <option value="">Product name</option>
          <option value="automobile">Addidas sneakers</option>
          <option value="automobile">Addidas sneakers</option>
          <option value="automobile">Addidas sneakers</option>
          <option value="automobile">Addidas sneakers</option>
        </select>
      </div>

      {/* Quantity Filter*/}
      <div>
        <input
          type="number"
          placeholder="Quantity"
          className="border border-gray-300 p-2 rounded-lg focus:outline-none focus:border-green-500 w-32"
        />
      </div>

      {/* Search Box */}
      <div>
        <Button className="bg-black">Search</Button>
      </div>
    </div>
  );
};

export default OrderFilter;
