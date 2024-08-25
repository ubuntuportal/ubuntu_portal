"use client";
import { useRouter } from "next/navigation";
import React from "react";
import { BreadcrumbResponsive } from "@/components/buyer/Breadcrumb";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { CarouselSize } from "@/components/buyer/Carousel";
// import {
//   BellIcon,
//   CogIcon,
//   SearchIcon,
//   UserCircleIcon,
// } from "@heroicons/react/outline";

export default function ProductDetails({
  params,
}: {
  params: { productId: string };
}) {
  return (
    <div className="bg-gray-100 ">
      <div className="py-8 px-16 hidden lg:block lg:w-1/4">
        <BreadcrumbResponsive />
      </div>
      <h1>Details about {params.productId}</h1>
      <div className="container px-16  bg-white">
        <div className="flex pt-6">
          <div className="flex-1">
            <Image
              src="/img/image.png"
              alt={params.productId}
              width={500}
              height={300}
            />
          </div>
          <div className="flex-1">
            <h1 className="text-lg font-bold w-[75%]">
              Product name for maximum two text lines title could be very long
            </h1>
            <span></span>
            <p className="text-sm py-6">
              Product name for maximum two text lines title could be very long
            </p>

            <h2 className="text-4xl font-bold text-[#2DB224] ">$30</h2>
            <div className="flex gap-5 py-6">
              <Button>Start Order</Button>
              <Button className="bg-[#2DB224]">Add to Cart</Button>
            </div>
            <div className="grid grid-cols-2 gap-5 text-sm">
              <div>
                <span></span>
                <p>Free Shipping on order from $500</p>
              </div>
              <div>
                <span></span>
                <p>3 Years Warranty and Support 24/7</p>
              </div>
              <div>
                <span></span>
                <p>We accept credit cards, paypal</p>
              </div>
              <div>
                <span></span>
                <p>Products Made in the United States</p>
              </div>
            </div>
          </div>
        </div>
        <div className="pl-8 mb-12">
          <CarouselSize />
        </div>
        <div></div>
      </div>
    </div>
  );
}
