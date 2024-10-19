import React from "react";
import {
  FaBuilding,
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaEnvelope,
} from "react-icons/fa"; // Added FaEnvelope for email icon
import { Button } from "@/components/ui/button";

// Define the props interface
interface SupplierProfileCardProps {
  profileImage: string;
  companyName: string;
  location: string;
  contact: string;
  email: string; // Added email field
}

// Temporary component to simulate dynamic data
const SupplierProfileCard: React.FC = () => {
  // Simulating dynamic details (these could be fetched from an API or passed as props later)
  const simulatedData: SupplierProfileCardProps = {
    profileImage:
      "https://www.gravatar.com/avatar/2c7d99fe281ecd3bcd65ab915bac6dd5?s=250",
    companyName: "Ubuntu Portal Inc.",
    location: "San Francisco, CA",
    contact: "+1 234 567 890",
    email: "info@ubuntuportal.com", // Simulated email
  };

  return (
    <div className="mx-8 mt-0 p-2 bg-white rounded-xl w-fit h-fit flex flex-col items-center shadow-lg">
      {/* Profile image clipped into a round frame */}
      <div className="bg-green-50 p-1 rounded-full w-32 h-32 overflow-hidden mb-4">
        <img
          src={simulatedData.profileImage} // Simulated profile image
          alt="Profile"
          className="object-cover w-full h-full rounded-full" // Add rounded-full here
        />
      </div>
      <div className="mb-4 font-bold text-xl">
        <h2>Hezekiahs O.</h2>
      </div>

      {/* Information section aligned to the left */}
      <div className="text-left m-4 w-full px-4">
        <div className="flex items-center my-4">
          <FaBuilding className="mr-2" /> {/* Icon for company */}
          <span>{simulatedData.companyName}</span>{" "}
          {/* Simulated company name */}
        </div>
        <div className="flex items-center my-4">
          <FaMapMarkerAlt className="mr-2" /> {/* Icon for location */}
          <span>{simulatedData.location}</span> {/* Simulated location */}
        </div>
        <div className="flex items-center my-4">
          <FaPhoneAlt className="mr-2" /> {/* Icon for contact */}
          <span>{simulatedData.contact}</span> {/* Simulated contact */}
        </div>
        <div className="flex items-center my-4">
          <FaEnvelope className="mr-2" /> {/* Icon for email */}
          <span>{simulatedData.email}</span> {/* Simulated email */}
        </div>
      </div>

      {/* Buttons section aligned vertically */}
      <div className="flex flex-col space-y-2 mt-4 mb-8 w-full px-4">
        <Button className="hover:bg-gray-300 text-white py-2 px-4 rounded-lg w-full">
          Upload Documents
        </Button>
        <Button className="bg-gray-200 hover:bg-gray-300 text-green-500 py-2 px-4 rounded-lg w-full outline-2">
          Data Sheet
        </Button>
      </div>
    </div>
  );
};

export default SupplierProfileCard;
