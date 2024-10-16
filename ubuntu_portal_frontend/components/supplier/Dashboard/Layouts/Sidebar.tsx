"use client";
import React from "react";
import Link from "next/link";
import {
  HomeIcon,
  UserIcon,
  ShoppingBagIcon,
  CollectionIcon,
  PhoneIcon,
} from "@heroicons/react/outline";

interface SidebarProps {
  isOpen: boolean;
  toggleSidebar: () => void;
}

export default function Sidebar({ isOpen, toggleSidebar }: SidebarProps) {
  const menuItems = [
    { name: "Dashboard", icon: HomeIcon, href: "/supplier/dashboard" },
    { name: "Profile", icon: UserIcon, href: "/supplier/dashboard/profile" },
    {
      name: "Order List",
      icon: ShoppingBagIcon,
      href: "/supplier/dashboard/order-list",
    },
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
    { name: "RFQ", icon: CollectionIcon, href: "/supplier/dashboard/rfq-list" },
  ];

  return (
    <div
      className={
        `bg-[#A5C4D4] text-black w-64 h-screen p-4 border-r border-gray-200 flex flex-col justify-between fixed z-30 transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 ease-in-out` /* Removed lg:translate-x-0 */
      }
    >
      <div>
        <div className="mb-4 flex justify-between items-center">
          <Link href={"/supplier/dashboard"}>
            <img src="/Logo_complete.png" alt="logo" className="w-48" />
          </Link>
          {/* Close button inside sidebar */}
          <button onClick={toggleSidebar} className="p-2 text-gray-600">
            <span className="sr-only">Close sidebar</span>✖{" "}
            {/* Or any icon you prefer */}
          </button>
        </div>
        <div className="text-center text-gray-500">Suppliers Dashboard</div>
        <nav className="mt-8">
          <ul className="space-y-2">
            {menuItems.map((item) => (
              <li key={item.name} className="relative">
                <Link href={item.href}>
                  <div className="flex items-center ml-8 p-2 rounded-md transition-colors duration-200 relative text-black hover:bg-gray-200">
                    <item.icon className="h-5 w-5 mr-3 z-10" />
                    <span className="z-10">{item.name}</span>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
      <footer className="text-center mt-4 text-gray-500">
        UbuntuPortal © 2024
        <br />
        All Rights Reserved
      </footer>
    </div>
  );
}
