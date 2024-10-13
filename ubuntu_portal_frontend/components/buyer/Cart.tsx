import React, { useReducer, useEffect } from "react";
import { useRouter } from "/next/router"; // Import useRouter for navigation
import Image from "next/image";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { MdAdd } from "react-icons/md";
import { RiSubtractFill } from "react-icons/ri";
import { ImCancelCircle } from "react-icons/im";

type CartItem = {
  id: number;
  img: string;
  name: string;
  price: number;
  quantity: number;
};

type CartState = {
  carts: CartItem[];
  total: number;
};

type CartAction =
  | { type: "INCREASE_QUANTITY"; payload: { id: number } }
  | { type: "DECREASE_QUANTITY"; payload: { id: number } }
  | { type: "REMOVE_PRODUCT"; payload: { id: number } };

const initialState = {
  carts: [
    {
      id: 1,
      img: "",
      name: "4K UHD LEDSmart TV with chromecast Built-in",
      price: 70,
      quantity: 2,
    },
    {
      id: 2,
      img: "",
      name: "Wired Over-Ear Gaming Headphons with USB",
      price: 250,
      quantity: 3,
    },
    {
      id: 3,
      img: "",
      name: "Wireless Bluetooth Headphones with Mic",
      price: 100,
      quantity: 1,
    },
  ],
  total: 0,
};

function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case "INCREASE_QUANTITY":
      return {
        ...state,
        carts: state.carts.map((cart) =>
          cart.id === action.payload.id
            ? { ...cart, quantity: cart.quantity + 1 }
            : cart
        ),
      };
    case "DECREASE_QUANTITY":
      return {
        ...state,
        carts: state.carts.map((cart) =>
          cart.id === action.payload.id && cart.quantity > 1
            ? { ...cart, quantity: cart.quantity - 1 }
            : cart
        ),
      };
    case "REMOVE_PRODUCT":
      return {
        ...state,
        carts: state.carts.filter((cart) => cart.id !== action.payload.id),
      };
    default:
      return state;
  }
}

export default function Cart() {
  const [state, dispatch] = useReducer(cartReducer, initialState);
  const router = useRouter(); // Initialize router for navigation

  const handleIncreaseQuantity = (id: number) => {
    dispatch({ type: "INCREASE_QUANTITY", payload: { id } });
  };

  const handleDecreaseQuantity = (id: number) => {
    dispatch({ type: "DECREASE_QUANTITY", payload: { id } });
  };

  const handleRemoveProduct = (id: number) => {
    dispatch({ type: "REMOVE_PRODUCT", payload: { id } });
  };

  const calculateSubtotal = (price: number, quantity: number) =>
    price * quantity;

  const calculateTotal = () => {
    return state.carts.reduce(
      (acc, cart) => acc + calculateSubtotal(cart.price, cart.quantity),
      0
    );
  };

  const handleProceedToCheckout = () => {
    const total = calculateTotal();
    sessionStorage.setItem("totalAmount", JSON.stringify(total)); // Store total in session storage
    router.push("/home/buyers-information/shipping"); // Redirect to customer info form page
  };

  if (state.carts.length === 0) {
    return (
      <div className="container bg-white">
        <div className="flex items-center justify-center h-screen">
          <h1>Your cart is empty</h1>
        </div>
      </div>
    );
  }

  return (
    <div className="container px-3 md:px-16 bg-white">
      <div className="flex flex-col pt-10 md:flex-row gap-4 mx-auto">
        <div className="">
          <Table className="w-[100%] md:w-auto border-2 rounded-md border-slate-200">
            <TableCaption>A list of your recent items.</TableCaption>
            <TableHeader className="bg-slate-200">
              <TableRow>
                <TableHead className="w-1/2">PRODUCTS</TableHead>
                <TableHead>PRICE</TableHead>
                <TableHead>QUANTITY</TableHead>
                <TableHead>SUB-TOTAL</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody className="pr-4">
              {state.carts.map((cart) => (
                <TableRow key={cart.id}>
                  <TableCell className="font-medium flex gap-3 items-center">
                    <button onClick={() => handleRemoveProduct(cart.id)}>
                      <ImCancelCircle className="text-red-500 text-lg" />
                    </button>
                    <h1>{cart.name}</h1>
                  </TableCell>
                  <TableCell>${cart.price}</TableCell>
                  <TableCell className="flex mb-3 place-items-center items-center justify-center rounded-md border-2">
                    <button onClick={() => handleDecreaseQuantity(cart.id)}>
                      <RiSubtractFill className="text-lg" />
                    </button>
                    <input
                      className="max-w-10 text-center"
                      value={cart.quantity}
                      disabled
                    />
                    <button onClick={() => handleIncreaseQuantity(cart.id)}>
                      <MdAdd className="text-lg" />
                    </button>
                  </TableCell>
                  <TableCell className="text-right">
                    ${calculateSubtotal(cart.price, cart.quantity)}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        <div className="">
          <Card className="rounded-none">
            <CardHeader>
              <CardTitle>Cart Totals</CardTitle>
            </CardHeader>
            <CardContent className="text-sm">
              <div className="flex justify-between">
                <p>Sub-total</p>
                <p>${calculateTotal()}</p>
              </div>
              <div className="flex justify-between">
                <p>Shipping</p>
                <p>Free</p>
              </div>
              <div className="flex justify-between">
                <p>Discount</p>
                <p>$0.00</p>
              </div>
              <div className="flex justify-between">
                <p>Tax</p>
                <p>$0.00</p>
              </div>
              <span className="block border-b-2 my-3 "></span>
              <div className="flex justify-between">
                <p>Total</p>
                <p>${calculateTotal()}</p>
              </div>
            </CardContent>
            <CardFooter>
              <button
                className="bg-[#2DB224] hover:bg-[#248e1d] text-white font-bold py-2 px-4 rounded"
                onClick={handleProceedToCheckout} // Call the proceed to checkout handler
              >
                PROCEED TO CHECKOUT
              </button>
            </CardFooter>
          </Card>
          <Card className="rounded-none my-3">
            <CardHeader>
              <CardTitle>Coupon Code</CardTitle>
            </CardHeader>
            <CardContent>
              <input
                type="text"
                placeholder="Enter Coupon Code"
                className="outline-1 border-2 border-slate-200 p-2 rounded-md w-full"
              />
            </CardContent>
            <CardFooter>
              <button className="bg-[#2DB224] hover:bg-[#248e1d] text-white font-bold py-2 px-4 rounded">
                APPLY COUPON
              </button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
}
