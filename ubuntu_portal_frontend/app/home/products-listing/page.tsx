import React from "react";
import { BreadcrumbResponsive } from "@/components/buyer/Breadcrumb";
import Sidebar from "@/components/buyer/Sidebar";
import Container from "@/components/buyer/Container";

function ProductListing() {
  return (
    <div className="container w-dvw bg-gray-100">
      <div className="mt-2 mb-2 px-1 py-1">
        <BreadcrumbResponsive />
      </div>
      <div className="flex mt-4">
        <div>
          <Sidebar />
        </div>
        <div>
          <Container />
        </div>
      </div>
    </div>
  );
}

export default ProductListing;
