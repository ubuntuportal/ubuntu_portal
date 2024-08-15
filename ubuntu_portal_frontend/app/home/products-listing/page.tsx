import React from "react";
import { BreadcrumbResponsive } from "@/components/buyer/Breadcrumb";
import Sidebar from "@/components/buyer/Sidebar";
import Container from "@/components/buyer/Container";

function ProductListing() {
  return (
    <div className=" bg-gray-100">
      <div className="pr-16 py-8 px-8">
        {" "}
        <BreadcrumbResponsive />
      </div>

      <div className="container bg-white">
        {" "}
        <div className="flex mt-4">
          <div>
            <Sidebar />
          </div>
          <div>
            <Container />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductListing;
