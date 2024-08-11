import React from "react";
import { BellIcon, SearchIcon, UserCircleIcon } from "@heroicons/react/outline";
function Header() {
  return (
    <header className="bg-white shadow-md p-4 flex items-center justify-between">
      {/* Logo/Branding */}
      <div className="flex items-center space-x-2">
        {/* Replace with your logo */}
        <span className="text-xl font-semibold text-gray-800">
          My Dashboard
        </span>
      </div>

      {/* Search Bar */}
      <div className="flex items-center w-full max-w-md mx-4">
        <div className="relative flex items-center w-full">
          <SearchIcon className="absolute left-3 h-5 w-5 text-gray-500" />
          <input
            type="text"
            placeholder="Search..."
            className="w-full py-2 pl-10 pr-4 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:border-blue-500"
          />
        </div>
      </div>

      {/* User Profile & Notifications */}
      <div className="flex items-center space-x-4">
        <button className="relative text-gray-600 hover:text-gray-800">
          <BellIcon className="h-6 w-6" />
          {/* Notification Badge */}
          <span className="absolute top-0 right-0 inline-flex items-center justify-center h-2 w-2 p-2 bg-red-500 text-white text-xs font-bold rounded-full">
            3
          </span>
        </button>
        <button className="text-gray-600 hover:text-gray-800">
          <UserCircleIcon className="h-8 w-8" />
        </button>
      </div>
    </header>
  );
}
export default Header;
