import React from "react";
import { Input } from "../ui/input";
import Image from "next/image";
import logo from "@/public/Logo.png";
import { IoSend } from "react-icons/io5";

export default function Footer() {
  const info = [
    {
      title: "My Account",
      links: ["Authors", "Collection", "Author Profile", "Create Collection"],
    },
    {
      title: "Resources",
      links: ["Help & Support", "Live Auctions", "Item Details", "Activities"],
    },
    {
      title: "Communities",
      links: ["About Us", "Contact Us", "Our Blog", "Discover"],
    },
  ];
  return (
    <footer className="flex gap-[1vw]  container bottom-0  bg-gradient-to-b from-[#29964C] to-[#0D3018] h-96">
      <div className="flex w-full pt-14 gap-[1vw]">
        <aside className="flex-[1.5] mr-7">
          <div className=" mb-8 text-white font-extrabold leading-6">
            <Image src={logo} alt="logo" />
          </div>
          <p className="text-white text-sm ">
            We are a platform that connects buyers and suppliers.
          </p>
        </aside>

        {info.map((item) => (
          <nav
            className="flex gap-4 flex-col text-white flex-1"
            key={item.title}
          >
            <h6 className="font-bold mb-2">{item.title}</h6>
            {item.links.map((link) => (
              <a href="#" className="" key={link}>
                {link}
              </a>
            ))}
          </nav>
        ))}
        <form className="text-white flex-[1.5]">
          <h6 className="mb-5 font-bold">Newsletter</h6>
          <fieldset className="">
            <label className="">
              <span className="">Enter your email address</span>
            </label>
            <div className="relative mt-3">
              <input
                type="text"
                placeholder="username@site.com"
                className="p-2 rounded-lg border bg-transparent placeholder:text-white border-white"
              />
              <button className="absolute bg-black border  inset-x-[65%] inset-y-1 ">
                <IoSend className="pl-1 text-3xl" />
              </button>
            </div>
          </fieldset>
        </form>
      </div>
    </footer>
  );
}
