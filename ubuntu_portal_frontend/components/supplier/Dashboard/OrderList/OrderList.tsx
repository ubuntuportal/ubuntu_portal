import React, { useEffect, useState } from 'react';

interface Order {
  id: string;
  user: string;
  billing_info: number;
  shipping_info: number;
  contact_info: number;
  payment_method: string;
  total_amount: string;
  items: Array<{
    product_id: string;
    variation_id: string;
    quantity: number;
    price_at_purchase: string;
  }>;
}

const OrderList = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch('https://ubuntu-portal.onrender.com/api/orders/');
        if (!response.ok) {
          throw new Error('Failed to fetch orders');
        }
        const result = await response.json();
        setOrders(result.results);
        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  if (loading) {
    return <div>Loading orders...</div>;
  }

  return (
    <div className="p-4">
      {orders.length > 0 ? (
        <div>
          <h2 className="text-2xl font-bold mb-4">Orders List</h2>
          {orders.map((order) => (
            <div key={order.id} className="p-4 border-b">
              <h3 className="text-xl font-semibold">Order ID: {order.id}</h3>
              <p>User: {order.user}</p>
              <p>Total Amount: {order.total_amount}</p>
              <p>Payment Method: {order.payment_method}</p>
              <div>
                <h4 className="font-semibold">Items:</h4>
                {order.items.map((item, index) => (
                  <div key={index}>
                    <p>Product ID: {item.product_id}</p>
                    <p>Variation ID: {item.variation_id}</p>
                    <p>Quantity: {item.quantity}</p>
                    <p>Price: {item.price_at_purchase}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p>No orders found</p>
      )}
    </div>
  );
};

export default OrderList;
