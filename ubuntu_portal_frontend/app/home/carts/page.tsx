"use client";
import { BreadcrumbResponsive } from "@/components/buyer/Breadcrumb";
import Cart from "@/components/buyer/Cart";
import React, { useState } from "react";

type CartItem = {
  id: number;
  name: string;
  price: number;
  quantity: number;
};

const simulatedCartItems: CartItem[] = [
  { id: 1, name: "Laptop", price: 999, quantity: 1 },
  { id: 2, name: "Smartphone", price: 699, quantity: 2 },
  { id: 3, name: "Wireless Earbuds", price: 199, quantity: 1 },
  { id: 4, name: "Tablet", price: 499, quantity: 3 },
];

export default function CartComponents() {
  const [cartItems, setCartItems] = useState<CartItem[]>(simulatedCartItems);

  const addItemToCart = (item: CartItem) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find((i) => i.id === item.id);
      if (existingItem) {
        return prevItems.map((i) =>
          i.id === item.id ? { ...i, quantity: i.quantity + item.quantity } : i
        );
      } else {
        return [...prevItems, item];
      }
    });
  };

  const removeItemFromCart = (id: number) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };
  return (
    <div className="bg-gray-100">
      <div className="py-5 px-16 hidden lg:block lg:w-1/4">
        <BreadcrumbResponsive />
      </div>
      <div>
        <Cart
        // items={cartItems}
        // onAddItem={addItemToCart}
        // onRemoveItem={removeItemFromCart}
        />
      </div>
    </div>
  );
}
