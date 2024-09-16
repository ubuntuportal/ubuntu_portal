'use client';
import { Button } from '@/components/ui/button';
import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';

type PaymentFormInputs = {
  firstName: string;
  lastName: string;
  country: string;
  region: string;
  city: string;
  zipCode: string;
  email: string;
  phoneNumber: string;
};

function PaymentForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PaymentFormInputs>();

  const onSubmit: SubmitHandler<PaymentFormInputs> = (data) => {
    console.log(data);
  };

  return (
    <div className="max-w-md mx-auto md:max-w-screen-md p-4 border rounded-md my-6">
      <h2 className="text-2xl font-semibold mb-4">Payment Option</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Name on Card</label>
          <input
            type="text"
            {...register('email', { required: 'Email is required' })}
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-green-500"
          />
          {errors.email && (
            <span className="text-red-500 text-sm">{errors.email.message}</span>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Card Number</label>
          <input
            type="text"
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

        <div className="md:flex gap-4">
          <div className="flex-1">
            <label className="block text-sm font-medium mb-1">
              Expire Date
            </label>
            <input
              type="text"
              placeholder="DD/YY"
              {...register('country', { required: 'Country is required' })}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-green-500"
            />
            {errors.country && (
              <span className="text-red-500 text-sm">
                {errors.country.message}
              </span>
            )}
          </div>

          <div className="flex-1">
            <label className="block text-sm font-medium mb-1">CVC</label>
            <input
              type="text"
              {...register('region', {
                required: 'CVC is required',
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

        <div className="w-full flex justify-center pt-6">
          <Button type="submit">Submit and Review Order Summary</Button>
        </div>
      </form>
    </div>
  );
}

export default PaymentForm;
