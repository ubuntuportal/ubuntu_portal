import React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "../ui/button";
import Image from "next/image";
import logo from "@/public/Logo.png";
import { SearchIcon } from "@heroicons/react/outline";

export default function Header() {
  return (
    <header className=" bg-[#29964C]">
      <div className="flex items-center justify-evenly   ">
        <div className="text-white  font-extrabold leading-6">
          <Image src={logo} alt="logo" />
        </div>
        <div className="w-5/12 pt-8 pb-9">
          <div className="relative flex items-center w-full">
            <SearchIcon className="absolute left-3 h-5 w-5 text-gray-500" />
            <input
              type="text"
              placeholder="Search essentials, groceries and more.."
              className="w-full py-2 pl-10 pr-4 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:border-blue-500"
            />
          </div>
        </div>
        <div className="flex  justify-between">
          <div>
            <Button className="w-10/12 px-10 py-5 text-sm">Login</Button>
          </div>
          <div>
            <Button className="w-10/12 px-8 py-5 text-sm">Sign Up</Button>
          </div>
        </div>
        <div className="flex items-center text-white">
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
          <span className="ml-3 text-sm">Cart</span>
        </div>
      </div>
    </header>
  );
}
