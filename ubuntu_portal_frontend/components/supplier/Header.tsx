import React from "react";
import {
  BellIcon,
  CogIcon,
  SearchIcon,
  UserCircleIcon,
} from "@heroicons/react/outline";
function Header() {
  return (
    <header className="bg-transparent p-4 flex items-center justify-between">
      {/* Search Bar */}
      <div className="flex items-center w-full max-w-md mx-4">
        <div className="relative flex items-center w-full">
          <button className="absolute right-2">
            <SearchIcon className=" h-auto w-6 text-gray-500" />
          </button>
          <input
            type="text"
            placeholder="Search Here..."
            className="w-full py-2 pl-10 pr-4 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:border-blue-500"
          />
        </div>
      </div>

      {/* User Profile & Notifications */}
      <div className="flex items-center mr-4 space-x-4">
        <button className="relative text-gray-600 hover:text-gray-800">
          <BellIcon className="h-6 w-6" />
          {/* Notification Badge */}
          <span className="absolute top-0 right-0 inline-flex items-center justify-center h-2 w-2 p-2 bg-red-500 text-white text-xs font-bold rounded-full">
            3
          </span>
          {/*Settings*/}
        </button>
        <button className="text-gray-600 hover:text-gray-800">
          <CogIcon className="h-8 w-8"></CogIcon>
        </button>
        {/*User*/}
        <button className="text-gray-600 hover:text-gray-800">
          <UserCircleIcon className="h-8 w-8" />
        </button>
      </div>
    </header>
  );
}
export default Header;
