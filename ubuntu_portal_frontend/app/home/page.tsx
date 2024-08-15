// ("use client");

import { cn } from "@/lib/utils";
import React from "react";
import Image from "next/image";
import neonbg from "@/public/neonbg.png";

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
      <div className="mb-56">
        <Image
          src={neonbg}
          alt="neonbg"
          style={{
            width: "100%",
            marginBottom: "10rem",
          }}
        />
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
