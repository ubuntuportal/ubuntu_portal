"use client";
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Searchbox from "./Searchbox";
import HomeInput from "./HomeInput";

interface Product {
  id: string;
  title: string;
  image: string;
  description: string;
  price: number;
  stock: number;
  category: string[];
  variations: {
    id: string;
    attribute: string;
    value: string;
    price_modifier: number;
  }[];
}

export default function ProductPage() {
  const [searchResults, setSearchResults] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [productDetails, setProductDetails] = useState<Product | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const param = useParams();
  const id = param?.id;

  // Fetch product details by ID when component mounts or when `id` changes
  useEffect(() => {
    if (typeof id === "string") {
      fetchProductDetails(id);
    }
  }, [id]);

  const fetchProductDetails = async (productId: string) => {
    setLoading(true);
    try {
      const response = await fetch(
        `https://ubuntu-portal.onrender.com/api/products/${productId}/`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch product details");
      }
      const product: Product = await response.json();
      setProductDetails(product);
    } catch (error: any) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {/* Searchbox component */}
      <Searchbox setSearchResults={setSearchResults} />

      {/* HomeInput component for filtering */}
      <HomeInput setFilteredProducts={setFilteredProducts} />

      {/* Display search results */}
      {searchResults?.length > 0 && (
        <div>
          <h2>Search Results</h2>
          <ul>
            {searchResults.map((product) => (
              <li key={product.id}>{product.title}</li>
            ))}
          </ul>
        </div>
      )}

      {/* Display filtered products */}
      {filteredProducts.length > 0 && (
        <div>
          <h2>Filtered Products</h2>
          <ul>
            {filteredProducts.map((product) => (
              <li key={product.id}>{product.title}</li>
            ))}
          </ul>
        </div>
      )}

      {/* Display product details */}
      {loading ? (
        <p>Loading product details...</p>
      ) : error ? (
        <p>{error}</p>
      ) : productDetails ? (
        <div>
          <h2>{productDetails.title}</h2>
          <img src={productDetails.image} alt={productDetails.title} />
          <p>{productDetails.description}</p>
          <p>Price: {productDetails.price}</p>
          <p>Stock: {productDetails.stock}</p>

          <h3>Categories</h3>
          <ul>
            {productDetails.category.map((catId) => (
              <li key={catId}>{catId}</li>
            ))}
          </ul>

          <h3>Variations</h3>
          <ul>
            {productDetails.variations.map((variation) => (
              <li key={variation.id}>
                Attribute: {variation.attribute}, Value: {variation.value},
                Price Modifier: {variation.price_modifier}
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <p>Select a product to view its details.</p>
      )}
    </div>
  );
}
