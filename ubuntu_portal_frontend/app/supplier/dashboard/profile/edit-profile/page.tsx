import ProfileFormA from "@/components/supplier/Dashboard/profile/edit-profile/ProfileFormA";
import ProfileFormB from "@/components/supplier/Dashboard/profile/edit-profile/ProfileFormB";
import { Button } from "@/components/ui/button";
import React from "react";

function EditProfile() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-transparent">
      <div className="grid grid-cols-1 gap-y-8 md:grid-cols-2 md:gap-x-8">
        <div className="w-full md:w-[491px]">
          <ProfileFormA />
        </div>
        <div className="w-full md:w-[491px]">
          <ProfileFormB />
        </div>
      </div>
      <div className="mt-8 flex space-x-4">
        <Button className="w-[240px]">Reset</Button>
        <Button className="w-[240px] bg-white text-black">Submit</Button>
      </div>
    </div>
  );
}

export default EditProfile;
