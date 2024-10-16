"use client";
import { Button } from "@/components/ui/button";
import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { africanCountries } from "@/lib/data/AfricanCountries"; // Ensure the correct path

type ShippingFormInputs = {
  firstName: string;
  lastName: string;
  address: string;
  country: string;
  region: string;
  city: string;
  zipCode: string;
  email: string;
  phoneNumber: string;
};

function ShippingForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ShippingFormInputs>();

  const [selectedCountry, setSelectedCountry] = useState<string>("");
  const [regions, setRegions] = useState<string[]>([]);

  const onSubmit: SubmitHandler<ShippingFormInputs> = (data) => {
    console.log(data);
  };

  const handleCountryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const country = e.target.value;
    setSelectedCountry(country);

    // Find the country from the africanCountries array
    const foundCountry = africanCountries.find((c) => c.name === country);
    setRegions(foundCountry ? foundCountry.states : []); // Set regions based on the country
  };

  return (
    <div className="max-w-md mx-auto md:max-w-screen-md p-4">
      <h2 className="text-2xl font-semibold mb-4">Shipping Address</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <p className="block text-sm font-medium mb-1">Recipient's Name</p>
          <div className="flex gap-4">
            <div>
              <input
                type="text"
                placeholder="First Name"
                {...register("firstName", {
                  required: "First name is required",
                })}
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-green-500"
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
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-green-500"
              />
              {errors.lastName && (
                <span className="text-red-500 text-sm">
                  {errors.lastName.message}
                </span>
              )}
            </div>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">
            Shipping Address
          </label>
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
              {...register("region", { required: "Region/State is required" })}
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
            {errors.region && (
              <span className="text-red-500 text-sm">
                {errors.region.message}
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
              {...register("zipCode", { required: "Zip code is required" })}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-green-500"
            />
            {errors.zipCode && (
              <span className="text-red-500 text-sm">
                {errors.zipCode.message}
              </span>
            )}
          </div>
        </div>

        <div className="md:flex gap-4">
          <div className="flex-1">
            <label className="block text-sm font-medium mb-1">Email</label>
            <input
              type="email"
              {...register("email", { required: "Email is required" })}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-green-500"
            />
            {errors.email && (
              <span className="text-red-500 text-sm">
                {errors.email.message}
              </span>
            )}
          </div>

          <div className="flex-1">
            <label className="block text-sm font-medium mb-1">
              Phone Number
            </label>
            <input
              type="tel"
              {...register("phoneNumber", {
                required: "Phone number is required",
              })}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-green-500"
            />
            {errors.phoneNumber && (
              <span className="text-red-500 text-sm">
                {errors.phoneNumber.message}
              </span>
            )}
          </div>
        </div>

        <div className="flex gap-4 pt-2">
          <Button>Previous</Button>
          <Button type="submit">Next</Button>
        </div>
      </form>
    </div>
  );
}

export default ShippingForm;
