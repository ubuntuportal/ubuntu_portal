"use client";
import { useRouter } from "next/navigation";
import React from "react";
import { BreadcrumbResponsive } from "@/components/buyer/Breadcrumb";

import { CarouselSize } from "@/components/buyer/Carousel";

import ProductTab from "@/components/buyer/ProductTab";
import Products from "@/components/buyer/Product";

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
      <div className="container px-16 py-16  bg-white">
        <Products params={params} />
        <div className="pl-8 my-8">
          <CarouselSize />
        </div>
        <div>
          <ProductTab />
        </div>
      </div>
    </div>
  );
}
