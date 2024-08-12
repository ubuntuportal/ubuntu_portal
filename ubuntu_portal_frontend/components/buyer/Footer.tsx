import React from "react";

export default function Footer() {
  return (
    <footer className=" bottom-0  bg-gradient-to-b from-[#29964C] to-[#0D3018]   p-4  h-96">
      <div className="flex gap-[4vw] mx-24 pt-16">
        <div className="flex-2">
          <h1 className=" mb-8 text-white text-2xl font-extrabold leading-6">
            UBUNTU <br></br> Portal
          </h1>
          <p className="text-white ">
            We are a platform that connects buyers and suppliers.
          </p>
        </div>
        <div className="flex-1">
          <h1 className=" mb-8 text-white text-lg">My Account</h1>
          <p className="text-white">Email:</p>
        </div>
        <div className="flex-1">
          <h1 className=" mb-8 text-white text-lg">Resources</h1>
          <p className="text-white">Email:</p>
        </div>
        <div className="flex-1">
          <h1 className=" mb-8 text-white text-lg">Communities</h1>
          <p className="text-white">Email:</p>
        </div>
        <div className="flex-1">
          <h1 className=" mb-8 text-white text-lg">Subscribe</h1>
          <p className="text-white">Email:</p>
        </div>
      </div>
    </footer>
  );
}
