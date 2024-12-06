'use client'

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

import { loginAdmin, getIDToken } from "@/lib/auth";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const login = async () => {
    if (typeof email !== "string" || email.trim().length === 0) {
      console.log("Enter a proper email");
      return;
    }
    if (typeof password !== "string" || password.trim().length === 0) {
      console.log("Enter a proper password");
      return;
    }
    console.log(email, password)
    const user = await loginAdmin(email, password);
    console.log("Logged in");
    const token = await getIDToken()
    const response = await fetch('/api/test', {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    const data = await response.json()
    console.log(data)
  };

  return (
    <div>
      <Dialog>
        <DialogTrigger asChild>
          <Button>Login</Button>
        </DialogTrigger>
        <DialogContent className="w-96">
          <DialogHeader>
            <DialogTitle>Log In</DialogTitle>
            <DialogDescription>Enter your email and password</DialogDescription>
          </DialogHeader>
          <div className="flex flex-col">
            <span>Email</span>
            <input
              className="mb-2 border-2 border-zinc-500 rounded-md p-2 w-64"
              placeholder="Enter email:"
              onChange={(e) => setEmail(e.target.value)}
            ></input>
            <span>Password</span>
            <input
              className="mb-4 border-2 border-zinc-500 rounded-md p-2 w-64"
              type="text"
              placeholder="Enter password:"
              onChange={(e) => setPassword(e.target.value)}
            ></input>
          </div>
          <DialogFooter>
            <Button className='self-center' onClick={login}>Submit</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
