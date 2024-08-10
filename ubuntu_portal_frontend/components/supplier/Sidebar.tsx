import React from "react";
import {
  HomeIcon,
  ShoppingCartIcon,
  UsersIcon,
  CogIcon,
} from "@heroicons/react/outline"; // Example icons

export default function Sidebar() {
  return (
    <div className="min-h-screen bg-gray-800 text-white w-64 flex flex-col">
      {/* Logo/Branding */}
      <div className="flex items-center justify-center h-16 bg-gray-900 shadow-md">
        <h1 className="text-xl font-semibold">My Dashboard</h1>
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 px-4 py-8">
        <ul className="space-y-4">
          <li>
            <a
              href="#"
              className="flex items-center space-x-3 text-gray-300 hover:bg-gray-700 hover:text-white p-2 rounded-md"
            >
              <HomeIcon className="h-6 w-6" />
              <span>Dashboard</span>
            </a>
          </li>
          <li>
            <a
              href="#"
              className="flex items-center space-x-3 text-gray-300 hover:bg-gray-700 hover:text-white p-2 rounded-md"
            >
              <ShoppingCartIcon className="h-6 w-6" />
              <span>Products</span>
            </a>
          </li>
          <li>
            <a
              href="#"
              className="flex items-center space-x-3 text-gray-300 hover:bg-gray-700 hover:text-white p-2 rounded-md"
            >
              <UsersIcon className="h-6 w-6" />
              <span>Customers</span>
            </a>
          </li>
          <li>
            <a
              href="#"
              className="flex items-center space-x-3 text-gray-300 hover:bg-gray-700 hover:text-white p-2 rounded-md"
            >
              <CogIcon className="h-6 w-6" />
              <span>Settings</span>
            </a>
          </li>
        </ul>
      </nav>

      {/* Footer Links */}
      <div className="px-4 py-6 bg-gray-900">
        <a href="#" className="text-gray-300 hover:text-white">
          Log Out
        </a>
      </div>
    </div>
  );
}
