"use client";
import React, { useState } from "react";
import {
  HomeIcon,
  UserIcon,
  ShoppingBagIcon,
  CollectionIcon,
  PhoneIcon,
  MenuIcon,
  XIcon,
} from "@heroicons/react/outline"; // Import the icons from heroicons

export default function Sidebar() {
  const [active, setActive] = useState("Dashboard");
  const [isOpen, setIsOpen] = useState(false); // State to manage sidebar toggle on small screens

  const menuItems = [
    { name: "Dashboard", icon: HomeIcon },
    { name: "Profile", icon: UserIcon },
    { name: "Store", icon: ShoppingBagIcon },
    { name: "Products", icon: CollectionIcon },
    { name: "Contact", icon: PhoneIcon },
  ];

  return (
    <div>
      {/* Sidebar toggle button for small screens */}
      <button
        className="lg:hidden p-4"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Toggle Sidebar"
      >
        {isOpen ? (
          <XIcon className="h-6 w-6" />
        ) : (
          <MenuIcon className="h-6 w-6" />
        )}
      </button>

      {/* Sidebar */}
      <div
        className={`bg-white text-black h-screen p-4 border-r border-gray-200 flex flex-col justify-between transition-transform duration-300 lg:w-64 z-20
          ${isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
        `}
      >
        <div>
          <div className="mb-4">
            <a href="#">
              <img src="/Logo_black.png" alt="logo" className="w-full" />
            </a>
          </div>
          <div className="text-center text-gray-500">Suppliers Dashboard</div>
          <nav className="mt-8">
            <ul className="space-y-2">
              {menuItems.map((item) => (
                <li key={item.name} className="relative">
                  <a
                    href="#"
                    className={`flex items-center p-2 rounded-md transition-colors duration-200 relative ${
                      active === item.name
                        ? "bg-green-100 text-green-800 font-bold"
                        : "text-black hover:bg-gray-200"
                    }`}
                    onClick={() => setActive(item.name)}
                  >
                    {active === item.name && (
                      <span className="absolute left-[-40px] h-6 border-l-4 border-green-500"></span>
                    )}
                    <item.icon className="h-5 w-5 mr-3 z-10" />
                    <span className="z-10">{item.name}</span>
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>
        <footer className="mt-auto">
          <div className="text-center text-gray-500">
            UbuntuPortal © 2024
            <br />
            All Rights Reserved
          </div>
        </footer>
      </div>
    </div>
  );
}
