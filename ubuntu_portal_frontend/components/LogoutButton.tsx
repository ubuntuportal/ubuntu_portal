// components/LogoutButton.tsx
"use client";
import { Button } from "./ui/button";
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
    <Button onClick={handleLogout} className="hover:bg-red-500 ">
      Logout
    </Button>
  );
}
