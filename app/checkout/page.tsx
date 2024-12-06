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

export default function Checkout() {
  interface Product {
    id: string;
    name: string;
    price: number;
  }

  const [price, setPrice] = useState(0);
  const [products, setProducts] = useState<Product[]>([]);

  const scanBarcode = async (e:any) => {
    console.log(process.env.HOME)
    const file = e.target.files[0];
    if (!file) {
      return
    }
    const blobURL = URL.createObjectURL(file);
    const link = document.createElement('a')
    link.href = blobURL
    link.download = 'barcode.png'
    link.click()
  };

  const decipherBarcode = async () => {
    const res = await fetch("/api/decode", {
      method: "GET",
    });
    const data = await res.json();
    if (res.ok) {
      return data.message;
    } else {
      return false;
    }
  };

  const fetchProduct = async () => {
    const code = await decipherBarcode();
    if (!code) return;
    const response = await fetch(`/api/get?id=${code}`);
    const res = await response.json();
    setProducts((pdts) => [...pdts, res]);
    setPrice(price + res.price);
    console.log(res);
  };

  return (
    <div className="mx-32 my-16">
      <div className="flex flex-row justify-between">
        <span className="text-4xl font-bold">Checkout</span>
        <div className="items-center gap-1.5">
          <span>Upload barcode</span>
          <Input
            className="w-64"
            type="file"
            accept="image/*"
            onChange={scanBarcode}
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
      <button onClick={fetchProduct}>asdf</button>
    </div>
  );
}
