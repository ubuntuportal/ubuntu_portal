"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import Footer from "@/components/buyer/Footer";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { signIn, useSession } from "next-auth/react";

export default function LoginPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const { data: session, status } = useSession();

  const handleGoogleLogin = () => {
    signIn("google");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const data = Object.fromEntries(formData.entries());
    const { email, password } = data;

    setLoading(true);

    try {
      const result = await signIn("credentials", {
        redirect: false,
        email,
        password,
      });

      if (result?.error) {
        toast.error("Confirm Email & Password");
      } else {
        toast.success("Login Successfully");
      }
    } catch (error) {
      console.error("Error during sign-in:", error);
      toast.error("An error occurred during login. Please try again.");
    } finally {
      setLoading(false); // End loading state
    }
  };

  useEffect(() => {
    if (status === "authenticated" && session?.role) {
      if (session.role === "buyer") {
        router.push("/home");
      } else if (session.role === "seller") {
        router.push("/supplier/dashboard");
      }
    }
  }, [session, status, router]);

  return (
    <>
      <div className="min-h-screen bg-gray-100 flex flex-col justify-center items-center w-screen">
        {/* Logo */}
        <div className="mb-8 mt-8">
          <div>Ubuntu Portal</div>
        </div>
        <div className="flex mb-16 gap-8">
          {/* Login Form Container */}
          <div className="bg-green-50 bg-gradient-to-tr p-8 rounded-3xl shadow-md w-full max-w-sm  shadow-slate-600">
            <div className="item-center text-center">
              <h2 className="text-2xl font-semibold mb-4 text-gray-800">
                Login
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

              <div className="mb-6">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700"
                >
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  className="mt-2 w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-yellow-500 focus:border-yellow-500"
                  required
                />
                <a
                  href="/auth/forgot_password"
                  className="text-xs text-blue-600 hover:underline mt-1 inline-block"
                >
                  Forgot your password?
                </a>
              </div>

              <button
                type="submit"
                className="w-full bg-green-700 text-white py-2 px-4 rounded-md shadow-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2"
              >
                {loading ? "Signing in...." : "Sign-In"}
              </button>
            </form>
            <button
              onClick={handleGoogleLogin}
              className="mt-2 w-full bg-green-700 text-white py-2 px-4 rounded-md shadow-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2"
            >
              Sign-In with Google
            </button>

            <div className="mt-6 border-t pt-6 text-sm text-gray-600">
              <p>New to UbuntuPortal?</p>
              <Link href="/auth/register">
                <Button className="w-full bg-gray-200 text-gray-800 py-2 px-4 rounded-md shadow-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-300 focus:ring-offset-2 block text-center mt-3">
                  Create your UbuntuPortal
                </Button>
              </Link>
            </div>

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
