"use client";
import React, { useState } from "react";

const ProfileFormC: React.FC = () => {
  const [formData, setFormData] = useState({
    bio: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <div className=" w-full">
      {/* Bio Section */}
      <div className="mb-4">
        <label className="block text-gray-700 font-semibold mb-1">Bio</label>
        <textarea
          name="bio"
          value={formData.bio}
          onChange={handleChange}
          className="w-full h-fit px-3 py-2 border rounded-md"
        />
      </div>
    </div>
  );
};

export default ProfileFormC;
