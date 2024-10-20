"use client";
import React, { useState, useEffect } from "react";

interface BusinessCategoryDetails {
  industry: string;
  mainCategories: string[];
  subCategories: string[];
  pricing: string;
}

const BusinessCategory: React.FC = () => {
  const [categoryDetails, setCategoryDetails] =
    useState<BusinessCategoryDetails | null>(null);

  useEffect(() => {
    // Simulate fetching business category details
    const fetchCategoryDetails = async () => {
      setTimeout(() => {
        const fetchedDetails: BusinessCategoryDetails = {
          industry: "Fashion",
          mainCategories: ["Clothing", "Shoes", "Jewelries"],
          subCategories: ["Unisex", "Luxury", "Accessories"],
          pricing: "$$$",
        };
        setCategoryDetails(fetchedDetails);
      }, 5000);
    };

    fetchCategoryDetails();
  }, []);

  // Details array for mapping
  const details = categoryDetails
    ? [
        { label: "Industry", value: categoryDetails.industry },
        {
          label: "Main Categories",
          value: categoryDetails.mainCategories.join(", "),
        },
        {
          label: "Subcategories",
          value: categoryDetails.subCategories.join(", "),
        },
        { label: "Pricing", value: categoryDetails.pricing },
      ]
    : [];

  return (
    <div className="p-8 mx-8 w-96 min-w-fit">
      {/* Business Category Section */}
      <div className="p-8 w-96 bg-transparent min-w-fit">
        <h3 className="text-2xl font-bold text-green-500 mb-2">
          Business Category
        </h3>
        <hr className="w-24 h-1 bg-green-500 mb-4" />

        {categoryDetails ? (
          <div className="space-y-4">
            {details.map((detail, index) => (
              <div key={index}>
                <p className="text-green-500 font-semibold text-lg">
                  {detail.label}:
                </p>
                <p className="text-green-500 font-normal">{detail.value}</p>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-green-500">
            Fetching business category details...
          </div>
        )}
      </div>
    </div>
  );
};

export default BusinessCategory;
