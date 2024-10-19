"use client";
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";

import { useSession } from "next-auth/react";

interface SupplierProduct {
  id: number;
  title: string;
  description: string;
  stock: number;
  price: string;
}

interface AddProductProps {
  onProductAdd: (newProduct: SupplierProduct) => void;
}
// Default values shown

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "react-toastify";

interface Product {
  title: string;
  description: string;
  price: number;
  stock: number;
  images: File[]; // Images field added to the Product type
}

export function AddProduct({ onProductAdd }: AddProductProps) {
  const [product, setProduct] = useState<Product>({
    title: "",
    description: "",
    price: 0,
    stock: 0,
    images: [],
  });

  const [imagePreviews, setImagePreviews] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const { data: session } = useSession();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setProduct({
      ...product,
      [name]:
        name === "price" || name === "stock"
          ? value === ""
            ? 0
            : parseFloat(value)
          : value,
    });
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const fileArray = Array.from(files);
      setProduct((prevProduct) => ({
        ...prevProduct,
        images: [...prevProduct.images, ...fileArray],
      }));

      const previewUrls = fileArray.map((file) => URL.createObjectURL(file));
      setImagePreviews((prevPreviews) => [...prevPreviews, ...previewUrls]);
    }
  };

  const handleRemoveImage = (index: number) => {
    URL.revokeObjectURL(imagePreviews[index]);
    setProduct((prevProduct) => ({
      ...prevProduct,
      images: prevProduct.images.filter((_, i) => i !== index),
    }));
    setImagePreviews((prevPreviews) =>
      prevPreviews.filter((_, i) => i !== index)
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (product.images.length === 0) {
      toast.error("Please upload at least one image.");
      return;
    }
    setLoading(true); // Start loading

    const formData = new FormData();
    formData.append("title", product.title);
    formData.append("description", product.description);
    formData.append("price", product.price.toString());
    formData.append("stock", product.stock.toString());

    product.images.forEach((image, index) => {
      formData.append(`images[${index}]`, image);
    });

    try {
      if (!session || !session?.accessToken) {
        toast.error("Unauthorized: Token not found.");
        return;
      }

      // Make the API request with the authorization token in the headers
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/products/`, // Use environment variable for the API URL
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${session.accessToken}`, // Add token to the request headers
          },
          body: formData,
        }
      );
      const result = await response.json();

      if (!response.ok) {
        toast.error(`Failed to add product: ${result.messages[0].message}`);
        console.error(result.messages);
        return;
      }

      onProductAdd(result);
      toast.success("Product added successfully");
      // Reset the form and state
      setProduct({
        title: "",
        description: "",
        price: 0,
        stock: 0,
        images: [],
      });
      setImagePreviews([]);
    } catch (error) {
      toast.error("Error adding product: " + (error as Error).message);
    } finally {
      setLoading(false); // End loading state
    }

    // Add your API request logic here
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="bg-[#36151E] hover:bg-green-300">
          Add Product
        </Button>
      </DialogTrigger>

      <DialogContent
        className="sm:max-w-[500px] lg:max-w-[700px] w-full max-h-[90vh] overflow-y-auto"
        style={{ maxHeight: "90vh" }}
      >
        <div className="p-5">
          <DialogHeader>
            <DialogTitle>Add Product</DialogTitle>
            <DialogDescription></DialogDescription>
          </DialogHeader>

          <form
            onSubmit={handleSubmit}
            className="space-y-5 sm:space-y-6 md:space-y-8"
            encType="multipart/form-data"
          >
            {/* Product Title */}
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

            {/* Product Description */}
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

            {/* Price and Stock */}
            <div className="mb-5 flex gap-4">
              <div>
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

              <div>
                <label
                  htmlFor="stock"
                  className="block text-sm font-medium text-gray-700"
                >
                  Stock
                </label>
                <input
                  type="number"
                  id="stock"
                  name="stock"
                  value={product.stock}
                  onChange={handleChange}
                  className="mt-2 w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  step="1"
                  min="0"
                  placeholder="Enter stock quantity"
                  required
                />
              </div>
            </div>

            {/* Image Upload */}
            <div className="mb-5">
              <label
                htmlFor="images"
                className="block text-sm font-medium text-gray-700"
              >
                Product Images (first will be the main image)
              </label>
              <input
                type="file"
                id="images"
                name="images"
                accept="image/*"
                multiple
                onChange={handleImageChange}
                className="mt-2 w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                required
              />

              {/* Preview uploaded images */}
              {imagePreviews.length > 0 && (
                <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 gap-4">
                  {imagePreviews.map((src, index) => (
                    <div key={index} className="relative">
                      <img
                        src={src}
                        alt={`Preview ${index}`}
                        className="w-full h-24 object-cover rounded-md"
                      />
                      <button
                        type="button"
                        onClick={() => handleRemoveImage(index)}
                        className="absolute top-1 right-1 text-white bg-red-600 rounded-full w-6 h-6 flex items-center justify-center"
                      >
                        &times;
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Submit Button */}
            <div className="mt-6">
              <button
                type="submit"
                className="w-full bg-green-600 text-white py-2 px-4 rounded-md shadow-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2"
              >
                {loading ? "Loading..." : "Add Product"}
              </button>
            </div>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
}

// const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//   const files = e.target.files;
//   if (files) {
//     const validFiles = [];
//     const previewUrls = [];
//     for (let i = 0; i < files.length; i++) {
//       const file = files[i];
//       if (file.size > 2 * 1024 * 1024) { // 2MB limit
//         alert(`${file.name} is too large. Please upload files smaller than 2MB.`);
//         continue;
//       }
//       if (!file.type.startsWith("image/")) {
//         alert(`${file.name} is not a valid image file.`);
//         continue;
//       }
//       validFiles.push(file);
//       previewUrls.push(URL.createObjectURL(file));
//     }
//     setProduct((prevProduct) => ({
//       ...prevProduct,
//       images: [...prevProduct.images, ...validFiles],
//     }));
//     setImagePreviews((prevPreviews) => [...prevPreviews, ...previewUrls]);
//   }
// };
