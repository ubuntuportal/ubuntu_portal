// components/LogoutButton.tsx
"use client";

import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function LogoutButton() {
  const router = useRouter();

  const handleLogout = async () => {
    // Sign out the user and redirect to the login page
    await signOut({ callbackUrl: "/auth/login" });
    router.push("/auth/login"); // This is optional; next-auth will handle the redirect
  };

  return (
    <button
      onClick={handleLogout}
      className="bg-red-500 text-white px-4 py-2 rounded"
    >
      Logout
    </button>
  );
}
