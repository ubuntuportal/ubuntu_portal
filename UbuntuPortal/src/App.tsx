// src/App.tsx
import React from "react";
import ProductForm from "./components/ProductForm";
import { Product } from "./types/Product";

const App: React.FC = () => {
  const handleProductSubmit = (product: Product) => {
    // Handle the submitted product (e.g., send it to an API or update state)
    console.log("Product submitted:", product);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <ProductForm onSubmit={handleProductSubmit} />
    </div>
  );
};
export default App;
