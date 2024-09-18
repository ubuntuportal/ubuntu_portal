import React from "react";
import { SearchIcon } from "@heroicons/react/outline";

export default function Searchbox() {
  return (
    <div className="relative flex items-center w-full">
      <input
        type="text"
        placeholder="Search Anything..."
        className="w-full py-2 pl-4 pr-4 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:border-blue-500"
      />
      <SearchIcon className="absolute right-3 h-5 w-5 text-gray-500" />
    </div>
  );
}
