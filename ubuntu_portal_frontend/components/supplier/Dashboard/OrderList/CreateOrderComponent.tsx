import { createOrder } from "@/utils/api";
import React, { useState } from "react";


const CreateOrderComponent = () => {
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

  const handleCreateOrder = async () => {
    try {
      const response = await createOrder(orderData);
      console.log("Order Created:", response);
    } catch (error) {
      console.error("Error creating order:", error);
    }
  };

  return (
    <div>
      <button onClick={handleCreateOrder}>Create Order</button>
    </div>
  );
};

export default CreateOrderComponent;
