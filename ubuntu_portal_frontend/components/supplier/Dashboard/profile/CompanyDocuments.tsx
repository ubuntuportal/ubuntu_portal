"use client";
import React, { useState, useEffect } from "react";

interface Document {
  id: number;
  name: string;
  imageUrl: string;
}

const CompanyDocuments: React.FC = () => {
  const [documents, setDocuments] = useState<Document[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate a 5-second delay to fetch document data
    const fetchDocuments = async () => {
      setTimeout(() => {
        const fetchedDocuments: Document[] = [
          {
            id: 1,
            name: "Company Registration",
            imageUrl: "http://via.placeholder.com/150",
          },
          {
            id: 2,
            name: "Tax Certificate",
            imageUrl: "http://via.placeholder.com/150",
          },
          {
            id: 3,
            name: "Trade License",
            imageUrl: "http://via.placeholder.com/150",
          },
          {
            id: 4,
            name: "Business Insurance",
            imageUrl: "http://via.placeholder.com/150",
          },
        ];
        setDocuments(fetchedDocuments);
        setLoading(false);
      }, 5000);
    };

    fetchDocuments();
  }, []);

  return (
    <div className="p-8 mx-8 w-96 min-w-fit">
      <div className="p-8 w-96  bg-green-500 shadow-lg rounded-lg min-w-fit ">
        <h3 className="text-2xl font-bold text-black mb-2">
          Company Documents
        </h3>
        <hr className="w-24 h-1 mb-4" />
        {loading ? (
          <div>Loading documents...</div>
        ) : (
          <div className="space-y-6">
            {documents.map((document) => (
              <div key={document.id} className="flex items-center space-x-4">
                <img
                  src={document.imageUrl}
                  alt={document.name}
                  className="w-12 h-12 object-cover"
                />
                <div>
                  <p className="text-white font-normal text-lg">
                    {document.name}
                  </p>
                  <a href="#" className="text-blue-500 hover:underline">
                    Click to see
                  </a>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default CompanyDocuments;
