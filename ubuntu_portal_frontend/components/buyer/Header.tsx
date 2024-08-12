import React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "../ui/button";

export default function Header() {
  return (
    <header className=" bg-[#29964C] h-28">
      <div className="flex items-center justify-evenly   mx-auto">
        <div className="text-white text-2xl font-extrabold leading-6">
          <h1>
            UBUNTU <br></br> Portal
          </h1>
        </div>
        <div className="w-5/12 pt-8 pb-9">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="absolute size-6 "
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
            />
          </svg>

          <Input
            type="search"
            placeholder="Search essentials, groceries and more.."
            className="relative bg-white text-lg pt-6 pb-6  text-black"
          />
        </div>
        <div className="flex  justify-between">
          <div>
            <Button className="w-10/12 px-12 py-6 text-lg">Login</Button>
          </div>
          <div>
            <Button className="w-10/12 px-9 py-6 text-lg">Sign Up</Button>
          </div>
        </div>
        <div className="flex items-center text-white">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-9"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
            />
          </svg>
          <span className="ml-3 text-lg">Cart</span>
        </div>
      </div>
    </header>
  );
}
