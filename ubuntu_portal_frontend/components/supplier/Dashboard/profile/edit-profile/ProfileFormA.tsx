"use client";
import React, { useState } from "react";
import ProfileFormC from "./ProfileFormC";

const ProfileFormA: React.FC = () => {
  const [image, setImage] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    fullName: "",
    username: "",
    designation: "",
    contact: "",
  });

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      const reader = new FileReader();
      reader.onload = (e) => {
        setImage(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="items-center max-w-md mx-auto">
      {/* Image Upload */}
      <div className="flex flex-col items-center mb-6">
        <p>Your profile Picture</p>
        {image ? (
          <img
            src={image}
            alt="Uploaded Profile"
            className="w-24 h-24 rounded-full object-cover mb-2"
          />
        ) : (
          <div className="w-24 h-24 rounded-full bg-gray-300 flex items-center justify-center mb-2"></div>
        )}
        <input
          type="file"
          onChange={handleImageUpload}
          className="text-center text-sm"
        />
      </div>

      {/* Full Name */}
      <div className="mb-4">
        <label className="block text-gray-700 font-semibold mb-1">
          Full Name
        </label>
        <input
          type="text"
          name="fullName"
          value={formData.fullName}
          onChange={handleChange}
          className="w-full px-3 py-2 border rounded-md"
        />
      </div>

      {/* Username */}
      <div className="mb-4">
        <label className="block text-gray-700 font-semibold mb-1">
          Username
        </label>
        <input
          type="text"
          name="username"
          value={formData.username}
          onChange={handleChange}
          className="w-full px-3 py-2 border rounded-md"
        />
      </div>

      {/* Designation */}
      <div className="mb-4">
        <label className="block text-gray-700 font-semibold mb-1">
          Designation
        </label>
        <input
          type="text"
          name="designation"
          value={formData.designation}
          onChange={handleChange}
          className="w-full px-3 py-2 border rounded-md"
        />
      </div>

      {/* Contact */}
      <div className="mb-4">
        <label className="block text-gray-700 font-semibold mb-1">
          Contact
        </label>
        <input
          type="text"
          name="contact"
          value={formData.contact}
          onChange={handleChange}
          className="w-full px-3 py-2 border rounded-md"
        />
      </div>
      <ProfileFormC />
    </div>
  );
};

export default ProfileFormA;
