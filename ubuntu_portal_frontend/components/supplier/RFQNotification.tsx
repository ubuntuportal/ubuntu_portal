import React from "react";
import { FaCalendarAlt, FaMapMarkerAlt } from "react-icons/fa"; // Icons for calendar and location

// Sample RFQ data (can be replaced with dynamic data)
const rfqList = [
  {
    date: "Sep 21",
    rfqCode: "RFQ12345",
    productName: "Wheat Flour",
    country: "NG", // Nigeria
    quantity: 1000,
  },
  {
    date: "Sep 21",
    rfqCode: "RFQ67890",
    productName: "Corn Flour",
    country: "KE", // Kenya
    quantity: 500,
  },
  {
    date: "Sep 21",
    rfqCode: "RFQ54321",
    productName: "Rice Flour",
    country: "GH", // Ghana
    quantity: 300,
  },
  {
    date: "Sep 21",
    rfqCode: "RFQ09876",
    productName: "Sugar",
    country: "ZA", // South Africa
    quantity: 2000,
  },
  // Add more RFQs as needed
];

const RFQNotificationTable = () => {
  // Limit to max 4 RFQs
  const limitedRfqList = rfqList.slice(0, 4);

  return (
    <div className="overflow-x-auto">
      {/* Header Section */}
      <div className="flex justify-between items-center m-4">
        <h2 className="text-xl font-bold">RFQ Notifications</h2>
        <a
          href="/rfq-page"
          className="text-amber-600 text-lg hover:underline hover:text-amber-800"
        >
          View All
        </a>
      </div>

      {/* Table Section */}
      <table className="min-w-full">
        <tbody>
          {limitedRfqList.map((rfq, index) => (
            <tr key={index} className="align-top">
              {/* Date with Calendar Icon */}
              <td className="p-4">
                <div className="flex-row items-center">
                  <FaCalendarAlt className="text-gray-500 h-8 w-8" />
                  <span>{rfq.date}</span>
                </div>
              </td>

              {/* RFQ Code, Product, and Location */}
              <td className="p-4">
                <div className="text-gray-300">{rfq.rfqCode}</div>
                <div className="text-black font-bold">{rfq.productName}</div>
                <div className="flex items-center space-x-2 text-gray-300">
                  <FaMapMarkerAlt />
                  <span>{rfq.country}</span>
                </div>
              </td>

              {/* Quantity */}
              <td className="p-4">
                <div>{rfq.quantity} Qty</div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default RFQNotificationTable;
