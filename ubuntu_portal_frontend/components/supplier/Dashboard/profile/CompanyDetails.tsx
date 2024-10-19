"use client";
import React, { useState, useEffect } from "react";

interface CompanyInfo {
  name: string;
  gstNumber: string;
  website: string;
  contactPerson: string;
  designation: string;
  contactNumber: string;
  email: string;
  employees: number;
}

const CompanyDetails: React.FC = () => {
  const [companyInfo, setCompanyInfo] = useState<CompanyInfo | null>(null);

  useEffect(() => {
    // Simulate fetching company data
    const fetchData = async () => {
      setTimeout(() => {
        const fetchedData: CompanyInfo = {
          name: "Ubuntu Portal",
          gstNumber: "UP00102",
          website: "www.ubuntuportal.com",
          contactPerson: "Hezekiahs O.",
          designation: "CEO",
          contactNumber: "+2348022293496",
          email: "info@ubuntuportal.com",
          employees: 1000,
        };
        setCompanyInfo(fetchedData);
      }, 5000);
    };

    fetchData();
  }, []);

  const companyFields = [
    { label: "Company Name", value: companyInfo?.name },
    { label: "Company GST No.", value: companyInfo?.gstNumber },
    { label: "Company Website", value: companyInfo?.website },
    { label: "Contact Person Name", value: companyInfo?.contactPerson },
    { label: "Designation", value: companyInfo?.designation },
    { label: "Contact Number", value: companyInfo?.contactNumber },
    { label: "Contact Mail ID", value: companyInfo?.email },
    { label: "Number of Employees", value: companyInfo?.employees },
  ];

  return (
    <div className="p-8 mx-8 bg-transparent  w-fit">
      <h3 className="text-2xl font-bold text-green-500 mb-2">
        Company Details
      </h3>
      <hr className="w-24 h-1 bg-black mb-4" />

      {companyInfo ? (
        <div className="grid grid-cols-2 gap-6 text-lg">
          {companyFields.map((field, index) => (
            <div key={index}>
              <span className="block text-gray-400">{field.label}:</span>
              <span className="block text-green-500 text-lg font-bold">
                {field.value}
              </span>
            </div>
          ))}
        </div>
      ) : (
        <div>Fetching company details...</div>
      )}
    </div>
  );
};

export default CompanyDetails;
