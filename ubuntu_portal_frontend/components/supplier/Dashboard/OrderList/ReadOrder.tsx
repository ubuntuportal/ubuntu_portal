import { readOrder } from "@/utils/api";
import React, { useState } from "react";

const ReadOrderComponent = () => {
  const [order, setOrder] = useState(null);
  const [orderId, setOrderId] = useState("");

  const handleReadOrder = async () => {
    try {
      const response = await readOrder(orderId);
      setOrder(response);
    } catch (error) {
      console.error(`Error fetching order ${orderId}:`, error);
    }
  };

  return (
    <div>
      <input
        type="text"
        value={orderId}
        onChange={(e) => setOrderId(e.target.value)}
        placeholder="Enter Order ID"
      />
      <button onClick={handleReadOrder}>Read Order</button>
      {order && (
        <div>
          <p>Order ID: {order.id}</p>
          <p>Total Amount: {order.total_amount}</p>
        </div>
      )}
    </div>
  );
};

export default ReadOrderComponent;
