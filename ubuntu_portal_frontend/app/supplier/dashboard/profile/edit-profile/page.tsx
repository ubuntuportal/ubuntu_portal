import ProfileFormA from "@/components/supplier/Dashboard/profile/edit-profile/ProfileFormA";
import ProfileFormB from "@/components/supplier/Dashboard/profile/edit-profile/ProfileFormB";
import ProfileFormC from "@/components/supplier/Dashboard/profile/edit-profile/ProfileFormC";
import React from "react";

function EditProfile() {
  return (
    <div className="m-8 p-8 bg-transparent w-full">
      <div>
        {" "}
        <div className="flex grid-row-2 gap-x-8">
          <div className="w-[491px]">
            <ProfileFormA />
          </div>
          <div className="w-[491px]">
            <ProfileFormB />
          </div>
        </div>
        <div>
          <ProfileFormC />
        </div>
      </div>
    </div>
  );
}

export default EditProfile;
