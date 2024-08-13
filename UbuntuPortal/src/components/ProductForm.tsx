// src/components/ProductForm.tsx
import React, { useState } from "react";
import { Product } from "../types/Product";

interface ProductFormProps {
  onSubmit: (product: Product) => void;
}

const ProductForm: React.FC<ProductFormProps> = ({ onSubmit }) => {
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
    onSubmit(product);
    setProduct({ title: "", description: "", price: 0 });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-lg mx-auto p-6 bg-white shadow-lg rounded-lg border border-gray-200"
    >
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">
        Create New Product
      </h2>

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
          className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        >
          Submit Product
        </button>
      </div>
    </form>
  );
};

export default ProductForm;
