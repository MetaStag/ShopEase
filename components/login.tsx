"use client";

import { useState } from "react";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import DialogBox from "./dialogbox";

import { loginAdmin, getIDToken } from "@/lib/auth";
import { useToast } from "@/hooks/use-toast";
import { Toaster } from "./ui/toaster";

export default function Login() {
  const { toast } = useToast();

  const login = async (email: string, password: string) => {
    // Input validation
    if (typeof email !== "string" || email.trim().length === 0) {
      toast({
        title: "Invalid input",
        description: "Enter a proper username",
      });
      return;
    }
    if (typeof password !== "string" || password.trim().length === 0) {
      toast({
        title: "Invalid input",
        description: "Enter a proper password",
      });
      return;
    }

    // Login using Firebase Auth
    const user = await loginAdmin(email, password);
    const token = await getIDToken();
    const response = await fetch("/api/test", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await response.json();
    console.log(data); // delete later
  };

  return (
    <div>
      <Toaster />
      <DialogBox name="Login" option1="Email" option2="Password" func={login} />
    </div>
  );
}
