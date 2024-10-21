"use client"; // This is required if you're using hooks in the app directory
import { UserCircleIcon } from "@heroicons/react/solid"; // Importing the icon
import { useRouter } from "next/navigation"; // Import useRouter

export default function UserButton() {
  const router = useRouter(); // Initialize the router

  const handleClick = () => {
    router.push("/supplier/dashboard/profile"); // Navigate to the profile page
  };

  return (
    <button
      className="text-gray-600 hover:text-gray-800"
      onClick={handleClick} // Set up the click handler
    >
      <UserCircleIcon className="h-8 w-8" />
    </button>
  );
}
