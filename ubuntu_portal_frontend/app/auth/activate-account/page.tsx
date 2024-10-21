"use client";

import { useRouter, useParams } from "next/navigation";
import { useState, useEffect } from "react";
import axios from "axios"; // Import Axios

export default function ActivateAccount() {
  const router = useRouter();
  const params = useParams();
  const [activationStatus, setActivationStatus] = useState<string | null>(null);

  const uidb64 = params?.uidb64 as string;
  const token = params?.token as string;

  useEffect(() => {
    const activateAccount = async () => {
      if (uidb64 && token) {
        try {
          const response = await axios.get(
            `https://ubuntu-portal.onrender.com/api/auth/activate-account/${uidb64}/${token}/`
          );

          if (response.status === 200) {
            setActivationStatus("success");
            setTimeout(() => {
              router.push("/login");
            }, 3000);
          } else {
            setActivationStatus("error");
          }
        } catch (error) {
          console.error("Error activating account:", error);
          setActivationStatus("error");
        }
      }
    };

    activateAccount();
  }, [uidb64, token, router]);

  if (activationStatus === "success") {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-green-50">
        <div className="p-6 bg-white shadow-lg rounded-lg text-center max-w-md">
          <h2 className="text-2xl font-bold text-green-600">
            Account Activated!
          </h2>
          <p className="mt-4 text-lg text-gray-700">
            Your account has been activated successfully. Redirecting to the
            login page...
          </p>
          <div className="mt-6">
            <svg
              className="w-16 h-16 text-green-600 mx-auto animate-bounce"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9 12l2 2 4-4m0 6a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
        </div>
      </div>
    );
  }

  if (activationStatus === "error") {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-red-50">
        <div className="p-6 bg-white shadow-lg rounded-lg text-center max-w-md">
          <h2 className="text-2xl font-bold text-red-600">Activation Failed</h2>
          <p className="mt-4 text-lg text-gray-700">
            Invalid activation link or token has expired. Please contact support
            for assistance.
          </p>
          <div className="mt-6">
            <svg
              className="w-16 h-16 text-red-600 mx-auto animate-pulse"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-blue-50">
      <div className="p-6 bg-white shadow-lg rounded-lg text-center max-w-md">
        <h2 className="text-2xl font-bold text-blue-600">Activating Account</h2>
        <p className="mt-4 text-lg text-gray-700">
          Please wait while we activate your account...
        </p>
        <div className="mt-6">
          <svg
            className="w-16 h-16 text-blue-600 mx-auto animate-spin"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 4v4m0 8v4m8-8h-4m-8 0H4m9-9l-2 2-2-2m0 14l2-2 2 2"
            />
          </svg>
        </div>
      </div>
    </div>
  );
}
