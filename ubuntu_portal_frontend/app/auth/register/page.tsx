"use client";
import React, { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import Footer from "@/components/buyer/Footer";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { toast } from "react-toastify";

// Array mapping country codes to their calling codes
const countries = [
  { code: "DZ", name: "Algeria", callingCode: "+213" },
  { code: "AO", name: "Angola", callingCode: "+244" },
  { code: "BJ", name: "Benin", callingCode: "+229" },
  { code: "BW", name: "Botswana", callingCode: "+267" },
  { code: "BF", name: "Burkina Faso", callingCode: "+226" },
  { code: "BI", name: "Burundi", callingCode: "+257" },
  { code: "CV", name: "Cabo Verde", callingCode: "+238" },
  { code: "CM", name: "Cameroon", callingCode: "+237" },
  { code: "CF", name: "Central African Republic", callingCode: "+236" },
  { code: "TD", name: "Chad", callingCode: "+235" },
  { code: "KM", name: "Comoros", callingCode: "+269" },
  { code: "CG", name: "Congo", callingCode: "+242" },
  { code: "CD", name: "Congo (Democratic Republic)", callingCode: "+243" },
  { code: "DJ", name: "Djibouti", callingCode: "+253" },
  { code: "EG", name: "Egypt", callingCode: "+20" },
  { code: "GQ", name: "Equatorial Guinea", callingCode: "+240" },
  { code: "ER", name: "Eritrea", callingCode: "+291" },
  { code: "SZ", name: "Eswatini", callingCode: "+268" },
  { code: "ET", name: "Ethiopia", callingCode: "+251" },
  { code: "GA", name: "Gabon", callingCode: "+241" },
  { code: "GM", name: "Gambia", callingCode: "+220" },
  { code: "GH", name: "Ghana", callingCode: "+233" },
  { code: "GN", name: "Guinea", callingCode: "+224" },
  { code: "GW", name: "Guinea-Bissau", callingCode: "+245" },
  { code: "CI", name: "Ivory Coast", callingCode: "+225" },
  { code: "KE", name: "Kenya", callingCode: "+254" },
  { code: "LS", name: "Lesotho", callingCode: "+266" },
  { code: "LR", name: "Liberia", callingCode: "+231" },
  { code: "LY", name: "Libya", callingCode: "+218" },
  { code: "MG", name: "Madagascar", callingCode: "+261" },
  { code: "MW", name: "Malawi", callingCode: "+265" },
  { code: "ML", name: "Mali", callingCode: "+223" },
  { code: "MR", name: "Mauritania", callingCode: "+222" },
  { code: "MU", name: "Mauritius", callingCode: "+230" },
  { code: "MA", name: "Morocco", callingCode: "+212" },
  { code: "MZ", name: "Mozambique", callingCode: "+258" },
  { code: "NA", name: "Namibia", callingCode: "+264" },
  { code: "NE", name: "Niger", callingCode: "+227" },
  { code: "NG", name: "Nigeria", callingCode: "+234" },
  { code: "RW", name: "Rwanda", callingCode: "+250" },
  { code: "ST", name: "São Tomé and Príncipe", callingCode: "+239" },
  { code: "SN", name: "Senegal", callingCode: "+221" },
  { code: "SC", name: "Seychelles", callingCode: "+248" },
  { code: "SL", name: "Sierra Leone", callingCode: "+232" },
  { code: "SO", name: "Somalia", callingCode: "+252" },
  { code: "ZA", name: "South Africa", callingCode: "+27" },
  { code: "SS", name: "South Sudan", callingCode: "+211" },
  { code: "SD", name: "Sudan", callingCode: "+249" },
  { code: "TZ", name: "Tanzania", callingCode: "+255" },
  { code: "TG", name: "Togo", callingCode: "+228" },
  { code: "TN", name: "Tunisia", callingCode: "+216" },
  { code: "UG", name: "Uganda", callingCode: "+256" },
  { code: "ZM", name: "Zambia", callingCode: "+260" },
  { code: "ZW", name: "Zimbabwe", callingCode: "+263" },
];
export default function RegisterPage() {
  const router = useRouter();
  const [selectedCountry, setSelectedCountry] = useState(countries[0]); // Default to the first country
  const [phoneNumber, setPhoneNumber] = useState("");
  const [role, setRole] = useState("buyer"); // Default role

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const data = Object.fromEntries(formData);

    // Format phone number: Remove leading 0 if exists
    let formattedPhone = phoneNumber.startsWith("0")
      ? phoneNumber.slice(1)
      : phoneNumber;

    // Prepend country code to the phone number
    formattedPhone = `${selectedCountry.callingCode}${formattedPhone}`;
    if (data.password !== data.password2) {
      toast.error("Passwords do not match!");
      return;
    }
    // Add the formatted phone number to the data object
    data.phone_number = formattedPhone;
    data.role = role; // Add selected role to the data object
    const body = JSON.stringify(data);

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/register/`,
        {
          method: "POST",
          mode: "cors",
          headers: {
            "Content-Type": "application/json",
          },
          body: body,
        }
      );
      const result = await response.json();

      if (!response.ok) {
        const errorData = await response.json();
        toast.error(errorData.detail);
        throw new Error(errorData.detail || "Failed to register.");
      }

      // Registration successful
      toast.success("Please check email to verify account");
      router.push("/auth/login");
    } catch (err) {
      toast.error("Registration failed");
    }
  };

  return (
    <>
      <div className="min-h-screen bg-gray-100 flex flex-col justify-center items-center w-screen">
        <div className="mb-8 mt-3">
          <div>Ubuntu Portal</div>
        </div>
        <div className="flex mb-16 gap-8">
          <div className="bg-green-50 bg-gradient-to-tr p-8 pt-2 rounded-3xl shadow-md w-[70rem] max-w-sm  shadow-slate-600">
            <div className="item-center text-center">
              <h2 className="text-2xl font-semibold mb-4 text-gray-800">
                Sign Up
              </h2>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="mb-2">
                <label
                  htmlFor="phonenumber"
                  className="block text-sm font-medium text-gray-700"
                >
                  First name
                </label>
                <input
                  type="text"
                  id="firstname"
                  name="first_name"
                  placeholder="First Name"
                  className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-yellow-500 focus:border-yellow-500"
                  required
                />
              </div>

              <div className="mb-2">
                <label
                  htmlFor="phonenumber"
                  className="block text-sm font-medium text-gray-700"
                >
                  Last name
                </label>
                <input
                  type="text"
                  id="lastname"
                  name="last_name"
                  placeholder="Last Name"
                  className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-yellow-500 focus:border-yellow-500"
                  required
                />
              </div>

              <div className="mb-2">
                <label
                  htmlFor="phonenumber"
                  className="block text-sm font-medium text-gray-700"
                >
                  Email
                </label>
                <input
                  type="text"
                  id="email"
                  name="email"
                  placeholder="Email"
                  className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-yellow-500 focus:border-yellow-500"
                  required
                />
              </div>

              {/* Country dropdown */}
              <div className="mb-2">
                <label
                  htmlFor="country"
                  className="block text-sm font-medium text-gray-700"
                >
                  Country
                </label>
                <select
                  id="country"
                  name="country"
                  className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-yellow-500 focus:border-yellow-500"
                  value={selectedCountry.code}
                  onChange={(e) =>
                    setSelectedCountry(
                      countries.find((c) => c.code === e.target.value) ||
                        countries[0]
                    )
                  }
                  required
                >
                  {countries.map((country) => (
                    <option key={country.code} value={country.code}>
                      {country.name} ({country.callingCode})
                    </option>
                  ))}
                </select>
              </div>

              {/* Phone number input */}
              <div className="mb-2">
                <label
                  htmlFor="phonenumber"
                  className="block text-sm font-medium text-gray-700"
                >
                  Phone Number
                </label>
                <input
                  type="tel"
                  id="phonenumber"
                  placeholder="Phone Number"
                  name="phone_number"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-yellow-500 focus:border-yellow-500"
                  required
                />
              </div>

              {/* Role input as radio buttons */}
              <div className="mb-2">
                <label
                  htmlFor="role"
                  className="block text-sm font-medium text-gray-700"
                >
                  Role
                </label>
                <div className="flex gap-4">
                  <label className="inline-flex items-center">
                    <input
                      type="radio"
                      name="role"
                      value="buyer"
                      checked={role === "buyer"}
                      onChange={() => setRole("buyer")}
                      className="form-radio text-yellow-500"
                    />
                    <span className="ml-2">Buyer</span>
                  </label>
                  <label className="inline-flex items-center">
                    <input
                      type="radio"
                      name="role"
                      value="supplier"
                      checked={role === "supplier"}
                      onChange={() => setRole("supplier")}
                      className="form-radio text-yellow-500"
                    />
                    <span className="ml-2">Supplier</span>
                  </label>
                </div>
              </div>

              <div className="mb-2">
                <input
                  type="password"
                  id="password"
                  placeholder="Password"
                  name="password"
                  className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-yellow-500 focus:border-yellow-500"
                  required
                />
              </div>

              <div className="mb-2">
                <input
                  type="password"
                  id="confirmpassword"
                  name="password2"
                  placeholder="Confirm Password"
                  className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-yellow-500 focus:border-yellow-500"
                  required
                />
              </div>

              <div className="flex flex-col gap-2 text-center">
                <button
                  type="submit"
                  className="w-full bg-green-700 text-white py-2 px-4 rounded-md shadow-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2"
                >
                  Sign-Up
                </button>
                <div className="mt-1">Or</div>
              </div>
            </form>
            <button
              onClick={() => signIn("google", { callbackUrl: "/auth/login" })}
              className="w-full bg-green-700 text-white py-2 px-4 rounded-md shadow-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2"
            >
              Sign Up with Google
            </button>

            <div className="mt-6 border-t pt-6 text-sm text-gray-600">
              <p>Have an account?</p>
              <Link href="/auth/login/">
                <Button className="w-full bg-gray-200 text-gray-800 py-2 px-4 rounded-md shadow-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-300 focus:ring-offset-2 block text-center mt-3">
                  Login to UbuntuPortal
                </Button>
              </Link>
            </div>

            <div className="mt-8 text-xs text-gray-500">
              <p>Conditions of Use</p>
              <p>Privacy Notice</p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
