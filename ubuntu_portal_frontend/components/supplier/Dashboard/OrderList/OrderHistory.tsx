import { orderHistory } from "@/utils/api";
import React, { useEffect, useState } from "react";


const OrderHistory = () => {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const historyData = await orderHistory();
        setHistory(historyData);
      } catch (error) {
        console.error("Error fetching order history:", error);
      }
    };

    fetchHistory();
  }, []);

  return (
    <div>
      <h2>Order History</h2>
      {history.map((order, index) => (
        <div key={index}>
          <p>Order ID: {order.id}</p>
          <p>Total Amount: {order.total_amount}</p>
        </div>
      ))}
    </div>
  );
};

export default OrderHistory;
