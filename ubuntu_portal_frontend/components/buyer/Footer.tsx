import React from "react";
import { Input } from "../ui/input";
import Image from "next/image";
import logo from "@/public/Logo.png";

export default function Footer() {
  return (
    <footer className=" bottom-0  bg-gradient-to-b from-[#29964C] to-[#0D3018]   h-96">
      <div className="flex gap-[1vw] mx-20 pt-16">
        <div className="flex-[1.5] mr-7">
          <div className=" mb-8 text-white font-extrabold leading-6">
            <Image src={logo} alt="logo" />
          </div>
          <p className="text-white text-sm ">
            We are a platform that connects buyers and suppliers.
          </p>
        </div>
        <div className="flex-1 ">
          <h1 className=" mb-2 text-white text-base">My Account</h1>
          <p className="text-white pt-4 text-sm">
            <a href="#" className="">
              Authors
            </a>
          </p>
          <p className="text-white pt-4 text-sm">
            <a href="#" className="">
              Collection
            </a>
          </p>
          <p className="text-white pt-4 text-sm">
            <a href="#" className="">
              Author Profile
            </a>
          </p>
          <p className="text-white pt-4 text-sm">
            <a href="#" className="">
              Create Collection
            </a>
          </p>
        </div>
        <div className="flex-1">
          <h1 className=" mb-2 text-white text-base">Resources</h1>
          <p className="text-white pt-4 text-sm">
            <a href="#" className="">
              Help & Support
            </a>
          </p>
          <p className="text-white pt-4 text-sm">
            <a href="#" className="">
              Live Auctions
            </a>
          </p>
          <p className="text-white pt-4 text-sm">
            <a href="#" className="">
              Item Details
            </a>
          </p>
          <p className="text-white pt-4 text-sm">
            <a href="#" className="">
              Activities
            </a>
          </p>
        </div>
        <div className="flex-1">
          <h1 className=" mb-2 text-white text-base">Communities</h1>
          <p className="text-white pt-4 text-sm">
            <a href="#" className="">
              About Us
            </a>
          </p>
          <p className="text-white pt-4 text-sm">
            <a href="#" className="">
              Contact Us
            </a>
          </p>
          <p className="text-white pt-4 text-sm">
            <a href="#" className="">
              Our Blog
            </a>
          </p>
          <p className="text-white pt-4 text-sm">
            <a href="#" className="">
              Discover
            </a>
          </p>
        </div>
        <div className="flex-1">
          <h1 className=" mb-2 text-white text-base">Subscribe</h1>
          <Input
            placeholder="info@yourgmail.com"
            className="border-white text-white"
          />
        </div>
      </div>
    </footer>
  );
}
