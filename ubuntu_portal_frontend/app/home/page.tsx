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
    <NavigationMenu className="my-4 mx-auto">
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger className="text-sm py-4 focus:text-white bg-accent hover:text-white rounded-3xl ">
            All
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <NavigationMenuLink>
              <All />
            </NavigationMenuLink>
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

function All() {
  const testArr = [
    "Computer & Laptop",
    "Camera & Photo",
    "Computer Accessories",
    "Smartphone",
    "Headphones",
    "Mobile Accessories",
    "Gaming Console",
  ];

  return (
    <div>
      <div className="grid gap-3 p-4 md:w-[400px] lg:w-[900px] lg:grid-cols-[.20fr_1fr]">
        <div className="row-span-3 w-[12rem]">
          <ul>
            {testArr.map((value) => (
              <ListItem key={value}>{`${value}`}</ListItem>
            ))}
          </ul>
        </div>
        {/* <ListItem href="/docs" title="Introduction">
          Re-usable components built using Radix UI and Tailwind CSS.
        </ListItem>
        <ListItem href="/docs/installation" title="Installation">
          How to install dependencies and structure your app.
        </ListItem>
        <ListItem href="/docs/primitives/typography" title="Typography">
          Styles for headings, paragraphs, lists...etc
        </ListItem> */}
      </div>
    </div>
  );
}

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-1.5 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = "ListItem";

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
