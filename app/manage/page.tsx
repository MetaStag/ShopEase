"use client";

import {
  Table,
  TableHeader,
  TableCaption,
  TableBody,
  TableCell,
  TableRow,
  TableHead,
} from "@/components/ui/table";

import { Button } from "@/components/ui/button";
import { Toaster } from "@/components/ui/toaster";
import DialogBox from "@/components/dialogbox";
import { useToast } from "@/hooks/use-toast";
import { useEffect, useRef, useState } from "react";
import generateBarcode from "./generate";

export default function Manage() {
  interface Product {
    id: number;
    name: string;
    price: number;
  }

  const [products, setProducts] = useState<Product[]>([]);
  const { toast } = useToast();
  const canvasRef = useRef(null);

  useEffect(() => {
    fetch("/api/all")
      .then((res) => res.json())
      .then((data) => setProducts(data.documents))
      .catch((err) => console.log(err));
  }, []);

  const addProduct = async (name: string, price: string) => {
    if (!parseFloat(price)) {
      toast({
        title: "Validation failed",
        description: "Price should be a float",
      });
      return;
    }
    if (typeof name !== "string" || name.trim().length === 0) {
      toast({
        title: "Validation failed",
        description: "Enter a proper name",
      });
      return;
    }

    const iid = generateBarcode(canvasRef);
    const data = { id: iid, name: name, price: price };
    const res = await fetch("/api/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const result = await res.json();
    let message;
    if (!result.message) message = "Invalid request";
    else message = result.message;
    toast({
      title: "Result",
      description: message,
    });
  };

  const editProduct = async (id: number, name: string, price: string) => {
    const data = { id: id, name: name, price: price };
    const res = await fetch("/api/edit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const result = await res.json();
    let message;
    if (!result.message) message = "Invalid request";
    else message = result.message;
    toast({
      title: "Result",
      description: message,
    });
  };

  const deleteProduct = async (id: number) => {
    const res = await fetch(`/api/delete?id=${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const result = await res.json();
    let message;
    if (!result.message) message = "Invalid request";
    else message = result.message;
    toast({
      title: "Result",
      description: message,
    });
  };

  return (
    <div className="flex flex-col justify-center items-center mx-32">
      <Toaster />
      <span className="text-4xl font-bold mb-16">Manage Products</span>
      <Table>
        <TableCaption>List of products</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Id</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Price</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {products ? (
            products.map((product) => (
              <TableRow key={product.id}>
                <TableCell className="p-6 text-lg">{product.id}</TableCell>
                <TableCell className="text-lg">{product.name}</TableCell>
                <TableCell className="text-lg">{product.price}</TableCell>
                <TableCell className="text-right text-lg">
                  <DialogBox
                    name="Edit"
                    option1="Name"
                    option2="Price"
                    func={(value1, value2) => {
                      editProduct(product.id, value1, value2);
                    }}
                  />{" "}
                  |{" "}
                  <Button onClick={() => deleteProduct(product.id)}>
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <span>Loading /</span>
          )}
        </TableBody>
      </Table>
      <DialogBox name="Add" option1="Name" option2="Price" func={addProduct} />
      <canvas
        className="hidden"
        ref={canvasRef}
        width={226} // Dimensions of barcode image
        height={100}
      ></canvas>
    </div>
  );
}
