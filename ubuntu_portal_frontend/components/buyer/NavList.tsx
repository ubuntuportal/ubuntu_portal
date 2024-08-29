import React from "react";
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
import { cn } from "@/lib/utils";

export default function NavList() {
  return (
    <NavigationMenu className="hidden md:block my-4 mx-auto">
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
