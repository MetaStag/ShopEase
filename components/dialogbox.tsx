import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "./ui/button";
import { useRef } from "react";

interface DialogSchema {
  name: string;
  option1: string;
  option2: string;
  func: (arg1: any, arg2: any) => void;
}

export default function DialogBox({
  name,
  option1,
  option2,
  func,
}: DialogSchema) {
  const input1 = useRef<HTMLInputElement>(null);
  const input2 = useRef<HTMLInputElement>(null);

  const handleSubmit = () => {
    if (input1.current && input2.current) {
      const value1 = input1.current.value;
      const value2 = input2.current.value;
      func(value1, value2);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="w-16 mt-4">{name}</Button>
      </DialogTrigger>
      <DialogContent className="w-96">
        <DialogHeader>
          <DialogTitle>{name} Product</DialogTitle>
          <DialogDescription>{name} details</DialogDescription>
        </DialogHeader>
        <div className="flex flex-col">
          <span>{option1}</span>
          <input
            className="mb-2 border-2 border-zinc-500 rounded-md p-2 w-64"
            ref={input1}
            placeholder="Enter name:"
          ></input>
          <span>{option2}</span>
          <input
            className="mb-4 border-2 border-zinc-500 rounded-md p-2 w-64"
            ref={input2}
            type="number"
            placeholder="Enter price:"
          ></input>
        </div>
        <DialogFooter>
          <Button className="self-center" onClick={handleSubmit}>
            Submit
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
