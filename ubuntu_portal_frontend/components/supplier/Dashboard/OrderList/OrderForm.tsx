import React, { useState } from 'react';
import { Button } from '@/components/ui/button';

const OrderForm = () => {
  const [formData, setFormData] = useState({
    billing_info: 0,
    shipping_info: 0,
    contact_info: 0,
    payment_method: 'credit_card',
    items: [
      {
        product_id: '',
        variation_id: '',
        quantity: 1,
        price_at_purchase: '',
      },
    ],
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>, index: number) => {
    const { name, value } = e.target;
    setFormData((prevState) => {
      const newItems = [...prevState.items];
      newItems[index] = { ...newItems[index], [name]: value };
      return { ...prevState, items: newItems };
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch('https://ubuntu-portal.onrender.com/api/orders/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      if (!response.ok) {
        throw new Error('Failed to create order');
      }
      const result = await response.json();
      console.log('Order Created:', result);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 p-4">
      <div>
        <label htmlFor="product_id">Product ID</label>
        <input
          type="text"
          name="product_id"
          value={formData.items[0].product_id}
          onChange={(e) => handleChange(e, 0)}
          className="border p-2 rounded-lg"
        />
      </div>
      <div>
        <label htmlFor="variation_id">Variation ID</label>
        <input
          type="text"
          name="variation_id"
          value={formData.items[0].variation_id}
          onChange={(e) => handleChange(e, 0)}
          className="border p-2 rounded-lg"
        />
      </div>
      <div>
        <label htmlFor="quantity">Quantity</label>
        <input
          type="number"
          name="quantity"
          value={formData.items[0].quantity}
          onChange={(e) => handleChange(e, 0)}
          className="border p-2 rounded-lg"
        />
      </div>
      <div>
        <label htmlFor="price_at_purchase">Price at Purchase</label>
        <input
          type="text"
          name="price_at_purchase"
          value={formData.items[0].price_at_purchase}
          onChange={(e) => handleChange(e, 0)}
          className="border p-2 rounded-lg"
        />
      </div>
      <Button type="submit" className="bg-green-500 text-white">
        Create Order
      </Button>
    </form>
  );
};

export default OrderForm;
