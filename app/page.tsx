import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-row bg-blue-300 justify-center items-center mx-8 rounded-2xl">
      <img src="/cart.svg" alt="shopping cart" height={200} width={200} />
      <div className=" flex flex-col justify-center items-center gap-y-6 px-12 py-32">
        <span className="text-4xl font-bold underline decoration-purple-700">
          Shop Ease
        </span>
        <span>Manage your store checkout system with ease</span>
        <Button>
          <Link href="/checkout">Get Started</Link>
        </Button>
      </div>
    </div>
  );
}
