import Link from "next/link";

export default function Navbar() {
  return (
    <div className="bg-accent border-b-2 border-border mb-8 flex flex-row px-4 py-6 gap-x-4 items-center">
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
    </div>
  );
}
