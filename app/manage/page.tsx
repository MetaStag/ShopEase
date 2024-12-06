"use client";

import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectTrigger,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Toaster } from "@/components/ui/toaster";
import { useToast } from "@/hooks/use-toast";
import { useRef, useState } from "react";
import generateBarcode from "./generate";

export default function Manage() {
  const [choice, setChoice] = useState("");
  const [addtoggle, setAddToggle] = useState(true);
  const [deletetoggle, setDeleteToggle] = useState(false);
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const { toast } = useToast();
  const canvasRef = useRef(null);

  const validateInput = () => {
    console.log(id, name, price);
    if (choice !== "add") {
      if (!parseFloat(id)) {
        toast({
          title: "Validation failed",
          description: "Invalid Id entered",
        });
        return;
      }
    }
    if (choice !== "delete") {
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
    }
    sendRequest();
  };

  const sendRequest = async () => {
    let message;
    let data;
    let res: Response | null = null;
    switch (choice) {
      case "add":
        const iid = generateBarcode(canvasRef);
        data = { id: iid, name: name, price: price };
        res = await fetch("/api/add", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        });
        break;
      case "edit":
        data = { id: id, name: name, price: price };
        res = await fetch("/api/edit", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        });
        break;
      case "delete":
        res = await fetch(`/api/delete?id=${id}`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        });
        break;
      default:
        throw new Error("Invalid value of choice");
    }
    const result = await res.json();
    if (!result.message) message = "Invalid request";
    message = result.message;
    toast({
      title: "Result",
      description: message,
    });
  };

  return (
    <div className="flex flex-col justify-center items-center">
      <Toaster />
      <span className="text-4xl font-bold mb-16">Manage Products</span>
      <div className="flex flex-row justify-between w-6/12">
        <div className="flex flex-col">
          <span>Product Id</span>
          <Input
            disabled={addtoggle}
            className="m-2 border-2 p-2 py-5 w-64"
            placeholder="Enter product id:"
            onChange={(e) => setId(e.target.value)}
          ></Input>
          <span>Product name</span>
          <Input
            disabled={deletetoggle}
            className="m-2 border-2 p-2 py-5 w-64"
            placeholder="Enter product name:"
            onChange={(e) => setName(e.target.value)}
          />
          <span>Product price</span>
          <Input
            disabled={deletetoggle}
            className="m-3 border-2 p-2 py-5 w-64"
            placeholder="Enter product price:"
            onChange={(e) => setPrice(e.target.value)}
          />
          <Button onClick={validateInput}>Submit</Button>
        </div>
        <div>
          <Select
            onValueChange={(option) => {
              setChoice(option);
              option === "add" ? setAddToggle(true) : setAddToggle(false);
              option === "delete"
                ? setDeleteToggle(true)
                : setDeleteToggle(false);
            }}
          >
            <SelectTrigger className="w-64">
              <SelectValue placeholder="Choose Action" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="add">Add</SelectItem>
              <SelectItem value="edit">Edit</SelectItem>
              <SelectItem value="delete">Delete</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      <canvas
        className="hidden"
        ref={canvasRef}
        width={226}
        height={100}
      ></canvas>
    </div>
  );
}
