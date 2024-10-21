import React from "react";
import { Button } from "@/components/ui/button";
import SupplierProfileCard from "@/components/supplier/Dashboard/profile/ProfileCard";
import CompanyDetails from "@/components/supplier/Dashboard/profile/CompanyDetails";
import CompanyDocuments from "@/components/supplier/Dashboard/profile/CompanyDocuments";
import BusinessCategory from "@/components/supplier/Dashboard/profile/BusinessCategory";
import Link from "next/link"; // Import Link from Next.js

function Profile() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-transparent">
      <div className="relative">
        {/* Green background section */}
        <div className="bg-green-500 rounded-lg max-w-full mx-8 p-8 h-32 flex justify-end items-center relative">
          {/* Edit Profile button with navigation */}
          <Link href="/supplier/dashboard/profile/edit-profile">
            <Button className="bg-white text-black">Edit Profile</Button>
          </Link>

          {/* Profile Card starting from middle */}
          <div className="absolute top-1/2 left-8 transform -translate-y-0 z-10">
            <SupplierProfileCard />
          </div>
        </div>

        {/* Other sections */}
        <div className="mb-8 ml-96">
          <CompanyDetails />
        </div>
        <div className="w-full min-w-fit flex mx-0 my-8 mt-8 p-8 gap-x-2">
          <BusinessCategory /> <CompanyDocuments />
        </div>
      </div>
    </div>
  );
}

export default Profile;
