"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
// src/types/Product.ts
interface Product {
  title: string;
  description: string;
  price: number;
}

export function AddProduct() {
  //   interface ProductFormProps {
  //     onSubmit: (product: Product) => void;
  //   }

  // const ProductForm: React.FC<ProductFormProps> = ({ onSubmit }) => {
  const [product, setProduct] = useState<Product>({
    title: "",
    description: "",
    price: 0,
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setProduct({
      ...product,
      [name]: name === "price" ? parseFloat(value) : value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // onSubmit(product);
    setProduct({ title: "", description: "", price: 0 });
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="bg-amber-500 hover:bg-amber-300">
          Add Product
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add Product</DialogTitle>
          <DialogDescription>
            {/* <div>Add a new product</div> */}
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="max-w-lg">
          <div className="mb-5">
            <label
              htmlFor="title"
              className="block text-sm font-medium text-gray-700"
            >
              Product Title
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={product.title}
              onChange={handleChange}
              className="mt-2 w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="Enter product title"
              required
            />
          </div>

          <div className="mb-5">
            <label
              htmlFor="description"
              className="block text-sm font-medium text-gray-700"
            >
              Product Description
            </label>
            <textarea
              id="description"
              name="description"
              value={product.description}
              onChange={handleChange}
              className="mt-2 w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="Enter product description"
              rows={5}
              required
            />
          </div>

          <div className="mb-5">
            <label
              htmlFor="price"
              className="block text-sm font-medium text-gray-700"
            >
              Price (in USD)
            </label>
            <input
              type="number"
              id="price"
              name="price"
              value={product.price}
              onChange={handleChange}
              className="mt-2 w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              step="0.01"
              min="0"
              placeholder="Enter price"
              required
            />
          </div>

          <div className="mt-6">
            <button
              type="submit"
              className="w-full bg-orange-600 text-white py-2 px-4 rounded-md shadow-md hover:bg-amber-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              Submit Product
            </button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
