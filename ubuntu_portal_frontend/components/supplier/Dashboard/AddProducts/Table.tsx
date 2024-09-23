"use client";
import React from "react";
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
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

const products = [
  {
    name: "Tomato",
    description: "Fresh and Healthy tomatoes",
    quantity: 5,
    price: "$500",
  },
  {
    name: "Apple",
    description: "Fresh and Healthy apples",
    quantity: 10,
    price: "$100",
  },
  {
    name: "Banana",
    description: "Fresh and Healthy bananas",
    quantity: 15,
    price: "$150",
  },
  {
    name: "Orange",
    description: "Fresh and Healthy oranges",
    quantity: 20,
    price: "$200",
  },
  {
    name: "Pineapple",
    description: "Fresh and Healthy pineapples",
    quantity: 25,
    price: "$250",
  },
  {
    name: "Grapes",
    description: "Fresh and Healthy grapes",
    quantity: 30,
    price: "$300",
  },
  {
    name: "Mango",
    description: "Fresh and Healthy mangoes",
    quantity: 35,
    price: "$350",
  },
];

export function Tables() {
  return (
    <>
      <Table>
        <TableCaption>A list of your recent products.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[150px]">Product-Name</TableHead>
            <TableHead>Description</TableHead>
            <TableHead>Quantity</TableHead>
            <TableHead className="text-right">Price</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {products.map((product) => (
            <TableRow key={product.name}>
              <TableCell className="font-medium">{product.name}</TableCell>
              <TableCell>{product.description}</TableCell>
              <TableCell>{product.quantity}</TableCell>
              <TableCell className="text-right">{product.price}</TableCell>
            </TableRow>
          ))}
        </TableBody>
        {/* <TableFooter>
        <TableRow>
          <TableCell colSpan={3}>Total</TableCell>
          <TableCell className="text-right">$2,500.00</TableCell>
        </TableRow>
      </TableFooter> */}
      </Table>
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious href="#" />
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href="#" isActive>
              1
            </PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href="#">2</PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href="#">3</PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
          <PaginationItem>
            <PaginationNext href="#" />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </>
  );
}
