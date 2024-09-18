// ("use client");

import React from "react";
import { SearchIcon } from "@heroicons/react/outline";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import neonbg from "@/public/neonbg.png";
import HomeInput from "@/components/buyer/HomeInput";
import NavList from "@/components/buyer/NavList";

function BuyersLandingPage() {
  return (
    <div>
      <div className="container">
        <NavList />
        <HomeInput />
      </div>
      <div className="mb-56 relative ">
        <Image
          src={neonbg}
          alt="neonbg"
          className="md:hidden"
          style={{
            width: "100%",
            height: "18rem",
            marginBottom: "10rem",
          }}
        />
        <div className="absolute md:hidden container text-center top-[35%] left-0 right-0">
          <div className=" text-white">
            <h1 className=" text-2xl leading-5 font-extrabold">
              Lorem ipsum dolor sit, amet consectetur adipisicing
            </h1>
            <p className="text-lg leading-4 my-1 font-bold">
              Lorem ipsum dolor sit amet consectetur adipisicing
            </p>
          </div>

          <div className="relative flex items-center mt-1 w-full">
            <SearchIcon className="absolute left-2 h-5 w-5 text-gray-500" />
            <input
              type="text"
              placeholder="Search essentials, groceries and more.."
              className="w-full py-1.5 pl-8 pr-4 border border-gray-300 rounded-full focus:outline-none focus:ring focus:border-blue-300"
            />
          </div>
          <div>
            <Button className="mt-2 px-2 bg-[#29964C] py-1 text-sm">
              Get Started &rarr;
            </Button>
          </div>
        </div>

        <Image
          src={neonbg}
          alt="neonbg"
          className="hidden md:block mb-40"
          style={{
            width: "100%",
            height: "100%",
          }}
        />
        <div className="hidden md:block absolute text-center md:inset-y-[28%] md:inset-x-[30%] lg:inset-y-[35%] lg:inset-x-[30%] ">
          <div className="text-white">
            <h1 className=" lg:text-5xl lg:leading-10 md:text-3xl 5 md:leading-7 font-extrabold">
              Lorem ipsum dolor sit, amet consectetur adipisicing
            </h1>
            <p className="text-lg my-4 md:my-3  md:leading-4 font-bold">
              Lorem ipsum dolor sit amet consectetur adipisicing
            </p>
          </div>

          <div className="relative flex items-center w-full">
            <SearchIcon className="absolute left-3 h-5 w-5 text-gray-500" />
            <input
              type="text"
              placeholder="Search essentials, groceries and more.."
              className="w-full py-2 pl-10 pr-4 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:border-blue-300"
            />
          </div>
          <div>
            <Button className="w-20 mt-3 px-20 bg-[#29964C] py-5 text-sm">
              Get Started &rarr;
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BuyersLandingPage;

// <NavigationMenuLink asChild>
{
  /* <a */
}
// className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
// href="/"
{
  /* > */
}
{
  /* <Icons.logo className="h-6 w-6" /> */
}
{
  /* <div className="mb-2 mt-4 text-lg font-medium"> */
}
{
  /* shadcn/ui */
}
{
  /* </div> */
}
{
  /* <p className="text-sm leading-tight text-muted-foreground"> */
}
{
  /* Beautifully designed components built with Radix UI and */
}
{
  /* Tailwind CSS. */
}
{
  /* </p> */
}
{
  /* </a> */
}
//
//
// </NavigationMenuLink>
