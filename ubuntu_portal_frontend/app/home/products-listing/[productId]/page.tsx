"use client";
import { useRouter } from "next/navigation";
import React, { ReactNode, useState } from "react";
import { BreadcrumbResponsive } from "@/components/buyer/Breadcrumb";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { CarouselSize } from "@/components/buyer/Carousel";
import Link from "next/link";

interface TabButtonProps {
  index: number;
  activeTab: number;
  setActiveTab: (index: number) => void;
  children: ReactNode;
}

export default function ProductDetails({
  params,
}: {
  params: { productId: string };
}) {
  return (
    <div className="bg-gray-100 ">
      <div className="py-6 px-16 hidden lg:block lg:w-1/4">
        <BreadcrumbResponsive />
      </div>
      {/* <h1>Details about {params.productId}</h1> */}
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
            <div className="grid w-[70%] grid-cols-2 gap-3 text-xs">
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
        <div>
          <Tabs />
        </div>
      </div>
    </div>
  );
}

function Tabs() {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <div className="border mb-10">
      <div className="flex gap-6 justify-center my-6 border-b-2">
        <TabButton index={0} activeTab={activeTab} setActiveTab={setActiveTab}>
          Additional information
        </TabButton>
        <TabButton index={1} activeTab={activeTab} setActiveTab={setActiveTab}>
          Specification
        </TabButton>
        <TabButton index={2} activeTab={activeTab} setActiveTab={setActiveTab}>
          Review
        </TabButton>
      </div>

      <div className=" inspiration-content">
        {activeTab === 0 && <AdditionalTab />}
        {/* {activeTab === 1 && <DestinationOutdoorAdventure />}
        {activeTab === 2 && <MountainCabins />}
        {activeTab === 3 && <BeachDestinations />}
        {activeTab === 4 && <PopularDestinations />}
        {activeTab === 5 && <UniqueStays />} */}
      </div>
    </div>
  );
}

function TabButton({
  index,
  activeTab,
  setActiveTab,
  children,
}: TabButtonProps) {
  return (
    <div>
      <div
        // href="#"
        className={`text-lg my-4 cursor-pointer  ${
          activeTab === index ? "border-b-2 border-[#2DB224] " : ""
        }`}
        onClick={() => setActiveTab(index)}
      >
        {children}
      </div>
    </div>
  );
}

function AdditionalTab() {
  return (
    <div className="flex gap-3 justify-center px-8 pb-9">
      <div className="basis-1/2">
        <h1 className="font-bold mb-2">Description</h1>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quae sed
          tenetur aliquid earum, eligendi labore illo architecto? Fugiat
          explicabo alias beatae quas, laborum perferendis! Ab, placeat! Soluta
          iusto mollitia labore?
        </p>
      </div>
      <div className="flex-1">
        <h1 className="font-bold mb-2">Features</h1>
        <div className="text-sm flex flex-col gap-3 ">
          <p>
            <span></span> Free 1 Year Warranty
          </p>

          <p>
            <span></span>Free Shipping & Fastest Delivery
          </p>

          <p>
            <span></span>100% Money-back Guarantee
          </p>

          <p>
            <span></span>24/7 Customer Support
          </p>

          <p>
            <span></span>Secure Payment Method
          </p>
        </div>
      </div>
      <div className="flex-1 mb-2">
        <h1 className="font-bold mb-2">Shipping Information</h1>
        <div className="text-sm flex flex-col gap-3">
          <p>
            <span className="font-bold">Courier:</span> 2-4 days, free shipping{" "}
          </p>

          <p>
            <span className="font-bold">Local Shipping:</span>Up to one week,
            $19.00
          </p>

          <p>
            <span className="font-bold">UPS Ground Shipping:</span>4-6 days,
            $29.00
          </p>

          <p>
            <span className="font-bold">Unishop Global Shipping:</span>3-4 days,
            $39.00
          </p>
        </div>
      </div>
    </div>
  );
}
