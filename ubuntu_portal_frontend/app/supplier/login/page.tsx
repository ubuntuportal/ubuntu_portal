import React from "react";
import Image from "next/image";

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center items-center">
      {/* Logo */}
      <div className="mb-8">
        <a href="#">
          {/* <Image
            src="/path-to-logo.png" // path to logo
            alt="Logo"
            width={120}
            height={40}
          /> */}
          Ubuntu Portal
        </a>
      </div>

      {/* Login Form Container */}
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-sm">
        <h2 className="text-2xl font-semibold mb-4 text-gray-800">Sign-In</h2>

        {/* Login Form */}
        <form>
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
              href="#"
              className="text-xs text-blue-600 hover:underline mt-1 inline-block"
            >
              Forgot your password?
            </a>
          </div>

          <button
            type="submit"
            className="w-full bg-amber-500 text-white py-2 px-4 rounded-md shadow-md hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2"
          >
            Sign-In
          </button>
        </form>

        {/* Additional Links */}
        {/* <div className="mt-6 text-sm text-gray-600">
          <p>
            By continuing, you agree to our{" "}
            <a href="#" className="text-blue-600 hover:underline">
              Conditions of Use
            </a>{" "}
            and{" "}
            <a href="#" className="text-blue-600 hover:underline">
              Privacy Notice.
            </a>
          </p>
        </div> */}

        <div className="mt-6 border-t pt-6 text-sm text-gray-600">
          <p>New to UbuntuPortal?</p>
          <a
            href="#"
            className="w-full bg-gray-200 text-gray-800 py-2 px-4 rounded-md shadow-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-300 focus:ring-offset-2 block text-center mt-3"
          >
            Create your UbuntuPortal
          </a>
        </div>
      </div>

      {/* Footer */}
      <div className="mt-8 text-xs text-gray-500">
        <p>Conditions of Use</p>
        <p>Privacy Notice</p>
        <p>Help</p>
      </div>
    </div>
  );
}
