import { listOrders } from "@/utils/api";
import React, { useEffect, useState } from "react";


const ListOrders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const orders = await listOrders();
        setOrders(orders);
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };

    fetchOrders();
  }, []);

  return (
    <div>
      <h2>Order List</h2>
      {orders.map((order) => (
        <div key={order.id}>
          <p>Order ID: {order.id}</p>
          <p>Total Amount: {order.total_amount}</p>
        </div>
      ))}
    </div>
  );
};

export default ListOrders;
