import { Button } from "@/components/ui/button";
import Summary from "../../components/summary";
import Link from "next/link";

function CartPage() {
  return (
    <main className="container mx-auto px-4 sm:px-0 pb-6">
      <section className="mt-12">
        <h1 className="font-bold text-xl sm:text-2xl md:text-3xl">Your Cart</h1>
      </section>
      <Summary editable />
      <Button className="w-full my-6" asChild>
        <Link href="/checkout">Checkout</Link>
      </Button>
    </main>
  );
}

export default CartPage;
