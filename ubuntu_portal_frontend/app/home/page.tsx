// ("use client");

import { cn } from "@/lib/utils";
import React from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import neonbg from "@/public/neonbg.png";
import { SearchIcon } from "@heroicons/react/outline";

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
  NavigationMenuViewport,
} from "@/components/ui/navigation-menu";

function BuyersLandingPage() {
  return (
    <div>
      <div>
        <NavList />
      </div>
      <div className="mb-56 relative ">
        <Image
          src={neonbg}
          alt="neonbg"
          style={{
            width: "100%",
            marginBottom: "10rem",
          }}
        />
        <div className="absolute text-center top-[38%] left-[28%]">
          <div className="  w-[40rem] text-white">
            <h1 className=" text-5xl  font-extrabold">
              Lorem ipsum dolor sit, amet consectetur adipisicing
            </h1>
            <p className="text-lg my-4 font-bold">
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
            <Button className="w-20 mt-4 px-20 bg-[#29964C] py-5 text-sm">
              Get Started &rarr;
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

function NavList() {
  return (
    <NavigationMenu className="my-9 mx-auto">
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger className="text-sm py-4 focus:text-white bg-accent hover:text-white rounded-3xl ">
            Groceries
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <NavigationMenuLink>Link</NavigationMenuLink>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuTrigger className="text-sm py-4 focus:text-white bg-accent hover:text-white rounded-3xl">
            Premium Fruits
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <NavigationMenuLink>Link</NavigationMenuLink>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuTrigger className="text-sm py-4 focus:text-white bg-accent hover:text-white rounded-3xl">
            Home & Kitchen
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <NavigationMenuLink>Link</NavigationMenuLink>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuTrigger className="text-sm py-4 focus:text- bg-accent hover:text-white rounded-3xl">
            Fashion
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <NavigationMenuLink>Link</NavigationMenuLink>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuTrigger className="text-sm py-4 focus:text-white bg-accent hover:text-white rounded-3xl">
            Electronics
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <NavigationMenuLink>Link</NavigationMenuLink>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuTrigger className="text-sm py-4 focus:text-white bg-accent hover:text-white rounded-3xl">
            Beauty
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <NavigationMenuLink>Link</NavigationMenuLink>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuTrigger className="text-sm py-4 focus:text-white bg-accent hover:text-white rounded-3xl">
            Home Improvement
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <NavigationMenuLink>Link</NavigationMenuLink>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuTrigger className="text-sm py-4 focus:text-white bg-accent hover:text-white rounded-3xl">
            Sports, Toys & Luggage
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <NavigationMenuLink>Link</NavigationMenuLink>
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}

export default BuyersLandingPage;
