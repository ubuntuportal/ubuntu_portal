'use client';
import { Button } from '@/components/ui/button';
import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';

type ContactFormInputs = {
  firstName: string;
  lastName: string;
  country: string;
  region: string;
  city: string;
  zipCode: string;
  email: string;
  phoneNumber: string;
};

function ContactForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ContactFormInputs>();

  const onSubmit: SubmitHandler<ContactFormInputs> = (data) => {
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
                {...register('firstName', {
                  required: 'First name is required',
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
                {...register('lastName', {
                  required: 'Last name is required',
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

        <div className="md:flex gap-4">
          <div className="flex-1">
            <label className="block text-sm font-medium mb-1">Email</label>
            <input
              type="email"
              {...register('email', { required: 'Email is required' })}
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
              {...register('phoneNumber', {
                required: 'Phone number is required',
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

        <div className="md:flex gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">
              Preferred Contact Method
            </label>
            <input
              type="text"
              {...register('country', { required: 'Country is required' })}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-green-500"
            />
            {errors.country && (
              <span className="text-red-500 text-sm">
                {errors.country.message}
              </span>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              Best Time to Contact (Optional)
            </label>
            <input
              type="text"
              {...register('region', {
                required: 'Region/State is required',
              })}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-green-500"
            />
            {errors.region && (
              <span className="text-red-500 text-sm">
                {errors.region.message}
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
