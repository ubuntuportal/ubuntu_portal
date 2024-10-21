import { updateOrder } from "@/utils/api";
import React, { useState } from "react";


const UpdateOrder = () => {
  const [orderId, setOrderId] = useState("");
  const [orderData, setOrderData] = useState({
    billing_info: 0,
    shipping_info: 0,
    contact_info: 0,
    payment_method: "credit_card",
    items: [
      {
        product_id: "0d012afa-f885-4e65-aeca-37e27701e2d1",
        variation_id: "5130138e-590b-4f7e-8df9-63af0004262c",
        quantity: 1,
        price_at_purchase: "100",
      },
    ],
  });

  const handleUpdateOrder = async () => {
    try {
      const response = await updateOrder(orderId, orderData);
      console.log("Order Updated:", response);
    } catch (error) {
      console.error("Error updating order:", error);
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
      <button onClick={handleUpdateOrder}>Update Order</button>
    </div>
  );
};

export default UpdateOrder;
