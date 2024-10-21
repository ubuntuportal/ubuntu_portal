import React, { useEffect, useState } from "react";
import Link from "next/link";
import { MenuIcon } from "@heroicons/react/outline"; // Import the menu icon
import LogoutButton from "../../../LogoutButton";
import {
  BellIcon,
  CogIcon,
  SearchIcon,
  UserCircleIcon,
} from "@heroicons/react/outline";

interface HeaderProps {
  toggleSidebar: () => void;
}

function Header({ toggleSidebar }: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);

  // Add scroll effect to change header background on scroll
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <header
      className={`mx-4 p-4 flex gap-x-8 items-center justify-center fixed top-0 w-fit z-20 transition-all duration-300 ${
        isScrolled ? "bg-white shadow-md" : "bg-transparent"
      }`}
    >
      <div className="flex items-center">
        {/* Toggle Sidebar Button (Hamburger) - hidden on desktop */}
        <button onClick={toggleSidebar} className="p-2 text-gray-600 md:hidden">
          <MenuIcon className="h-6 w-6" />
        </button>

        {/* Logo - visible only on mobile */}
        <div className="w-48 md:hidden">
          <Link href="/supplier/dashboard">
            <img src="/Logo_complete.png" alt="Ubuntu Portal" />
          </Link>
        </div>
      </div>

      {/* Search Bar */}
      <div className="flex items-center w-full max-w-64 mx-4">
        <div className="relative flex items-center w-full">
          <button className="absolute right-2">
            <SearchIcon className="h-auto w-6 text-gray-500" />
          </button>
          <input
            type="text"
            placeholder="Search Here..."
            className="w-full py-2 pl-10 pr-4 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:border-blue-500"
          />
        </div>
      </div>

      {/* User Profile & Notifications - Ensure visibility */}
      <div className="flex items-center space-x-4">
        <LogoutButton />
        <button className="relative text-gray-600 hover:text-gray-800">
          <BellIcon className="h-6 w-6" />
          <span className="absolute top-0 right-0 inline-flex items-center justify-center h-2 w-2 p-2 bg-red-500 text-white text-xs font-bold rounded-full">
            3
          </span>
        </button>
        <button className="text-gray-600 hover:text-gray-800">
          <CogIcon className="h-8 w-8" />
        </button>
        <button className="text-gray-600 hover:text-gray-800">
          <UserCircleIcon className="h-8 w-8" />
        </button>
      </div>
    </header>
  );
}

export default Header;
