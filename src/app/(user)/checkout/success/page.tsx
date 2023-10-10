import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import Link from "next/link";
import React from "react";

const PaymentSuccess = () => {
  return (
    <main className="flex flex-col justify-center items-center gap-4 py-12">
      <Check className="bg-primary text-white h-14 w-14 rounded-full" />
      <div>Your payment was successfully processed</div>
      <Button asChild>
        <Link href="/orders">Track your delivery</Link>
      </Button>
    </main>
  );
};

export default PaymentSuccess;
