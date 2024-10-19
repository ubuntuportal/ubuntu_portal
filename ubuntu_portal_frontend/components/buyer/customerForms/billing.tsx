"use client";
import { Button } from "@/components/ui/button";
import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useSession } from "next-auth/react";
import { africanCountries } from "@/lib/data/AfricanCountries"; // Adjust the path accordingly
import { toast } from "react-toastify";

address: "9 agoro Street idumota lagos Island ";
city: "Kosofe";
companyName: "Mayowa";
country: "Nigeria";
email: "inioluwadaniel03@gmail.com";
phoneNumber: "08113777257";
region: "Lagos";
zipCode: "100001";

type BillingFormInputs = {
  firstName: string;
  lastName: string;
  company_name?: string;
  address: string;
  country: string;
  region_state: string;
  city: string;
  zip_code: string;
  email: string;
  phone_number: string;
};

function BillingForm() {
  const { data: session } = useSession();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<BillingFormInputs>();

  const [selectedCountry, setSelectedCountry] = useState<string>("");
  const [regions, setRegions] = useState<string[]>([]);

  const onSubmit: SubmitHandler<BillingFormInputs> = async (data) => {
    try {
      if (!session || !session?.accessToken) {
        toast.error("Unauthorized: Token not found.");
        return;
      }
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/billing_info/orders/`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${session.accessToken}`, // Add token to the request headers
          },
          body: JSON.stringify(data), // Convert the form data to JSON
        }
      );

      const result = await response.json();
      console.log(result);
      if (!response.ok) {
        throw new Error("Failed to submit the form");
        console.log(result);
      }

      console.log("Form submitted successfully:", result);
    } catch (error) {
      console.error("Error submitting the form:", error);
    }
    console.log(data);
  };

  // Function to handle country change and update regions dropdown
  const handleCountryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const country = e.target.value;
    setSelectedCountry(country);

    const foundCountry = africanCountries.find((c) => c.name === country);
    setRegions(foundCountry ? foundCountry.states : []);
  };

  return (
    <div className="max-w-md mx-auto md:max-w-screen-md p-4">
      <h2 className="text-2xl font-semibold mb-4">Billing Information</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="md:flex gap-4">
          {/* <div>
            <p className="block text-sm font-medium mb-1">User name</p>
            <div className="flex gap-4">
              <div>
                <input
                  type="text"
                  placeholder="First Name"
                  {...register("firstName", {
                    required: "First name is required",
                  })}
                  className="w-full md:max-w-44 px-3 py-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-green-500"
                />
                {errors.firstName && (
                  <span className="text-red-500 text-sm">
                    {errors.firstName.message}
                  </span>
                )}
              </div>

              <div>
                <input
                  type="text"
                  placeholder="Last Name"
                  {...register("lastName", {
                    required: "Last name is required",
                  })}
                  className="w-full md:max-w-44 px-3 py-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-green-500"
                />
                {errors.lastName && (
                  <span className="text-red-500 text-sm">
                    {errors.lastName.message}
                  </span>
                )}
              </div>
            </div>
          </div> */}

          <div className="mt-4 md:mt-0 flex-1">
            <label className="block text-sm font-medium mb-1">
              Company Name (Optional)
            </label>
            <input
              type="text"
              {...register("company_name")}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-green-500"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Address</label>
          <input
            type="text"
            {...register("address", { required: "Address is required" })}
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-green-500"
          />
          {errors.address && (
            <span className="text-red-500 text-sm">
              {errors.address.message}
            </span>
          )}
        </div>

        <div className="md:flex gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Country</label>
            <select
              {...register("country", { required: "Country is required" })}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-green-500"
              onChange={handleCountryChange}
            >
              <option value="">Select Country</option>
              {africanCountries.map((country) => (
                <option key={country.name} value={country.name}>
                  {country.name}
                </option>
              ))}
            </select>
            {errors.country && (
              <span className="text-red-500 text-sm">
                {errors.country.message}
              </span>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              Region/State
            </label>
            <select
              {...register("region_state", {
                required: "Region/State is required",
              })}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-green-500"
              disabled={!regions.length}
            >
              <option value="">Select Region/State</option>
              {regions.map((region, index) => (
                <option key={index} value={region}>
                  {region}
                </option>
              ))}
            </select>
            {errors.region_state && (
              <span className="text-red-500 text-sm">
                {errors.region_state.message}
              </span>
            )}
          </div>
        </div>

        <div className="md:flex gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">City</label>
            <input
              type="text"
              {...register("city", { required: "City is required" })}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-green-500"
            />
            {errors.city && (
              <span className="text-red-500 text-sm">
                {errors.city.message}
              </span>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Zip Code</label>
            <input
              type="text"
              {...register("zip_code", { required: "Zip code is required" })}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-green-500"
            />
            {errors.zip_code && (
              <span className="text-red-500 text-sm">
                {errors.zip_code.message}
              </span>
            )}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Email</label>
          <input
            type="email"
            {...register("email", { required: "Email is required" })}
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-green-500"
          />
          {errors.email && (
            <span className="text-red-500 text-sm">{errors.email.message}</span>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Phone Number</label>
          <input
            type="tel"
            {...register("phone_number", {
              required: "Phone number is required",
            })}
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-green-500"
          />
          {errors.phone_number && (
            <span className="text-red-500 text-sm">
              {errors.phone_number.message}
            </span>
          )}
        </div>

        <div className="flex gap-4 pt-2">
          <Button>Previous</Button>
          <Button type="submit">Next</Button>
        </div>
      </form>
    </div>
  );
}

export default BillingForm;
