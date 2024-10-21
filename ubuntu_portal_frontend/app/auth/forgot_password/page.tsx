"use client";
import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import Footer from "@/components/buyer/Footer";
import { toast } from "react-toastify";
import axios from "axios";

export default function LoginPage() {
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const data = Object.fromEntries(formData.entries());
    const { email } = data;

    try {
      const response = await axios.post(
        "https://ubuntu-portal.onrender.com/api/auth/forgot-password/",
        { email },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      // Axios will throw an error if the response status is not in the 2xx range
      if (response.status === 200) {
        toast.success("Password reset instructions sent to your email!");
      }
    } catch (err) {
      if (axios.isAxiosError(err)) {
        // Handle Axios-specific errors
        const message =
          err.response?.data?.detail ||
          "Failed to send reset instructions. Please try again.";
        toast.error(message);
      } else if (err instanceof Error) {
        // Handle other errors
        toast.error(err.message);
      } else {
        toast.error("Something went wrong.");
      }
    } finally {
      // setLoading(false); // Uncomment if you're using loading state
    }
  };

  return (
    <>
      <div className="min-h-screen bg-gray-100 flex flex-col justify-center items-center w-screen">
        {/* Logo */}
        <div className="mb-8 mt-8">
          <div>Ubuntu Portal</div>
        </div>
        <div className="flex mb-16 gap-8">
          {/* Login Form Container */}
          <div className="bg-green-50 bg-gradient-to-tr p-8 rounded-3xl shadow-md w-full max-w-sm shadow-slate-600">
            <div className="item-center text-center">
              <h2 className="text-2xl font-semibold mb-4 text-gray-800">
                Reset Password
              </h2>
            </div>

            {/* Login Form */}
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700"
                >
                  Email
                </label>
                <input
                  type="text"
                  id="email"
                  name="email"
                  className="mt-2 w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-yellow-500 focus:border-yellow-500"
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full bg-green-700 text-white py-2 px-4 rounded-md shadow-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2"
              >
                Reset Password
              </button>
            </form>

            <div className="mt-6 border-t pt-6 text-sm text-gray-600">
              <Link href="/auth/login">
                <Button className="w-full bg-gray-200 text-gray-800 py-2 px-4 rounded-md shadow-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-300 focus:ring-offset-2 block text-center mt-3">
                  Back to Login
                </Button>
              </Link>
            </div>
            {/* Terms and conditions */}
            <div className="mt-8 text-xs text-gray-500">
              <p>Conditions of Use</p>
              <p>Privacy Notice</p>
              <p>Help</p>
            </div>
          </div>
        </div>
      </div>
      <div>
        <Footer />
      </div>
    </>
  );
}
