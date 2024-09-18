'use client';
import { Button } from '@/components/ui/button';
import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';

type BillingFormInputs = {
  firstName: string;
  lastName: string;
  companyName?: string;
  address: string;
  country: string;
  region: string;
  city: string;
  zipCode: string;
  email: string;
  phoneNumber: string;
};

function BillingForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<BillingFormInputs>();

  const onSubmit: SubmitHandler<BillingFormInputs> = (data) => {
    console.log(data);
  };

  return (
    <div className="max-w-md mx-auto md:max-w-screen-md p-4">
      <h2 className="text-2xl font-semibold mb-4">Billing Information</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="md:flex gap-4">
          <div>
            <p className="block text-sm font-medium mb-1">User name</p>
            <div className="flex gap-4">
              <div>
                <input
                  type="text"
                  placeholder="First Name"
                  {...register('firstName', {
                    required: 'First name is required',
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
                  {...register('lastName', {
                    required: 'Last name is required',
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
          </div>

          <div className="mt-4 md:mt-0 flex-1">
            <label className="block text-sm font-medium mb-1">
              Company Name (Optional)
            </label>
            <input
              type="text"
              {...register('companyName')}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-green-500"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Address</label>
          <input
            type="text"
            {...register('address', { required: 'Address is required' })}
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-green-500"
          />
          {errors.address && (
            <span className="text-red-500 text-sm">
              {errors.address.message}
            </span>
          )}
        </div>

        <div className="md:flex gap-4">
          <div className="flex gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Country</label>
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
                Region/State
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

          <div className="flex gap-4 mt-4 md:mt-0">
            <div>
              <label className="block text-sm font-medium mb-1">City</label>
              <input
                type="text"
                {...register('city', { required: 'City is required' })}
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
                {...register('zipCode', { required: 'Zip code is required' })}
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-green-500"
              />
              {errors.zipCode && (
                <span className="text-red-500 text-sm">
                  {errors.zipCode.message}
                </span>
              )}
            </div>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Email</label>
          <input
            type="email"
            {...register('email', { required: 'Email is required' })}
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

        <div className="flex gap-4 pt-2">
          <Button>Previous</Button>
          <Button type="submit">Next</Button>
        </div>
      </form>
    </div>
  );
}

export default BillingForm;
