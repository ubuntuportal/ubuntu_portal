import { AddProduct } from '@/components/supplier/AddProduct';
import { Tables } from '@/components/supplier/Table';
import React from 'react';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { redirect } from 'next/navigation';

export default async function ProductsPage() {
  // Fetch the session from NextAuth
  const session = await getServerSession(authOptions);

  // Redirect to login if not authenticated or if user is not a seller
  if (!session?.role || session.role !== 'supplier') {
    redirect('/auth/login');
    return null; // Halt further rendering if the user is unauthorized
  }

  // Extract userId from session

  return (
    <div className="p-6">
      {/* AddProduct component receives the userId as a prop */}
      <div className="flex justify-end mb-4">
        <AddProduct />
      </div>

      {/* Tables component to display the product table */}
      <Tables />
    </div>
  );
}
