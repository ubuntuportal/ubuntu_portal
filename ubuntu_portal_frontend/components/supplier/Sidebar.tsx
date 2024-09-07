"use client";
import React, { useState } from "react";
import Link from "next/link";
import {
  HomeIcon,
  UserIcon,
  ShoppingBagIcon,
  CollectionIcon,
  PhoneIcon,
} from "@heroicons/react/outline"; // Import the icons from heroicons

export default function Sidebar() {
  const [active, setActive] = useState("Dashboard");

  const menuItems = [
    { name: "Dashboard", icon: HomeIcon, href: "/supplier/dashboard" },
    { name: "Profile", icon: UserIcon, href: "/supplier/dashboard/profile" },
    { name: "Store", icon: ShoppingBagIcon, href: "/supplier/dashboard/store" },
    {
      name: "Products",
      icon: CollectionIcon,
      href: "/supplier/dashboard/products",
    },
    { name: "Contact", icon: PhoneIcon, href: "/supplier/dashboard/contact" },
    {
      name: "Communication",
      icon: HomeIcon,
      href: "/supplier/dashboard/communication",
    },
    { name: "RFQ", icon: CollectionIcon, href: "/supplier/dashboard/rfq" },
  ];

  return (
    <div className="bg-white text-black w-64 h-screen p-4 border-r border-gray-200 flex flex-col justify-between overflow-y-visible">
      <div>
        <div className="mb-4">
          <Link href={"/supplier/dashboard"}>
            <img src="/Logo_black.png" alt="logo" className="w-full" />
          </Link>
        </div>
        <div className="text-center text-gray-500">Suppliers Dashboard</div>
        <nav className="mt-8">
          <ul className="space-y-2">
            {menuItems.map((item) => (
              <li key={item.name} className="relative">
                <Link href={item.href}>
                  <div
                    className={`flex items-center ml-8 p-2 rounded-md transition-colors duration-200 relative ${
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
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
      <footer className="">
        <div className="text-center mt-4 text-gray-500">
          UbuntuPortal © 2024
          <br />
          All Rights Reserved
        </div>
      </footer>
    </div>
  );
}
