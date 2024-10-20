"use client";
import { Button } from "@/components/ui/button";
import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useSession } from "next-auth/react";
import { toast } from "react-toastify";

type ContactFormInputs = {
  first_name: string;
  last_name: string;
  preferred_contact_method: string;
  best_time_to_contact: string;
  city: string;
  zipCode: string;
  email_address: string;
  phone_number: string;
};

function ContactForm() {
  const { data: session } = useSession();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ContactFormInputs>();

  const onSubmit: SubmitHandler<ContactFormInputs> = async (data) => {
    try {
      if (!session || !session?.accessToken) {
        toast.error("Unauthorized: Token not found.");
        return;
      }
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/contact_info/orders/`,
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
      }

      console.log("Form submitted successfully:", result);
    } catch (error) {
      console.error("Error submitting the form:", error);
    }
    console.log(data);
  };

  return (
    <div className="max-w-md mx-auto md:max-w-screen-md p-4">
      <h2 className="text-2xl font-semibold mb-4">Contact Information</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <p className="block text-sm font-medium mb-1">Full Name</p>
          <div className="flex gap-4">
            <div>
              <input
                type="text"
                placeholder="First Name"
                {...register("first_name", {
                  required: "First name is required",
                })}
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-green-500"
              />
              {errors.first_name && (
                <span className="text-red-500 text-sm">
                  {errors.first_name.message}
                </span>
              )}
            </div>

            <div>
              <input
                type="text"
                placeholder="Last Name"
                {...register("last_name", {
                  required: "Last name is required",
                })}
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-green-500"
              />
              {errors.last_name && (
                <span className="text-red-500 text-sm">
                  {errors.last_name.message}
                </span>
              )}
            </div>
          </div>
        </div>

        <div className="md:flex gap-4">
          <div className="flex-1">
            <label className="block text-sm font-medium mb-1">Email</label>
            <input
              placeholder="Email"
              type="email"
              {...register("email_address", { required: "Email is required" })}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-green-500"
            />
            {errors.email_address && (
              <span className="text-red-500 text-sm">
                {errors.email_address.message}
              </span>
            )}
          </div>

          <div className="flex-1">
            <label className="block text-sm font-medium mb-1">
              Phone Number
            </label>
            <input
              placeholder="Phone Number"
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
        </div>

        <div className="md:flex gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">
              Preferred Contact Method
            </label>
            <input
              placeholder="Email / Phone Number"
              type="text"
              {...register("preferred_contact_method", {
                required: "Method required",
              })}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-green-500"
            />
            {errors.preferred_contact_method && (
              <span className="text-red-500 text-sm">
                {errors.preferred_contact_method.message}
              </span>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              Best Time to Contact (Optional)
            </label>
            <input
              placeholder="Afternoon, Morning, Evening, Weekend's"
              type="text"
              {...register("best_time_to_contact", {
                required: "Time is required",
              })}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-green-500"
            />
            {errors.best_time_to_contact && (
              <span className="text-red-500 text-sm">
                {errors.best_time_to_contact.message}
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

export default ContactForm;
