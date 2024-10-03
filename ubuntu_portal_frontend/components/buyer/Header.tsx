"use client"; // Required for client-side use of hooks
import React, { useState } from "react";
import { Button } from "../ui/button";
import Image from "next/image";
import Logo_complete from "@/public/Logo_complete.png";
import { SearchIcon } from "@heroicons/react/outline";
import { IoMenu, IoCloseSharp } from "react-icons/io5";
import { useRouter } from "next/navigation";
import { useSession, signOut } from "next-auth/react"; // Import NextAuth hooks

export default function Header() {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);

  // Get session data and status from NextAuth
  const { data: session, status } = useSession();

  // Check if the user is logged in
  const isLoggedIn = status === "authenticated";

  const toggleMenu = () => setIsOpen(!isOpen);

  const handleLogout = () => {
    signOut(); // Logs the user out using NextAuth
    router.push("/auth/login"); // Redirect to login after logout
  };

  return (
    <header className="bg-[#A5C4D4]">
      <div className="flex items-center justify-between px-4 py-2 sm:px-6">
        <div className="flex">
          {/* <div className="flex md:hidden items-center">
            {isOpen ? (
              <IoCloseSharp
                className="text-white text-4xl"
                onClick={toggleMenu}
              />
            ) : (
              <IoMenu className="text-white text-4xl" onClick={toggleMenu} />
            )}
          </div> */}
          <Image src={Logo_complete} alt="logo" width={130} height={130} />
        </div>

        {/* Conditionally render buttons based on login status */}
        <div className="flex sm:hidden gap-2">
          {!isLoggedIn ? (
            <>
              <Button
                className="w-19 px-3 py-1 text-sm"
                onClick={() => router.push("/auth/login")}
              >
                Login
              </Button>
              <Button
                className="w-18 px-2 py-1 text-sm"
                onClick={() => router.push("/auth/register")}
              >
                Sign Up
              </Button>
            </>
          ) : (
            <Button className="w-18 px-2 py-1 text-sm" onClick={handleLogout}>
              Logout
            </Button>
          )}
        </div>

        <div className="flex sm:hidden items-center text-white">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-7"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
            />
          </svg>
        </div>

        {/* Search bar for larger screens */}
        <div className="relative hidden md:flex-2 md:block items-center md:w-3/5">
          <SearchIcon className="absolute top-[30%] left-3 h-5 w-5 text-gray-500" />
          <input
            type="text"
            placeholder="Search essentials, groceries and more.."
            className="w-full py-2 pl-10 pr-4 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:border-blue-500"
          />
        </div>

        {/* Conditional rendering of buttons for larger screens */}
        <div className="sm:flex hidden space-x-2">
          {!isLoggedIn ? (
            <>
              <Button
                className="w-full px-4 py-2 text-sm"
                onClick={() => router.push("/auth/login")}
              >
                Login
              </Button>
              <Button
                className="w-full px-4 py-2 text-sm"
                onClick={() => router.push("/auth/register")}
              >
                Sign Up
              </Button>
            </>
          ) : (
            <Button className="w-full px-4 py-2 text-sm" onClick={handleLogout}>
              Logout
            </Button>
          )}
        </div>
      </div>

      {/* Mobile menu for smaller screens */}
      <div
        className={`sm:hidden flex flex-col space-y-4 px-4 pt-4 pb-2 ${
          isOpen ? "block" : "hidden"
        }`}
      >
        <ul>
          <li>Menu Item 1</li>
          <li>Menu Item 2</li>
          <li>Menu Item 3</li>
        </ul>
      </div>
    </header>
  );
}
