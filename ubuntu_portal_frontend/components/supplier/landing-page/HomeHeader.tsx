import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";

const navigation = [
  {
    title: "Home",
    link: "#",
  },
  {
    title: "About Us",
    link: "#",
  },
  {
    title: "Service",
    link: "#",
  },
  {
    title: "Blog",
    link: "#",
  },
  {
    title: "Contact",
    link: "#",
  },
];

function HomeHeader() {
  return (
    <div className="max-w-screen-xl mx-auto px-8 py-4 mt-2 flex items-cente justify-between">
      <img src="ubuntuLogo.png" alt="" className="h-10 w-auto object-cover" />
      <div className="flex gap-6">
        {navigation.map((item) => (
          <a href={item.link} key={item.title} className="hover:text-green-500">
            {item.title}{" "}
          </a>
        ))}{" "}
      </div>
      <Link href="/supplier/login">
        <Button className="bg-green-500">Get Started</Button>
      </Link>
    </div>
  );
}

export default HomeHeader;
