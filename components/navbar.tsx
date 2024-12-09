import Link from "next/link";
import Login from "./login";

export default function Navbar() {
  return (
    <div className=" border-b-2 mb-8">
      <div className="flex flex-row m-4 gap-x-4 items-center">
        <Link href="/" className="font-bold">
          ShopEase
        </Link>
        <Link href="/" className="text-zinc-600">
          Home
        </Link>
        <Link href="/checkout" className="text-zinc-600">
          Checkout
        </Link>
        <Link href="/manage" className="text-zinc-600">
          Manage
        </Link>
        <div className="ml-auto">
          <Login />
        </div>
      </div>
    </div>
  );
}
