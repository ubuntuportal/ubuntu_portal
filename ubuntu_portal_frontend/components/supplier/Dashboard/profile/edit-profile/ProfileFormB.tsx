"use client";
import React, { useState } from "react";

const ProfileFormB: React.FC = () => {
  const [image, setImage] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    companyName: "",
    companyAddress: "",
    registrationNumber: "",
    taxID: "",
    contact: "",
  });

  // Handle image upload
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

  // Handle image deletion
  const handleImageDelete = () => {
    setImage(null);
  };

  // Handle form data changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="max-w-md mx-auto">
      {/* Image Upload Section */}
      <div className="flex flex-col items-center mb-6">
        <p>Your Company Logo</p>
        {image ? (
          <div className="relative">
            <img
              src={image}
              alt="Uploaded Profile"
              className="w-24 h-24 rounded-full object-cover mb-2"
            />
            <button
              onClick={handleImageDelete}
              className="absolute top-0 right-0 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center text-xs"
            >
              X
            </button>
          </div>
        ) : (
          <div className="w-24 h-24 rounded-full bg-gray-300 flex items-center justify-center mb-2"></div>
        )}
        <input
          type="file"
          onChange={handleImageUpload}
          className="text-center text-sm"
        />
      </div>

      {/* Company Name */}
      <div className="mb-4">
        <label className="block text-gray-700 font-semibold mb-1">
          Company Name
        </label>
        <input
          type="text"
          name="companyName"
          value={formData.companyName}
          onChange={handleChange}
          className="w-full px-3 py-2 border rounded-md"
        />
      </div>

      {/* Company Address */}
      <div className="mb-4">
        <label className="block text-gray-700 font-semibold mb-1">
          Company Address
        </label>
        <input
          type="text"
          name="companyAddress"
          value={formData.companyAddress}
          onChange={handleChange}
          className="w-full px-3 py-2 border rounded-md"
        />
      </div>

      {/* Registration Number */}
      <div className="mb-4">
        <label className="block text-gray-700 font-semibold mb-1">
          Registration Number
        </label>
        <input
          type="text"
          name="registrationNumber"
          value={formData.registrationNumber}
          onChange={handleChange}
          className="w-full px-3 py-2 border rounded-md"
        />
      </div>

      {/* Tax ID */}
      <div className="mb-4">
        <label className="block text-gray-700 font-semibold mb-1">Tax ID</label>
        <input
          type="text"
          name="taxID"
          value={formData.taxID}
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
    </div>
  );
};

export default ProfileFormB;
