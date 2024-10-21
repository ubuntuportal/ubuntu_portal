import { deleteOrder } from "@/utils/api";
import React, { useState } from "react";


const DeleteOrder = () => {
  const [orderId, setOrderId] = useState("");

  const handleDeleteOrder = async () => {
    try {
      await deleteOrder(orderId);
      console.log(`Order ${orderId} deleted`);
    } catch (error) {
      console.error(`Error deleting order ${orderId}:`, error);
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
      <button onClick={handleDeleteOrder}>Delete Order</button>
    </div>
  );
};

export default DeleteOrder;
