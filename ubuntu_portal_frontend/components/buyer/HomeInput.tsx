import React from "react";
import { SearchIcon } from "@heroicons/react/outline";
export default function HomeInput() {
  return (
    <div className="relative md:hidden mx-auto my-2.5 items-center w-auto">
      <SearchIcon className="absolute top-[25%] left-2 h-5 w-5 text-gray-500" />
      <input
        type="text"
        placeholder="Search essentials, groceries and more.."
        className="w-full py-1.5 pl-8 pr-4 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:border-blue-500"
      />
    </div>
  );
}
