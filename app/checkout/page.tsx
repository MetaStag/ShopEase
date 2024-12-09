"use client";

import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCaption,
  TableHead,
  TableHeader,
  TableCell,
  TableRow,
} from "@/components/ui/table";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { Toaster } from "@/components/ui/toaster";

export default function Checkout() {
  // Product Schema
  interface Product {
    id: string;
    name: string;
    price: number;
  }

  const [price, setPrice] = useState(0);
  const [products, setProducts] = useState<Product[]>([]);
  const { toast } = useToast();

  // Decode product id from barcode image
  const decodeBarcode = async (e: any) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    const res = await fetch("/api/decode", {
      method: "POST",
      body: formData,
    });
    const data = await res.json();
    if (res.ok) fetchProduct(parseInt(data.message));
    else {
      toast({
        title: "Invalid barcode",
        description: "Barcode scan failed. Try another one",
      });
    }
  };

  // Fetch product details from Id
  const fetchProduct = async (code: number) => {
    if (!code) return;
    const response = await fetch(`/api/get?id=${code}`);
    const res = await response.json();
    setProducts((pdts) => [...pdts, res]);
    setPrice(price + res.price);
  };

  return (
    <div className="mx-32 my-16">
      <Toaster />
      <div className="flex flex-row justify-between">
        <span className="text-4xl font-bold">Checkout</span>
        <div className="items-center gap-1.5">
          <span>Upload barcode</span>
          <Input
            className="w-64"
            type="file"
            accept="image/*"
            onChange={decodeBarcode}
          ></Input>
        </div>
      </div>
      <Table className="my-16">
        <TableCaption>Bill Checkout</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Quantity</TableHead>
            <TableHead>Price</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {products.map((item) => (
            <TableRow key={item.id}>
              <TableCell className="p-6 text-lg">{item.name}</TableCell>
              <TableCell className="text-lg">1</TableCell>
              <TableCell className="text-lg">{item.price}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <span className="flex justify-end text-2xl">Total: {price}</span>
    </div>
  );
}
